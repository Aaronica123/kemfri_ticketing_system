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
function App() {


  return (
    <>
    <Theme>
      <Router>
        <Toast_Provider>
          <Routes>
            <Route path="/" element={<Login_form/>}/>
            <Route path="/nav" element={<Nav_bar/>}/>
            <Route path="/dashboard" element={
              <AuthContext>
              <Nav_bar>
                <Dashboard/>
              </Nav_bar>
              </AuthContext>
            }/>
            <Route path='/submit' element={
             <AuthContext> 
               <Nav_bar>
                <SubmitForm/>
              </Nav_bar>
              </AuthContext>
            }/>
            <Route path="/my_tickets" element={
              <AuthContext>
              <Nav_bar>
              <MyTickets/>
              </Nav_bar>
              </AuthContext>}/>
              <Route path="/staff_dashboard"
              element={
                <AuthContext>
              <Nav_bar>
              <StaffDashboard/>
              </Nav_bar>
              </AuthContext>}/>
              <Route path="/notifications" element={
                <AuthContext>
                  <Nav_bar>
                    <Notify></Notify>
                  </Nav_bar>
                </AuthContext>
              }/>
              
             
          </Routes>

        </Toast_Provider>
      </Router>
      

    </Theme>
     
    </>
  )
}

export default App
