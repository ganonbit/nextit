import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { gql, useMutation } from '@apollo/client';
import { Button, Heading, FormControl, FormHelperText, Link as LinkStyle, Text } from '@chakra-ui/core';
import { getErrorMessage } from '../lib/form';
import { Field } from '../components';

const SignUpMutation = gql`
  mutation SignUpMutation($email: String!, $password: String!) {
    signUp(input: { email: $email, password: $password }) {
      user {
        id
        email
      }
    }
  }
`;

function SignUp() {
  const [signUp] = useMutation(SignUpMutation);
  const [errorMsg, setErrorMsg] = useState();
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const emailElement = event.currentTarget.elements.email;
    const passwordElement = event.currentTarget.elements.password;

    try {
      await signUp({
        variables: {
          email: emailElement.value,
          password: passwordElement.value,
        },
      });

      router.push('/signin');
    } catch (error) {
      setErrorMsg(getErrorMessage(error));
    }
  }

  return (
    <>
      <Heading>Sign Up</Heading>
      <FormControl onSubmit={handleSubmit}>
        {errorMsg && <Text>{errorMsg}</Text>}
        <Field name='email' type='email' autoComplete='email' required label='Email' />
        <Field name='password' type='password' autoComplete='password' required label='Password' />
        <FormHelperText id='email-helper-text'>We&apos;ll never share your email.</FormHelperText>
        <Button type='submit'>Sign up</Button> or{' '}
        <Link href='signin'>
          <LinkStyle>Sign in</LinkStyle>
        </Link>
      </FormControl>
    </>
  );
}

export default SignUp;
