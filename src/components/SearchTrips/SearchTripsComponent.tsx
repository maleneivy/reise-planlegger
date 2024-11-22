'use client';

import { useState } from 'react';
import LocationSearch from '../LocationSearch/LocationSearch';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_TRIPS } from '@/graphql/queries';

export default function SearchTripsComponent() {
  const [from, setFrom] = useState<{
    name: string;
    coordinates: { latitude: number; longitude: number };
  } | null>(null);
  const [to, setTo] = useState<{
    name: string;
    coordinates: { latitude: number; longitude: number };
  } | null>(null);
  const [searchTrips, { loading, error, data }] = useLazyQuery(SEARCH_TRIPS);

  const handleSearch = () => {
    if (!from || !to) return;
    searchTrips({
      variables: {
        from,
        to,
        numTripPatterns: 3,
        dateTime: new Date().toISOString(),
      },
    });
  };

  return (
    <div>
      <h1>Søk etter reiser</h1>
      <LocationSearch label="Fra" onSelect={setFrom} />
      <LocationSearch label="Til" onSelect={setTo} />
      <button
        onClick={handleSearch}
        className="py-2 px-4 rounded bg-green-800 text-white hover:bg-green-700 active:bg-green-600"
      >
        Søk
      </button>
      {loading && <p>Laster...</p>}
      {error && <p>Feil: {error.message}</p>}
      {data?.trip?.tripPatterns && (
        <ul>
          {data.trip.tripPatterns.map((trip: any, index: number) => (
            <li key={index} className="p-2 bg-slate-100 m-4 rounded">
              <strong>Starttid:</strong>{' '}
              {new Date(trip.expectedStartTime).toLocaleString()}
              <br />
              <strong>Varighet:</strong> {(trip.duration / 60).toFixed(2)}{' '}
              minutter
              <br />
              <strong>Transportmiddel:</strong>
              <ul>
                {trip.legs.map((leg: any, legIndex: number) => (
                  <li
                    key={legIndex}
                    className="border-1 rounded p-2 bg-slate-200 dark:bg-blue-950"
                  >
                    {leg.mode}: {leg.distance} meter
                    {leg.line && ` (Linje: ${leg.line.publicCode})`}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
