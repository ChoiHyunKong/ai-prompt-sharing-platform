// src/components/Navbar.js

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSun, FaMoon, FaBars } from 'react-icons/fa';
import './Navbar.css';

function Navbar({ darkMode, toggleDarkMode }) {
  // 메뉴 열림/닫힘 상태 관리
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  // 메뉴 토글 함수
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 메뉴 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Prombrary</Link>
        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <button className="button search-button">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="navbar-actions">
          <button onClick={toggleDarkMode} className="button mode-toggle">
            {darkMode ? <FaMoon size={20} /> : <FaSun size={20} />}
          </button>
          <button className="button menu-toggle" onClick={toggleMenu}>
            <FaBars size={20} />
          </button>
        </div>
      </div>
      
      <div ref={menuRef} className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={toggleMenu}>홈</Link>
        <Link to="/register" className={location.pathname === '/register' ? 'active' : ''} onClick={toggleMenu}>회원가입</Link>
        <Link to="/create-post" className={location.pathname === '/create-post' ? 'active' : ''} onClick={toggleMenu}>게시글 작성</Link>
        <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''} onClick={toggleMenu}>프로필</Link>
      </div>
    </nav>
  );
}

export default Navbar;