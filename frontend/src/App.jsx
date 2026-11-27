import "@radix-ui/themes/styles.css"
import { Spinner, Theme } from "@radix-ui/themes";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Login_form from "./forms/login_form";


import './App.css'

import { Toaster } from "sonner"
import "./App.css"
import "./index.css"
import { Suspense,lazy } from "react";
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Underway_tickets=lazy(() => import('./pages/Underway'));
const Register=lazy(() => import('./pages/Register'));
const Input=lazy(() => import('./forms/submit'));
const SubmitForm=lazy(() => import('./pages/Submit_ticket'));
const Notify=lazy(() => import('./pages/Notifications'));
const MyTickets=lazy(() => import('./pages/My_tickets'));
const Assigned_tickets=lazy(() => import('./pages/Assigned_tickets'));
const Nav_bar=lazy(() => import('./ui/nav_bar'));
const Auth=lazy(() => import('./auth/new_auth'));
function App() {



  return (
    <>
    <Toaster/>
    <Theme>
     
      <Router>
        
          <Routes>
            <Route path="/register" element={
              <Suspense fallback={<div><Spinner size={"3"} style={{fontSize:"500px"}}></Spinner></div>}>
         
              <Register/>
              </Suspense>}/>
            
            <Route path="/input" element={
              <Suspense fallback={<div><Spinner size={"3"} style={{fontSize:"500px"}}></Spinner></div>}>
         
              <Input/>
              </Suspense>}/>
            <Route path="/" element={<Login_form/>}/>
            <Route path="/nav" element={<Nav_bar/>}/>
            <Route path="/dashboard" element={
               <Suspense fallback={<div><Spinner size={"3"} style={{fontSize:"500px"}}></Spinner></div>}>
   
              <Auth>
                          <Nav_bar>
                      <Dashboard />
              </Nav_bar>
              
              </Auth>
               </Suspense>
            }/>
            <Route path='/submit' element={
               <Suspense fallback={<div><Spinner size={"3"} style={{fontSize:"500px"}}></Spinner></div>}>
         
             <Auth> 
               <Nav_bar>
               
                <SubmitForm/>
                
              </Nav_bar>
              </Auth>
              </Suspense>
            }/>
            <Route path="/my_tickets" element={
               <Suspense fallback={<div><Spinner size={"3"} style={{fontSize:"500px"}}></Spinner></div>}>
         
              <Auth>
              <Nav_bar>
               
              <MyTickets/>
              
              </Nav_bar>
              </Auth>
              </Suspense>
              }/>
              
              <Route path="/notifications" element={
                 <Suspense fallback={<div><Spinner size={"3"} style={{fontSize:"500px"}}></Spinner></div>}>
         
                <Auth>
                  <Nav_bar>
                   
                    <Notify></Notify>
                   
                  </Nav_bar>
                </Auth>
                 </Suspense>
              }/>
              <Route path="/assigned_tickets" element={
                <Suspense fallback={<div><Spinner size={"3"} style={{fontSize:"500px"}}></Spinner></div>}>
                <Auth>
                  <Nav_bar>
                         <Assigned_tickets/>
                    
                    
                  </Nav_bar>
                </Auth>
                </Suspense>
              }/>
               <Route path="/underway_tickets" element={
                 <Suspense fallback={<div><Spinner size={"3"} style={{fontSize:"500px"}}></Spinner></div>}>
            
                <Auth>
                  <Nav_bar>
                           <Underway_tickets/>
                   
                  </Nav_bar>
                </Auth>
                 </Suspense>
              }/>
              
             
          </Routes>

        
      </Router>
      

    </Theme>
     
    </>
  )
}

export default App
