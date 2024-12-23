


const Footer = () => {

//   const {dataTheme}=useContext(contextData)
  return (
    <footer className="py-10">
      <div className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 `}>
        <div>
          <h1 className="flex gap-3 items-center text-xl font-extrabold">
            <img className="w-10" src="https://i.ibb.co.com/dBf0TFW/Visa-initial-512.webp" alt="Visa Navigator Logo" />
            VISA NAVIGATOR
          </h1>
          <h2 className="font-semibold text-lg mb-4 mt-4">
            Do you have questions or want more information? Contact us now
          </h2>
          <div className="flex items-center mb-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5h12M9 3v2m0 4v2M9 7h8a2 2 0 012 2v5a2 2 0 01-2 2h-8l-4 4V9a2 2 0 012-2h8a2 2 0 012 2v2"
                />
              </svg>
            </span>
            <span className="ml-3 text-lg">+8801932600504</span>
          </div>
          <div className="flex items-center">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-gray-600"
              >
                <path d="M2.3 6.04A9.937 9.937 0 0112 2a9.937 9.937 0 019.7 4.04 9.934 9.934 0 01-9.7 15.96A9.934 9.934 0 012.3 6.04zm10.7 5.79l6.28 3.69A8.002 8.002 0 0012 4a8.002 8.002 0 00-7.28 11.51l6.28-3.68a.95.95 0 011 0z" />
              </svg>
            </span>
            <span className="ml-3 text-lg">rianhasan.visa@gmail.com</span>
          </div>
        </div>

        {/* Explore Link Section */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Explore Links</h3>
          <ul>
            <li>About Us</li>
            <li>Blog</li>
            <li>Testimonials</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Services Section */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Services</h3>
          <ul>
            <li>Tourist Visa</li>
            <li>Commercial Visa</li>
            <li>Student Visa</li>
            <li>Residence Visa</li>
            <li>Working Visa</li>
          </ul>
        </div>

        {/* Branches Section */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Our Branches</h3>
          <ul>
            <li>Canada</li>
            <li>Belgium</li>
            <li>Denmark</li>
            <li>Australia</li>
            <li>France</li>
          </ul>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="mt-10 flex justify-center space-x-6 text-gray-700">
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <img src="https://img.icons8.com/color/48/000000/facebook.png" alt="Facebook" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <img src="https://img.icons8.com/color/48/000000/twitter.png" alt="Twitter" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
          <img src="https://img.icons8.com/color/48/000000/linkedin.png" alt="LinkedIn" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <img src="https://img.icons8.com/color/48/000000/instagram-new.png" alt="Instagram" />
        </a>
      </div>

      {/* Payment Icons & Copyright */}
      <div className="border-t border-gray-200 mt-10 py-4 text-center text-gray-600 text-sm">
        <p>Copyright © 2024 e.visa All rights reserved.</p>
        <div className="flex justify-center mt-4 space-x-4">
          <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="PayPal" />
          <img src="https://img.icons8.com/color/48/000000/ebay.png" alt="eBay" />
          <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" />
          <img src="https://img.icons8.com/color/48/000000/discover.png" alt="Discover" />
          <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="MasterCard" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
