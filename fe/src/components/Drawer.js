import { AdminPanelSettings, CalendarToday, Home, Menu, SchoolOutlined, Settings, SupervisorAccountOutlined } from '@mui/icons-material';
import { AppBar, Box, Link, Tooltip, useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AccountMenu from './AccountMenu';
import CreateClass from './CreateClass';
import Notification from './Notification';

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

export default function MiniDrawer({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const user = useSelector(state => state.user.account);

  const navigate = useNavigate();

  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  const isAdmin = user.isAdmin;

  const iconMapping = {
    'Home': <Home />,
    'Calendar': <CalendarToday />,
    'Teaching': <SupervisorAccountOutlined />,
    'Enrolled': <SchoolOutlined />,
    'Admin': <AdminPanelSettings />,
    'Settings': <Settings />
  };

  const urlMapping = {
    'Home': '/',
    'Calendar': '#',
    'Teaching': '/teacher/teaching',
    'Enrolled': '/student/enrolled',
    'Admin': '/admin/account',
    'Settings': '#'
  }

  useEffect(() => {
    if (user && user.auth === false) {
      navigate('/login');
    }
  }, [user]);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (<>
    {(window.location.pathname !== '/login' && window.location.pathname !== '/signUp') &&
      <>
        <CssBaseline />
        <AppBar sx={{ background: "#063970", padding: '8px 0 8px 0', zIndex: theme.zIndex.drawer + 1 }} position="fixed">
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
            <Typography variant="h6" sx={{ mr: '50px', fontWeight: 'bold' }}>CLASSROOM</Typography>
            <Box sx={{ marginLeft: "auto", display: 'flex' }}>
              <CreateClass />
              <Notification />
              <AccountMenu />
            </Box>
          </Toolbar>
        </AppBar>
        <Box sx={{ display: 'flex' }}>
          {
            isMatch ? (
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
                  {(isAdmin ? ['Admin', 'Settings'] : ['Settings']).map((text) => (
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
                  open ? (
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
                        {(isAdmin ? ['Admin', 'Settings'] : ['Settings']).map((text) => (
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
                        {(isAdmin ? ['Admin', 'Settings'] : ['Settings']).map((text) => (
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