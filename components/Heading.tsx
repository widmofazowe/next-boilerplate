import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { ActionButton } from '@models/action-button';

interface Props {
  title: string;
  description: string;
  mainAction?: ActionButton;
  secondaryAction?: ActionButton;
}

const Heading = ({ title, description, mainAction, secondaryAction }: Props) => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          {description}
        </Typography>
        <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
          {mainAction && (
            <Button variant="contained" onClick={() => mainAction.onClick()}>
              {mainAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="outlined" onClick={() => secondaryAction.onClick()}>
              {secondaryAction.label}
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Heading;
