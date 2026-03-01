# intocore-portal-frontend

1. 리액트 프로젝트 생성 및 라우터 연결과 로그인 페이지 꾸미기
2. 로그인 페이지(Login.js)에서 백엔드 서버로 로그인 시도 및 성공시 ACCESS\_TOKEN이 Header에 셋팅되는거 확인.
3. Main.js 생성 및 Layout(Header.js, Sidebar.js) 만들고 화면 배치
4. JWT 인증/인가 Bearer + access\_token 방식에서 httpOnly cookie -> axios 요청시 withCredentials: true로 서버에서 자동 인증으로 변환
5. JWT 인증/인가 httpOnly 쿠키 인증 방식 로그아웃 로직 추가 
