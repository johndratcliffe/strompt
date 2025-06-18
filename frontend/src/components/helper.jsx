import { useRef, useState } from 'react'
import IconChevronRight from '@tabler/icons-react/dist/esm/icons/IconChevronRight.mjs'
import IconChevronDown from '@tabler/icons-react/dist/esm/icons/IconChevronDown.mjs'

export const Helper = () => {
  const exampleContextMenu = [
    {
      id: 'container-text-assistant',
      label: 'Text Assistant',
      items: [{ id: 'item-1', label: 'Summarize' },
        { id: 'item-2', label: 'Change Tone' },
        { id: 'item-5', label: 'Reply' }]
    },
    {
      id: 'container-code-assistant',
      label: 'Code Assistant',
      items:
      [{ id: 'item-4', label: 'Notes' }]
    },
    { id: 'item-3', label: 'Rephrase' }
  ]
  const [isOpen, setIsOpen] = useState(true)
  const [dropdown, setDropdown] = useState(null)
  const rows = useRef()
  const cols = useRef()
  const inner = useRef()
  console.log(inner.current?.scrollHeight)
  return (
    <div
      className='mt-50 absolute'
      onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(true)}
    >
      <div className='z-[9999] transition-border duration-300 shadow-md py-2 px-2 border rounded-[20px] border-gray-100 text-gray-700 absolute bg-white border flex flex-col-reverse min-w-max'>
        <div className='flex items-center space-x-2 w-full'>
          <img src='/icon.png' className='h-5 w-5 cursor-pointer' />
          <button className='bg-gray-100 rounded-xl px-2 hover:bg-gray-300'>Recommendations</button>
        </div>
        <div ref={cols} className={`${isOpen ? 'grid-cols-[1fr] mt-2' : 'grid-cols-[0fr] mt-0'} grid overflow-hidden transition-all duration-300 min-w-max`}>
          <div ref={rows} className={`${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} grid overflow-hidden transition-all duration-300 min-w-0 w-fit`}>
            <div ref={inner} className='min-h-0 space-y-1'>
              <input type='text' placeholder='Quick prompt...' className='border border-gray-300 rounded-lg px-2 m-1 mb-2 outline-red focus:outline-gray-300 focus:outline' />
              {exampleContextMenu.map((element, index) => {
                return (
                  <div key={element.label} onClick={() => { setDropdown(prev => prev === index ? null : index) }}>
                    <div>{element.items
                      ? (
                        <button className='px-2'>{element.label}{dropdown === index
                          ? <IconChevronDown className='inline ml-1' size={15} />
                          : <IconChevronRight className='inline ml-1' size={15} />}
                        </button>
                        )
                      : <button className='hover:bg-gray-300 rounded-lg px-2'>{element.label}</button>}
                    </div>
                    <div className={`${dropdown === index ? 'grid-cols-[1fr]' : 'grid-cols-[0fr]'} grid overflow-hidden transition-all duration-300`}>
                      <div className={`${dropdown === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} grid overflow-hidden transition-all duration-300`}>
                        <div className='min-h-0'>
                          {element.items?.map(item => <button key={item.id} className='text-left ml-2 block hover:bg-gray-300 rounded-lg px-2'>{item.label}</button>)}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
