import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Home from "./pages/Home";
import Formations from "./pages/Formations";
import Registration from "./pages/Registration";

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import 'react-toastify/dist/ReactToastify.css';
import "./App.css"
import "./index.css"
import 'react-quill/dist/quill.snow.css';
import Login from "./pages/Login";
import { UserAuthContextProvider } from "./context/userAuthContext";
import Dashboard from "./pages/Dashboard";
import FormationDetails from "./components/FormationDetails";

const App = () => {

  return (
    <UserAuthContextProvider>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/formations" element={<Formations/>}/>
          <Route exact path="/registration" element={<Registration/>}/>

          <Route path="admin">
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          <Route path="formation">
            <Route path=":formationId" element={<FormationDetails />} />
          </Route>

        </Routes>
      </Router>
      </UserAuthContextProvider>
  );
}


export default App;