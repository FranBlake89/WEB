import styles from '../styles/Home.module.css'
import { Container, Pagination, Table } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import MainNav from '@/components/MainNav';

export default function Home() {
  const router = useRouter();

  let [page, setPage] = useState(1);
  let [pageData, setPageData] = useState([]);

  const {data, error} = useSWR(`https://careful-teal-threads.cyclic.app/api/trips?page=${page}&perPage=10`)

  useEffect(() => {
    if (data){
      console.log('data', data);
      setPageData(data);
    }
  }, [data]);

  const previous = () => {
    if (page > 1){
      setPage(page - 1);
    }
  };

  const next = () => {
    if (page < pageData.length){
      setPage(page + 1);
    }
  };

  return (
    <>
    <MainNav />
    <Container>
      <PageHeader title='Trips List' text='Full list of city trips.' showSubscriber={true} showCustomer={true} />
      
      <Table bordered hover>
        <thead>
          <tr>
            <th>Bike ID</th>
            <th>Start station</th>
            <th>End Station</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {pageData ? (
              pageData.map((trip, index) => {
              //console.table('trip', pageData);
              return (
                <tr key={trip._id} 
                    className={trip.usertype}
                    onClick={() => { router.push(`/trip/${trip._id}`) }}
                >
                  <td className={trip.usertype} >{trip.bikeid}</td>
                  <td className={trip.usertype} >{trip['start station name']}</td>
                  <td className={trip.usertype} >{trip['end station name']}</td>
                  <td className={trip.usertype} >{(trip.tripduration / 60).toFixed(2)}</td>
                </tr>
              );
            }) 
          ) : (
              <tr>
                <td colSpan='4'>Loading...</td>
              </tr>
            )}
        </tbody>
      </Table>
      
      <Pagination>
        <Pagination.Prev onClick={previous} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={next} />
      </Pagination>

    </Container>
    </>
  );
}
