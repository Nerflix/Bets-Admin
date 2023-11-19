import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddOdds from './pages/AddOdds';
import Home from './pages/Home';
import ManageOdds from './pages/ManageOdds';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route index element ={<Home />}/>
        <Route path="/AddOdds" element={<AddOdds />}/> 
      </Routes>
    </Router>
  )
}

export default App
