import { gql } from '@apollo/client';

export const SEARCH_TRIPS = gql`
  query GetTrips(
    $from: Location!
    $to: Location!
    $numTripPatterns: Int!
    $dateTime: DateTime!
  ) {
    trip(
      from: $from
      to: $to
      numTripPatterns: $numTripPatterns
      dateTime: $dateTime
    ) {
      tripPatterns {
        expectedStartTime
        duration
        walkDistance
        legs {
          mode
          distance
          line {
            id
            publicCode
          }
        }
      }
    }
  }
`;
