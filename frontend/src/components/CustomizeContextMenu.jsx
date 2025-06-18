import React, { useCallback, useEffect, useState } from 'react'
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  closestCenter
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import { AddItemModal } from './AddItemModal'
import { AddCategoryModal } from './AddCategoryModal'
import PRE_DEFINED_ACTIONS from './PRE_DEFINED_ACTIONS.json'
import PRE_DEFINED_CONTAINERS from './PRE_DEFINED_CONTAINERS.json'
import { useAuth } from '../context/AuthContext'
import { ManagingSubscriptions } from './ManagingSubscriptions'

const defaultRightAreaItems = [
  'container-text-assistant',
  'container-code-assistant',
  'container-academic-assistant',
  'container-marketing-assistant'
]
const defaultItemContainers = Object.fromEntries(
  PRE_DEFINED_ACTIONS.map((action, i) => [action.id, i < 5
    ? 'container-text-assistant'
    : i < 10
      ? 'container-code-assistant'
      : i < 15 ? 'container-academic-assistant' : 'container-marketing-assistant'])
)
const defaultContainerItems = {
  'container-text-assistant': PRE_DEFINED_ACTIONS.slice(0, 5).map(action => action.id),
  'container-code-assistant': PRE_DEFINED_ACTIONS.slice(5, 10).map(action => action.id),
  'container-academic-assistant': PRE_DEFINED_ACTIONS.slice(10, 15).map(action => action.id),
  'container-marketing-assistant': PRE_DEFINED_ACTIONS.slice(15, 23).map(action => action.id)
}

// A simple item component
const Item = ({ id, label, isContainer = false, dragged, removeContainer, removeItem, leftarea, prompt }) => {
  return (
    <div className={`flex justify-between
      ${id === 'placeholder' && 'opacity-0'} 
      ${id.startsWith('wrapper-') ? 'h-0 opacity-0 pointer-events-none' : 'mb-2'} 
      ${isContainer
        ? 'p-2 bg-blue-100 rounded font-medium text-blue-800 mb-2'
        : 'p-3 bg-white rounded-md border border-gray-300 shadow-sm cursor-grab'}
    `}
    >
      {label}
      {leftarea && prompt && <button onClick={() => isContainer ? removeContainer(id) : removeItem(id)} className='ml-2 text-red-500 hover:text-red-700 text-xs font-semibold uppercase tracking-wider'>Remove</button>}
      {!dragged && !leftarea && <button onClick={() => isContainer ? removeContainer(id) : removeItem(id)} className='ml-2 text-red-500 hover:text-red-700 text-xs font-semibold uppercase tracking-wider'>Remove</button>}
    </div>
  )
}

