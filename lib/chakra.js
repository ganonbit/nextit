import { ChakraProvider, cookieStorageManager, localStorageManager, CSSReset } from '@chakra-ui/core';
import customTheme from '../theme/theme';

export function Chakra({ cookies, children }) {
  // b) Pass `colorModeManager` prop
  const colorModeManager = typeof cookies === 'string' ? cookieStorageManager(cookies) : localStorageManager;

  return (
    <ChakraProvider theme={customTheme} colorModeManager={colorModeManager}>
      <CSSReset />
      {children}
    </ChakraProvider>
  );
}

// also export a reusable function getServerSideProps
export function getServerSideProps({ req }) {
  return {
    props: {
      // first time users will not have any cookies and you may not return
      // undefined here, hence ?? is necessary
      cookies: req.headers.cookie ?? '',
    },
  };
}
