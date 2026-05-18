import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function MenuComponent() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as="a" href="/">StockpileMan</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="menubar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">İŒÉŒŸõ</Nav.Link>
            <Nav.Link href="/Add">V‹K“o˜^</Nav.Link>
            <Nav.Link href="/Manage">İŒÉŠÇ—</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MenuComponent;