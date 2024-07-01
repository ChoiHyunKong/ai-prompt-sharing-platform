// src/contexts/DarkModeContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';

// 다크모드 컨텍스트 생성
const DarkModeContext = createContext();

// DarkModeProvider 컴포넌트 정의
export function DarkModeProvider({ children }) {
  // localStorage에서 다크모드 상태를 가져오거나 기본값으로 false 설정
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // darkMode 상태가 변경될 때마다 localStorage에 저장하고 body 클래스 업데이트
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // 다크모드 토글 함수
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Provider 값 설정
  const value = { darkMode, toggleDarkMode };

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
}

// 커스텀 훅 생성
export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
}