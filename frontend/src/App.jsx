import './App.css';
import {Route, Routes} from "react-router-dom";
import Layout from './Layout';
import Indexpage from './pages/Indexpage';
import Loginpage from './pages/Loginpage';
import Registerpage from './pages/Registerpage';
import Createpost from './pages/Createpost';
import { UserContextProvider } from './userContext';
import PostPage from './pages/PostPage';
import Editpost from './pages/Editpost';
function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route path="/" element={<Indexpage/>}/>
      <Route path="/login" element={<Loginpage/>}/>
      <Route path="/register" element={<Registerpage/>}/>
      <Route path='/create' element={<Createpost/>}/>
      <Route path="/post/:id" element={<PostPage/>} />
      <Route path='/edit/:id' element={<Editpost/>}/>
      </Route>
    </Routes>
    </UserContextProvider>
    
  );
}

export default App;
