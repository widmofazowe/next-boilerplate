import { Avatar, Box, Grid, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from '@components/Link';

import type { NextPageWithLayout } from '../../_app';
import NewPasswordForm from '@modules/new-password/NewPasswordForm';

const NewPassword: NextPageWithLayout = () => {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 'xl',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Set new password
      </Typography>
      <NewPasswordForm />
      <Grid container justifyContent="space-around">
        <Grid item>
          <Link href="/login" variant="body2">
            Return to login
          </Link>
        </Grid>
        {/* <Grid item>
          <Link href="#" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid> */}
      </Grid>
    </Box>
  );
};

NewPassword.getLayout = page => <>{page}</>;

export default NewPassword;
