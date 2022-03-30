import { Nav, Container, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
const NavBar = () => {
  return (
    <Navbar
      bg='primary'
      variant='dark'
      expand='lg'
      className='mt-4 mb-4 rounded'
    >
      <Container>
        <Navbar.Brand href='/'>Waiter.app</Navbar.Brand>
        <Nav className='me-auto'>
          <Nav.Link as={NavLink} to='/'>
            Home
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default NavBar;
