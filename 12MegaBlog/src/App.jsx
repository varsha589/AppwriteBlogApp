import {useDispatch} from "react-redux"
import { useState,useEffect } from 'react'

import authService from "./appwrite/auth"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import {login, logout} from "../store/authSlice"
import { Outlet } from "react-router-dom"

function App() {
 
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
        if(userData){
          dispatch(login({userData}))
        }else{
          dispatch(logout())
        }
    })
    .finally(() => setLoading(false))
  } ,[])

  return !loading ? (
    <div className='min-h-screen flex flex-col content-between bg-gray-400'>
      
        <Header />
        <main className = "flex-1">
          <Outlet />
        </main>
        <Footer />
      
    </div>
  ) : null
}


export default App
