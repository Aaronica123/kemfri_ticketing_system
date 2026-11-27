import "@radix-ui/themes/styles.css"
import { Spinner, Theme } from "@radix-ui/themes/dist/cjs/index.js";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Toast_Provider from "./ui/toast";
import Login_form from "./forms/login_form";
import Nav_bar from "./ui/nav_bar";

import './App.css'

import Auth from "./auth/new_auth";

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
function App() {



  return (
    <>
    <Toaster/>
    <Theme>
     
      <Router>
        <Toast_Provider>
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
              <Auth>
              <Nav_bar>
                <Suspense fallback={<div><Spinner size={"3"} style={{fontSize:"500px"}}></Spinner></div>}>
                  <Dashboard />
                </Suspense>
                
              </Nav_bar>
              </Auth>
            }/>
            <Route path='/submit' element={
             <Auth> 
               <Nav_bar>
                <Suspense fallback={<div><Spinner size={"3"} style={{fontSize:"500px"}}></Spinner></div>}>
         
                <SubmitForm/>
                </Suspense>
              </Nav_bar>
              </Auth>
            }/>
            <Route path="/my_tickets" element={
              <Auth>
              <Nav_bar>
                <Suspense fallback={<div><Spinner size={"3"} style={{fontSize:"500px"}}></Spinner></div>}>
         
              <MyTickets/>
              </Suspense>
              </Nav_bar>
              </Auth>}/>
              
              <Route path="/notifications" element={
                <Auth>
                  <Nav_bar>
                    <Suspense fallback={<div><Spinner size={"3"} style={{fontSize:"500px"}}></Spinner></div>}>
         
                    <Notify></Notify>
                    </Suspense>
                  </Nav_bar>
                </Auth>
              }/>
              <Route path="/assigned_tickets" element={
                <Auth>
                  <Nav_bar>
                    <Suspense fallback={<div><Spinner size={"3"} style={{fontSize:"500px"}}></Spinner></div>}>
                    <Assigned_tickets/>
                    </Suspense>
                    
                  </Nav_bar>
                </Auth>
              }/>
               <Route path="/underway_tickets" element={
                <Auth>
                  <Nav_bar>
                    <Suspense fallback={<div><Spinner size={"3"} style={{fontSize:"500px"}}></Spinner></div>}>
                    <Underway_tickets/>
                    </Suspense>
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
