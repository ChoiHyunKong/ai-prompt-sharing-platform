// src/pages/Profile.js

import React, { useState, useEffect, useRef } from 'react';
import { getUserPosts } from '../services/api';
import PostDetailPopup from '../components/PostDetailPopup'; // 새로 만든 팝업 컴포넌트 import
import './Profile.css';
import '../components/PostDetailPopup.css';

function Profile({darkMode}) {
  // 상태 관리
  const [userInfo, setUserInfo] = useState(null);
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [activeTab, setActiveTab] = useState('myPost');
  const [showTopButton, setShowTopButton] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null); // 선택된 게시글 상태 추가
  
  // ref를 사용하여 컨테이너 요소에 접근
  const containerRef = useRef(null);

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchUserInfo();
    fetchUserPosts();
  }, []);

  // 화면 크기에 따라 표시할 게시글 수 조정
  useEffect(() => {
    const updateVisiblePosts = () => {
      const width = window.innerWidth;
      let postsPerRow = 4; // 기본값
      if (width < 768) postsPerRow = 2;
      else if (width < 1024) postsPerRow = 3;
      
      setVisiblePosts(posts.slice(0, postsPerRow * 2)); // 2행만큼 표시
    };

    updateVisiblePosts();
    window.addEventListener('resize', updateVisiblePosts);
    return () => window.removeEventListener('resize', updateVisiblePosts);
  }, [posts]);

  // 사용자 정보 가져오기 (임시 더미 데이터 사용)
  const fetchUserInfo = async () => {
    try {
      // 임시 더미 데이터
      setUserInfo({
        nickname: "사용자",
        rank: "초보자",
        postCount: 10,
        followerCount: 100,
        followingCount: 50,
        profileImage: "https://via.placeholder.com/150"
      });
    } catch (error) {
      console.error('사용자 정보 로딩 실패:', error);
    }
  };

  // 사용자 게시글 가져오기
  const fetchUserPosts = async () => {
    try {
      const userPosts = await getUserPosts();
      setPosts(userPosts);
      setVisiblePosts(userPosts.slice(0, 8)); // 초기에 8개 게시글만 표시
    } catch (error) {
      console.error('게시글 로딩 실패:', error);
    }
  };

  // '더보기' 버튼 클릭 핸들러
  const handleShowMore = () => {
    setVisiblePosts(posts);
    setShowTopButton(true);
  };

  // 'TOP' 버튼 클릭 핸들러
  const handleScrollToTop = () => {
    containerRef.current.scrollIntoView({ behavior: 'smooth' });
    setVisiblePosts(posts.slice(0, 8)); // 초기 상태로 되돌림
    setShowTopButton(false);
  };

  // 게시글 클릭 핸들러 (팝업 열기)
  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  // 팝업 닫기 핸들러
  const handleClosePopup = () => {
    setSelectedPost(null);
  };

  return (
    <div className={`profile-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* 사용자 정보 섹션 */}
      <div className="user-info">
        <img src={userInfo?.profileImage || 'default-profile.jpg'} alt="Profile" className="profile-image" />
        <div className="user-details">
          <h2>{userInfo?.nickname}</h2>
          <p>Rank: {userInfo?.rank}</p>
          <p>{userInfo?.postCount} 게시글</p>
          <p>{userInfo?.followerCount} 팔로워</p>
          <p>{userInfo?.followingCount} 팔로잉</p>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="tab-menu">
        <button
          className={activeTab === 'myPost' ? 'active' : ''}
          onClick={() => setActiveTab('myPost')}
        >
          My Post
        </button>
        <button
          className={activeTab === 'like' ? 'active' : ''}
          onClick={() => setActiveTab('like')}
        >
          Like
        </button>
        <button
          className={activeTab === 'bookmark' ? 'active' : ''}
          onClick={() => setActiveTab('bookmark')}
        >
          Bookmark
        </button>
      </div>

      {/* My Best 섹션 */}
      <div className="my-best">
        <h3>My Best</h3>
        <div className="best-posts">
          {posts.slice(0, 3).map((post) => (
            <div key={post.id} className="best-post">
              <img src={post.imageUrl} alt={post.title} />
              <p>{post.title}</p>
              <p>{post.likes} Likes, {post.views} Views</p>
            </div>
          ))}
        </div>
      </div>

      {/* My Post 섹션 */}
      <div className="my-posts">
        <h3>My Post</h3>
        <div className="post-grid">
          {visiblePosts.map((post) => (
            <div key={post.id} className="post-card" onClick={() => handlePostClick(post)}>
              <div className="post-image" style={{backgroundImage: `url(${post.imageUrl})`}}>
                <div className="post-hover-info">
                  <p>{post.excerpt}</p>
                  <div className="post-tags">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <h4>{post.title}</h4>
            </div>
          ))}
        </div>
        {/* '더보기' 버튼 */}
        {visiblePosts.length < posts.length && (
          <button onClick={handleShowMore} className="show-more-btn">더보기</button>
        )}
      </div>
      {/* 'TOP' 버튼 */}
      {showTopButton && (
        <button onClick={handleScrollToTop} className="top-btn">TOP</button>
      )}

      {/* 게시글 상세 팝업 */}
      {selectedPost && (
        <PostDetailPopup post={selectedPost} onClose={handleClosePopup} />
      )}
    </div>
  );
}

export default Profile;