import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';
import { Button, Text } from '@chakra-ui/core';

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      email
    }
  }
`;

const Index = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(ViewerQuery);
  console.log(data);
  const viewer = data?.viewer;
  console.log('viewer', viewer);
  const shouldRedirect = !(loading || error || viewer);

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/signin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRedirect]);

  if (error) {
    return (
      <div>
        <Text>{error.message}</Text>
        <Link href='/signup'>
          <Button>signup</Button>
        </Link>
        or{' '}
        <Link href='/signin'>
          <Button>signin</Button>
        </Link>
      </div>
    );
  }

  if (viewer) {
    return (
      <div>
        You&apos;re signed in as {viewer.email} goto{' '}
        <Link href='/about'>
          <Button>about</Button>
        </Link>{' '}
        page. or{' '}
        <Link href='/signout'>
          <Button>signout</Button>
        </Link>
      </div>
    );
  }

  return <Text>Loading...</Text>;
};

export default Index;
