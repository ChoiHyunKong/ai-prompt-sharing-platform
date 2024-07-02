// src/pages/Register.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

function Register({ darkMode}) {
  const [activeTab, setActiveTab] = useState('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  // 회원가입 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'phone') {
      console.log('휴대폰 회원가입:', { phoneNumber, password, nickname });
    } else {
      console.log('이메일 회원가입:', { email, password, nickname });
    }
    // TODO: 회원가입 로직 구현
  };

  // SNS 로그인 핸들러
  const handleSNSLogin = (provider) => {
    // TODO: SNS 로그인 로직 구현
    console.log(`${provider} 로그인`);
  };

  return (
    <div className={`register-container ${darkMode ? 'dark-mode' : ''}`}>
    <div className="register-container">
      <h2>회원가입</h2>
      <div className="tab-container">
        <span 
          className={`tab ${activeTab === 'phone' ? 'active' : ''}`}
          onClick={() => setActiveTab('phone')}
        >
          휴대폰 번호
        </span>
        <span 
          className={`tab ${activeTab === 'email' ? 'active' : ''}`}
          onClick={() => setActiveTab('email')}
        >
          이메일 또는 아이디
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        {activeTab === 'phone' ? (
          <div className="input-group">
            <select className="country-code">
              <option value="+82">+82</option>
              {/* 다른 국가 코드 옵션들 */}
            </select>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="휴대폰 번호"
              required
            />
          </div>
        ) : (
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 또는 아이디"
            required
          />
        )}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          required
        />
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임 (선택사항)"
        />
        <Link to="/forgot-password" className="forgot-password">비밀번호를 잊어버리셨나요?</Link>
        <button type="submit" className="submit-btn">완료</button>
      </form>
      <div className="sns-login">

        <div className="sns-buttons">
          <button onClick={() => handleSNSLogin('카카오톡')} className="sns-btn kakao">K</button>
          <button onClick={() => handleSNSLogin('애플')} className="sns-btn apple">A</button>
          <button onClick={() => handleSNSLogin('구글')} className="sns-btn google">G</button>
          <button onClick={() => handleSNSLogin('페이스북')} className="sns-btn facebook">F</button>
          <button onClick={() => handleSNSLogin('트위터')} className="sns-btn twitter">T</button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Register;