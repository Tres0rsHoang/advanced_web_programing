import { Notifications } from '@mui/icons-material';
import { Badge, Box, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { grey } from '@mui/material/colors';
import * as React from 'react';
import { selfNotificationsApi } from '../api/notificationService';

export default function Notification() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [notifications, setNotifications] = React.useState([]);

  React.useEffect(() => {
      async function fetchData() {
          var response = await selfNotificationsApi();
          console.log(response.data);
          setNotifications(response.data);
      }
      fetchData();
  }, []);

  return (
    <>
      <IconButton
        sx={{padding: '10px'}}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={notifications ?? 0} color="error">
            <Notifications style={{ fontSize: '25px', color: 'white' }}/>
        </Badge>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{ sx: { borderRadius: "10px" }}}
      >
        <Typography sx={{fontSize: '22px', fontWeight: 'bold', margin: '20px 40px'}}>Notifications</Typography>
        <Divider />
        {
          notifications? (
            <Box sx={{minHeight: '180px', minWidth: '500px', margin: '0 20px 20px 20px'}}>
            {notifications.map(element => 
                <MenuItem onClick={handleClose} sx={{
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  bgcolor: grey[200], 
                  margin: '5px 0',
                  borderRadius: '15px'}}
                >
                    <Tooltip title={<Typography 
                        sx={{fontSize: '13px'}}
                      > 
                          {element.content}
                      </Typography>} placement="right" arrow >
                      <Typography 
                        sx={{ml: '5px',
                        width: '330px',
                        padding: '18px 0',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'}}
                      > 
                          {element.content}
                      </Typography>
                    </Tooltip>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                      <Typography 
                        sx={{
                        padding: '18px 0',
                        fontSize: '13px',
                        color: grey[600]
                        }}
                      > 
                          {element.create_time.slice(0, 10)}
                      </Typography>
                      <Typography 
                        sx={{
                          padding: '18px 0',
                          ml: '3px',
                          fontSize: '13px',
                          color: grey[600]
                          }}
                      > 
                          {element.create_time.slice(12, 16)}
                      </Typography>
                    </Box>
                </MenuItem>)
            }
            </Box>
          ) : (
            <Box sx={{minHeight: '180px', minWidth: '500px', margin: '0 20px 20px 20px'}}></Box>
          )
        }
      </Menu>
    </>
  );
}