import Login from "./components/Login"
import Signup from "./components/Signup"
import MainContent from "./components/MainContent";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signup />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
