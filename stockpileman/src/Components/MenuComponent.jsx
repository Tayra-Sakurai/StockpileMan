import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function MenuComponent() {
  return (
    <Navbar expand="1g" className="bg-body-tertially">
      <Container>
        <Navbar.Brand href="#">StockpileMan</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="manubar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">メニュー</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MenuComponent;