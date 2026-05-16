import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./styles.css"
import App from './App.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'


ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="470784951477-1mcdh3c1puclmb9ttot8mchl3onvsshb.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
)
