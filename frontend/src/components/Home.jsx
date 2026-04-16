import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    let handleLogout = () => {
        localStorage.removeItem("token")
        console.log("hy")
        navigate("/login")
    }
  return (
      <div>
          
          <h1>Home page</h1>
      <button onClick={handleLogout}> Log out</button>
      </div>
  )
}

export default Home