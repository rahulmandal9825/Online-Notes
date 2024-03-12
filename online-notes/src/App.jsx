
import './App.css'
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Navbar from './component/Navbar';
import Signin from './component/Signin';
import Signup from './component/Signup';
import Home from './component/Home';

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Sign-in' element={<Signin />} />
        <Route path='/Sign-up' element={<Signup />} />
      </Routes>
      </BrowserRouter>
  )
}

export default App
