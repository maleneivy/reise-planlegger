'use client';

import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_TRIPS } from '@/graphql/queries';

export default function SearchTripsComponent() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [searchTrips, { loading, error, data }] = useLazyQuery(SEARCH_TRIPS);

  const handleSearch = () => {
    console.log('Fra:', from, 'Til:', to);
    console.log('Søkevariabler:', {
      from: { name: from },
      to: { name: to },
      numTripPatterns: 3,
      dateTime: new Date().toISOString(),
    });

    searchTrips({
      variables: {
        from: { name: from },
        to: { name: to },
        numTripPatterns: 3,
        dateTime: new Date().toISOString(),
      },
    });
  };

  return (
    <div>
      <h1>Søk etter reiser</h1>
      <input
        type="text"
        placeholder="Fra"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <input
        type="text"
        placeholder="Til"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <button onClick={handleSearch}>Søk</button>

      {loading && <p>Laster...</p>}
      {error && <p>Feil: {error.message}</p>}
      {data?.trip?.tripPatterns && (
        <ul>
          {data.trip.tripPatterns.map((trip: any, index: number) => (
            <li key={index}>
              Starttid: {trip.expectedStartTime}
              <br />
              Varighet: {trip.duration / 60} minutter
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
