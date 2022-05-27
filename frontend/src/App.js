import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate 
} from "react-router-dom";
import './App.css';
import Detail from './pages/Detail';
import Main from './pages/Main';
import Login from './pages/Login';
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import { ItemProvider } from "./contexts/ItemContext";
import { useLogin } from "./contexts/LoginContext";
import { useEffect } from "react";


function App() {
  const {login, admin} = useLogin();
  
  return (
    <ItemProvider>
      <Routes>
        <Route path="/login" element={login ? <Navigate to="/" /> : <Login />} />
        <Route path="/" element={ login ? <Main /> : <Navigate to="/login" />  } />
        <Route path="detail" element={ login ? <Detail /> : null }  />
        <Route path="create" element={ admin ? <Create /> : <h1> Not Have Permission </h1>} />
        <Route path="edit" element={ admin ? <Edit /> : <h1> Not Have Permission </h1>} />
      </Routes>
    </ItemProvider>

  );
}

export default App;
