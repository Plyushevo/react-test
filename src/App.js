import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import { Container } from "reactstrap";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Logout from "./components/Logout";
import {ToastContainer, toast} from 'react-toastify';
import { Protector } from "./helpers";

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Protector Component={Home} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </Container>
  );
}

export default App;
