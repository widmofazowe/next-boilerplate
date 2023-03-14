import { Box, Button, Grid, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import * as yup from 'yup';

import useDebug from '@hooks/useDebug';
import { useUserRegistrationMutation } from './useUserRegistrationMutation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { User } from '@models/user';

const dataSchema: yup.SchemaOf<User> = yup.object({
  name: yup.string().required(),
  password: yup.string().required(),
  email: yup.string().email().required(),
});

const RegistrationForm = () => {
  const router = useRouter();
  const debug = useDebug('registration:RegistrationForm');
  const { register, handleSubmit } = useForm<User>({
    resolver: yupResolver(dataSchema),
    mode: 'onBlur',
  });

  const userRegistrationMutation = useUserRegistrationMutation();
  const onSubmit = async data => {
    try {
      await userRegistrationMutation.mutateAsync(data);
      router.push('/login');
    } catch (e: any) {
      debug(e);
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            autoComplete="given-name"
            required
            fullWidth
            id="name"
            label="Name"
            autoFocus
            {...register('name')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField required fullWidth id="email" label="Email" autoComplete="email" {...register('email')} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            {...register('password')}
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
    </Box>
  );
};

export default RegistrationForm;
