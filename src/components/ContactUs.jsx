import React from "react";
import { Link } from "react-router-dom";

const ContactUs = () => {
  return (
    <div className="font-sans text-gray-800 bg-gray-100">
      {/* Header */}
    
              
      <header className="bg-blue-600 shadow-md">
  <nav className="flex justify-between items-center px-8 py-6 text-white">
    <div className="text-3xl font-extrabold">Menaxhimi i Konferencave</div>
    <ul className="flex space-x-6 text-lg">
       <Link to="/" id = "home" className="hover:text-teal-300 transition duration-200">
           Home
        </Link>
      <nav> 
        <Link to="/about-us" id="about-us" className="hover:text-teal-300 transition duration-200">
          About Us
        </Link>
      </nav>
      <li>
        <a href="#" className="hover:text-teal-300 transition duration-200">Workshops</a>
      </li>
      <li>
        <a href="#" className="hover:text-teal-300 transition duration-200">Event Highlights</a>
      </li>
      <nav id="contact-us">
        <Link to="/contact-us" className="hover:text-teal-300 transition duration-200">
          Contact Us
        </Link>
      </nav>
    </ul>
  </nav>
</header>
      {/* Contact Us Section */}
      <main className="flex justify-center py-10">
        <div className="bg-white border-2 border-gray-300 rounded-lg shadow-lg p-8 w-full max-w-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2>
          <form action="#" method="POST">
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-semibold mb-2">Emri</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-semibold mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-lg font-semibold mb-2">Mesazhi</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg shadow-md transition duration-300"
            >
              Dërgo
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6">
        &copy; 2024 Menaxhimi i Konferencave. Të gjitha të drejtat të rezervuara.
      </footer>
    </div>
  );
};

export default ContactUs;
