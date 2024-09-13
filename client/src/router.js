import {BrowserRouter, Routes, Route} from "react-router-dom"
import { useState, useEffect } from "react"

import NotFound from "./sites/NotFound/NotFound"
import Auth from "./sites/login/auth"
import Tasks from "./sites/Tasks/Tasks"

const Router = ()=>{

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/task" element={ <Tasks/>}/>
        <Route path="*" element={<Auth/>} />
        {// <Route path="*" Component={NotFound}/> 
}
      </Routes>
    </BrowserRouter>
  )
}

export default Router