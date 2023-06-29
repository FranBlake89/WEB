import PageHeader from "@/components/PageHeader";
import MainNav from '@/components/MainNav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Map from '@/components/Map'


export default function About () {
  const seneca = {
    "start station location": { "coordinates": [-79.34943616, 43.79514851] },
    "end station location": { "coordinates": [-79.36750352, 43.85012304] },
    "start station name": "Seneca College Newham Campus",
    "end station name": "Seneca College Markham Campus"
  }
    return(
        <>
          {/* SOLVE ISSUE WITH ICONS */}
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""/>
        <MainNav />
        <Container>
          <PageHeader title='Francisco' text='Full Stack Developer'/>
          <p className='my-4'>
          I am a scientist by nature, passionate about technology since I was a child. I grew up in the countryside (Ovalle, Chile).

All my ancestors have been dedicated to agriculture so I decided to make a living from it too (BS. Agricultural Engineering), but I never left my passion... technology and solve problems. Following my passion I won an scholarship to go to study to Spain an get an specialization in Precision Agriculture and IOT applied to agriculture. And now, I'm continuing my studies in Seneca College (Toronto, Canada), where I got Ji Hun Kim Mem Scholarship that allow me continuing dreaming.
          </p>
          <br />
        <Card bg='ligth'>
        <Card.Body>
          <Row>
            <Col>
              <p>Seneca College of Applied Arts and Technology, operating as Seneca Polytechnic. is a multiple-campus public college in the Greater Toronto Area, and Peterborough, Ontario, Canada regions. It offers full-time and part-time programs at the baccalaureate, diploma, certificate, and graduate levels. Wikipedia</p>
              <p><strong>Address: </strong>1750 Finch Ave E, North York, ON M2J 2X5</p>
              <p><strong>Phone: </strong> (416) 491-5050</p>
              <p><strong>Undergraduate tuition and fees: </strong>2,686 CAD, International tuition 11,970 CAD (2014 – 15)</p>
              <p><strong>Total enrollment: </strong>97,500 (2014)</p>
              <p><strong>President: </strong>Sammy Sting</p>
              <p><strong>President: </strong>David Agnew</p>
              <p><strong>Founded: </strong> 1967</p> 
            </Col>
            <Col>
              <Map props={seneca} />
            </Col>
          </Row>
          </Card.Body>
        </Card>
          

        
        </Container>
        </>
    )
}



// import { useRouter } from 'next/router';
// import PageHeader from '@/components/PageHeader';
// import dynamic from 'next/dynamic';

// const Map = dynamic(() => import('@/components/Map'), { ssr: false });

// const Trip = ({ trip }) => {
//   const router = useRouter();

//   if (router.isFallback) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <PageHeader
//         title={`Bike: ${trip?.bikeid}`}
//         text={`Start: ${trip?.startStationName} - End: ${trip?.endStationName}`}
//         showSubscriber={trip?.userType === 'Subscriber'}
//         showCustomer={trip?.userType === 'Customer'}
//       />

//       <Map trip={trip} />
//     </div>
//   );
// };

// export async function getStaticPaths() {
//   // Fetch the first page of Trips API and extract the _id values
//   const response = await fetch(`${YOUR_CYCLIC_TRIPS_API}/api/trips?page=1&perPage=10`);
//   const { trips } = await response.json();

//   // Generate static paths using the _id values
//   const paths = trips.map((trip) => ({
//     params: { id: trip._id },
//   }));

//   return {
//     paths,
//     fallback: 'blocking',
//   };
// }

// export async function getStaticProps({ params }) {
//   // Fetch the trip data using the trip ID
//   const response = await fetch(`${YOUR_CYCLIC_TRIPS_API}/api/trips/${params.id}`);
//   const trip = await response.json();

//   return {
//     props: {
//       trip,
//     },
//   };
// }

// export default Trip;
