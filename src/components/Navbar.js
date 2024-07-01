// src/components/Navbar.js

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  // 상태 관리
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  // 메뉴 토글 함수
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 다크모드 토글 함수
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // TODO: 실제 다크모드 적용 로직 추가 필요
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
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>☰</button>
      </div>
      
      {/* 햄버거 메뉴 */}
      <div ref={menuRef} className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={toggleMenu}>홈</Link>
        <Link to="/register" className={location.pathname === '/register' ? 'active' : ''} onClick={toggleMenu}>회원가입</Link>
        <Link to="/create-post" className={location.pathname === '/create-post' ? 'active' : ''} onClick={toggleMenu}>게시글 작성</Link>
        <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''} onClick={toggleMenu}>프로필</Link>
        <button onClick={toggleDarkMode} className="mode-toggle">
          {darkMode ? '라이트 모드' : '다크 모드'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;