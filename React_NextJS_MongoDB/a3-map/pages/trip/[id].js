import { useRouter } from 'next/router';
import PageHeader from '@/components/PageHeader';
import Map from '@/components/Map';
import MainNav from '@/components/MainNav'
import Container from 'react-bootstrap/Container';

export default function Trip(props) {
    const router = useRouter();

    if(!props){
        return null
    }
    console.log('user::', props.trip.usertype)
    const subscriber = (props.trip.usertype === 'Subscriber')? true: false;
    const customer = (props.trip.usertype === 'Customer') ? true: false;

    return (
        <>
            {/* SOLVE ISSUE WITH ICONS */}
            {/* <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    crossOrigin=""/> */}

        <MainNav />
        <Container>
            <PageHeader title={`Bike: ${props.trip?.bikeid}`} text={`${props.trip['start station name']} - ${props.trip['end station name']}`} showSubscriber={subscriber} showCustomer={customer} />

            <Map props={props.trip}/>
            <ul className='my-4'>
                <li><strong>Trip Duration: </strong>{props.trip?.tripduration}</li>
                <li><strong>Birth Year: </strong>{props.trip['birth year']}</li>
                <li><strong>Start Time: </strong>{props.trip['start time']}</li>
                <li><strong>Stop Time: </strong>{props.trip['stop time']}</li>
            </ul>
        
        </Container>
        </>
    );
}

export async function getStaticPaths (){
    const res = await fetch(`https://careful-teal-threads.cyclic.app/api/trips?page=1&perPage=10`);
    const data = await res.json();

    const paths = data.map((trip) => ({
        params: { id: trip._id },
    }));

    return {
        paths,
        fallback: 'blocking',
    };
}

export async function getStaticProps(context) {

    try{
        const res = await fetch(`https://careful-teal-threads.cyclic.app/api/trips/${context.params.id}`);
        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }
        
        const data = await res.json();
        //console.table(data);

        return { props: { trip: data } };

    } catch (error) {
        console.log(`Could not get Trips: ${error}`);
        return { props: { trip: null } };
    }
}
