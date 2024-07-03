// client/src/services/api.js

import axios from 'axios';

// API 기본 URL 설정
const API_URL = 'http://localhost:5000/api';

// 사용자 등록 함수
export const register = (userData) => axios.post(`${API_URL}/auth/register`, userData);

// 사용자 로그인 함수
export const login = (userData) => axios.post(`${API_URL}/auth/login`, userData);

// 새 게시글 생성 함수
export const createPost = (postData, token) => axios.post(`${API_URL}/posts`, postData, { headers: { Authorization: `Bearer ${token}` } });

// 모든 게시글 가져오기 함수
export const getPosts = () => axios.get(`${API_URL}/posts`);

// 특정 ID의 게시글 가져오기 함수
export const getPostById = (id) => axios.get(`${API_URL}/posts/${id}`);

// 2023-07-05 수정: 페이징을 위한 매개변수 추가
export const getUserPosts = async (page = 1, limit = 10) => {
    // 임시 데이터 반환
    const dummyPosts = [
      { id: 1, title: "첫 번째 게시글", imageUrl: "https://i.pinimg.com/564x/53/94/25/53942557e12e5fd7ea03c607f9eaaffd.jpg", likes: 210, views: 1100, excerpt: "첫 번째 게시글 내용...", tags: ["AI", "프롬프트"] },
      { id: 2, title: "두 번째 게시글", imageUrl: "https://i.pinimg.com/564x/9d/ad/b8/9dadb8fa5b9e81bc5af6a0be7067a1db.jpg", likes: 765, views: 3152, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 3, title: "두 번째 게시글", imageUrl: "https://i.pinimg.com/564x/35/14/8d/35148dcc2221c7a1ca1429387905637c.jpg", likes: 185, views: 1151, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 4, title: "세 번째 게시글", imageUrl: "https://i.pinimg.com/564x/a4/d5/cd/a4d5cdcbabc4b2254ddfd6112926b103.jpg", likes: 853, views: 5152, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 5, title: "네 번째 게시글", imageUrl: "https://i.pinimg.com/564x/fd/8e/0c/fd8e0c8748aae290fe35753dd59f0762.jpg", likes: 315, views: 1856, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 6, title: "다섯 번째 게시글", imageUrl: "https://i.pinimg.com/736x/02/eb/1a/02eb1a18f8f686b92b1f8ce126823667.jpg", likes: 215, views: 1230, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 7, title: "여섯 번째 게시글", imageUrl: "https://i.pinimg.com/564x/17/b8/eb/17b8eb01d1d7cc584693cc905b72f0e2.jpg", likes: 115, views: 1440, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 8, title: "일곱 번째 게시글", imageUrl: "https://i.pinimg.com/564x/c8/72/6b/c8726b053e166258befcc03dfe6cf83b.jpg", likes: 210, views: 1100, excerpt: "첫 번째 게시글 내용...", tags: ["AI", "프롬프트"] },
      { id: 9, title: "두 번째 게시글", imageUrl: "https://i.pinimg.com/564x/28/2f/28/282f286225de701c66ed7c0bfdd2f6ae.jpg", likes: 765, views: 3152, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 10, title: "두 번째 게시글", imageUrl: "https://i.pinimg.com/564x/22/01/94/2201946834d003844c6460f68ad18bb0.jpg", likes: 185, views: 1151, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 11, title: "세 번째 게시글", imageUrl: "https://i.pinimg.com/736x/58/be/d6/58bed618b811dfe500c9a89ed944c83d.jpg", likes: 853, views: 5152, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 12, title: "네 번째 게시글", imageUrl: "https://i.pinimg.com/736x/28/2c/58/282c582e28873d3111e3aaceda839924.jpg", likes: 315, views: 1856, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 13, title: "다섯 번째 게시글", imageUrl: "https://i.pinimg.com/564x/1e/e9/d4/1ee9d47fb9cae9ed40ba9d943bb914c5.jpg", likes: 215, views: 1230, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 14, title: "여섯 번째 게시글", imageUrl: "https://i.pinimg.com/564x/ef/ef/ea/efefea370f8eab0ac02b289fd27d9ba1.jpg", likes: 115, views: 1440, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 15, title: "첫 번째 게시글", imageUrl: "https://i.pinimg.com/736x/3f/da/87/3fda8764f8faf349e968f8fbb3393636.jpg", likes: 210, views: 1100, excerpt: "첫 번째 게시글 내용...", tags: ["AI", "프롬프트"] },
      { id: 16, title: "두 번째 게시글", imageUrl: "https://i.pinimg.com/564x/3e/8d/f8/3e8df8966346f13b9a65b0b7137ca721.jpg", likes: 765, views: 3152, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 17, title: "두 번째 게시글", imageUrl: "https://i.pinimg.com/564x/5e/cd/6f/5ecd6fa800d26747262966c7e6b4f0b5.jpg", likes: 185, views: 1151, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 18, title: "세 번째 게시글", imageUrl: "https://i.pinimg.com/564x/53/0f/f5/530ff5f18a30f8a9f80830f91ff5e52c.jpg", likes: 853, views: 5152, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 19, title: "네 번째 게시글", imageUrl: "https://i.pinimg.com/736x/68/e3/da/68e3dabc6d340c0f71d563ae7aefa412.jpg", likes: 315, views: 1856, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 20, title: "다섯 번째 게시글", imageUrl: "https://i.pinimg.com/564x/3a/a4/8c/3aa48cefaa8aa0b84193f8dec2ad7223.jpg", likes: 215, views: 1230, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 21, title: "여섯 번째 게시글", imageUrl: "https://i.pinimg.com/564x/11/1d/ca/111dca390178eea3600705649845e16b.jpg", likes: 115, views: 1440, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 1, title: "첫 번째 게시글", imageUrl: "https://i.pinimg.com/564x/79/e9/a2/79e9a241b1191c6deca9df06785b1109.jpg", likes: 210, views: 1100, excerpt: "첫 번째 게시글 내용...", tags: ["AI", "프롬프트"] },
      { id: 2, title: "두 번째 게시글", imageUrl: "https://i.pinimg.com/564x/8f/95/d4/8f95d4378b2e7c5d3b5133ea41901f81.jpg", likes: 765, views: 3152, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 3, title: "두 번째 게시글", imageUrl: "https://i.pinimg.com/736x/2d/84/88/2d84889b72b9f9b98fbe9632ea19187d.jpg", likes: 185, views: 1151, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 4, title: "세 번째 게시글", imageUrl: "https://i.pinimg.com/736x/25/f6/19/25f619e0e647a3d58efa471621797e1b.jpg", likes: 853, views: 5152, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 5, title: "네 번째 게시글", imageUrl: "https://i.pinimg.com/564x/7d/32/7f/7d327fbd7e3df8de9595c44251266349.jpg", likes: 315, views: 1856, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 6, title: "다섯 번째 게시글", imageUrl: "https://i.pinimg.com/564x/ae/5d/b9/ae5db9c78e8a3525b3703a41891a6fa2.jpg", likes: 215, views: 1230, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 7, title: "여섯 번째 게시글", imageUrl: "https://i.pinimg.com/564x/d4/12/97/d41297efedfd93067fa52f5bea62770b.jpg", likes: 115, views: 1440, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 1, title: "첫 번째 게시글", imageUrl: "https://i.pinimg.com/564x/53/94/25/53942557e12e5fd7ea03c607f9eaaffd.jpg", likes: 210, views: 1100, excerpt: "첫 번째 게시글 내용...", tags: ["AI", "프롬프트"] },
      { id: 2, title: "두 번째 게시글", imageUrl: "https://i.pinimg.com/564x/61/22/ad/6122ad4544df6c5300a5e6003851b56b.jpg", likes: 765, views: 3152, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 3, title: "두 번째 게시글", imageUrl: "https://i.pinimg.com/736x/9a/d2/6b/9ad26b34ab80e050de9a0fe3561cf0b7.jpg", likes: 185, views: 1151, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 4, title: "세 번째 게시글", imageUrl: "https://i.pinimg.com/564x/52/a7/62/52a762388fefe1d641d461400fd98c2b.jpg", likes: 853, views: 5152, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 5, title: "네 번째 게시글", imageUrl: "https://i.pinimg.com/564x/fd/8e/0c/fd8e0c8748aae290fe35753dd59f0762.jpg", likes: 315, views: 1856, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 6, title: "다섯 번째 게시글", imageUrl: "https://i.pinimg.com/736x/02/eb/1a/02eb1a18f8f686b92b1f8ce126823667.jpg", likes: 215, views: 1230, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 7, title: "여섯 번째 게시글", imageUrl: "https://i.pinimg.com/564x/17/b8/eb/17b8eb01d1d7cc584693cc905b72f0e2.jpg", likes: 115, views: 1440, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 1, title: "첫 번째 게시글", imageUrl: "https://i.pinimg.com/564x/a7/3d/8d/a73d8d4a7513cc76b6d6708188ac6caf.jpg", likes: 210, views: 1100, excerpt: "첫 번째 게시글 내용...", tags: ["AI", "프롬프트"] },
      { id: 2, title: "두 번째 게시글", imageUrl: "https://i.pinimg.com/564x/9d/ad/b8/9dadb8fa5b9e81bc5af6a0be7067a1db.jpg", likes: 765, views: 3152, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 3, title: "두 번째 게시글", imageUrl: "https://i.pinimg.com/564x/35/14/8d/35148dcc2221c7a1ca1429387905637c.jpg", likes: 185, views: 1151, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 4, title: "세 번째 게시글", imageUrl: "https://i.pinimg.com/736x/7c/e3/4b/7ce34b1078b52fa88fdaba2ab39bc7d5.jpg", likes: 853, views: 5152, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 5, title: "네 번째 게시글", imageUrl: "https://i.pinimg.com/736x/39/f8/ba/39f8bacb1ccaa86d6c9c87d97545e7ef.jpg", likes: 315, views: 1856, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 6, title: "다섯 번째 게시글", imageUrl: "https://i.pinimg.com/736x/69/b0/d5/69b0d5c3fc40af4239e77e54e5ce82d0.jpg", likes: 215, views: 1230, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },
      { id: 7, title: "여섯 번째 게시글", imageUrl: "https://i.pinimg.com/736x/f6/13/a7/f613a722600d67498220285a0078e73f.jpg", likes: 115, views: 1440, excerpt: "두 번째 게시글 내용...", tags: ["디자인", "AI"] },

    ];

    // 2023-07-05 추가: 페이징 로직
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return dummyPosts.slice(startIndex, endIndex);
};

// 사용자 정보 가져오기 함수
export const response = async () => {
    const response = await axios.get('/api/user/info');
    return response.date;
};

// 2023-07-05 추가: 로그인을 위한 더미 데이터
export const dummyUsers = [
    { id: 1, username: "user1", password: "password1", email: "user1@example.com" },
    { id: 2, username: "user2", password: "password2", email: "user2@example.com" },
    { id: 3, username: "user3", password: "password3", email: "user3@example.com" },
];

// 2023-07-05 추가: 더미 데이터를 사용한 로그인 함수
export const dummyLogin = (username, password) => {
    const user = dummyUsers.find(u => u.username === username && u.password === password);
    if (user) {
        return Promise.resolve({ success: true, user: { ...user, password: undefined } });
    } else {
        return Promise.reject({ success: false, message: "Invalid credentials" });
    }
};