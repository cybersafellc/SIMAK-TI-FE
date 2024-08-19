import { Col, Container, Nav, Row } from "react-bootstrap";

export default function Footers() {
  return (
    <>
      <footer className="py-5 bg-success text-white">
        <Container>
          <Row>
            <Col className="d-flex align-items-center">
              <div>
                @ Copyright <span className="fw-bold">UMRI</span>. All Rights
                Reserved
              </div>
            </Col>
            <Col className="d-flex align-items-center justify-content-end">
              <div className="d-flex gap-3 align-items-center justify-content-end fs-2 ">
                <Nav.Link href="#">
                  <i class="bx bxl-instagram-alt"></i>
                </Nav.Link>
                <Nav.Link href="#">
                  <i class="bx bxl-youtube"></i>
                </Nav.Link>
                <Nav.Link href="#">
                  <i class="bx bxl-instagram-alt"></i>
                </Nav.Link>
                <Nav.Link href="#">
                  <i class="bx bxl-twitter"></i>
                </Nav.Link>
                <Nav.Link href="#">
                  <i class="bx bxl-facebook-circle"></i>
                </Nav.Link>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}
