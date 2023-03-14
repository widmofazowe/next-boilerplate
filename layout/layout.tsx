import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';

import Copyright from '@components/Copyright';

import Header from './Header';
import Navigator from './Navigator';
import AuthGuard from '@components/AuthGuard';

interface Props {
  children: JSX.Element;
  roles: string[];
}

const drawerWidth = 256;

const Layout: React.FC<Props> = ({ children, roles }) => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AuthGuard roles={roles}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )}
          <Navigator PaperProps={{ style: { width: drawerWidth } }} sx={{ display: { sm: 'block', xs: 'none' } }} />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header onDrawerToggle={handleDrawerToggle} />
          <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
            {children}
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
            <Copyright />
          </Box>
        </Box>
      </Box>
    </AuthGuard>
  );
};

export default Layout;
