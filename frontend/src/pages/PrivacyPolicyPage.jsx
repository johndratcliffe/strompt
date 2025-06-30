const PrivacyPolicyPage = () => {
  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-16'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-6'>Privacy Policy</h1>
        <p className='text-gray-600 mb-4'><strong>Last Updated:</strong> 20 June 2025</p>

        <div className='space-y-8 text-gray-700'>
          <section>
            <h2 className='text-2xl font-semibold text-gray-800 mb-3'>1. Introduction</h2>
            <p>Welcome to Strompt ("we", "our", "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI assistant service (the "Service"). By using the Service, you agree to the collection and use of information in accordance with this policy.</p>
            <p className='mt-2'>For the purposes of the EU General Data Protection Regulation (GDPR), we are the data controller. Our contact details can be found on our Contact Us page.</p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-gray-800 mb-3'>2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className='list-disc list-inside mt-2 space-y-1'>
              <li><strong>Personal Identification Information:</strong> When you create an account, we collect your email address and name.</li>
              <li><strong>Payment Information:</strong> All payments are processed by Stripe. We do not store or have complete access to your credit card details. We only receive a token and information necessary for billing, such as the last four digits of your card and its expiration date.</li>
              <li><strong>Usage Data:</strong> We collect data on your interactions with the Service, such as the number of "Actions" you perform, the features you use, and error logs. This helps us to improve our Service.</li>
              <li><strong>Technical Data:</strong> We may collect your IP address, browser type, operating system, and other technical information to ensure compatibility and security.</li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-gray-800 mb-3'>3. How We Use Your Information</h2>
            <p>We use the information we collect for various purposes:</p>
            <ul className='list-disc list-inside mt-2 space-y-1'>
              <li>To provide, operate, and maintain our Service.</li>
              <li>To process your payments and manage your subscription.</li>
              <li>To notify you about changes to our Service or your account.</li>
              <li>To provide customer support and respond to your inquiries.</li>
              <li>To monitor the usage of our Service for security and improvement.</li>
              <li>To enforce our Terms of Service and other policies.</li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-gray-800 mb-3'>4. Legal Basis for Processing (GDPR)</h2>
            <p>If you are in the European Economic Area (EEA), we process your personal data on the following legal bases:</p>
            <ul className='list-disc list-inside mt-2 space-y-1'>
              <li><strong>Performance of a Contract:</strong> To provide the core services you subscribed to.</li>
              <li><strong>Legitimate Interests:</strong> For improving our service, analytics, and security, where our interests are not overridden by your data protection rights.</li>
              <li><strong>Consent:</strong> Where you have given us explicit consent, for example, for marketing communications. You may withdraw your consent at any time.</li>
              <li><strong>Legal Obligation:</strong> To comply with applicable laws and legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-gray-800 mb-3'>5. Data Sharing and Disclosure</h2>
            <p>We do not sell your personal data. We may share your information with third parties under the following circumstances:</p>
            <ul className='list-disc list-inside mt-2 space-y-1'>
              <li><strong>Payment Processing:</strong> With Stripe, to process your payments securely.</li>
              <li><strong>Service Providers:</strong> With vendors who perform services for us, such as hosting, email delivery, and analytics. These providers are contractually obligated to protect your data.</li>
              <li><strong>Legal Compliance:</strong> If required by law, such as to comply with a subpoena or other legal process.</li>
            </ul>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-gray-800 mb-3'>6. International Data Transfers</h2>
            <p>Your information may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ. If we transfer personal data from the EEA to other countries, we will ensure that appropriate safeguards, such as Standard Contractual Clauses, are in place.</p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-gray-800 mb-3'>7. Your Data Protection Rights under GDPR</h2>
            <p>You have the following rights:</p>
            <ul className='list-disc list-inside mt-2 space-y-1'>
              <li>The right to access, update, or delete the information we have on you.</li>
              <li>The right of rectification.</li>
              <li>The right to object to processing.</li>
              <li>The right of restriction.</li>
              <li>The right to data portability.</li>
              <li>The right to withdraw consent.</li>
            </ul>
            <p className='mt-2'>You can exercise these rights by accessing your account settings or contacting us directly.</p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-gray-800 mb-3'>8. Data Security and Retention</h2>
            <p>We use administrative, technical, and physical security measures to help protect your personal information. We will retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy, or to comply with our legal obligations.</p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-gray-800 mb-3'>9. Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-gray-800 mb-3'>10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us through our Contact Us page.</p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage
