import './App.css';
import React, { useState } from 'react'
import Navbar from "./components/Navbar"
import News from './components/News';
import {
   BrowserRouter as Router,
   Route,
   Routes
} from 'react-router-dom'
import LoadingBar from "react-top-loading-bar";


const App = ()=>{
  const [Mode, setMode] = useState("light")
  

  const changeMode=()=>{
    if (Mode === "light"){
      document.body.style.backgroundColor = "#000128"
      document.body.style.color = "white"
      setMode("dark")
    }
    else{
      document.body.style.backgroundColor = "white"
      setMode("light")
    }
  }

  const [Progress, setProgress] = useState(0)

  


  const pageSize = 6
    return (
      <div>
        <Router>
        <LoadingBar
        color='#f11946'
        height={3}
        progress={Progress}
      />
          <Navbar className="sticky-top" changeMode={changeMode} bgcolor={Mode==="light"?"#3A3B3C":"#001F31"}/>
          <Routes>
            <Route path='/' element={<News setProgress={setProgress}  pageSize={pageSize} mode={Mode} key="general" country="in" category="general"/>} />
            <Route path="/business"  element={<News setProgress={setProgress}  pageSize={pageSize} mode={Mode} key="business" country="in" category="business"/>} />
            <Route path="/entertainment" element={<News setProgress={setProgress}  pageSize={pageSize} mode={Mode} key="entertainment" country="in" category="entertainment"/>} />
            <Route path="/health" element={<News setProgress={setProgress}  pageSize={pageSize} mode={Mode} key="health" country="in" category="health"/>} />
            <Route path="/science" element={<News setProgress={setProgress}  pageSize={pageSize} mode={Mode} key="science" country="in" category="science"/>} />
            <Route path="/sports" element={<News setProgress={setProgress}  pageSize={pageSize} mode={Mode} key="sports" country="in" category="sports"/>} />
            <Route path="/technology" element={<News setProgress={setProgress}  pageSize={pageSize} mode={Mode} key="technology" country="in" category="technology"/>} />
          </Routes>
        </Router>
      </div>
    )
  }

export default App;

