import React from 'react'
import {Link} from "react-router-dom"

const Home = () => {
  return (
        <>
            <h1>Get ready to land your dream job🚀</h1>
            <Link to="/login" className='button'>Get Started</Link>
        </>
    )
}

export default Home