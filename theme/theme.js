import { extendTheme } from '@chakra-ui/core';

const config = {
  useSystemColorMode: true,
  initialColorMode: 'dark',
};

const customTheme = extendTheme({ config });

export default customTheme;
