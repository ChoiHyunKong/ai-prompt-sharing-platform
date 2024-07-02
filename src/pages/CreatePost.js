// src/pages/CreatePost.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/api';
import './CreatePost.css';

function CreatePost({dakrMode}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [localImage, setLocalImage] = useState(null); // 로컬 이미지 파일 상태
  const [aiModel, setAiModel] = useState('');
  const [prompt, setPrompt] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // FormData 객체 생성
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('aiModel', aiModel);
      formData.append('prompt', prompt);
      formData.append('tags', JSON.stringify(tags.split(',').map(tag => tag.trim())));

      // 로컬 이미지가 있으면 추가, 없으면 이미지 URL 추가
      if (localImage) {
        formData.append('image', localImage);
      } else {
        formData.append('imageUrl', imageUrl);
      }

      await createPost(formData);
      navigate('/');
    } catch (error) {
      console.error('게시글 작성 실패:', error);
    }
  };

  // 로컬 이미지 파일 선택 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setLocalImage(file);
  };

  return (
    <div className={`create-post-container ${dakrMode ? 'dark-mode' : ''}`}>
      <h2>게시글 작성</h2>
      <form onSubmit={handleSubmit}>
        {/* 제목 입력 필드 */}
        <div className="input-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
            required
          />
        </div>
        {/* 내용 입력 필드 */}
        <div className="input-group">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용"
            required
          />
        </div>
        {/* 이미지 URL 입력 필드 */}
        <div className="input-group">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="이미지 URL"
          />
        </div>
        {/* 로컬 이미지 업로드 필드 */}
        <div className="input-group">
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        {/* AI 모델 입력 필드 */}
        <div className="input-group">
          <input
            type="text"
            value={aiModel}
            onChange={(e) => setAiModel(e.target.value)}
            placeholder="사용한 AI 모델"
            required
          />
        </div>
        {/* 프롬프트 내용 입력 필드 */}
        <div className="input-group">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="프롬프트 내용"
            required
          />
        </div>
        {/* 태그 입력 필드 */}
        <div className="input-group">
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="태그 (쉼표로 구분)"
          />
        </div>
        {/* 제출 버튼 */}
        <button type="submit" className="submit-btn">올리기</button>
      </form>
    </div>
   
  );
}

export default CreatePost;