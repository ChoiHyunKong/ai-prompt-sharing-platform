import React, { useState } from 'react';
import './PostDetailPopup.css';

function PostDetailPopup({ post, onClose }) {
  const [comment, setComment] = useState('');

  if (!post) return null;

  // 댓글 제출 핸들러
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log('댓글 제출:', comment);
    setComment('');
  };

  // 오버레이 클릭 시 팝업 닫기 핸들러
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('popup-overlay')) {
      onClose();
    }
  };

  return (
    // 오버레이에 클릭 이벤트 핸들러 추가
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-content">
        {/* 닫기 버튼 */}
        <button className="close-button" onClick={onClose}>&times;</button>
        
        <div className="popup-inner">
          {/* 왼쪽: 이미지 섹션 */}
          <div className="popup-image-section">
            <img src={post.imageUrl} alt={post.title} />
          </div>

          {/* 오른쪽: 게시글 정보 섹션 */}
          <div className="popup-info-section">
            {/* 작성자 정보 */}
            <div className="author-info">
              <img src={post.authorAvatar || 'default-avatar.png'} alt={post.userName} className="author-avatar" />
              <span className="author-name">{post.userName}</span>
              <button className="follow-button">팔로우</button>
            </div>

            {/* 게시글 제목 및 내용 */}
            <h2>{post.title}</h2>
            <p className="post-content">{post.prompt}</p>

            {/* 태그 목록 */}
            <div className="tags">
              {post.tags && post.tags.map((tag, index) => (
                <span key={index} className="tag">#{tag}</span>
              ))}
            </div>

            {/* 상호작용 버튼 및 통계 */}
            <div className="interaction-stats">
              <button className="like-button">좋아요 {post.likes}</button>
              <span className="view-count">조회수 {post.views}</span>
              <button className="save-button">저장</button>
            </div>

            {/* 댓글 섹션 */}
            <div className="comments-section">
              <h3>댓글</h3>
              {/* 여기에 댓글 목록을 렌더링합니다 */}
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
    </div>
  );
}

export default PostDetailPopup;