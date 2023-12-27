# RAID STUDIO

RAID STUDIO의 주 목적은 로스트아크의 레이드 클리어 현황을 고정 파티와 공유입니다. 이외에도 현재 특정 레이드 참여 가능한 고정 공대원 찾기, Discord 봇을 이용한 참여 가능 여부 확인 등 여러가지의 유용한 기능을 제공합니다.

![image](https://github.com/2skydev/Raid-Studio/assets/43225384/68c0553f-fd83-4fc9-b0a6-f7f7c34dcefa)

<br />

## Announcement

!! 해당 프로젝트는 아직 개발중인 프로젝트입니다. !!

<br />

## Skills

![Skills](https://skillicons.dev/icons?i=vercel,nextjs,ts,react,discord,tailwind)
<img src="https://avatars.githubusercontent.com/u/139895814?s=48&v=4" width="50px" height="50px">
<img src="https://github.com/2skydev/Raid-Studio/assets/43225384/5fc8dd76-d743-4ebb-84a4-20e2c0aabfdc" width="50px" height="50px">

[![Made with Supabase](https://supabase.com/badge-made-with-supabase-dark.svg)](https://supabase.com)

- [supabase](https://supabase.com) / backend platform (auth, db, api, edge functions, storage ...)
- discord-oauth
- vercel
- nextjs
- typescript
- react
- [tailwindcss](https://tailwindcss.com)
- [shadcn-ui](https://ui.shadcn.com) / UI Component
- [framer-motion](https://www.framer.com/motion) / animation js
- [swr](https://swr.vercel.app/ko) / api state manager
- [react-hook-form](https://react-hook-form.com) / form state manager

<br />

## Getting Started
이 프로젝트는 `pnpm`, `supabase`를 사용합니다.
> vercel에서 `yarn 3`를 지원하지 않기 때문에 `pnpm`으로 선택했습니다.

<br />

### 1. env 파일 설정
`raid-studio.code-workspace` 파일로 vscode 작업 영역을 열면 root, nextjs, supabase-functions 영역이 나눠져 있습니다.

각각 `.env` 파일이 필요하며 필요한 키 값 예제 및 설명은 `.env.example` 파일에 있습니다.

<br />

### 2. supabase - Local Dev
supabase 개발 환경에는 `docker`, `supabase cli`가 필요합니다. 아래 단계를 따라 설치를 진행해주세요.

1. docker 설치 및 실행
2. [supabase cli 설치](https://supabase.com/docs/guides/cli/getting-started)
3. 프로젝트 루트에서 `supabase start` 명렁어로 개발 환경 실행
4. env 파일을 변경했다면 `supabase stop`, `supabase start`로 재실행

**supabase 권한이 있는 개발자 설정**
```bash
# 웹 브라우저 기반 supabase cli 자동 로그인
supabase login
```
```bash
# 해당 명령어에서 db 비빌먼호 물어보는데 관리자에게 전달받은 db 비번 입력 (나중에 db push 명령어에 필요)
supabase link
```

<br />

### 3. 명령어들

**Next.js - 개발모드 실행**
```bash
# cd: vscode 작업 영역 기준 nextjs 또는 디렉토리 기준 frontend
pnpm dev
```
---
**Next.js - 페이지, 컴포넌트 파일 생성기**
```bash
# cd: vscode 작업 영역 기준 nextjs 또는 디렉토리 기준 frontend
pnpm g
```
---
**Next.js - 로컬 DB에 따른 type 자동 생성**
```bash
# cd: vscode 작업 영역 기준 nextjs 또는 디렉토리 기준 frontend
pnpm sb-type
```
---
**DB - 초기화**
> `migrations/*.sql`, `seed.sql` 파일을 기반으로 db 초기화
```bash
# cd: vscode 작업 영역 기준 root 또는 디렉토리 기준 프로젝트 루트
supabase db reset
```
---
**DB - 로컬에서 변경한 내용 마이그레이션 파일 생성**
> 자동 생성은 아직 불안정하므로 혹시 모를 마이그레이션 파일 내용 확인 필요
```bash
# cd: vscode 작업 영역 기준 root 또는 디렉토리 기준 프로젝트 루트
supabase db diff -f <마이그레이션 파일 명>
```
---
**DB - 마이그레이션 파일 실서버에 적용**
```bash
# cd: vscode 작업 영역 기준 root 또는 디렉토리 기준 프로젝트 루트
supabase db push
```
---
**Edge Functions - 개발모드 (live-reload)**
```bash
# cd: vscode 작업 영역 기준 root 또는 디렉토리 기준 프로젝트 루트
supabase functions serve
```
---
**Edge Functions - 실서버 배포**
```bash
# cd: vscode 작업 영역 기준 root 또는 디렉토리 기준 프로젝트 루트
supabase functions deploy
```
