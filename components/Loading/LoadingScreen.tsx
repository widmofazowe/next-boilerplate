import { Backdrop, CircularProgress } from '@mui/material';

const LoadingScreen = ({ loading = true, message = 'Loading...' }) => {
  return (
    <Backdrop
      sx={{
        '& > *': {
          margin: 2,
        },
        color: 'primary.contrastText',
        zIndex: 10,
      }}
      open={loading}
    >
      <CircularProgress color="inherit" />
      {message}
    </Backdrop>
  );
};

export default LoadingScreen;
