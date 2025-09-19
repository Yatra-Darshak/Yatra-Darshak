// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="bg-gray-900 h-20 sticky top-0 z-50">
//       <div className="container mx-auto px-6 h-full flex justify-between items-center">
//         <Link to="/" className="text-white text-xl font-bold flex items-center">
//           SIH PROJECT
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
//           </svg>
//         </Link>
        
//         <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
//           </svg>
//         </div>
        
//         <ul className={`md:flex md:items-center ${isOpen ? 'block absolute top-20 left-0 w-full bg-gray-900 py-4 md:py-0 md:static' : 'hidden'}`}>
//           <li className="md:mx-4 my-6 md:my-0">
//             <Link to="/" className="text-white hover:text-blue-400 transition duration-300" onClick={toggleMenu}>
//               Home
//             </Link>
//           </li>
//           <li className="md:mx-4 my-6 md:my-0">
//             <Link to="/about" className="text-white hover:text-blue-400 transition duration-300" onClick={toggleMenu}>
//               About
//             </Link>
//           </li>
//           <li className="md:mx-4 my-6 md:my-0">
//             <Link to="/services" className="text-white hover:text-blue-400 transition duration-300" onClick={toggleMenu}>
//               Services
//             </Link>
//           </li>
//           <li className="md:mx-4 my-6 md:my-0">
//             <Link to="/contact" className="text-white hover:text-blue-400 transition duration-300" onClick={toggleMenu}>
//               Contact
//             </Link>
//           </li>
//         </ul>
//         <button className="hidden md:block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">SIGN UP</button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;








import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="absolute top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo - acts as Home */}
        <Link to="/" className="flex items-center">
          <img
            src="https://placehold.co/40x40"
            alt="YD Logo"
            className="h-10"
          />
          <span className="ml-2 font-bold text-gray-800 text-lg">
            YATRADARSHAK
          </span>
        </Link>

        <Link to="/" className="flex items-center">
          <img
            src="https://placehold.co/40x40"
            alt="YD Logo"
            className="h-10"
          />
          <span className="ml-2 font-bold text-gray-800 text-lg">
            YATRADARSHAK PARTER'S
          </span>
        </Link>

        {/* Toggle Menu Button - always visible */}
        <button
          className="bg-gray-100 h-10 w-10 flex items-center justify-center rounded-full"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <HiX className="text-2xl text-gray-800" />
          ) : (
            <HiMenuAlt3 className="text-2xl text-gray-800" />
          )}
        </button>
      </div>

      {/* Collapsible Dropdown (always used) */}
      {isOpen && (
        <div className="bg-white w-full shadow-lg">
          <ul className="flex flex-col items-center gap-4 py-6">
            <li>
              <Link
                to="/about"
                className="text-gray-800 hover:text-green-600 text-lg"
                onClick={toggleMenu}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="text-gray-800 hover:text-green-600 text-lg"
                onClick={toggleMenu}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-800 hover:text-green-600 text-lg"
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </li>
            <li>
              <button className="w-40 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition duration-300">
                SIGN UP
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
