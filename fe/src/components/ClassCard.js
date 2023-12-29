import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { indigo } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardActionArea, ClickAwayListener, Divider, Grow, MenuList, Paper, Popper, MenuItem } from '@mui/material';
import { AssignmentIndOutlined, FolderOpenOutlined } from '@mui/icons-material';

export default function ClassCard() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Card className='classCard' 
    sx={{ 
        maxWidth: 350,
        border: 1, 
        borderColor: 'grey.300', 
        borderRadius: '10px', 
        mb: '10px',
        boxShadow: 0, 
        ":hover": {
            boxShadow: 4
        }
    }}>
      <CardActionArea href='/classDetail/stream'>
        <CardHeader sx={{backgroundImage: "url('https://mayastepien.nl/googlecalendar/mayastepien-google-pingpong.jpg')"}}
          action={
            <div>
              <IconButton ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true" 
                onMouseDown={event => event.stopPropagation()}
                onClick={event => {
                event.stopPropagation();
                event.preventDefault();
                handleToggle();
              }}>
              <MoreVertIcon sx={{color: 'white'}}/>
              </IconButton>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
                sx={{zIndex: 1000}}
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem
                            onMouseDown={event => event.stopPropagation()}
                            onClick={event => {
                            event.stopPropagation();
                            event.preventDefault();
                            handleClose(event);
                          }}
                          sx={{padding: '15px 50px 15px 20px'}}>Move</MenuItem>
                          <MenuItem 
                            onMouseDown={event => event.stopPropagation()}
                            onClick={event => {
                            event.stopPropagation();
                            event.preventDefault();
                            handleClose(event);
                          }}
                          sx={{padding: '15px 50px 15px 20px'}}>Unenroll</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          }
          title={<Typography 
            variant='h6' 
            sx={{color: 'white', 
            ":hover":{textDecoration: 'underline'},
            width: '220px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>2310-CLC-AWP-20KTPM2aaaa<br/> 
            <Typography sx={{color: 'white', fontSize: '14px', ":hover":{textDecoration: 'underline'}}}>Advanced Web Programming</Typography>
          </Typography>}
          subheader={<Typography sx={{color: 'white', fontSize: '14px', ":hover":{textDecoration: 'underline'}}}>Khánh Nguyễn Huy</Typography>}
        />
      </CardActionArea>
      
      <CardContent sx={{display: 'flex', justifyContent: 'flex-end', height: '150px'}}>
          <Avatar sx={{ bgcolor: indigo[300], mt: '-50px', height: '70px', width: '70px', fontSize: '30px' }} aria-label="recipe">
            K
          </Avatar>
      </CardContent>
      <Divider />
      <CardActions disableSpacing sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <IconButton aria-label="your work">
          <AssignmentIndOutlined />
        </IconButton>
        <IconButton aria-label="folder">
          <FolderOpenOutlined />
        </IconButton>
      </CardActions>
    </Card>
  );
}