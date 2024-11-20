/**
 * Oppretter og eksporterer en Apollo Client-instans for GraphQL-spørringer.
 * Miljøvariabel NEXT_PUBLIC_ET_CLIENT_NAME brukes for å holde klientnavnet hemmelig.
 *
 * Apollo Client brukes til å håndtere kommunikasjon med GraphQL API-et,
 * inkludert spørringer, mutasjoner og caching av data.
 *
 * Konfigurasjon:
 * - `uri`: URL-en til GraphQL-endepunktet (Entur Journey Planner v3 API).
 * - `cache`: En in-memory cache for å håndtere mellomlagring av data lokalt.
 * - `headers`: HTTP-overskrifter for autentisering og datatyper.
 *    - `Content-Type`: Angir at dataene sendes som JSON.
 *    - `ET-Client-Name`: Identifiserer applikasjonen som gjør forespørselen.
 *
 * @see {@link https://www.apollographql.com/docs/react/ Apollo Client-dokumentasjon}
 * @see {@link https://developer.entur.org/pages-journeyplanner-journeyplanner Entur API-dokumentasjon}
 *
 * @example
 * ```typescript
 * import client from '@/graphql/client';
 *
 * // Bruk klienten i ApolloProvider
 * <ApolloProvider client={client}>
 *   <App />
 * </ApolloProvider>
 * ```
 *
 * @example
 * ```typescript
 * import { gql, useQuery } from '@apollo/client';
 * import client from '@/graphql/client';
 *
 * const MY_QUERY = gql`
 *   query {
 *     trip(from: {...}, to: {...}) {
 *       tripPatterns {
 *         duration
 *         legs {
 *           mode
 *         }
 *       }
 *     }
 *   }
 * `;
 *
 * const { loading, error, data } = useQuery(MY_QUERY, { client });
 * ```
 */
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.entur.io/journey-planner/v3/graphql',
  cache: new InMemoryCache(),
  headers: {
    'Content-Type': 'application/json',
    'ET-Client-Name':
      process.env.NEXT_PUBLIC_ET_CLIENT_NAME || 'default-client-name',
  },
});

export default client;
