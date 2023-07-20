import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="box">
      <Header />
      <div className="main">
        <Container>
          <Outlet />
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default App;
