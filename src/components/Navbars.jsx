import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Image } from "react-bootstrap";

function Navbars() {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary py-3 shadow position-fixed w-100 z-3"
    >
      <Container>
        <Navbar.Brand href="#home">
          <div className="d-flex align-items-center gap-2">
            <Image src="LOGO-UMRI-COLOR-ORI.webp" className="logo" />
            <span className="text-uppercase fs-5">Simak Ti</span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-3 py-4 py-lg-0">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/download">Download Berkas</Nav.Link>
            <Nav.Link href="/pembimbing">Informasi Pembimbing</Nav.Link>
            <NavDropdown title="Login" id="basic-nav-dropdown">
              <NavDropdown.Item href="/kordinators/login" className="click">
                Kordinator
              </NavDropdown.Item>
              <NavDropdown.Item href="/pembimbing/login" className="click">
                Dosen Pembimbing
              </NavDropdown.Item>
              <NavDropdown.Item href="/mahasiswa/login" className="click">
                Mahasiswa
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;
