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

      <div className="mb-4">
        <LocationSearch label="Fra" onSelect={setFrom} />
        <LocationSearch label="Til" onSelect={setTo} />
      </div>

      <button
        onClick={handleSearch}
        className="py-2 px-4 rounded bg-green-800 text-white hover:bg-green-700 active:bg-green-600"
        disabled={!from || !to || loading}
      >
        Søk
      </button>

      {loading && <p className="mt-4 text-blue-500">Laster...</p>}
      {error && <p className="mt-4 text-red-500">Feil: {error.message}</p>}

      {data?.trip?.tripPatterns && (
        <ul className="mt-4">
          {data.trip.tripPatterns.map((trip: any, index: number) => (
            <li key={index} className="p-4 bg-slate-100 m-4 rounded shadow-sm">
              <strong>Starttid:</strong>{' '}
              {new Date(trip.expectedStartTime).toLocaleString()}
              <br />
              <strong>Varighet:</strong> {(trip.duration / 60).toFixed(2)}{' '}
              minutter
              <br />
              <strong>Transportmidler:</strong>
              <ul className="ml-4 mt-2">
                {trip.legs.map((leg: any, legIndex: number) => (
                  <li
                    key={legIndex}
                    className="border rounded p-2 bg-slate-200 dark:bg-blue-950 mb-2"
                  >
                    <strong>Modus:</strong> {leg.mode}
                    <br />
                    <strong>Avstand:</strong> {leg.distance} meter
                    {leg.line && (
                      <>
                        <br />
                        <strong>Linje:</strong> {leg.line.publicCode}
                      </>
                    )}
                    <br />
                    <strong>Start:</strong> {leg.fromPlace.name} (
                    {leg.fromPlace.latitude}, {leg.fromPlace.longitude})
                    <br />
                    <strong>Slutt:</strong> {leg.toPlace.name} (
                    {leg.toPlace.latitude}, {leg.toPlace.longitude})
                    <br />
                    <strong>Starttid:</strong>{' '}
                    {new Date(leg.expectedStartTime).toLocaleTimeString()}
                    <br />
                    <strong>Slutttid:</strong>{' '}
                    {new Date(leg.expectedEndTime).toLocaleTimeString()}
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
