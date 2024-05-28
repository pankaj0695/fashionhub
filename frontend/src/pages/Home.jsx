import { Fragment } from 'react';

import Hero from '../components/Hero';
import Popular from '../components/Popular';
import Offer from '../components/Offer';
import NewCollection from '../components/NewCollection';
import NewsLetter from '../components/NewsLetter';

function Home() {
  return (
    <Fragment>
      <Hero />
      <Popular />
      <Offer />
      <NewCollection />
      <NewsLetter />
    </Fragment>
  );
}

export default Home;
