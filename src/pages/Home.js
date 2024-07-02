import React, { useState, useEffect, useRef } from 'react';
import PostDetailPopup from '../components/PostDetailPopup'; // PostDetailPopup 컴포넌트 임포트
import './Home.css';

function Home() {
  // 상태 관리
  const [posts, setPosts] = useState([]); // 모든 게시글 데이터
  const [visiblePosts, setVisiblePosts] = useState([]); // 화면에 표시될 게시글
  const [selectedPost, setSelectedPost] = useState(null); // 선택된 게시글
  const [showTopButton, setShowTopButton] = useState(false); // 'TOP' 버튼 표시 여부
  
  const containerRef = useRef(null); // 컨테이너 요소에 대한 참조

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchPosts();
  }, []);

  // 화면 크기에 따라 표시할 게시글 수 조정
  useEffect(() => {
    const updateVisiblePosts = () => {
      const width = window.innerWidth;
      let postsPerRow = 5; // 기본값
      if (width < 768) postsPerRow = 2;
      else if (width < 1024) postsPerRow = 3;
      else if (width < 1440) postsPerRow = 4;
      
      setVisiblePosts(posts.slice(0, postsPerRow * 3)); // 3행만큼 표시
    };

    updateVisiblePosts();
    window.addEventListener('resize', updateVisiblePosts);
    return () => window.removeEventListener('resize', updateVisiblePosts);
  }, [posts]);

  // 게시글 가져오기 (더미 데이터 사용)
  const fetchPosts = async () => {
    try {
      // 실제 API 호출 대신 더미 데이터 사용
      const dummyPosts = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        title: `게시글 ${i + 1}`,
        imageUrl: `https://picsum.photos/300/200?random=${i}`,
        likes: Math.floor(Math.random() * 100),
        views: Math.floor(Math.random() * 1000),
        userName: `User${i + 1}`,
        tags: ['AI', 'Prompt', 'Image'],
        excerpt: 'Exciting updates from around the world',
        prompt: `This is a prompt for post ${i + 1}. It describes how the image was generated.`
      }));
      setPosts(dummyPosts);
      setVisiblePosts(dummyPosts.slice(0, 15)); // 초기에 15개 게시글만 표시
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
    setVisiblePosts(posts.slice(0, 15)); // 초기 상태로 되돌림
    setShowTopButton(false);
  };

  // 게시글 클릭 핸들러
  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  // 팝업 닫기 핸들러
  const handleClosePopup = () => {
    setSelectedPost(null);
  };

  // 게시글 카드 컴포넌트 (중복 코드 제거)
  const PostCard = ({ post, isBest }) => (
    <div 
      className={isBest ? "best-home-post" : "post-card"} 
      onClick={() => handlePostClick(post)}
    >
      <img src={post.imageUrl} alt={post.title} />
      <div className={isBest ? "post-home-info" : "post-card-info"}>
        {isBest && <span className="crown-icon">👑</span>}
        <span className="user-icon">👤</span>
        <p>{post.excerpt}</p>
        <p>{post.userName}</p>
        <p>{post.likes} Liked, {post.views} Views</p>
      </div>
      {/* 호버 시 프롬프트 표시 */}
      <div className="post-hover">
        <p>{post.prompt}</p>
      </div>
    </div>
  );

  return (
    <div className="home-container" ref={containerRef}>
      <main>
        {/* Best 섹션 */}
        <section className="best-home-posts">
          <h2>Best</h2>
          <div className="best-grid">
            {posts.slice(0, 3).map((post) => (
              <PostCard key={post.id} post={post} isBest={true} />
            ))}
          </div>
        </section>

        {/* 일반 게시글 섹션 */}
        <section className="all-posts">
          <div className="post-grid">
            {visiblePosts.map((post) => (
              <PostCard key={post.id} post={post} isBest={false} />
            ))}
          </div>
          {/* '더보기' 버튼 */}
          {visiblePosts.length < posts.length && (
            <button onClick={handleShowMore} className="show-more-btn">더보기</button>
          )}
        </section>
      </main>

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

export default Home;