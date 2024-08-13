# Project Initialization

### 배포

#### 인스턴스 환경 구축
```bash
# 패키지 정보 업데이트
sudo apt update
```
<hr>

```bash
# nvm install script 설치 및 실행
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```
<hr>

```bash
# nvm 로드
vi ~/.bash

# i 입력으로 수정 모드 -> 아래 코드 입력 -> ESC로 종료 -> :wq 로 저장
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

<hr>

```bash
# nvm 버전 확인
nvm -v
```

<hr>

```bash
# node.js, npm 설치
nvm install node
sudo apt install npm
```

#### Git SSH 등록하기
```bash
# 클론
cd ~
git clone (SSH 링크)
```

<hr>

```bash
# 패키지 설치 및 서버 실행
npm install
npm start
```