import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AppBar, Box, Link, Tooltip, useMediaQuery } from '@mui/material';
import React, { useEffect } from 'react';
import AccountMenu from './AccountMenu';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Add, ArchiveOutlined, CalendarToday, Home, Menu, Notifications, SchoolOutlined, Settings, SupervisorAccountOutlined } from '@mui/icons-material';

const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  minHeight: '80px',
  // necessary for content to be below app bar
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer({children}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const user = useSelector(state => state.user.account);

  const navigate = useNavigate();

  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  const iconMapping = {
    'Home': <Home />,
    'Calendar': <CalendarToday />,
    'Teaching': <SupervisorAccountOutlined />,
    'Enrolled': <SchoolOutlined />,
    'Archived classes': <ArchiveOutlined />,
    'Settings': <Settings />
  };

  const urlMapping = {
    'Home': '/',
    'Calendar': '#',
    'Teaching': '/teacher/teaching',
    'Enrolled': '/student/enrolled',
    'Archived classes': '#',
    'Settings': '#'
  }
  
  useEffect(() => {
    console.log(user.auth);
    if(user && user.auth === false){
        navigate('/login');
    }
  }, [user]);

  const handleClick = () => {

  }

  const handleDrawer= () => {
    setOpen(!open);
  };

  return (<>
    { (window.location.pathname !== '/login' && window.location.pathname !== '/signUp' ) &&
      <>
        <CssBaseline />
        <AppBar sx={{ background: "#063970", padding: '8px 0 8px 0', zIndex: theme.zIndex.drawer + 1}} position="fixed">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawer}
                edge="start"
                sx={{
                marginRight: '20px',
                }}
            >
                <Menu />
            </IconButton>
              <Typography variant="h6" sx={{ mr: '50px', fontWeight: 'bold'}}>CLASSROOM</Typography>
                <Box sx={{ marginLeft: "auto", display: 'flex'}}>
                  <IconButton
                    onClick={handleClick}
                    sx={{padding: '10px'}}
                  >
                    <Add style={{ fontSize: '30px', color: 'white' }}/>
                  </IconButton>
                  <IconButton
                    sx={{padding: '10px'}}
                  >
                    <Notifications style={{ fontSize: '25px', color: 'white' }}/>
                  </IconButton>
                  <AccountMenu />
                </Box>
            </Toolbar>
        </AppBar>
        <Box sx={{ display: 'flex' }}>
        { 
          isMatch? (
            <Drawer variant="permanent" open={false}>
              <DrawerHeader />
              <Divider />
              <List>
              {['Home', 'Calendar'].map((text) => (
                <Tooltip title={text} placement="right" arrow>
                  <ListItem key={text} component={Link} href={urlMapping[text]} disablePadding sx={{ display: 'block', color: 'black', margin: '5px 0 5px 0' }}>
                  <ListItemButton
                      sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      }}
                  >
                      <ListItemIcon
                      sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                      }}
                      >
                      {iconMapping[text]}
                      </ListItemIcon>
                      <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                  </ListItem>
                </Tooltip>
              ))}
              </List>
              <Divider />
              <List>
              {['Teaching'].map((text) => (
                <Tooltip title={text} placement="right" arrow>
                  <ListItem key={text} component={Link} href={urlMapping[text]} disablePadding sx={{ display: 'block', color: 'black', margin: '5px 0 5px 0' }}>
                  <ListItemButton
                      sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      }}
                  >
                      <ListItemIcon
                      sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                      }}
                      >
                      {iconMapping[text]}
                      </ListItemIcon>
                      <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                  </ListItem>
                </Tooltip>
              ))}
              </List>
              <Divider />
              <List>
              {['Enrolled'].map((text) => (
                <Tooltip title={text} placement="right" arrow>
                  <ListItem key={text} component={Link} href={urlMapping[text]} disablePadding sx={{ display: 'block', color: 'black', margin: '5px 0 5px 0' }}>
                  <ListItemButton
                      sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      }}
                  >
                      <ListItemIcon
                      sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                      }}
                      >
                      {iconMapping[text]}
                      </ListItemIcon>
                      <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                  </ListItem>
                </Tooltip>
              ))}
              </List>
              <Divider />
              <List>
              {['Archived classes', 'Settings'].map((text) => (
                <Tooltip title={text} placement="right" arrow>
                  <ListItem key={text} component={Link} href={urlMapping[text]} disablePadding sx={{ display: 'block', color: 'black', margin: '5px 0 5px 0' }}>
                  <ListItemButton
                      sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      }}
                  >
                      <ListItemIcon
                      sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                      }}
                      >
                      {iconMapping[text]}
                      </ListItemIcon>
                      <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                  </ListItem>
                </Tooltip>
              ))}
              </List>
          </Drawer>
          ) : (
          <Drawer variant="permanent" open={open}>
              <DrawerHeader />
              <Divider />
              {
                open? ( 
                <>
                  <List>
                  {['Home', 'Calendar'].map((text) => (
                      <ListItem key={text} component={Link} href={urlMapping[text]} disablePadding sx={{ display: 'block', color: 'black', margin: '5px 0 5px 0' }}>
                      <ListItemButton
                          sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                          }}
                      >
                          <ListItemIcon
                          sx={{
                              minWidth: 0,
                              mr: open ? 3 : 'auto',
                              justifyContent: 'center',
                          }}
                          >
                          {iconMapping[text]}
                          </ListItemIcon>
                          <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                      </ListItem>
                  ))}
                  </List>
                  <Divider />
                  <List>
                  {['Teaching'].map((text) => (
                      <ListItem key={text} component={Link} href={urlMapping[text]} disablePadding sx={{ display: 'block', color: 'black', margin: '5px 0 5px 0' }}>
                      <ListItemButton
                          sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                          }}
                      >
                          <ListItemIcon
                          sx={{
                              minWidth: 0,
                              mr: open ? 3 : 'auto',
                              justifyContent: 'center',
                          }}
                          >
                          {iconMapping[text]}
                          </ListItemIcon>
                          <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                      </ListItem>
                  ))}
                  </List>
                  <Divider />
                  <List>
                  {['Enrolled'].map((text) => (
                      <ListItem key={text} component={Link} href={urlMapping[text]} disablePadding sx={{ display: 'block', color: 'black', margin: '5px 0 5px 0' }}>
                      <ListItemButton
                          sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                          }}
                      >
                          <ListItemIcon
                          sx={{
                              minWidth: 0,
                              mr: open ? 3 : 'auto',
                              justifyContent: 'center',
                          }}
                          >
                          {iconMapping[text]}
                          </ListItemIcon>
                          <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                      </ListItem>
                  ))}
                  </List>
                  <Divider />
                  <List>
                  {['Archived classes', 'Settings'].map((text) => (
                      <ListItem key={text} component={Link} href={urlMapping[text]} disablePadding sx={{ display: 'block', color: 'black', margin: '5px 0 5px 0' }}>
                      <ListItemButton
                          sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                          }}
                      >
                          <ListItemIcon
                          sx={{
                              minWidth: 0,
                              mr: open ? 3 : 'auto',
                              justifyContent: 'center',
                          }}
                          >
                          {iconMapping[text]}
                          </ListItemIcon>
                          <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                      </ListItem>
                  ))}
                  </List>
                </>
                ) : (
                  <>
                  <List>
                  {['Home', 'Calendar'].map((text) => (
                    <Tooltip title={text} placement="right" arrow>
                      <ListItem key={text} component={Link} href={urlMapping[text]} disablePadding sx={{ display: 'block', color: 'black', margin: '5px 0 5px 0' }}>
                      <ListItemButton
                          sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                          }}
                      >
                          <ListItemIcon
                          sx={{
                              minWidth: 0,
                              mr: open ? 3 : 'auto',
                              justifyContent: 'center',
                          }}
                          >
                          {iconMapping[text]}
                          </ListItemIcon>
                          <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                      </ListItem>
                    </Tooltip>
                  ))}
                  </List>
                  <Divider />
                  <List>
                  {['Teaching'].map((text) => (
                    
                    <Tooltip title={text} placement="right" arrow>
                      <ListItem key={text} component={Link} href={urlMapping[text]} disablePadding sx={{ display: 'block', color: 'black', margin: '5px 0 5px 0' }}>
                      <ListItemButton
                          sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                          }}
                      >
                          <ListItemIcon
                          sx={{
                              minWidth: 0,
                              mr: open ? 3 : 'auto',
                              justifyContent: 'center',
                          }}
                          >
                          {iconMapping[text]}
                          </ListItemIcon>
                          <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                      </ListItem>
                    </Tooltip>
                  ))}
                  </List>
                  <Divider />
                  <List>
                  {['Enrolled'].map((text) => (
                    
                    <Tooltip title={text} placement="right" arrow>
                      <ListItem key={text} component={Link} href={urlMapping[text]} disablePadding sx={{ display: 'block', color: 'black', margin: '5px 0 5px 0' }}>
                      <ListItemButton
                          sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                          }}
                      >
                          <ListItemIcon
                          sx={{
                              minWidth: 0,
                              mr: open ? 3 : 'auto',
                              justifyContent: 'center',
                          }}
                          >
                          {iconMapping[text]}
                          </ListItemIcon>
                          <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                      </ListItem>
                    </Tooltip>
                  ))}
                  </List>
                  <Divider />
                  <List>
                  {['Archived classes', 'Settings'].map((text) => (
                    <Tooltip title={text} placement="right" arrow>
                      <ListItem key={text} component={Link} href={urlMapping[text]} disablePadding sx={{ display: 'block', color: 'black', margin: '5px 0 5px 0' }}>
                      <ListItemButton
                          sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                          }}
                      >
                          <ListItemIcon
                          sx={{
                              minWidth: 0,
                              mr: open ? 3 : 'auto',
                              justifyContent: 'center',
                          }}
                          >
                          {iconMapping[text]}
                          </ListItemIcon>
                          <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                      </ListItem>
                    </Tooltip>
                  ))}
                  </List>
                </>
                )
              }
          </Drawer>
          )
        }
          <Box component="main" sx={{ flexGrow: 1, p: '15px 0' }} >
              <DrawerHeader />
              {children}
          </Box>
        </Box>
      </>
    }
    </>
  );
}