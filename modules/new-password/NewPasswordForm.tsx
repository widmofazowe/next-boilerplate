import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Alert, Box, Button, Grid, TextField } from '@mui/material';

import { NewPasswordPayload, useNewPasswordMutation } from './useNewPasswordMutation';
import useDebug from '@hooks/useDebug';
import LoadingElement from '@components/Loading/LoadingElement';

const dataSchema: yup.SchemaOf<NewPasswordPayload> = yup.object({
  password: yup.string().required(),
});

const NewPasswordForm = () => {
  const debug = useDebug('new-password:NewPasswordForm');

  const { register, handleSubmit, reset } = useForm<NewPasswordPayload>({
    resolver: yupResolver(dataSchema),
    mode: 'onBlur',
  });

  const newPasswordMutation = useNewPasswordMutation();
  const onSubmit = async data => {
    try {
      await newPasswordMutation.mutateAsync(data);
    } catch (e) {
      debug(e);
    }
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
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

      <Button
        disabled={newPasswordMutation.isLoading}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        {newPasswordMutation.isLoading ? <LoadingElement /> : 'Set new password'}
      </Button>
      {newPasswordMutation.isSuccess && <Alert severity="info">New password was set. You can now log in</Alert>}
    </Box>
  );
};

export default NewPasswordForm;
