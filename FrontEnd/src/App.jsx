import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Component/Home'
import Signup from './Component/Signup'
import Login from './Component/Login'
import Update from './Component/Update'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/home/:email" element={<Home/>}/>
      <Route path="/update/:email" element={<Update/>}/>
    </Routes>
    
  )
}

export default App
