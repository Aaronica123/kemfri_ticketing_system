import "@radix-ui/themes/styles.css"
import { Theme } from "@radix-ui/themes/dist/cjs/index.js";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Toast_Provider from "./ui/toast";
import Login_form from "./forms/login_form";
import Nav_bar from "./ui/nav_bar";
import Dashboard from "./pages/Dashboard";
import SubmitForm from "./pages/Submit_ticket";
import MyTickets from "./pages/My_tickets";
import StaffDashboard from "./pages/Staff_Dashboard";
import './App.css'
import AuthContext from "./auth/auth_context";
import Notify from "./pages/Notifications";
import Input from "./forms/submit";
import Register from "./pages/Register";
import Auth from "./auth/new_auth";
function App() {


  return (
    <>
    <Theme>
      <Router>
        <Toast_Provider>
          <Routes>
            <Route path="/register" element={<Register/>}/>
            <Route path="/input" element={<Input/>}/>
            <Route path="/" element={<Login_form/>}/>
            <Route path="/nav" element={<Nav_bar/>}/>
            <Route path="/dashboard" element={
              <Auth>
              <Nav_bar>
                <Dashboard/>
              </Nav_bar>
              </Auth>
            }/>
            <Route path='/submit' element={
             <Auth> 
               <Nav_bar>
                <SubmitForm/>
              </Nav_bar>
              </Auth>
            }/>
            <Route path="/my_tickets" element={
              <Auth>
              <Nav_bar>
              <MyTickets/>
              </Nav_bar>
              </Auth>}/>
              <Route path="/staff_dashboard"
              element={
                <Auth>
              <Nav_bar>
              <StaffDashboard/>
              </Nav_bar>
              </Auth>}/>
              <Route path="/notifications" element={
                <Auth>
                  <Nav_bar>
                    <Notify></Notify>
                  </Nav_bar>
                </Auth>
              }/>
              
             
          </Routes>

        </Toast_Provider>
      </Router>
      

    </Theme>
     
    </>
  )
}

export default App
