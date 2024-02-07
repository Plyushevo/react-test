import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { Container } from "reactstrap";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Logout from "./components/Logout";

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
