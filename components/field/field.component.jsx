import { Input } from '@chakra-ui/input';
import { FormLabel, Text } from '@chakra-ui/core';
export default function Field({ name, label, type, autoComplete, required }) {
  return (
    <div>
      <FormLabel id={[name, 'label'].join('-')} htmlFor={[name, 'input'].join('-')}>
        {label} {required ? <Text title='Required'>*</Text> : undefined}
      </FormLabel>
      <br />
      <Input
        w='auto'
        autoComplete={autoComplete}
        id={[name, 'input'].join('-')}
        name={name}
        required={required}
        type={type}
      />
    </div>
  );
}
