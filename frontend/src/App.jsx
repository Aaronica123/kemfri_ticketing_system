import "@radix-ui/themes/styles.css"
import { Theme } from "@radix-ui/themes/dist/cjs/index.js";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Toast_Provider from "./ui/toast";
import Login_form from "./forms/login_form";
import Nav_bar from "./ui/nav_bar";
import './App.css'

function App() {


  return (
    <>
    <Theme>
      <Router>
        <Toast_Provider>
          <Routes>
            <Route path="/" element={<Login_form/>}/>
            <Route path="/nav" element={<Nav_bar/>}/>
          </Routes>
        </Toast_Provider>
      </Router>
      

    </Theme>
     
    </>
  )
}

export default App
