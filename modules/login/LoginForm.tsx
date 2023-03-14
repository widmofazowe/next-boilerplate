import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Alert, Box, Button, TextField } from '@mui/material';

import { useLoginMutation, UserCredentials } from './useLoginMutation';
import LoadingElement from '@components/Loading/LoadingElement';
import useDebug from '@hooks/useDebug';

const dataSchema: yup.SchemaOf<UserCredentials> = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const debug = useDebug('login:LoginForm');

  const { register, handleSubmit } = useForm<UserCredentials>({
    resolver: yupResolver(dataSchema),
    mode: 'onBlur',
  });

  const loginMutation = useLoginMutation();
  const onSubmit = async data => {
    try {
      await loginMutation.mutateAsync(data);
      router.push('/');
    } catch (e: any) {
      debug(e);
      const status = e?.response?.status;
      console.log(status);
      if (status >= 500) {
        setErrorMessage('An server error has occured. Please contact with administrator.');
      }
      if (status === 400) {
        setErrorMessage('Invalid login/password');
      } else {
        setErrorMessage('Unknown error. Please contact with administrator.');
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        autoComplete="email"
        autoFocus
        {...register('username')}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        {...register('password')}
      />
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loginMutation.isLoading}>
        {loginMutation.isLoading ? <LoadingElement /> : 'Sign In'}
      </Button>
    </Box>
  );
};

export default LoginForm;
