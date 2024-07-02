// src/pages/PostDetail.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../services/api';
import './PostDetail.css';

function PostDetail({darkMode}) {
  // URL 파라미터에서 게시글 ID 추출
  const { id } = useParams();
  
  // 상태 관리
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 컴포넌트 마운트 시 게시글 데이터 fetch
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await getPostById(id);
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        setError('게시글을 불러오는 데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // 로딩 중 표시
  if (loading) return <div className="loading">로딩 중...</div>;
  
  // 에러 표시
  if (error) return <div className="error">{error}</div>;
  
  // 게시글이 없을 경우
  if (!post) return <div className="not-found">게시글을 찾을 수 없습니다.</div>;

  return (
    <div className={`post-detail-container ${darkMode ? 'dark-mode' : ''}`}>
      <h1>{post.title}</h1>
      <img src={post.imageUrl} alt={post.title} className="post-image" />
      <div className="post-info">
        <p><strong>작성자:</strong> {post.author}</p>
        <p><strong>AI 모델:</strong> {post.aiModel}</p>
      </div>
      <div className="post-content">
        <h2>프롬프트</h2>
        <p>{post.prompt}</p>
        <h2>내용</h2>
        <p>{post.content}</p>
      </div>
      <div className="post-tags">
        {post.tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default PostDetail;