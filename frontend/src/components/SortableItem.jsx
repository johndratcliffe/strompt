// SortableItem.js (Example - adjust based on your actual component structure)
import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export const SortableItem = ({ id, label, dragOverlay, onRemoveItem, prompt, location }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging // Useful for styling if needed
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '8px 12px',
    border: '1px solid #eee',
    borderRadius: '4px',
    marginBottom: '5px',
    backgroundColor: dragOverlay ? '#fafafa' : '#fff',
    cursor: dragOverlay ? 'grabbing' : 'grab',
    opacity: isDragging ? 0.5 : 1,
    display: 'flex', // Use flexbox for layout
    justifyContent: 'space-between', // Space out label and button
    alignItems: 'center', // Align items vertically
    boxShadow: dragOverlay ? '0 4px 8px rgba(0,0,0,0.1)' : 'none'
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <span>{label}</span>
      {/* Render remove button only if onRemoveItem handler is provided */}
      {onRemoveItem && (location !== 'pool' || prompt) && !dragOverlay && ( // Don't show remove button on the overlay
        <button
          onClick={(e) => {
            e.stopPropagation() // Prevent drag start when clicking button
            onRemoveItem(id)
          }}
          style={{
            marginLeft: '10px',
            cursor: 'pointer',
            border: 'none',
            background: 'transparent',
            color: 'red',
            padding: '0 5px',
            fontSize: '1.1em'
          }}
          title='Remove item'
          aria-label={`Remove ${label}`}
        >
          &times; {/* Unicode 'X' character */}
        </button>
      )}
    </div>
  )
}
