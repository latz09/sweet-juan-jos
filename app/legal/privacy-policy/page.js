// Variables to be updated for each client
const businessName = 'Sweet Juanjo\'s';
const contactEmail = 'sweetjuanjos@gmail.com';
const effectiveDate = 'April 1, 2024';

const PrivacyPolicy = () => {
  return (
    <div className="flex justify-center items-center   py-12">
      <div className="max-w-4xl bg-white p-6 rounded-sm shadow-lg bg-primary/5">
        <h1 className="text-2xl font-semibold mb-4">Privacy Policy for {businessName}</h1>
        <p className="mb-4">Effective Date: {effectiveDate}</p>
        <p className="mb-4">At {businessName}, we are committed to protecting the privacy and security of our clients and website visitors. This Privacy Policy outlines the types of information we collect, how we use it, and the measures we take to protect it.</p>

        <h2 className="text-xl font-semibold mb-2">Information Collection and Use</h2>
        <p className="mb-4">We collect information to provide better services to all our users. The types of personal information we collect include:</p>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Contact Information:</strong> Name, email address, phone number, and any other contact information you provide when you fill out contact forms, subscribe to newsletters, or interact with our services.</li>
          <li><strong>Session Information:</strong> Information about your interactions with our website, including IP addresses, browser types, language, access times, and referring website addresses. This information is collected through cookies and similar technologies to improve our service and user experience.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
        <p className="mb-4">The information we collect is used in the following ways:</p>
        <ul className="list-disc list-inside mb-4">
          <li>To provide, maintain, and improve our services, including to respond to your inquiries or fulfill your requests.</li>
          <li>To communicate with you about our services, including updates, offers, and promotions.</li>
          <li>To understand how our services are used and to help us improve our website and offerings.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Sharing of Information</h2>
        <p className="mb-4">We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers for the purposes outlined above.</p>

        <h2 className="text-xl font-semibold mb-2">Security</h2>
        <p className="mb-4">We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect online.</p>

        <h2 className="text-xl font-semibold mb-2">Your Choices</h2>
        <p className="mb-4">You can choose not to provide us with certain information, but that may result in you being unable to use certain features of our website. You can also opt out of receiving marketing communications from us at any time by following the unsubscribe link or instructions provided in any email we send.</p>

        <h2 className="text-xl font-semibold mb-2">Changes to This Privacy Policy</h2>
        <p className="mb-4">{businessName} reserves the right to update or change our Privacy Policy at any time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

        <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at <a href={`mailto:${contactEmail}`} className="text-blue-600 hover:text-blue-800"> {contactEmail}</a> .</p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;