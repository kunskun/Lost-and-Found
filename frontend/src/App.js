import logo from './logo.svg';
import './App.css';
import Detail from './pages/Detail';
import Main from './pages/Main';
import Login from './pages/Login';
import { LoginProvider } from "./contexts/LoginContext";

function App() {
  return (
    <LoginProvider>
      <Routes>
        <Route path="/login" element={ <Login /> } />
        <Route path="/" element={ <Main /> } />
        <Route path="/detail" element={ <Detail /> } />
      </Routes>
    </LoginProvider>

  );
}

export default App;
