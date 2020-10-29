import Link from 'next/link';
import { Link as LinkStyle } from '@chakra-ui/core';

export default function About() {
  return (
    <div>
      Welcome to the about page. Go to the{' '}
      <Link href='/'>
        <LinkStyle>Home</LinkStyle>
      </Link>{' '}
      page.
    </div>
  );
}
