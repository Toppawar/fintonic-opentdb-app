import { useState, useCallback } from "react";

import {
  FaBars,
  FaPlus,
  FaCogs,
  FaComments,
  FaSignInAlt,
} from "react-icons/fa";

import { AiOutlineMenu } from "react-icons/ai";

import logo from "../../assets/logo-banner.png";

import "./Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  return (
    <header>
      <nav className="navbar">
        <img className="logo" src={logo} alt="logo" />
        <ul
          className={`navbar__list ${isOpen ? "menu-opened" : "menu-closed"}`}
        >
          <li className="navbar__list-item">
            <FaBars />
            <a href="/">Browse</a>
          </li>
          <li className="navbar__list-item">
            <FaPlus />
            <a href="/">Add New Questions</a>
          </li>
          <li className="navbar__list-item">
            <FaCogs />
            <a href="/">Api</a>
          </li>
          <li className="navbar__list-item">
            <FaComments />
            <a href="/">Discuss</a>
          </li>
          <li className="navbar__list-item">
            <FaSignInAlt />
            <a href="/">Login</a>
          </li>
        </ul>
        <div className="navbar_button_container">
          <button className="navbar_button" onClick={toggleMenu}>
            <AiOutlineMenu />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
