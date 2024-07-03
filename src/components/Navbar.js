// src/components/Navbar.js

import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // 2023-07-04 추가: AuthContext import
import './Navbar.css';

function Navbar() {
  // 상태 관리
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const { user } = useContext(AuthContext); // 2023-07-04 추가: AuthContext에서 user 정보 가져오기

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
        {/* 2023-07-04 수정: 로고 위치 변경 */}
        <Link to="/" className="navbar-logo">Prombrary</Link>
        
        {/* 2023-07-04 수정: 검색 박스 스타일 변경 */}
        <div className="search-box">
          <input type="text" placeholder="Search..." />
        </div>
        
        {/* 2023-07-04 추가: 로그인 상태에 따른 버튼 렌더링 */}
        <div className="auth-buttons">
          {user ? (
            <>
              <button className="user-info-button">👤</button>
              <button className="notification-button">🔔</button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-button">로그인</Link>
              <Link to="/register" className="register-button">회원가입</Link>
            </>
          )}
        </div>

        {/* 햄버거 메뉴 버튼 */}
        <button className="menu-toggle header-button" onClick={toggleMenu}>☰</button>
      </div>
      
      {/* 햄버거 메뉴 */}
      <div ref={menuRef} className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" className={`header-link ${location.pathname === '/' ? 'active' : ''}`} onClick={toggleMenu}>홈</Link>
        <Link to="/create-post" className={`header-link ${location.pathname === '/create-post' ? 'active' : ''}`} onClick={toggleMenu}>게시글 작성</Link>
        <Link to="/profile" className={`header-link ${location.pathname === '/profile' ? 'active' : ''}`} onClick={toggleMenu}>프로필</Link>
        <button onClick={toggleDarkMode} className="mode-toggle header-button">
          {darkMode ? '라이트 모드' : '다크 모드'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;