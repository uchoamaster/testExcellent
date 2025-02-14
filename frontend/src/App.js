import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { Navbar, Nav, Container } from "react-bootstrap"
import ClientRegistration from "./components/ClientRegistration"
import ProductManagement from "./components/ProductManagement"
import OrderManagement from "./components/OrderManagement"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <Router>
      <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Meu App
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/clientes">
                  Clientes
                </Nav.Link>
                <Nav.Link as={Link} to="/produtos">
                  Produtos
                </Nav.Link>
                <Nav.Link as={Link} to="/pedidos">
                  Pedidos
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className="mt-4">
          <Routes>
            <Route path="/clientes" element={<ClientRegistration />} />
            <Route path="/produtos" element={<ProductManagement />} />
            <Route path="/pedidos" element={<OrderManagement />} />
            <Route path="/" element={<h1>Bem-vindo ao Meu App</h1>} />
          </Routes>
        </Container>
      </div>
    </Router>
  )
}

export default App

