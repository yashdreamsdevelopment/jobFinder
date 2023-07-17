import './App.css'

import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'

import toast, { Toaster } from 'react-hot-toast';
import Main from './components/Main'

const App = () =>  {

  const notify = (msg, type) => {
    if(type === "error"){
      toast.error(msg)
    }
    if(type === "success"){
      toast.success(msg)
    }
  };

  return (
    <BrowserRouter>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login toast={notify}/>} />
        <Route path='/signup' element={<SignUp toast={notify}/>} />
        <Route path='/main' element={<Main/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
