import React from 'react'
import './App.css'
import { Routes , Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import NotFound404 from './pages/NotFound404'
import CreateAdPage from './pages/CreateAdPage'
// import EditAdpAGE from './pages/EditAdpAGE'
// import WishlistPage from './pages/WishlistPage'
import MainLayout from './layouts/MainLayout'
import ItemDetailPage from './pages/ItemDetailPage'

const App = () => {
  return (
   <Routes>
    <Route path='/' element={<MainLayout />}>
     <Route path='/' element={<HomePage />}/>
     <Route path='/login' element={<LoginPage/>}/>
     <Route path='/register' element={<RegisterPage />}/>
     <Route path='/create-ad' element={<CreateAdPage />}/>
     <Route path='/profile'element={<ProfilePage />}/>
     <Route path='/item/:itemId' element={<ItemDetailPage/>}/>
     <Route path='*' element={<NotFound404 />}/>
    </Route>
   </Routes>
  )
}

export default App
