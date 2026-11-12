export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">

        <h1 className="text-3xl font-bold text-purple-700 mb-6">
          Contact Us
        </h1>

        <p className="text-gray-600 mb-6">
          Have questions about our services? We'd love to hear from you.
        </p>

        <div className="space-y-4">
          <div>
            <h2 className="font-semibold text-lg">
              Email
            </h2>
            <p className="text-gray-600">
              support@zmquickserve.com
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg">
              Phone
            </h2>
            <p className="text-gray-600">
              +91 98765 43210
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg">
              Address
            </h2>
            <p className="text-gray-600">
              Kollam, Kerala, India
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-semibold text-lg mb-3">
            About ZM QuickServe
          </h2>

          <p className="text-gray-600 leading-relaxed">
            ZM QuickServe is a web-based service management platform
            that connects clients with trusted service providers such
            as electricians, plumbers, cleaners, and other professionals.
            Our goal is to make service booking simple, secure, and efficient.
          </p>
        </div>

      </div>
    </div>
  );
}