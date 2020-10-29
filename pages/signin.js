import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { gql } from '@apollo/client';
import { useMutation, useApolloClient } from '@apollo/client';
import { Button, Heading, FormControl, FormHelperText, Link as LinkStyle, Text } from '@chakra-ui/core';
import { getErrorMessage } from '../lib/form';
import { Field } from '../components';

const SignInMutation = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      user {
        id
        email
      }
    }
  }
`;

function SignIn() {
  const client = useApolloClient();
  const [signIn] = useMutation(SignInMutation);
  const [errorMsg, setErrorMsg] = useState();
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const emailElement = event.currentTarget.elements.email;
    const passwordElement = event.currentTarget.elements.password;

    try {
      await client.resetStore();
      const { data } = await signIn({
        variables: {
          email: emailElement.value,
          password: passwordElement.value,
        },
      });
      if (data.signIn.user) {
        await router.push('/');
      }
    } catch (error) {
      setErrorMsg(getErrorMessage(error));
    }
  }

  return (
    <>
      <Heading>Sign In</Heading>
      <FormControl onSubmit={handleSubmit}>
        {errorMsg && <Text>{errorMsg}</Text>}
        <Field name='email' type='email' autoComplete='email' required label='Email' />
        <Field name='password' type='password' autoComplete='password' required label='Password' />
        <FormHelperText id='email-helper-text'>We&apos;ll never share your email.</FormHelperText>
        <Button type='submit'>Sign in</Button> or{' '}
        <Link href='signup'>
          <LinkStyle>Sign Up</LinkStyle>
        </Link>
      </FormControl>
    </>
  );
}

export default SignIn;
