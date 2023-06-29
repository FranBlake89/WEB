import MainNav from "./MainNav";
import Container from 'react-bootstrap';

export default function Layout({propTypes}){
    return ( 
    <>
        <MainNav />;
        <br />
        <Container >
            {propTypes.children}
        </Container>
        <br />
    </>
    )
}
