import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Alert, Box, Button, TextField } from '@mui/material';

import { useForgotPasswordMutation, ForgotPasswordPayload } from './useForgotPasswordMutation';
import useDebug from '@hooks/useDebug';
import LoadingElement from '@components/Loading/LoadingElement';

const dataSchema: yup.SchemaOf<ForgotPasswordPayload> = yup.object({
  email: yup.string().email().required(),
});

const ForgotPasswordForm = () => {
  const debug = useDebug('forgot-password:ForgotPasswordForm');

  const { register, handleSubmit, reset } = useForm<ForgotPasswordPayload>({
    resolver: yupResolver(dataSchema),
    mode: 'onBlur',
  });

  const forgotPasswordMutation = useForgotPasswordMutation();
  const onSubmit = async data => {
    try {
      await forgotPasswordMutation.mutateAsync(data);
    } catch (e) {
      debug(e);
    }
    reset();
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
        {...register('email')}
      />

      <Button
        disabled={!forgotPasswordMutation.isIdle}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        {forgotPasswordMutation.isLoading ? <LoadingElement /> : 'Reset password'}
      </Button>
      {forgotPasswordMutation.isSuccess && <Alert severity="info">Email with reset password link was sent</Alert>}
    </Box>
  );
};

export default ForgotPasswordForm;
