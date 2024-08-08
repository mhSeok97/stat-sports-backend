# stat-sports-backend

축구, 농구와 같은 리그를 기준으로 통계를 제공하는 서비스

## 목차

- 개요
- 주요 기능
- 시작하기
  - 필수 조건
  - 설치 방법
  - 설정 방법
  - 실행 방법
- API 엔드포인트
- 사용된 기술
- 기여 방법
- 라이선스
- 감사의 말
- ERD (임시)

## 개요

이 프로젝트는 축구, 농구 등 다양한 스포츠 리그의 통계 데이터를 제공하는 서비스입니다. 사용자는 리그별로 다양한 통계를 조회하고, 이를 통해 리그의 최신 정보를 확인할 수 있습니다.

## 주요 기능

- 축구 리그 통계 제공
- 농구 리그 통계 제공
- 리그별 최신 정보 업데이트
- 사용자 맞춤형 통계 조회

## 시작하기

### 필수 조건

이 프로젝트를 실행하기 위해서는 다음이 필요합니다:

- Node.js (https://nodejs.org/)
- MySQL (https://www.mysql.com/)
- Jenkins (https://www.jenkins.io/) (CI/CD를 위한 선택 사항)

### 설치 방법

1. 저장소를 클론합니다:
   git clone https://github.com/yourusername/your-repository.git
   cd your-repository

2. 의존성을 설치합니다:
   npm install

### 설정 방법

1. 프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 다음 환경 변수를 추가합니다:

   NODE_ENV=development
   PORT=3000
   LOG_DIR=./logs
   CORS_ORIGIN=http://localhost:3000
   CORS_CREDENTIALS=true
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=yourusername
   DB_PASSWORD=yourpassword
   DB_DATABASE=yourdatabase

2. MySQL 데이터베이스를 설정합니다:
   CREATE DATABASE yourdatabase;
   USE yourdatabase;

   CREATE TABLE leagues (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     label_en VARCHAR(100) NOT NULL,
     label_ko VARCHAR(100) NOT NULL,
     logo_url VARCHAR(100) NOT NULL,
     country VARCHAR(100)
   );

### 실행 방법

1. 개발 서버를 시작합니다:
   npm start

2. 애플리케이션은 `http://localhost:3000`에서 실행됩니다.

## API 엔드포인트

사용 가능한 API 엔드포인트 목록:

- GET /apis/v1/football/leagues: 축구 리그 목록을 조회합니다.
- GET /apis/v1/basketball/leagues: 농구 리그 목록을 조회합니다.

## 사용된 기술

- Node.js
- Express
- TypeORM
- MySQL
- TypeScript
- Routing-controllers
- Typedi
- Jenkins (CI/CD)
- Swagger (API 문서화)
- Morgan, Helmet, HPP, Compression, CORS, Cookie-parser (미들웨어)

## 기여 방법

기여는 언제나 환영입니다! 기여하시기 전에 [CONTRIBUTING.md](CONTRIBUTING.md) 파일을 먼저 읽어 주세요.

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참고하세요.

## 감사의 말

- TypeORM (https://typeorm.io/)
- Jenkins (https://www.jenkins.io/)
- Swagger (https://swagger.io/)

## ERD (임시)

- https://www.erdcloud.com/d/SJvQqooCRq3B9HHZT

![SJvQqooCRq3B9HHZT (1)](https://github.com/user-attachments/assets/fc18789a-e868-4a75-8717-6539403aa4cd)
