import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import './App.css';
import Detail from './pages/Detail';
import Main from './pages/Main';
import { ItemProvider } from "./contexts/ItemContext";

function App() {
  
  return (
    <ItemProvider>
      <Routes>
        <Route path="/" element={ <Main /> } />
        <Route path="/detail" element={ <Detail /> } />
      </Routes>
    </ItemProvider>
  );
}

export default App;
