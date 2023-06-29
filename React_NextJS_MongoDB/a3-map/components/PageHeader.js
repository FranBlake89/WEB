import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function PageHeader({title, text, showSubscriber, showCustomer}){
    //console.log('::::::',props.title);
    //console.log('::::::>>',props)
    return(
        <>
        <Card  bg='light'>
            <Card.Body>
                <h3>{title}</h3>
                {text}
                <div className='float-end'>
                    { showSubscriber && 
                        <Button className={'Subscriber mx-1'} variant='outline-light'>Subscribers</Button>}
                    { showCustomer && 
                        <Button className={'Customer'} variant='outline-light'>Customers</Button>}
                </div>
            </Card.Body>
        </Card>
        <br />
        </>
    );
}