import IconCornerUpLeft from '@tabler/icons-react/dist/esm/icons/IconCornerUpLeft.mjs'
import IconCornerUpRight from '@tabler/icons-react/dist/esm/icons/IconCornerUpRight.mjs'
import IconPointer from '@tabler/icons-react/dist/esm/icons/IconPointer.mjs'
import IconHandFinger from '@tabler/icons-react/dist/esm/icons/IconHandFinger.mjs'
import IconSend2 from '@tabler/icons-react/dist/esm/icons/IconSend2.mjs'
import IconChevronDown from '@tabler/icons-react/dist/esm/icons/IconChevronDown.mjs'
import { useRef, useState, useCallback, useEffect } from 'react'

// --- Animation Data ---
const aiReplyFrames = ['A', 'AI', 'AI-', 'AI-p', 'AI-po', 'AI-pow', 'AI-powe', 'AI-power', 'AI-powere', 'AI-powered', 'AI-powered ', 'AI-powered e', 'AI-powered em', 'AI-powered ema', 'AI-powered emai', 'AI-powered email', 'AI-powered email ', 'AI-powered email r', 'AI-powered email re', 'AI-powered email rep', 'AI-powered email repl', 'AI-powered email repli', 'AI-powered email replie', 'AI-powered email replies', 'AI-powered email replies.']
const tabFrames = ['P', 'Pr', 'Pre', 'Pres', 'Press', 'Press ', 'Press T', 'Press Ta', 'Press Tab', 'Press Tab ', 'Press Tab t', 'Press Tab to', 'Press Tab to ', 'Press Tab to a', 'Press Tab to ac', 'Press Tab to acc', 'Press Tab to acce', 'Press Tab to accep', 'Press Tab to accept', 'Press Tab to accept.']
const ignoreFrames = ['J', 'Ju', 'Jus', 'Just', 'Just ', 'Just t', 'Just ty', 'Just typ', 'Just type', 'Just type ', 'Just type t', 'Just type to', 'Just type to ', 'Just type to i', 'Just type to ig', 'Just type to ign', 'Just type to igno', 'Just type to ignor', 'Just type to ignore', 'Just type to ignore.']
const typingFrames = ['C', 'Co', 'Con', 'Cont', 'Conti', 'Contin', 'Continu', 'Continue', 'Continue ', 'Continue T', 'Continue Ty', 'Continue Typ', 'Continue Typi', 'Continue Typin', 'Continue Typing', 'Continue Typing ', 'Continue Typing a', 'Continue Typing as', 'Continue Typing as ', 'Continue Typing as U', 'Continue Typing as Us', 'Continue Typing as Usu', 'Continue Typing as Usua', 'Continue Typing as Usual']

const initialReplyText = 'Dear Chloe Davis,<br /><br />Thank you for your valuable feedback and for being a loyal user of our mobile app! We truly appreciate you taking the time to suggest a dark mode option.<br /><br />We constantly strive to improve our products, and user suggestions like yours are crucial to that process. Your request has been logged and will be reviewed by our product development team for future consideration. We can\'t promise specific timelines, but please know your input is important to us.<br /><br />We encourage you to follow our blog and social media for updates on new features and product enhancements.<br /><br />Best regards,<br />The Product Team'

