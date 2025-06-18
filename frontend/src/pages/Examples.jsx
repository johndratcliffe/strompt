import React, { useState, useRef, useEffect, useCallback } from 'react'

// --- BeforeAfterSlider Component ---
// This component creates a draggable slider to compare two text blocks.

const BeforeAfterSlider = ({
  beforeText,
  afterText,
  initialSliderPosition = 50 // Default to 50%
}) => {
  // State to manage the slider's horizontal position (percentage)
  const [sliderPosition, setSliderPosition] = useState(initialSliderPosition)
  // State to track if the user is currently dragging the slider
  const [isDragging, setIsDragging] = useState(false)
  // Ref to the main container of the slider
  const sliderContainerRef = useRef(null)

  // Callback to handle mouse down or touch start on the slider handle
  const handleDragStart = useCallback((e) => {
    // e.preventDefault(); // Prevent default text selection, can sometimes interfere with page scroll on touch
    setIsDragging(true)
  }, [])

  // Callback to handle mouse move or touch move
  const handleDragMove = useCallback((clientX) => {
    if (!isDragging || !sliderContainerRef.current) return

    // Get the bounding rectangle of the slider container
    const rect = sliderContainerRef.current.getBoundingClientRect()
    // Calculate the new slider position based on mouse/touch position relative to the container
    let newX = clientX - rect.left
    // Constrain the position within the bounds of the container (0 to container width)
    newX = Math.max(0, Math.min(newX, rect.width))
    // Convert the position to a percentage
    const newPositionPercent = (newX / rect.width) * 100
    setSliderPosition(newPositionPercent)
  }, [isDragging]) // Dependency: isDragging

  // Mouse move event listener
  useEffect(() => {
    const handleMouseMove = (e) => {
      handleDragMove(e.clientX)
    }
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
    }
    // Cleanup: remove event listener when dragging stops or component unmounts
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isDragging, handleDragMove])

  // Touch move event listener
  useEffect(() => {
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        handleDragMove(e.touches[0].clientX)
      }
    }
    if (isDragging) {
      // Add passive: false if e.preventDefault() is used in handleDragStart and scroll is an issue
      window.addEventListener('touchmove', handleTouchMove, { passive: true })
    }
    // Cleanup: remove event listener
    return () => {
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [isDragging, handleDragMove])

  // Callback to handle mouse up or touch end
  const handleDragEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false)
    }
  }, [isDragging])

  // Mouse up and touch end event listeners on the window
  useEffect(() => {
    window.addEventListener('mouseup', handleDragEnd)
    window.addEventListener('touchend', handleDragEnd)
    // Cleanup: remove event listeners when component unmounts
    return () => {
      window.removeEventListener('mouseup', handleDragEnd)
      window.removeEventListener('touchend', handleDragEnd)
    }
  }, [handleDragEnd])

  return (
    <div
      ref={sliderContainerRef}
      className='relative w-full h-auto min-h-[250px] md:min-h-[300px] select-none overflow-hidden rounded-xl shadow-lg border-2 border-gray-200 bg-white'
      // Add mouseUp/touchEnd here too, in case the mouse is released outside the handle but still over the container
      onMouseUp={handleDragEnd}
      onTouchEnd={handleDragEnd}
    >
      {/* After Text Container */}
      <div
        className='absolute top-0 left-0 w-full h-full p-4 md:p-6 text-gray-700 leading-relaxed whitespace-pre-wrap overflow-y-auto'
        aria-hidden='true' // Hidden from screen readers as 'after' is the primary view
      >
        {afterText}
      </div>

      {/* Before Text Container (clipped) */}
      <div
        className='absolute top-0 left-0 w-full h-full p-4 md:p-6 text-blue-700 leading-relaxed whitespace-pre-wrap overflow-y-auto bg-blue-50'
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` // Clip from the right side
        }}
      >
        {beforeText}
      </div>

      {/* Slider Handle */}
      <div
        className='absolute top-0 bottom-0 w-2 bg-blue-500 cursor-ew-resize group z-10'
        style={{
          left: `calc(${sliderPosition}% - 4px)`, // Center the 8px visual handle (w-2 is 8px, so 8px/2 = 4px)
          touchAction: 'none' // Prevent scrolling on touch devices when dragging handle
        }}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        {/* Inner line for visual enhancement */}
        <div className='absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-300 opacity-75 group-hover:opacity-100 transition-opacity' />
        {/* Circle indicators on the slider handle */}
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-blue-500 border-4 border-white shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform'>
          {/* Left Arrow SVG */}
          <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='currentColor' className='text-white -ml-1' viewBox='0 0 16 16'>
            <path fillRule='evenodd' d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z' />
          </svg>
          {/* Right Arrow SVG */}
          <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='currentColor' className='text-white -mr-1' viewBox='0 0 16 16'>
            <path fillRule='evenodd' d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z' />
          </svg>
        </div>
      </div>
    </div>
  )
}

// --- Example Data ---
const assistantExamples = {
  text: [
    {
      title: 'Summarize',
      before: 'The advancements in artificial intelligence over the past decade have been nothing short of revolutionary, impacting various sectors from healthcare to finance, and fundamentally changing how we interact with technology in our daily lives. These developments are driven by increased computational power, vast amounts of data, and sophisticated algorithms that enable machines to learn and make decisions with increasing autonomy and accuracy.',
      after: 'AI advancements over the past decade have been revolutionary, impacting healthcare, finance, and more, driven by increased computational power, big data, and sophisticated algorithms enabling machines to learn and make decisions with autonomy and accuracy.'
    },
    {
      title: 'Rephrase',
      before: 'It is imperative that we allocate sufficient resources to this project to ensure its timely completion and adherence to the quality standards.',
      after: 'Adequate funding and support must be assigned to this undertaking to guarantee it is finished on schedule and meets the required level of excellence.'
    },
    {
      title: 'Change Tone',
      before: 'Esteemed colleagues, I wish to express my profound gratitude for your diligent efforts and unwavering commitment to the successful execution of this endeavor. Your contributions have been invaluable.',
      after: "Colleagues, your hard work and dedication to this project have been outstanding. We couldn't have done it without you, and your input has made a real difference."
    },
    {
      title: 'Paragraph to Notes',
      before: 'The strategic planning meeting covered three main agenda items: the quarterly budget review, the upcoming product launch strategy for Q3, and the proposed new remote work policy. The budget review indicated a consistent 5% increase in departmental revenue. The product launch is scheduled for early Q3, with a primary focus on targeted digital marketing campaigns. The remote work policy, if approved, will allow eligible employees to work from home up to two days a week, aiming to improve work-life balance.',
      after: '• Quarterly budget review: 5% revenue increase\n• Product launch: Q3, digital marketing focus\n• Remote work policy: up to 2 days/week from home'
    },
    {
      title: 'Reply to Email',
      before: 'Hi Beth,\n\nI hope you\'re doing well! I wanted to see if you\'d be available for a quick meeting sometime this week to discuss our progress on the Q2 roadmap.\n\nI\'m flexible, but here are a few times that work for me:\n- Tuesday between 2–4 PM\n- Wednesday morning\n- Friday after 1 PM\n\nPlease let me know what works best for you, or feel free to suggest a different time.\n\nLooking forward to our chat!\n\nBest,\nGareth',
      after: 'Hi Gareth,\n\nI\'m doing well, thanks for reaching out. I\'ve taken a look at my schedule and Wednesday morning works best for me. Would 10 AM be a good time for our meeting to discuss the Q2 roadmap? If that doesn\'t suit you, I\'m also available on Friday after 1 PM, as you suggested.\n\nLooking forward to catching up and going over our progress.\n\nBest,\nBeth'
    }
  ],
  code: [
    {
      title: 'Add Comments',
      before: 'function memoizedCurry(fn) {\n     const cache = new Map();\n     function curried(...args) {\n            const key = JSON.stringify(args);\n            if (cache.has(key)) {\n                  return cache.get(key);\n            }\n           if (args.length >= fn.length) {\n                 const result = fn(...args);\n                 cache.set(key, result);\n                 return result;\n            }\n           return (...next) => curried(...args, ...next);\n      }\n     return curried;\n}',
      after: 'function memoizedCurry(fn) {\n      // Cache to store results of expensive function calls\n     const cache = new Map();\n      function curried(...args) {\n           // Create a unique key for caching based on the current arguments\n           const key = JSON.stringify(args);\n           if (cache.has(key)) {\n                 // If result is already cached, return it directly\n                return cache.get(key);\n           }\n           // If all required arguments are provided, call the original function\n           if (args.length >= fn.length) {\n                const result = fn(...args);\n                 // Cache the result for future calls with the same arguments\n                cache.set(key, result);\n                return result;\n           }\n           // If not all arguments are provided, return a new curried function\n           return (...next) => curried(...args, ...next);\n      }\n     return curried;\n}'
    },
    {
      title: 'Generate Test Cases',
      before: 'def calculate_monthly_payment(principal, annual_rate, years, round_result=True):\n     monthly_rate = annual_rate / 12 / 100\n     number_of_payments = years * 12\n     if monthly_rate == 0:\n           payment = principal / number_of_payments\n      else:\n           payment = principal * monthly_rate / (1 - (1 + monthly_rate) ** -number_of_payments)\n      return round(payment, 2) if round_result else payment',
      after: 'def test_calculate_monthly_payment_zero_rate():\n      principal = 10000\n      annual_rate = 0\n      years = 1\n      result = calculate_monthly_payment(principal, annual_rate, years)\n      assert result == 833.33\ndef test_calculate_monthly_payment_nonzero_rate():\n      principal = 20000\n      annual_rate = 5\n      years = 2\n      result = calculate_monthly_payment(principal, annual_rate, years)\n      assert round(result, 2) > 0\ndef test_calculate_monthly_payment_round_result_false():\n      principal = 10000\n      annual_rate = 0\n      years = 1\n      result = calculate_monthly_payment(principal, annual_rate, years, round_result=False)\n      assert result == principal / (years * 12)\ndef test_calculate_monthly_payment_zero_principal():\n      principal = 0\n      annual_rate = 5\n      years = 1\n      result = calculate_monthly_payment(principal, annual_rate, years)\n      assert result == 0.0\ndef test_calculate_monthly_payment_large_input():\n      principal = 1000000\n      annual_rate = 10\n      years = 10\n      result = calculate_monthly_payment(principal, annual_rate, years)\n      assert round(result, 2) > 0\ndef test_calculate_monthly_payment_negative_input():\n      principal = -10000\n      annual_rate = 5\n      years = 1\n      try:\n            calculate_monthly_payment(principal, annual_rate, years)\n            assert False, "Expected exception for negative principal"\n      except:\n            assert True\ndef test_calculate_monthly_payment_non_numeric_input():\n      principal = "10000"\n      annual_rate = 5\n      years = 1\n      try:\n            calculate_monthly_payment(principal, annual_rate, years)\n            assert False, "Expected exception for non-numeric principal"\n      except:\n            assert True'
    },
    {
      title: 'Optimize Code',
      before: 'int f(int a, int b) {\n      int x = 0;\n      for (int i = 0; i < b; i++) {\n            x = x + a;\n      }\n      return x;\n}',
      after: 'int calculateProduct(int multiplicand, int multiplier) {\n     return multiplicand * multiplier;\n}'
    },
    {
      title: 'Convert Legacy Code',
      before: 'function getUserData(userId, callback) {\n     var xhr;\n      if (window.XMLHttpRequest) {\n                xhr = new XMLHttpRequest();\n      } else {\n                // For IE6, IE5\n            xhr = new ActiveXObject("Microsoft.XMLHTTP");\n      }\n      xhr.onreadystatechange = function() {\n            if (xhr.readyState === 4 && xhr.status === 200) {\n                  var data;\n                  try {\n                        data = JSON.parse(xhr.responseText);\n                  } catch (e) {\n                        return callback("Invalid JSON response");\n                  }\n                  callback(null, data);\n            } else if (xhr.readyState === 4) {\n                  callback("Request failed with status " + xhr.status);\n            }\n      };\n      xhr.open("GET", "https://api.example.com/users/" + userId, true);\n      xhr.send();\n}',
      after: 'function getUserData(userId, callback) {\n      fetch(`https://api.example.com/users/${userId}`)\n        .then(response => {\n               if (!response.ok) {\n                     throw new Error(`Request failed with status ${response.status}`);\n               }\n               return response.json();\n         })\n          .then(data => callback(null, data))\n         .catch(error => callback(error.message));\n}'
    },
    {
      title: 'Minify/Prettify',
      before: 'function calculateDiscount(price, discountPercentage) {\n      var discountAmount = price * (discountPercentage / 100);\n      var finalPrice = price - discountAmount;\n      console.log(\'Original Price: $\' + price);\n      console.log(\'Discount: \' + discountPercentage + \'%\');\n      console.log(\'Discount Amount: $\' + discountAmount);\n      console.log(\'Final Price after Discount: $\' + finalPrice);\n      return finalPrice;\n}\nvar price = 150;\nvar discount = 20;\nvar finalPrice = calculateDiscount(price, discount);',
      after: 'function calculateDiscount(p, d) {\n      return p - (p * (d / 100));\n}\nvar p = 150, d = 20;\nvar finalPrice = calculateDiscount(p, d);'
    }
  ],
  academic: [
    {
      title: 'Generate Citation',
      before: 'Title:   Thinking, Fast and Slow\nAuthor:  Daniel Kahneman\nYear:  2011\nPublisher:  Farrar, Straus and Giroux',
      after: 'Kahneman, D. (2011). *Thinking, Fast and Slow*. Farrar, Straus and Giroux.'
    },
    {
      title: 'Explain Topic Simply',
      before: 'Quantum entanglement is a physical phenomenon that occurs when a pair or group of particles is generated, interacts, or shares spatial proximity in such a way that the quantum state of each particle of the pair or group cannot be described independently of the state of the others, including when the particles are separated by a large distance.',
      after: 'Quantum entanglement happens when two or more tiny particles get connected in a way that what happens to one particle instantly affects the others, no matter how far apart they are.'
    },
    {
      title: 'Create Table',
      before: 'Student Data: \nJohn Doe, Math, A, English, B+. \nJane Smith, Math, B, English, A-, Science, A. \nRobert Brown, History, A, Science, B.',
      after: '| Student Name | Subject | Grade |\n| --- | --- | --- |\n| John Doe | Math | A |\n| John Doe | English | B+ |\n| Jane Smith | Math | B |\n| Jane Smith | English | A- |\n| Jane Smith | Science | A |\n| Robert Brown | History | A |\n| Robert Brown | Science | B |'
    },
    {
      title: 'Extract Key Points',
      before: 'Recent studies in cognitive psychology have highlighted the importance of metacognition—one\'s awareness and understanding of their own thought processes—in enhancing learning outcomes. Researchers have found that students who engage in metacognitive practices, such as self-questioning and reflecting on errors, tend to perform better academically across disciplines. Furthermore, interventions that promote metacognitive strategies have shown particular effectiveness in improving problem-solving skills in STEM education. However, the success of such interventions often depends on factors like age, prior knowledge, and the learning environment, suggesting that a one-size-fits-all approach may not be effective. Ongoing research is exploring how adaptive learning technologies can personalize metacognitive prompts to better support diverse learners.',
      after: '* Importance of metacognition in learning\n* Metacognitive practices improve academic performance\n* Effective in improving STEM problem-solving skills\n* Success depends on age, prior knowledge, and environment\n* Adaptive learning technologies for personalized support'
    }
  ],
  marketing: [
    {
      title: 'Draft Customer Reply',
      before: 'Your new CRM software is amazing! It has streamlined our sales process significantly. Best investment we\'ve made this year!',
      after: 'Dear Customer,\n\nWe appreciate your positive feedback about our new CRM software and are glad to hear it has made a significant impact on your sales process. We will continue to work on delivering high-quality products to support your business growth.\n\nBest regards,\nTom'
    },
    {
      title: 'Product Description',
      before: 'Item:  Reusable water bottle.\nMaterial:  Stainless steel.\nCapacity:  750ml.\nFeatures:  Double-wall insulation, leak-proof lid, BPA-free.',
      after: 'Stay hydrated on-the-go with our 750ml reusable water bottle made from high-quality stainless steel. This eco-friendly bottle features double-wall insulation to keep your drinks hot or cold for hours. The leak-proof lid ensures spills are a thing of the past, and with its BPA-free design, you can drink with confidence. Perfect for daily commutes, outdoor adventures, or office use, this durable and versatile water bottle is a must-have for anyone looking to reduce their environmental footprint.'
    },
    {
      title: 'SEO Optimization',
      before: "Welcome to our website. We do stuff related to various things that help people and businesses. Our team is very experienced and we work hard to make sure our clients are happy with what we provide. If you're looking for something that helps, we can maybe help. Get in touch if you want more info about what we do.",
      after: 'Welcome to our expert solutions website, specializing in professional services that empower individuals and businesses to thrive. Our highly experienced team delivers tailored support, prioritizing client satisfaction and success. As a trusted partner, we offer comprehensive assistance, providing innovative solutions to unique challenges. For personalized guidance and to discover how our expertise can benefit you, contact us today to learn more about our specialized services and let us help you achieve your goals.'
    },
    {
      title: 'Outreach Email',
      before: 'Subject:  Partnership Opportunity with Volt Energy\n\nFuel Up with Us – Let\'s Collaborate!\n\nGreeting:  Personalize if possible (e.g., “Hi [Name],”)\n\nIntroduction:\n• Introduce yourself and the brand\n• Mention what makes your energy drink unique (e.g., natural ingredients, no crash, athlete-focused)\n\nPurpose:\n• You\'re reaching out to explore a collaboration/sponsorship/retail opportunity\n• Mention why you chose them (e.g., “We love your audience and brand vibe.”)\n\nValue Proposition:\n• How the partnership benefits them (e.g., exposure, free product, affiliate revenue)\n• Highlight strong branding, growing fanbase, positive health angle, etc.\n\nCall to Action:\n• Suggest a quick call or request a reply if interested\n• Offer to send samples or a media kit\n\nClosing:\n• Friendly, energized sign-off (e.g., “Stay charged,”)\n• Name, title, contact info\n• Optional: Instagram handle or website link',
      after: 'Subject: Partnership Opportunity with Volt Energy\n\nFuel Up with Us – Let\'s Collaborate\n\nHi Emily,\n\nI\'m Alex, founder of Volt Energy, a brand that\'s redefining the energy drink landscape with its unique blend of natural ingredients and essential vitamins. What sets us apart is our commitment to providing a crash-free energy boost that\'s perfect for athletes and individuals with active lifestyles.\n\nWe\'re reaching out to explore a potential collaboration opportunity with your brand, and we chose you because we love your audience and the vibrant vibe that comes with it. We believe that our values align, and a partnership would not only enhance your brand\'s offerings but also provide a fresh and healthy alternative to traditional energy drinks.\n\nBy partnering with Volt Energy, you\'ll gain exposure to our growing fanbase, receive free products for your team or events, and have the opportunity to earn affiliate revenue. Our strong branding, coupled with a positive health angle, will not only elevate your brand\'s image but also contribute to the well-being of your audience.\n\nIf you\'re interested in learning more about this opportunity, I\'d love to schedule a quick call to discuss the details. Alternatively, you can reply to this email, and I\'ll be happy to send over some samples or our media kit to get you started.\n\nStay charged,\nAlex\nFounder, Volt Energy\nalex@voltenergy.com\n@volternergy'
    },
    {
      title: 'Tweet Refactor',
      before: 'Heyyy guyss!! Sooo we at HYPED Energyyy 💥💥 just launched a BOMB new line of flavrs like Wild Raspberry Rush and Citrus BOOM 🍊💣💥. We’re totally lookin for amzing content creaters, influncers, streamers, athletes—anyone rly—to collab with uss! DM us ASAP if ur downnn or jus curious 💯🔥🔥🔥 #HypedFam',
      after: 'Hey guys, HYPED Energy just launched new flavors like Wild Raspberry Rush & Citrus BOOM! We\'re looking for content creators, influencers & athletes to collab. DM us ASAP! #HypedFam #EnergyDrink #Collaboration 💥'
    },
    {
      title: 'YouTube Description Refactor',
      before: 'Heyyy guys!!! Welcome to my fitness channel where I post all kinds of fitness videos. I post work outs, and I do challenges, and sometimes even nutrition tips. I just wanna help you guys get fit and healthy. You can follow me on Instagram and Twitter for more updates on my workouts and stuff. Don’t forget to like and subscribee, that really helps my channel. I post videos every week, and sometimes more than that if I’m feeling like it! Also check out my other videos cause they are super helpful too and you can get stronger! My goal is to help people get fit and stay fit and feel good about themselves, so watch my vids and let’s get fit together!! Also, if you wanna check out my personal website, the link is down below, and you can find all the things I talk about in my videos there. Thanks for watching! Don’t forget to leave a comment too!',
      after: 'Welcome to my fitness channel, where you\'ll find a variety of fitness videos to help you achieve your goals. I post workouts, challenges, and nutrition tips to support your journey to a healthier lifestyle.\n\nYou can stay up-to-date with my latest content by following me on Instagram and Twitter. I regularly post updates on my workouts and other fitness-related topics.\n\nTo show your support, please like and subscribe to my channel. This helps me continue to create content for you. I aim to post videos every week, and sometimes more often if inspiration strikes.\n\nBe sure to check out my other videos, as they offer a wealth of information to help you get stronger and achieve your fitness goals. My ultimate goal is to help people get fit, stay fit, and feel confident in their own skin. Let\'s work together towards a healthier, happier you.\n\nFor more information and resources, visit my personal website, linked below. Thank you for watching, and don\'t forget to leave a comment with your thoughts and feedback.\n\n#fitness #workout #nutrition #healthyliving #getfit #fitnessmotivation #fitnesschannel #wellness #selfcare #gains #strengthtraining #cardio #weightloss #musclebuilding #fitnessjourney #exercise #training #motivation'
    },
    {
      title: 'Facebook Post Refactor',
      before: 'Heyyy guys!! So I was just thinking about how amazing it is to have a garden and grow your own plants!! It’s so fun to just plant things and watch them grow, and like, you can get all sorts of fruits and vegetables. So yeah, just make sure you water them a lot and give them sunlight, that’s the key. If you want more tips, let me know! Don\'t forget to follow my page for more gardening stuff! 🌱🌻',
      after: 'Hey guys,\nhaving a garden and growing your own plants is an amazing experience. It\'s so much fun to plant and watch them grow, and you can get a wide variety of fruits and vegetables.\n\nTo keep your plants thriving, remember to water them regularly and give them plenty of sunlight - that\'s the key to a successful harvest.\n\nIf you\'re looking for more gardening tips and tricks, let me know in the comments below. Don\'t forget to follow my page for more gardening content, updates, and advice.\n#gardening #gardentips #growyourown #fruitsandvegetables #gardeningforbeginners #gardeninglife 🌱🌻'
    },
    {
      title: 'Generate Hashtags',
      before: 'My Creamy Tomato Pasta Recipe',
      after: '#TomatoPastaRecipe #CreamyPastaLovers #PastaRecipes #HomemadePasta #Foodie #TomatoBasedRecipes #PastaDishes #ComfortFood #ItalianFood #DeliciousPasta #EasyRecipe #PastaLove #CreamySauce #TomatoSaucePasta'
    }
  ]
}

