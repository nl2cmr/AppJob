import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@ionic/react/css': '/node_modules/@ionic/react/css',
    },
  },
  base: process.env.VITE_BASE_PATH || '/',
  login: process.env.VITE_LOGIN_PATH || '/login',
  signup: process.env.VITE_SIGNUP_PATH || '/signup',
  main: process.env.VITE_MAIN_PATH || '/main',
  mainen: process.env.VITE_MAINEN_PATH || '/mainen',
  compte: process.env.VITE_COMPTE_PATH || '/main/compte',
  compteen: process.env.VITE_COMPTEEN_PATH || '/mainen/compte',
  candidatures: process.env.VITE_CAND_PATH || '/mainen/candidatures',
  notifs: process.env.VITE_NOTIFS_PATH || '/main/notifs&messages',
  notifsen: process.env. VITE_NOTIFSEN_PATH || '/mainen/notifs&messages',

  server: {
    routes: [
      { path: '/', element: '<LandingPage />' },
      { path: '/login', element: '<LoginForm />' },
      { path: '/signup', element: '<SignupForm />' },
      { path: '/main', element: '<MainPage />' },
      { path: '/main/compte', element: '<Compte />' },
      { path: '/main/notifs&messages', element: '<Notifs />' },
      { path: '/mainen', element: '<MainPageEn />' },
      { path: '/mainen/compte', element: '<CompteEn />' },
      { path: '/mainen/candidatures', element: '<CandidaturesEn />' },
      { path: '/mainen/notifs&messages', element: '<NotifsEn />' },
    ],
  },
})
