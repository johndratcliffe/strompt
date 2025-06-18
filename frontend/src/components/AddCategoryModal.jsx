import { useState } from 'react'

export const AddCategoryModal = ({ isOpen, onClose, onSave }) => {
  const [itemName, setItemName] = useState('')

  // Don't render if not open
  if (!isOpen) return null

  const handleSave = () => {
    if (itemName.trim()) { // Basic validation: ensure name is not empty
      onSave(itemName)
      setItemName('') // Reset form
      onClose() // Close modal after saving
    }
  }

  const handleClose = () => {
    setItemName('') // Reset form
    onClose()
  }

  return (
    // Modal Overlay
    <div
      className='fixed inset-0 bg-black/50 z-40 flex justify-center items-center p-4'
      onClick={handleClose} // Close modal on overlay click
    >
      {/* Modal Content */}
      <div
        className='bg-white p-6 rounded-lg shadow-xl z-50 w-full max-w-md'
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <h3 className='text-lg font-semibold mb-4 text-gray-800'>Create New Category</h3>

        {/* Item Name Input */}
        <div className='mb-4'>
          <label htmlFor='itemName' className='block text-sm font-medium text-gray-700 mb-1'>
            Name
          </label>
          <input
            type='text'
            id='itemName'
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            placeholder='e.g., Text Assistant'
          />
        </div>

        {/* Action Buttons */}
        <div className='flex justify-end space-x-3'>
          <button
            onClick={handleClose}
            className='px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-150 text-sm font-medium'
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-150 text-sm font-medium'
          >
            Save Category
          </button>
        </div>
      </div>
    </div>
  )
}
