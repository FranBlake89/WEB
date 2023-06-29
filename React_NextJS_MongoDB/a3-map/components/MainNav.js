import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Link from 'next/link';

export default function MainNav(){
    return(
    <>
        <Navbar bg='light' expand='lg' variant="light">
            <Container className='mx-1'>
                <Navbar.Brand >New York Citibike Trips</Navbar.Brand>
                <Nav className="me-auto">
                    <Link href='/' passHref legacyBehavior>
                        <Nav.Link>Full List</Nav.Link> 
                    </Link>
                    <Link href='/about' passHref legacyBehavior>
                        <Nav.Link href="/about">About</Nav.Link>
                    </Link>  
                </Nav>
            </Container>
        </Navbar>
        <br />
        <br />
    </>
    )
}