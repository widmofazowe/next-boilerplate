import type { NextPage } from 'next';
import Typography from '@mui/material/Typography';

import Link from '@components/Link';

const Home: NextPage = () => {
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        MUI v5 + Next.js with TypeScript example
      </Typography>
      <Link href="/about" color="secondary">
        Go to the about page
      </Link>
    </>
  );
};

export default Home;
