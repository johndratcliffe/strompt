import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export const SortableContainer = ({
  id,
  title,
  children,
  handleRemoveContainer,
  dragOverlay,
  isMinimized,
  toggleMinimize,
  isDraggingActive,
  onHoverIn,
  onHoverOut,
  setContainer,
  invalidTitle,
  setInvalidTitle
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isOver
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '10px',
    backgroundColor: dragOverlay ? '#f0f0f0' : (isOver ? '#e8f4ff' : 'white'),
    boxShadow: dragOverlay ? '0px 5px 10px rgba(0,0,0,0.1)' : 'none'
  }

  // Highlight the container when it's being dragged over
  const headerStyle = {
    padding: '8px',
    backgroundColor: isOver ? '#d0e8ff' : '#f5f5f5',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'grab',
    borderBottom: (!isMinimized || children) ? '1px solid #ddd' : 'none'
  }

  // Handle mouse events for hover detection
  const handleMouseEnter = () => {
    if (isDraggingActive && onHoverIn) {
      onHoverIn()
    }
  }

  const handleMouseLeave = () => {
    if (isDraggingActive && onHoverOut) {
      onHoverOut()
    }
  }

  const handleTitleChange = (e) => {
    setContainer(prev => prev.map(container =>
      container.id === id ? { ...container, title: e.target.value } : container
    ))
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={headerStyle}
        {...attributes}
        {...listeners}
      >
        <div className='w-fit relative'>
          <span className='opacity-0 px-2'>{title || 'Title'}</span>
          <input
            className={`absolute left-0 w-full px-1 title-input ${invalidTitle?.includes(id) && (!title || title.trim() === '') ? 'input-error' : ''}`}
            placeholder='Title' style={{ fontWeight: 'bold' }} value={title} onChange={handleTitleChange}
            onFocus={() => setInvalidTitle(prev => prev.filter(container => container.id === id))}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleMinimize && toggleMinimize()
            }}
            style={{
              marginRight: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            {isMinimized ? '▼' : '▲'}
          </button>
          {handleRemoveContainer && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleRemoveContainer(id)
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'red',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              ×
            </button>
          )}
        </div>
      </div>
      {children && (
        <div style={{ padding: '10px' }}>
          {children}
        </div>
      )}
    </div>
  )
}
