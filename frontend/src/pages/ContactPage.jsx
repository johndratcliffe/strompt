import { useState } from 'react'

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically handle the form submission,
    // e.g., send the data to your backend or a service like Formspree.
    console.log('Form submitted:', formData)
    setStatus('Thank you for your message! We will get back to you shortly.')
    setFormData({ name: '', email: '', message: '' }) // Reset form
  }

  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-16'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4'>Contact Us</h1>
        <p className='text-center text-gray-600 mb-12'>Have questions? We'd love to hear from you.</p>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          {/* Contact Form */}
          <div className='bg-white p-8 rounded-lg shadow-md'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Send us a Message</h2>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Full Name</label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                />
              </div>
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email Address</label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                />
              </div>
              <div>
                <label htmlFor='message' className='block text-sm font-medium text-gray-700'>Message</label>
                <textarea
                  name='message'
                  id='message'
                  rows='4'
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                />
              </div>
              <div>
                <button
                  type='submit'
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                >
                  Submit
                </button>
              </div>
            </form>
            {status && <p className='mt-4 text-center text-green-600'>{status}</p>}
          </div>

          {/* Contact Details */}
          <div className='space-y-6'>
            <div className='bg-white p-8 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold text-gray-800'>Contact Information</h3>
              <p className='mt-2 text-gray-600'>You can also reach us via the details below. We aim to respond to all inquiries within 24-48 hours.</p>
              <div className='mt-4 space-y-3'>
                <p className='flex items-center'>
                  <svg className='w-5 h-5 text-gray-500 mr-3' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' /></svg>
                  <a href='mailto:strompt.business@gmail.com' className='text-blue-600 hover:underline'>strompt.business@gmail.com</a>
                </p>
                <p className='flex items-start'>
                  <svg className='w-5 h-5 text-gray-500 mr-3 mt-1' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' /></svg>
                  <span>
                    Strompt<br />
                    Germany
                  </span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ContactUsPage
