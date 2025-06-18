import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { AddItemModal } from './AddItemModal'
import PRE_DEFINED_ACTIONS from './PRE_DEFINED_ACTIONS.json'
import SimpleBar from 'simplebar-react'
import { useAuth } from '../context/AuthContext'
import { ManagingSubscriptions } from './ManagingSubscriptions'

// IDs of items to be in the drop zone by default
const defaultDroppedItemIds = ['item-1', 'item-4', 'item-5']

// Function to get the initial state based on defaults using the *initial* items
const getInitialState = () => {
  const defaultDropped = PRE_DEFINED_ACTIONS.filter(item => defaultDroppedItemIds.includes(item.id))
  const defaultPool = PRE_DEFINED_ACTIONS.filter(item => !defaultDroppedItemIds.includes(item.id))
  return { initialDroppedItems: defaultDropped, initialPoolItems: defaultPool }
}

// --- Draggable Item Component --- (No changes needed)
function DraggableItem ({ item, onDragStart, handleDeleteItem }) {
  return (
    <div
      id={item.id}
      draggable='true'
      onDragStart={onDragStart}
      className='flex justify-between p-3 mb-2 bg-white border border-gray-300 rounded-lg shadow-sm cursor-grab active:cursor-grabbing hover:bg-gray-50 transition-colors duration-150'
    >
      {item.label}
      {item.prompt && <button onClick={() => handleDeleteItem(item.id)} className='ml-2 text-red-500 hover:text-red-700 text-xs font-semibold uppercase tracking-wider'>Remove</button>}
    </div>
  )
}

