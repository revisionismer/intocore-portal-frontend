# intocore-portal-frontend

1. 리액트 프로젝트 생성 및 라우터 연결과 로그인 페이지 꾸미기
2. 로그인 페이지(Login.js)에서 백엔드 서버로 로그인 시도 및 성공시 ACCESS\_TOKEN이 Header에 셋팅되는거 확인.
3. Main.js 생성 및 Layout(Header.js, Sidebar.js) 만들고 화면 배치
4. JWT 인증/인가 Bearer + access\_token 방식에서 httpOnly cookie -> axios 요청시 withCredentials: true로 서버에서 자동 인증으로 변환
5. JWT 인증/인가 httpOnly 쿠키 인증 방식 로그아웃 로직 추가
6. Login.js, Main.js에 로그인 여부 검증 로직 추가
7. Header.js에 인증로직 추가 및 httpOnly cookie me 인증 확인 로직  추가
8. 인증 예외처리 부분 보완
9. Profile.js 생성 및 라우터 연결
10. 프로필 사진 업로드 Header.js와 Profile.js에 적용(Profile.js에서 바꾸면 Header도 동시에 바뀌게 App.js에서 로그인 user 공유하게 변경)
11. Header.js, Main.js, Login.js Profile.js 보완
12. 사용자 프로필 정보 업데이트 로직 추가
13. SignUp.js UI 꾸며주고 회원가입 API 연동
14. 사용자 비밀번호 변경 화면 추가 및 API 연동
15. 결재완료 알림, 공지사항 알림 수신 여부 설정 페이지(Notification.js) API 연동 및 화면 완성
16. 사용자 접속 로그 조회 화면 생성 및 API 연동
17. 사용자 접속 로그 데이터 username 추가
18. 사용자 접속 로그 데이터 username 추가로 인해 최근 접속 기록이 없습니다 colspan을 4에서 5로 변경

