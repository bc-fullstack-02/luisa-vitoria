import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './main.css'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <ToastContainer/>
  </React.StrictMode>
)