// --- Main App Component ---
// This component displays the different assistant features with BeforeAfterSlider examples.
export function Examples () {
  // State to manage the visibility of each section
  const [sectionsVisibility, setSectionsVisibility] = useState({
    text: true,
    code: false,
    academic: false,
    marketing: false
  })

  // Function to toggle the visibility of a section
  const toggleSection = (sectionName) => {
    setSectionsVisibility(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }))
  }

  // Helper function to get the arrow character based on section visibility
  const getArrow = (isVisible) => (isVisible ? '▼' : '▶')

  return (
    <div className='min-h-screen bg-gray-100 font-sans p-4 sm:p-6 lg:p-8'>
      <header className='text-center mb-12 md:mb-16'>
        <h1 className='text-4xl md:text-5xl font-bold text-gray-800'>
          AI Assistant Feature Showcase
        </h1>
        <p className='text-lg text-gray-600 mt-2'>
          See how AI can transform text with a simple slide!
        </p>
      </header>

      <div className='container mx-auto'>
        {/* Text Assistant Section */}
        <section className='mb-12 md:mb-16'>
          <h2
            className='text-3xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-blue-500 flex justify-between items-center cursor-pointer'
            onClick={() => toggleSection('text')}
          >
            Text Assistant Features
            <span className='text-2xl'>{getArrow(sectionsVisibility.text)}</span>
          </h2>
          {sectionsVisibility.text && (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-4'>
              {assistantExamples.text.map((example, index) => (
                <div key={`text-${index}`} className='bg-white rounded-lg shadow-md p-6'>
                  <h3 className='text-xl font-medium text-gray-700 mb-4'>{example.title}</h3>
                  <BeforeAfterSlider beforeText={example.before} afterText={example.after} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Code Assistant Section */}
        <section className='mb-12 md:mb-16'>
          <h2
            className='text-3xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-green-500 flex justify-between items-center cursor-pointer'
            onClick={() => toggleSection('code')}
          >
            Code Assistant Features
            <span className='text-2xl'>{getArrow(sectionsVisibility.code)}</span>
          </h2>
          {sectionsVisibility.code && (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-4'>
              {assistantExamples.code.map((example, index) => (
                <div key={`code-${index}`} className='bg-white rounded-lg shadow-md p-6'>
                  <h3 className='text-xl font-medium text-gray-700 mb-4'>{example.title}</h3>
                  <BeforeAfterSlider beforeText={example.before} afterText={example.after} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Academic Assistant Section */}
        <section className='mb-12 md:mb-16'>
          <h2
            className='text-3xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-purple-500 flex justify-between items-center cursor-pointer'
            onClick={() => toggleSection('academic')}
          >
            Academic Assistant Features
            <span className='text-2xl'>{getArrow(sectionsVisibility.academic)}</span>
          </h2>
          {sectionsVisibility.academic && (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-4'>
              {assistantExamples.academic.map((example, index) => (
                <div key={`academic-${index}`} className='bg-white rounded-lg shadow-md p-6'>
                  <h3 className='text-xl font-medium text-gray-700 mb-4'>{example.title}</h3>
                  <BeforeAfterSlider beforeText={example.before} afterText={example.after} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Marketing Assistant Section */}
        <section>
          <h2
            className='text-3xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-yellow-500 flex justify-between items-center cursor-pointer'
            onClick={() => toggleSection('marketing')}
          >
            Marketing & Social Assistant Features
            <span className='text-2xl'>{getArrow(sectionsVisibility.marketing)}</span>
          </h2>
          {sectionsVisibility.marketing && (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-4'>
              {assistantExamples.marketing.map((example, index) => (
                <div key={`marketing-${index}`} className='bg-white rounded-lg shadow-md p-6'>
                  <h3 className='text-xl font-medium text-gray-700 mb-4'>{example.title}</h3>
                  <BeforeAfterSlider beforeText={example.before} afterText={example.after} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