// Sortable version of the Item
const SortableItem = ({ id, label, isContainer = false, children, removeContainer, removeItem, leftarea = false, prompt }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${id === 'placeholder' && 'opacity-0'} ${id.startsWith('wrapper-') ? 'h-0 opacity-0 pointer-events-none' : 'mb-2'} 
      ${isContainer ? 'p-2 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-grab' : ''}`}
      {...attributes}
      {...listeners}
    >
      {isContainer
        ? (
          <>
            <Item id={id} label={label} leftarea={leftarea} removeContainer={removeContainer} isContainer />
            {children}
          </>
          )
        : (
          <Item id={id} label={label} leftarea={leftarea} removeItem={removeItem} prompt={prompt} />
          )}
    </div>
  )
}

// ---------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------- MAIN FUNCTION ----------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------
export function CustomizeContextMenu ({ onNavigate }) {
  const { user } = useAuth()
  if (user.subscription?.plan === 'free') {
    return (
      <div className='p-20'>
        <ManagingSubscriptions subscriptionStatus={user.subscription.status} onNavigate={onNavigate} />
      </div>
    )
  }
  const [isItemModalOpen, setIsItemModalOpen] = useState(false)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [allContainers, setAllContainers] = useState(PRE_DEFINED_CONTAINERS)
  const [allItems, setAllItems] = useState(PRE_DEFINED_ACTIONS)
  const [customActions, setCustomActions] = useState([])
  // Available items in the left panel
  const [availableItems, setAvailableItems] = useState([])
  // Items and containers in the right area
  const [rightAreaItems, setRightAreaItems] = useState(defaultRightAreaItems)
  // Track which container each item belongs to (if any)
  const [itemContainers, setItemContainers] = useState(defaultItemContainers)
  // Track what items are in each container
  const [containerItems, setContainerItems] = useState(defaultContainerItems)
  // Currently dragged item
  const [activeId, setActiveId] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    })
  )

  const addItem = useCallback((label, prompt) => {
    const id = `item-${Math.random()}`
    const newItem = { id, label, prompt }
    setAllItems(prev => ([...prev, newItem]))
    setAvailableItems(prev => ([...prev, newItem]))
    window.postMessage({
      type: 'ADD_CUSTOM_ACTION',
      setting: newItem
    }, '*')
  }, [])

  const removeContainer = (containerId) => {
    setAvailableItems(prev => ([...prev, ...containerItems[containerId].map(itemId => allItems.find(action => action.id === itemId))]))
    setRightAreaItems(prev => prev.filter(p => p !== containerId && !p.startsWith('wrapper-')))
    setAllContainers(prev => prev.filter(p => p.id !== containerId))
    setContainerItems(prev => Object.fromEntries(Object.entries(prev).filter(([id, items]) => (id !== containerId))))
    setItemContainers(prev => Object.fromEntries(Object.entries(prev).filter(([item, id]) => (id !== containerId))))
  }

  const removeItem = (itemId) => {
    setAvailableItems(prev => ([...prev, allItems.find(action => action.id === itemId)]))
    if (itemContainers[itemId]) {
      setContainerItems(prev => Object.fromEntries(Object.entries(prev).map(([id, items]) => [id, items.filter(item => item !== itemId)])))
      setItemContainers(prev => Object.fromEntries(Object.entries(prev).filter(([item, id]) => (item !== itemId))))
    } else setRightAreaItems(prev => prev.filter(p => p !== itemId))
  }

  const deleteItem = (itemId) => {
    setAvailableItems(prev => prev.filter(p => p.id !== itemId))
    setAllItems(prev => prev.filter(p => p.id !== itemId))
    window.postMessage({
      type: 'REMOVE_ACTION',
      setting: availableItems.find(item => item.id === itemId).id
    })
  }

  const resetDefault = () => {
    setAvailableItems([...customActions])
    setAllContainers(PRE_DEFINED_CONTAINERS)
    setRightAreaItems(defaultRightAreaItems)
    setItemContainers(defaultItemContainers)
    setContainerItems(defaultContainerItems)
  }

  const handleSaveContextMenu = () => {
    window.postMessage({
      type: 'CHANGE_CONTEXT_MENU',
      setting: rightAreaItems.filter(id => !id.startsWith('wrapper')).map(id => {
        if (id.startsWith('item-')) return allItems.find(item => item.id === id)
        else return { id, label: allContainers.find(container => container.id === id).label, items: containerItems[id].map(itemId => allItems.find(item => item.id === itemId)) }
      })
    })
  }

  useEffect(() => {
    window.postMessage({
      type: 'GET_CUSTOM_ACTIONS_AND_CONTEXT_MENU_SETTINGS'
    })
    const callback = (event) => {
      if (event.origin !== window.location.origin) return

      if (event.data && event.data.type === 'RETURN_CUSTOM_ACTIONS_AND_CONTEXT_MENU_SETTINGS') {
        const savedContainers = event.data.value.contextMenuSettings
        if (savedContainers) {
          setAllContainers(prev => ([...prev, ...savedContainers.filter(container => prev.some(p => p.id !== container.id))]))
          setContainerItems(Object.fromEntries(savedContainers.filter(element =>
            element.id.startsWith('container-')).map(container =>
            ([container.id, container.items.map(item => item.id)]))))
          const newItemContainers = []
          savedContainers.forEach(element => {
            if (element.id.startsWith('container-')) {
              element.items.forEach(item => newItemContainers.push([item.id, element.id]))
            }
          })
          setItemContainers(Object.fromEntries(newItemContainers))
          setRightAreaItems(savedContainers.map(element => element.id.startsWith('container-')
            ? [`wrapper-${element.id.split('-')[1]}-1`, element.id, `wrapper-${element.id.split('-')[1]}-2`]
            : [element.id]).flat())
          const preDefinedFilter = PRE_DEFINED_ACTIONS.filter(action => !savedContainers.some(container => {
            if (container.id.startsWith('item-')) return container.id === action.id
            else return container.items.some(item => item.id === action.id)
          }))
          const savedActions = event.data.value.customActions
          if (savedActions) {
            setCustomActions(savedActions)
            const savedFilter = savedActions.filter(action => !savedContainers.some(container => {
              if (container.id.startsWith('item-')) return container.id === action.id
              else return container.items.some(item => item.id === action.id)
            }))
            setAvailableItems([...preDefinedFilter, ...savedFilter])
            setAllItems(prev => ([...prev, ...savedActions]))
          } else {
            setAvailableItems(preDefinedFilter)
          }
        }
      }
    }
    window.addEventListener('message', callback)
    return () => window.removeEventListener('message', callback)
  }, [])

  // Find the label of the currently dragged item
  const getDraggedItemlabel = (id) => {
    const item = allItems.find((item) => item.id === id)
    const container = allContainers.find(container => container.id === id)
    if (item) return item.label
    if (container) return container.label
  }

  // Check if the item is a container
  const isContainer = (id) => {
    return id.toString().startsWith('container-')
  }

  // Add a new container to the right area
  const addContainer = useCallback((name) => {
    const randomId = Math.random()
    const containerId = `container-${randomId}`
    const wrapperId1 = `wrapper-${randomId}-1`
    const wrapperId2 = `wrapper-${randomId}-2`
    setRightAreaItems(prev => [...prev, wrapperId1, containerId, wrapperId2])
    setContainerItems(prev => ({ ...prev, [containerId]: [] }))
    setAllContainers(prev => ([...prev, { id: containerId, label: name }]))
  }, [])

  // Handle drag start
  const handleDragStart = (event) => {
    setActiveId(event.active.id)
  }

  // Handle drag over
  const handleDragOver = (event) => {
    const { active, over } = event

    if (!over) return

    const activeId = active.id
    const overId = over.id

    // Don't do anything else if we're not over another item
    if (activeId === overId) return

    // Find the container of the over item (if any)
    const overContainer = itemContainers[overId]
    const activeContainer = itemContainers[activeId]

    if (overId === 'placeholder') {
      setAvailableItems(availableItems.filter(item => item.id !== activeId))
      setRightAreaItems([activeId])
    } else if (!isContainer(activeId) && !isContainer(overId) && overContainer) {
      // If an item is being dragged over an item inside a container
      if (availableItems.some(item => item.id === activeId)) {
        setAvailableItems(prev => prev.filter(item => item.id !== activeId))
      }
      // If the active item is from another container
      if (activeContainer && activeContainer !== overContainer) {
        // Remove from current container
        setContainerItems({
          ...containerItems,
          [activeContainer]: containerItems[activeContainer].filter(id => id !== activeId)
        })

        // Add to new container at the specific position
        const overIndex = containerItems[overContainer].indexOf(overId)
        if (overIndex !== -1) {
          const newContainerItems = [...containerItems[overContainer]]
          // Remove item if it already exists in the target container
          const existingIndex = newContainerItems.indexOf(activeId)
          if (existingIndex !== -1) {
            newContainerItems.splice(existingIndex, 1)
          }
          // Insert at the position after the over item
          newContainerItems.splice(overIndex + 1, 0, activeId)

          setContainerItems({
            ...containerItems,
            [overContainer]: newContainerItems
          })
        } else {
          setContainerItems({
            ...containerItems,
            [overContainer]: [...containerItems[overContainer], activeId]
          })
        }

        // Update item's container reference
        setItemContainers({
          ...itemContainers,
          [activeId]: overContainer
        })
      } else if (!activeContainer) {
        // If the active item is from the main area
        // Remove from main area
        setRightAreaItems(rightAreaItems.filter(id => id !== activeId))

        // Add to container at the specific position
        const overIndex = containerItems[overContainer].indexOf(overId)
        if (overIndex !== -1) {
          const newContainerItems = [...containerItems[overContainer]]
          newContainerItems.splice(overIndex + 1, 0, activeId)
          setContainerItems({
            ...containerItems,
            [overContainer]: newContainerItems
          })
        } else {
          setContainerItems({
            ...containerItems,
            [overContainer]: [...containerItems[overContainer], activeId]
          })
        }

        // Update item's container reference
        setItemContainers({
          ...itemContainers,
          [activeId]: overContainer
        })
      } else if (activeContainer === overContainer) {
        // If the active item is already in this container, reorder
        const activeIndex = containerItems[activeContainer].indexOf(activeId)
        const overIndex = containerItems[activeContainer].indexOf(overId)

        if (activeIndex !== -1 && overIndex !== -1) {
          setContainerItems({
            ...containerItems,
            [activeContainer]: arrayMove(containerItems[activeContainer], activeIndex, overIndex)
          })
        }
      }
    } else if (activeContainer && !overContainer && !isContainer(overId)) {
      // If an item is being dragged from a container to the main area
      // Remove from current container
      setContainerItems({
        ...containerItems,
        [activeContainer]: containerItems[activeContainer].filter(id => id !== activeId)
      })

      // Add to main area near the over item
      const overIndex = rightAreaItems.indexOf(overId)
      if (overIndex !== -1) {
        const newRightAreaItems = [...rightAreaItems]
        // Remove existing instance if it's already in the right area
        const existingIndex = newRightAreaItems.indexOf(activeId)
        if (existingIndex !== -1) {
          newRightAreaItems.splice(existingIndex, 1)
        }
        // Insert at the position after the over item
        newRightAreaItems.splice(overIndex + 1, 0, activeId)
        setRightAreaItems(newRightAreaItems)
      } else {
        setRightAreaItems([...rightAreaItems, activeId])
      }

      // Update item's container reference
      setItemContainers({
        ...itemContainers,
        [activeId]: null
      })
    } else if (!isContainer(activeId) && isContainer(overId)) {
      // If the item is coming from another container
      if (activeContainer && activeContainer !== overId) {
        // Remove from current container
        setContainerItems({
          ...containerItems,
          [activeContainer]: containerItems[activeContainer].filter(id => id !== activeId),
          [overId]: [...(containerItems[overId] || []), activeId]
        })

        // Update item's container reference
        setItemContainers({
          ...itemContainers,
          [activeId]: overId
        })
      } else if (!activeContainer && rightAreaItems.includes(activeId)) {
        // If the item is coming from the main area
        // Remove from main area
        setRightAreaItems(rightAreaItems.filter(id => id !== activeId))

        // Add to container
        setContainerItems({
          ...containerItems,
          [overId]: [...(containerItems[overId] || []), activeId]
        })

        // Update item's container reference
        setItemContainers({
          ...itemContainers,
          [activeId]: overId
        })
      } else if (!activeContainer && availableItems.some(item => item.id === activeId)) {
        // Item from left to container
        // Remove from left
        setAvailableItems(prev => prev.filter(item => item.id !== activeId))
        // Add to container
        setContainerItems({
          ...containerItems,
          [overId]: [...(containerItems[overId] || []), activeId]
        })

        // Update item's container reference
        setItemContainers({
          ...itemContainers,
          [activeId]: overId
        })
      }
    } else if (!activeContainer && !overContainer && !isContainer(activeId) && !isContainer(overId)) {
      // If items are being reordered in the main area
      const activeIndex = rightAreaItems.indexOf(activeId)
      const overIndex = rightAreaItems.indexOf(overId)
      if (availableItems.some(item => item.id === activeId)) {
        setAvailableItems(prev => prev.filter(item => item.id !== activeId))
        setRightAreaItems(arrayMove([...rightAreaItems, activeId], activeIndex, overIndex))
      } else if (activeIndex !== -1 && overIndex !== -1) {
        setRightAreaItems(arrayMove(rightAreaItems, activeIndex, overIndex))
      }
    } else if (isContainer(activeId) && !overContainer && !isContainer(overId)) {
      // If container is being dragged over an item in the main area
      const activeIndex = rightAreaItems.indexOf(activeId)
      const overIndex = rightAreaItems.indexOf(overId)

      if (activeIndex !== -1 && overIndex !== -1) {
        setRightAreaItems(arrayMove(rightAreaItems, activeIndex, overIndex))
      }
    } else if (isContainer(activeId) && isContainer(overId)) {
      // If container is being dragged over another container
      const activeIndex = rightAreaItems.indexOf(activeId)
      const overIndex = rightAreaItems.indexOf(overId)

      if (activeIndex !== -1 && overIndex !== -1) {
        setRightAreaItems(arrayMove(rightAreaItems, activeIndex, overIndex))
      }
    }
  }

  // Handle drag end
  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveId(null)

    const activeId = active.id

    // If dragging from left to right
    if (over.data.current.sortable.containerId === 'Sortable') return

    // Ensure wrappers always stay around container
    if (isContainer(activeId)) {
      const newArray = []
      rightAreaItems.filter(id => !id.startsWith('wrapper-')).forEach(id => {
        if (id.startsWith('item-')) {
          newArray.push(id)
        } else {
          const split = id.split('-') // container-1 -> [container, 1]
          newArray.push(`wrapper-${split[1]}-1`)
          newArray.push(id)
          newArray.push(`wrapper-${split[1]}-2`)
        }
      })
      setRightAreaItems(newArray)
    }
  }

  // Render draggable item based on its location
  const renderDraggableItem = (itemId) => {
    if (isContainer(itemId)) {
      return (
        <SortableItem key={itemId} id={itemId} label={allContainers.find(item => item.id === itemId).label} isContainer removeContainer={removeContainer}>
          <SortableContext items={containerItems[itemId] || []} strategy={verticalListSortingStrategy}>
            {(containerItems[itemId] || []).map((childId) => {
              return (
                <SortableItem
                  removeItem={removeItem}
                  key={childId}
                  id={childId}
                  label={allItems.find(item => item.id === childId).label || childId}
                />
              )
            }
            )}
          </SortableContext>
        </SortableItem>
      )
    } else {
      const item = allItems.find(item => item.id === itemId)
      return (
        <SortableItem
          key={itemId}
          id={itemId}
          label={item ? item.label : itemId}
          removeItem={removeItem}
        />
      )
    }
  }

  return (
    <div className='md:flex md:h-[calc(100vh-82px)] bg-gray-100 p-4'>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToWindowEdges]}
      >
        {/* Left panel with available items */}
        <SimpleBar className='w-full md:w-1/3 bg-white p-4 mb-4 md:mr-4 rounded-lg shadow'>
          <div className='flex justify-between items-center border-b pb-2 mb-4'>
            <h2 className='text-xl font-semibold text-gray-700'>Actions</h2>
            <button
              onClick={() => setIsItemModalOpen(true)}
              className={`px-3 py-1 ${user.subscription?.plan === 'basic' ? 'bg-gray-200 text-gray-400 pointer-events-none' : 'text-white bg-green-500 hover:bg-green-600'} rounded-md  text-sm font-medium transition-colors duration-150`}
            >
              {user.subscription?.plan === 'basic' ? 'Upgrade to Pro' : '+Add New'}
            </button>
          </div>
          <div>
            {availableItems.map((item) => (
              <SortableItem key={item.id} id={item.id} label={item.label} leftarea prompt={item.prompt} removeItem={deleteItem} />
            ))}
          </div>
        </SimpleBar>

        {/* Right area for organizing items */}
        <SimpleBar className='w-full md:w-2/3 bg-white p-4 rounded-lg shadow h-full border-2 border-dashed border-gray-300'>
          <div className='flex flex-wrap gap-1 justify-between items-center mb-4'>
            <h2 className='text-lg font-semibold'>Drop Zone</h2>
            <div className='space-x-2 space-y-2 md:space-y-0'>
              <button
                onClick={() => setIsCategoryModalOpen(true)}
                className='px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm font-medium transition-colors duration-150'
              >
                +Add Category
              </button>
              <button
                onClick={resetDefault}
                className='px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm font-medium transition-colors duration-150'
              >
                Reset to Default
              </button>
              <button
                onClick={handleSaveContextMenu}
                className='px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm font-medium transition-colors duration-150'
              >
                Save
              </button>
            </div>
          </div>

          <div className='min-h-64 p-4 rounded-lg'>
            <SortableContext id='rightarea' items={rightAreaItems} strategy={verticalListSortingStrategy}>
              {rightAreaItems.length
                ? rightAreaItems.map((itemId) => renderDraggableItem(itemId))
                : <SortableItem
                    key='placeholder'
                    id='placeholder'
                  />}
            </SortableContext>
          </div>
        </SimpleBar>

        {/* Drag overlay for ghost effect */}
        <DragOverlay>
          {activeId
            ? isContainer(activeId)
              ? (
                <div className={`p-2 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-grab ${!containerItems[activeId].length && 'pb-6'}`}>
                  <Item id={activeId} key={activeId} label={getDraggedItemlabel(activeId)} isContainer dragged />
                  <div>
                    {(containerItems[activeId] || []).map((childId) => (
                      <Item id={childId} key={childId} label={getDraggedItemlabel(childId)} dragged />
                    ))}
                  </div>
                </div>
                )
              : (
                <Item id={activeId} label={getDraggedItemlabel(activeId)} dragged />
                )
            : null}
        </DragOverlay>
      </DndContext>
      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSave={addContainer}
      />
      <AddItemModal
        isOpen={isItemModalOpen}
        onClose={() => setIsItemModalOpen(false)}
        onSave={addItem}
      />
    </div>
  )
}