export const Animation = () => {
  // --- State Management ---
  const [isAnimating, setIsAnimating] = useState(true)
  const [statusMessage, setStatusMessage] = useState('')
  const [cursorType, setCursorType] = useState('pointer')
  const [replyContentText, setReplyContentText] = useState(initialReplyText)

  // --- DOM Refs ---
  const pointerRef = useRef(null)
  const emailRef = useRef(null)
  const replyRef = useRef(null)
  const replyButtonRef = useRef(null)
  const containerRef = useRef(null)
  const replyContentRef = useRef(null)
  const sendButtonRef = useRef(null) // Ref for the send button

  const animationFrameId = useRef(null)

  // --- Utility Functions ---
  const resetToInitialState = useCallback(() => {
    setIsAnimating(false)
    if (animationFrameId.current) {
      window.cancelAnimationFrame(animationFrameId.current)
    }

    // Reset styles
    if (pointerRef.current) {
      pointerRef.current.style.transform = 'translate(0px, 0px)'
      pointerRef.current.style.opacity = '1'
    }
    if (replyRef.current) {
      replyRef.current.style.top = '400px'
      replyRef.current.style.opacity = '1'
    }
    emailRef.current.style.opacity = '1'
    if (containerRef.current) containerRef.current.style.minHeight = 'auto'
    if (replyContentRef.current) replyContentRef.current.style.color = 'rgb(107 114 128)'
    if (sendButtonRef.current) sendButtonRef.current.style.transform = 'scale(1)'

    // Reset state
    setStatusMessage('')
    setCursorType('pointer')
    setReplyContentText(initialReplyText)
  }, [])

  // Generic, promise-based animation helper
  const animate = useCallback((duration, onUpdate) => {
    return new Promise((resolve) => {
      let startTime = null
      const loop = (timestamp) => {
        if (!startTime) startTime = timestamp
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / duration, 1)

        onUpdate(progress)

        if (progress < 1) {
          animationFrameId.current = window.requestAnimationFrame(loop)
        } else {
          resolve()
        }
      }
      animationFrameId.current = window.requestAnimationFrame(loop)
    })
  }, [])

  // The animation sequence
  const runAnimationSequence = useCallback(async () => {
    // 1. Move Cursor to Reply Button
    const replyButtonRect = replyButtonRef.current.getBoundingClientRect()
    const containerRect = containerRef.current.getBoundingClientRect()
    const cursorEndPos = {
      x: replyButtonRect.left + replyButtonRect.width / 2 - containerRect.left - parseFloat(pointerRef.current.style.left.replace('px', '')),
      y: replyButtonRect.top + replyButtonRect.height / 2 - containerRect.top - parseFloat(pointerRef.current.style.top.replace('px', ''))
    }
    await animate(500, (progress) => {
      pointerRef.current.style.transform = `translate(${cursorEndPos.x * progress}px, ${cursorEndPos.y * progress}px)`
      if (progress > 0.9) setCursorType('finger')
    })
    replyButtonRef.current.style.transition = 'transform 0.1s ease-in-out'
    replyButtonRef.current.style.transform = 'scale(0.95)'
    await animate(150, () => {})
    replyButtonRef.current.style.transform = 'scale(1)'
    await animate(150, () => {}) // Artificial delay

    // 2. Move Reply Box Up & Show AI Message
    const emailRect = emailRef.current.getBoundingClientRect()
    const replyStartTop = replyRef.current.offsetTop
    const replyFinalTop = emailRect.top + 80 - containerRect.top

    const replyHeight = replyRef.current.offsetHeight
    containerRef.current.style.minHeight = `${replyFinalTop + replyHeight + 20}px`

    await Promise.all([
      animate(500, (progress) => {
        replyRef.current.style.top = `${replyStartTop + (replyFinalTop - replyStartTop) * progress}px`
      }),
      animate(500, (progress) => {
        setStatusMessage(aiReplyFrames[Math.floor(progress * (aiReplyFrames.length - 1))])
      })
    ])

    // 3. Simulate typing and show "Ignore" message (NEW ORDER)
    await animate(1500, () => {}) // Artificial delay
    replyContentRef.current.style.color = 'black'
    await Promise.all([
      animate(500, (progress) => {
        setReplyContentText(typingFrames[Math.floor(progress * (typingFrames.length - 1))])
      }),
      animate(500, (progress) => {
        setStatusMessage(ignoreFrames[Math.floor(progress * (tabFrames.length - 1))])
      })
    ])

    // 4. Reveal AI text and show "Tab" message (NEW ORDER)
    await animate(1000, () => {}) // Artificial delay
    setReplyContentText(initialReplyText)
    replyContentRef.current.style.color = 'grey'
    await animate(500, () => {}) // Artificial delay
    replyContentRef.current.style.color = 'black'
    await animate(500, (progress) => {
      setStatusMessage(tabFrames[Math.floor(progress * (ignoreFrames.length - 1))])
    })

    // 5. Move cursor to Send button (NEW STEP)
    await animate(1500, () => {}) // Delay before next action
    setCursorType('finger')
    const sendButtonRect = sendButtonRef.current.getBoundingClientRect()

    const pointerStart = { x: cursorEndPos.x, y: cursorEndPos.y }
    const pointerEnd = {
      x: sendButtonRect.left + sendButtonRect.width / 2 - containerRect.left - parseFloat(pointerRef.current.style.left.replace('px', '')),
      y: sendButtonRect.top + sendButtonRect.height / 2 - containerRect.top - parseFloat(pointerRef.current.style.top.replace('px', ''))
    }

    await animate(500, (progress) => {
      const currentX = pointerStart.x + (pointerEnd.x - pointerStart.x) * progress
      const currentY = pointerStart.y + (pointerEnd.y - pointerStart.y) * progress
      pointerRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`
    })

    // 6. Click Send and Fade Out (NEW STEP)
    sendButtonRef.current.style.transition = 'transform 0.1s ease-in-out'
    sendButtonRef.current.style.transform = 'scale(0.95)'
    await animate(150, () => {})
    sendButtonRef.current.style.transform = 'scale(1)'
    setStatusMessage('Sending...')

    await animate(500, (progress) => {
      const opacity = 1 - progress
      if (replyRef.current) replyRef.current.style.opacity = opacity
      if (pointerRef.current) pointerRef.current.style.opacity = opacity
      if (emailRef.current) emailRef.current.style.opacity = opacity
    })

    setStatusMessage('Sent!')
    await animate(500, () => {})

    resetToInitialState()
    runAnimationSequence()
  }, [animate])

  // Effect to run the animation when 'isAnimating' is true
  useEffect(() => {
    if (isAnimating) {
      runAnimationSequence()
    }
  }, [isAnimating, runAnimationSequence])

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') setIsAnimating(true)
    })
  })

  return (
    <div className='font-sans text-left'>
      <div ref={containerRef} className='m-8 mb-0 relative overflow-hidden'>
        {/* Email Section */}
        <div ref={emailRef} className='p-3 border border-gray-300 rounded-lg'>
          <div className='flex items-center space-x-4'>
            <div className='bg-purple-400 w-fit px-4 py-4 rounded-full font-bold text-white'>CD</div>
            <div className='text-sm text-gray-600'><h3>Chloe Davis</h3><h3>To: You</h3></div>
          </div>
          <div className='ml-16 mt-6 text-gray-800 text-sm'>
            Hi Product Team,<br /><br />
            I've been a loyal user of your mobile app for years, and I love it! One feature I'd really appreciate is a dark mode option. It would greatly improve readability in low-light conditions and save battery life on OLED screens. Many other apps are implementing this, and I think it would be a valuable addition.
            <br /><br />Thanks for considering,<br />Chloe Davis
          </div>
          <div className='flex ml-16 mt-6 space-x-4'>
            <button ref={replyButtonRef} className='flex border border-gray-300 rounded-md px-3 py-1.5 text-sm items-center hover:bg-gray-100'><IconCornerUpLeft stroke={1.5} className='text-purple-800 mr-2' />Reply</button>
            <button className='flex border border-gray-300 rounded-md px-3 py-1.5 text-sm items-center hover:bg-gray-100'><IconCornerUpRight stroke={1.5} className='text-blue-800 mr-2' />Forward</button>
          </div>
          <div ref={pointerRef} className='text-gray-700 absolute z-50' style={{ top: '50px', left: '300px' }}>
            {cursorType === 'pointer' ? <IconPointer /> : <IconHandFinger />}
          </div>
        </div>
        {/* Reply Section */}
        <div ref={replyRef} className='border border-gray-300 rounded-lg absolute bg-white w-full' style={{ top: '400px' }}>
          <div className='flex space-x-4 items-center m-3'>
            <button ref={sendButtonRef} className='bg-sky-600 flex text-gray-50 font-bold rounded-md items-center space-x-1'>
              <IconSend2 stroke={1.5} className='ml-3' /><span className='mr-3 my-1'>Send</span>
              <div className='w-px h-6 bg-sky-500' /><IconChevronDown stroke={2} size={16} className='mr-2' />
            </button>
            <h3 className='text-sm text-gray-600'>To: Chloe Davis</h3>
          </div>
          <div className='w-full h-px bg-gray-300' />
          <div ref={replyContentRef} className='m-3 text-gray-500 text-sm min-h-85' dangerouslySetInnerHTML={{ __html: replyContentText }} />
        </div>
      </div>
      <div className='text-lg text-gray-700 font-mono h-6 text-center mt-4 mb-40'>{statusMessage}</div>
      {/* Controls */}
      {/* <div className='flex items-center space-x-4 ml-8'>
        <button onClick={() => setIsAnimating(true)} disabled={isAnimating} className='px-4 py-2 bg-blue-600 text-white rounded-md w-28 text-center disabled:bg-blue-400 disabled:cursor-not-allowed'>
          {isAnimating ? 'Playing...' : '▶️ Play'}
        </button>
        <button onClick={resetToInitialState} className='px-4 py-2 bg-gray-600 text-white rounded-md'>🔄 Reset</button>
      </div> */}
    </div>
  )
}
