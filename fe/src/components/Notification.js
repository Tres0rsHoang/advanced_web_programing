import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Badge, Box, Divider, IconButton, Typography } from '@mui/material';
import { Notifications } from '@mui/icons-material';

export default function Notification() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        sx={{padding: '10px'}}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={4} color="error">
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
        <Box sx={{minHeight: '180px', minWidth: '500px', margin: '0 20px 20px 20px'}}>
            <MenuItem onClick={handleClose}>
                <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px', fontWeight: 'bold'}}>
                    <Avatar src={null} sx={{margin: '20px 10px 20px 5px', bgcolor: '#0074cc', height: '35px', width: '35px', fontSize: '20px', fontWeight: 500}}>K</Avatar> Khánh Nguyễn Huy
                </Typography>
                <Typography 
                    sx={{ml: '5px',
                    width: '270px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'}}
                > 
                    finalizes a grade composition
                </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px', fontWeight: 'bold'}}>
                    <Avatar src={null} sx={{margin: '20px 10px 20px 5px', bgcolor: '#0074cc', height: '35px', width: '35px', fontSize: '20px', fontWeight: 500}}>K</Avatar> Khánh Nguyễn Huy
                </Typography>
                <Typography 
                    sx={{ml: '5px',
                    width: '270px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'}}
                > 
                    finalizes a grade composition
                </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px', fontWeight: 'bold'}}>
                    <Avatar src={null} sx={{margin: '20px 10px 20px 5px', bgcolor: '#0074cc', height: '35px', width: '35px', fontSize: '20px', fontWeight: 500}}>K</Avatar> Khánh Nguyễn Huy
                </Typography>
                <Typography 
                    sx={{ml: '5px',
                    width: '270px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'}}
                > 
                    finalizes a grade composition
                </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', fontSize: '15px', fontWeight: 'bold'}}>
                    <Avatar src={null} sx={{margin: '20px 10px 20px 5px', bgcolor: '#0074cc', height: '35px', width: '35px', fontSize: '20px', fontWeight: 500}}>K</Avatar> Khánh Nguyễn Huy
                </Typography>
                <Typography 
                    sx={{ml: '5px',
                    width: '270px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'}}
                > 
                    finalizes a grade composition
                </Typography>
            </MenuItem>
        </Box>
      </Menu>
    </div>
  );
}