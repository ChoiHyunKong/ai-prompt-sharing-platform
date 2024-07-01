// src/components/PostDetailPopup.js

import React from 'react';
import './PostDetailPopup.css';

function PostDetailPopup({ post, onClose }) {
  if (!post) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {/* 닫기 버튼 */}
        <button className="close-button" onClick={onClose}>X</button>
        
        <div className="popup-inner">
          {/* 이미지 섹션 */}
          <div className="popup-image">
            <img src={post.imageUrl} alt={post.title} />
          </div>
          
          {/* 내용 섹션 */}
          <div className="popup-details">
            <h2>{post.title}</h2>
            <div className="prompt-content">
              <h3>프롬프트 내용:</h3>
              <p>{post.prompt}</p>
            </div>
            <div className="tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
            <div className="post-stats">
              <span>👍 {post.likes}</span>
              <span>👁️ {post.views}</span>
            </div>
            <div className="comments">
              <h3>댓글:</h3>
              {/* 댓글 컴포넌트를 여기에 추가 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetailPopup;