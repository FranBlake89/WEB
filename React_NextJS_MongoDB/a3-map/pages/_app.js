import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect } from 'react';

import Layout from '@/components/Layout';
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }) {
  
  useEffect(() =>{
    import("bootstrap/dist/js/bootstrap"); //add bootstrap js library
  }, [] )
  
  return(
    <SWRConfig value={{ fetcher:(...args) => fetch(...args).then((res => res.json())) }}> <Component {...pageProps} /> </SWRConfig>
  )
}


