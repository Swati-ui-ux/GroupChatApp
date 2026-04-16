import React, { useEffect, useState } from 'react'
import SignUp from './components/SignUp'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from "./components/Home"

const App = () => {
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsLogged(true)
    }
  }, [])

  return (
    <div>
      <ToastContainer />

      <Routes>

        {/* Home */}
        <Route 
          path='/' 
          element={isLogged ? <Home /> : <Navigate to="/login" />} 
        />

        {/* Login */}
        <Route 
          path='/login' 
          element={!isLogged ? <Login /> : <Navigate to="/" />} 
        />

        {/* Signup */}
        <Route 
          path='/signup' 
          element={!isLogged ? <SignUp /> : <Navigate to="/" />} 
        />

      </Routes>

    </div>
  )
}

export default App