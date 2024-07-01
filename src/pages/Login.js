// src/pages/Login.js

import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { login } from '../services/api';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberEmail, setRememberEmail] = useState(false);
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  // 컴포넌트 마운트 시 저장된 이메일 불러오기
  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberEmail(true);
    }
  }, []);

  // 로그인 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      authLogin(response.data);
      
      // 이메일 기억하기 체크박스가 선택되었다면 이메일 저장
      if (rememberEmail) {
        localStorage.setItem('userEmail', email);
      } else {
        localStorage.removeItem('userEmail');
      }

      navigate('/');
    } catch (err) {
      setError('이메일 또는 비밀번호를 확인해주세요');
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            required
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            required
          />
        </div>
        <div className="remember-email">
          <input
            type="checkbox"
            id="rememberEmail"
            checked={rememberEmail}
            onChange={(e) => setRememberEmail(e.target.checked)}
          />
          <label htmlFor="rememberEmail">이메일 기억하기</label>
        </div>
        <Link to="/forgot-password" className="forgot-password">비밀번호를 잊어버리셨나요?</Link>
        <button type="submit" className="submit-btn">로그인</button>
      </form>
      <div className="sns-login">
        <div className="sns-buttons">
          <button onClick={() => console.log('카카오톡 로그인')} className="sns-btn kakao">K</button>
          <button onClick={() => console.log('애플 로그인')} className="sns-btn apple">A</button>
          <button onClick={() => console.log('구글 로그인')} className="sns-btn google">G</button>
          <button onClick={() => console.log('페이스북 로그인')} className="sns-btn facebook">F</button>
          <button onClick={() => console.log('트위터 로그인')} className="sns-btn twitter">T</button>
        </div>
      </div>
      <p>계정이 없으신가요? <Link to="/register">회원가입</Link></p>
    </div>
  );
}

export default Login;