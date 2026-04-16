import React from 'react'
import { useNavigate } from 'react-router-dom'
import ChatUI from './ChatUI'

const Home = () => {
    const navigate = useNavigate()
   
  return (
      <div>
          
          {/* <h1>Home page</h1> */}
          
          <ChatUI/>
      </div>
  )
}

export default Home