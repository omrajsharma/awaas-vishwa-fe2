import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'       
import { UserContextProvider } from './context/UserContext.jsx' 
import { StyledEngineProvider } from '@mui/material/styles';   

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
    <BrowserRouter>
      <SnackbarProvider>
        <StyledEngineProvider injectFirst>
        <App />
        </StyledEngineProvider>
      </SnackbarProvider>
    </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>
)