// --- Main App Component ---
export function CustomizeSmartPaste ({ onNavigate }) {
  const { user } = useAuth()
  if (user.subscription?.plan === 'free' || user.subscription?.plan === 'basic') {
    return (
      <div className='p-20'>
        <ManagingSubscriptions subscriptionStatus={user.subscription.status} onNavigate={onNavigate} />
      </div>
    )
  }
  // Get initial state using useMemo to calculate only once
  const { initialDroppedItems, initialPoolItems } = useMemo(() => getInitialState(), [])

  // State for items in the pool - starts with initial pool
  const [poolItems, setPoolItems] = useState(initialPoolItems)
  // State for items dropped into the target area - starts with initial dropped
  const [droppedItems, setDroppedItems] = useState(initialDroppedItems)
  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false)
  // State to track drag over
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  // Keep track of all items (including custom) for sorting purposes when removing
  const [allItems, setAllItems] = useState(PRE_DEFINED_ACTIONS)

  // --- Drag and Drop Handlers ---

  const handleDeleteItem = (itemIdToRemove) => {
    setPoolItems(poolItems.filter(item => item.id !== itemIdToRemove))
    window.postMessage({
      type: 'REMOVE_ACTION',
      setting: poolItems[poolItems.findIndex(item => item.id === itemIdToRemove)].id
    }, '*')
  }

  const handleDragStart = useCallback((event) => {
    event.dataTransfer.setData('text/plain', event.target.id)
    event.dataTransfer.effectAllowed = 'move'
  }, [])

  const handleDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    setIsDraggingOver(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDraggingOver(false)
  }, [])

  const handleDrop = useCallback((event) => {
    event.preventDefault()
    setIsDraggingOver(false)
    const itemId = event.dataTransfer.getData('text/plain')
    const itemToDrop = poolItems.find(item => item.id === itemId)

    if (itemToDrop && !droppedItems.some(item => item.id === itemId)) {
      setDroppedItems(prevItems => [...prevItems, itemToDrop])
      setPoolItems(prevItems => prevItems.filter(item => item.id !== itemId))
    }
  }, [poolItems, droppedItems])

  // --- Item Management Handlers ---

  const handleRemoveItem = useCallback((itemIdToRemove) => {
    const itemToRemove = droppedItems.find(item => item.id === itemIdToRemove)
    if (itemToRemove) {
      setDroppedItems(prevItems => prevItems.filter(item => item.id !== itemIdToRemove))
      // Add back to pool items, maintaining sort order based on allItems
      setPoolItems(prevItems => {
        if (!prevItems.some(item => item.id === itemIdToRemove)) {
          const newPool = [...prevItems, itemToRemove]
          // Sort based on the original allItems order
          newPool.sort((a, b) => {
            const indexA = allItems.findIndex(i => i.id === a.id)
            const indexB = allItems.findIndex(i => i.id === b.id)
            // Handle custom items (which might not be in PRE_DEFINED_ACTIONS) by placing them at the end
            if (indexA === -1) return 1
            if (indexB === -1) return -1
            return indexA - indexB
          })
          return newPool
        }
        return prevItems
      })
    }
  }, [droppedItems, allItems]) // Added allItems dependency

  // Handler for saving a new item from the modal
  const handleSaveNewItem = useCallback((name, prompt) => {
    const newItemId = `item-${Date.now()}` // Simple unique ID generation
    const newItem = { id: newItemId, label: name, prompt }

    // Add to the pool items
    setPoolItems(prevItems => [...prevItems, newItem])
    // Also add to our reference of all items
    setAllItems(prevItems => [...prevItems, newItem])

    setIsModalOpen(false) // Close modal handled by modal itself now
    window.postMessage({
      type: 'ADD_CUSTOM_ACTION',
      setting: newItem
    }, '*')
  }, []) // No dependencies needed here

  // Handler for the reset button - resets to the *original* default state
  const handleReset = useCallback(() => {
    const { initialDroppedItems: defaultDropped, initialPoolItems: defaultPool } = getInitialState()
    setDroppedItems(defaultDropped)
    setPoolItems(defaultPool)
    // Reset allItems back to the original list as well
    setAllItems(PRE_DEFINED_ACTIONS)
    window.postMessage({
      type: 'CHANGE_SMART_PASTE_OPTIONS',
      setting: defaultDropped
    }, '*')
  }, [droppedItems]) // Recalculates initial state based on constants

  useEffect(() => {
    window.postMessage({ type: 'GET_CUSTOM_ACTIONS_AND_SMART_PASTE_OPTIONS' })
    window.addEventListener('message', (event) => {
      if (event.source !== window) return
      if (event.data.type === 'RETURN_CUSTOM_ACTIONS_AND_SMART_PASTE_OPTIONS') {
        if (event.data.value.smartPasteOptions) setDroppedItems(event.data.value.smartPasteOptions)
        if (event.data.value.smartPasteOptions && event.data.value.customActions) {
          setPoolItems([
            ...PRE_DEFINED_ACTIONS.filter(predefinedAction =>
              event.data.value.smartPasteOptions.every(action => action.label !== predefinedAction.label)
            ),
            ...event.data.value.customActions.filter(customAction =>
              event.data.value.smartPasteOptions.every(action => action.label !== customAction.label)
            )]
          )
        } else if (event.data.value.customActions) {
          setPoolItems([
            ...PRE_DEFINED_ACTIONS.slice(1, 2), ...PRE_DEFINED_ACTIONS.slice(3, 22),
            ...event.data.value.customActions
          ])
        }
      }
    })
  }, [])

  const handleSave = () => {
    window.postMessage({
      type: 'CHANGE_SMART_PASTE_OPTIONS',
      setting: droppedItems
    }, '*')
  }

  return (
    <div className='h-[calc(100vh-82px)] flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 p-6 bg-gray-100 font-sans'>
      {/* Item Pool Section */}
      <SimpleBar className='h-full w-full md:w-1/3 bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col'>
        {/* Pool Header */}
        <div className='flex justify-between items-center border-b pb-2 mb-4'>
          <h2 className='text-xl font-semibold text-gray-700'>Actions</h2>
          {/* Add New Item Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className='px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm font-medium transition-colors duration-150'
          >
            + Add New
          </button>
        </div>
        {/* Pool Content */}
        <div className='h-full flex-grow space-y-2 pr-2'> {/* Adjusted max-height */}
          {poolItems.length === 0
            ? (
              <p className='text-gray-500 text-center mt-4'>Pool is empty</p>
              )
            : (
                poolItems.map((item) => (
                  <DraggableItem
                    key={item.id}
                    item={item}
                    onDragStart={handleDragStart}
                    handleDeleteItem={handleDeleteItem}
                  />
                ))
              )}
        </div>
      </SimpleBar>

      {/* Drop Zone Section */}
      <SimpleBar
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        className={`w-full h-full md:w-2/3 p-4 rounded-lg shadow-md border-2 border-dashed ${
          isDraggingOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
        } transition-colors duration-200 flex flex-col`}
      >
        {/* Drop Zone Header */}
        <div className='flex justify-between items-center border-b pb-2 mb-4'>
          <h2 className='text-xl font-semibold text-gray-700'>Drop Zone</h2>
          <div className='space-x-2'>
            <button
              onClick={handleReset}
              className='px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm font-medium transition-colors duration-150'
            >
              Reset to Default
            </button>
            <button
              onClick={handleSave}
              className='px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm font-medium transition-colors duration-150'
            >
              Save
            </button>
          </div>
        </div>
        {/* Drop Zone Content */}
        <div className='flex-grow space-y-2 pr-2'>
          {droppedItems.length === 0
            ? (
              <p className='text-gray-500 text-center mt-4'>Drag items here</p>
              )
            : (
                droppedItems.map((item) => (
                  <div
                    key={item.id}
                    className='flex justify-between items-center p-3 border border-gray-300 rounded-lg shadow-sm'
                  >
                    <span>{item.label}</span>
                    {/* Remove button */}
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className='ml-2 text-red-500 hover:text-red-700 text-xs font-semibold uppercase tracking-wider'
                      aria-label={`Remove ${item.label}`}
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
        </div>
      </SimpleBar>

      {/* Modal for Adding New Item */}
      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveNewItem}
      />
    </div>
  )
}
