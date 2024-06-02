// src/views/SideMenu.tsx
import { Box, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { Dashboard, School } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const SideMenu = () => {
  return (
    <Box
      sx={{
        width: 250,
        height: '100%',
        backgroundColor: 'background.light',
        padding: '1rem',
        color: 'white', 
        position: ''
      }}
    >
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon sx={{ color: 'white' }}>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/schools">
          <ListItemIcon sx={{ color: 'white' }}>
            <School />
          </ListItemIcon>
          <ListItemText primary="Schools" />
        </ListItem>
      </List>
    </Box>
  );
};

export default SideMenu;
