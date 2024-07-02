import React, { useState } from 'react';
import '../components/PostDetailPopup.css';

function PostDetailPopup({ post, onClose }) {
  // 댓글 입력을 위한 상태 관리
  const [comment, setComment] = useState('');

  // post 객체가 없으면 아무것도 렌더링하지 않음
  if (!post) return null;

  // 댓글 제출 핸들러
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // TODO: 실제 댓글 제출 로직 구현
    console.log('댓글 제출:', comment);
    setComment(''); // 입력 필드 초기화
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {/* 닫기 버튼 */}
        <button className="close-button" onClick={onClose}>&times;</button>
        
        {/* 게시물 작성자 정보 및 옵션 */}
        <div className="popup-header">
          <img src={post.authorAvatar} alt={post.author} className="author-avatar" />
          <span className="author-name">{post.author}</span>
          <button className="follow-button">팔로우</button>
          <button className="options-button">...</button>
        </div>

        {/* 게시물 이미지 */}
        <div className="popup-image">
          <img src={post.imageUrl} alt={post.title} />
        </div>

        {/* 게시물 상세 정보 */}
        <div className="popup-details">
          <h2>{post.title}</h2>
          <p>{post.prompt}</p>
          {/* 태그 목록 */}
          <div className="tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="tag">#{tag}</span>
            ))}
          </div>
          
          {/* 상호작용 버튼 (좋아요, 댓글, 저장, 공유) */}
          <div className="interaction-buttons">
            <button>좋아요 {post.likes}</button>
            <button>댓글 {post.comments?.length || 0}</button>
            <button>저장</button>
            <button>공유</button>
          </div>

          {/* 댓글 섹션 */}
          <div className="comments-section">
            {/* TODO: 댓글 목록 렌더링 로직 구현 */}
          </div>

          {/* 댓글 입력 폼 */}
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="댓글 추가..."
            />
            <button type="submit">게시</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostDetailPopup;