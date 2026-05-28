# Habits of Replicating Disciples — Deployment Guide

This is a Next.js app. Deploy to Vercel by importing this GitHub repo at https://vercel.com

## Run Locally
```bash
npm install
npm run dev
```

## Customize Content
All session content is in `lib/sessions.ts`. Add video URLs like:
```ts
videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID'
```