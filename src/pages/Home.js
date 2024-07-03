// src/pages/Home.js

import React, { useState, useEffect, useCallback } from 'react';
import PostDetailPopup from '../components/PostDetailPopup';
import TopButton from '../components/TopButton.js'; // 2023-07-05 추가: TopButton 컴포넌트 import
import { getUserPosts } from '../services/api';
import './Home.css';

function Home() {
  // 상태 관리
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [page, setPage] = useState(1); // 2023-07-05 추가: 페이지 상태
  const [loading, setLoading] = useState(false); // 2023-07-05 추가: 로딩 상태
  const [hasMore, setHasMore] = useState(true); // 2023-07-05 추가: 더 불러올 데이터 있는지 여부

  // 2023-07-05 수정: 게시글 가져오기 함수
  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const newPosts = await getUserPosts(page);
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts(prevPosts => [...prevPosts, ...newPosts]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error('게시글 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  // 2023-07-05 추가: 무한 스크롤 처리 함수
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
    fetchPosts();
  }, [fetchPosts, loading]);

  // 컴포넌트 마운트 시 데이터 로드 및 스크롤 이벤트 리스너 등록
  useEffect(() => {
    fetchPosts();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchPosts, handleScroll]);

  // 게시글 클릭 핸들러
  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  // 팝업 닫기 핸들러
  const handleClosePopup = () => {
    setSelectedPost(null);
  };

  return (
    <div className="home-container">
      <main>
        {/* 2023-07-05 수정: Best 섹션 제거 */}
        <section className="all-posts">
          <div className="post-grid">
            {posts.map((post) => (
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
          {loading && <p>Loading...</p>}
        </section>
      </main>

      {/* 2023-07-05 추가: TopButton 컴포넌트 */}
      <TopButton />

      {selectedPost && (
        <PostDetailPopup post={selectedPost} onClose={handleClosePopup} />
      )}
    </div>
  );
}

export default Home;