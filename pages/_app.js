import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../apollo/client';
import { cache } from 'emotion';
import { CacheProvider } from '@emotion/core';
import { Chakra } from '../lib/chakra';

export default function App({ Component, pageProps, cookies }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <CacheProvider value={cache}>
        <Chakra cookies={cookies}>
          <Component {...pageProps} />
        </Chakra>
      </CacheProvider>
    </ApolloProvider>
  );
}
