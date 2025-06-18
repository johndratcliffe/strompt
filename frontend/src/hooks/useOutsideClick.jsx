import { useEffect } from 'react'

const useOutsideClick = (callback, include = [], shouldUse) => {
  useEffect(() => {
    if (shouldUse === undefined || shouldUse) {
      const handleMouseDown = (event) => {
        const clickedOutside = include.every(includeRef => {
          if (Array.isArray(includeRef?.current)) {
            return includeRef.current.every(includeRef =>
              !includeRef.contains(event.target)
            )
          } else return !includeRef?.current?.contains(event.target)
        })
        if (clickedOutside) document.addEventListener('mouseup', handleMouseUp)
      }
      const handleMouseUp = (event) => {
        const clickedOutside = include.every(includeRef => {
          if (Array.isArray(includeRef?.current)) {
            return includeRef.current.every(includeRef =>
              !includeRef.contains(event.target)
            )
          } else return !includeRef?.current?.contains(event.target)
        })
        if (clickedOutside) {
          document.removeEventListener('mouseup', handleMouseUp)
          callback()
        }
      }
      document.addEventListener('mousedown', handleMouseDown)
      return () => {
        document.removeEventListener('mousedown', handleMouseDown)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [callback, include, shouldUse])
}

export default useOutsideClick
