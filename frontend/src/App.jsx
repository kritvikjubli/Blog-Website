import './App.css';
import {Route, Routes} from "react-router-dom";
import Layout from './Layout';
import Indexpage from './pages/Indexpage';
import Loginpage from './pages/Loginpage';
import Registerpage from './pages/Registerpage';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route path="/" element={<Indexpage/>}/>
      <Route path="/login" element={<Loginpage/>}/>
      <Route path="/register" element={<Registerpage/>}/>
      </Route>
    </Routes>
    
  );
}

export default App;
