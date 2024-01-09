import { FolderOpenOutlined, Moving } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardActionArea, ClickAwayListener, Divider, Grow, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export default function TeacherClassCard({classInfo}) {
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
      <CardActionArea href={`/teacher/classDetail/stream?classId=${classInfo.classroom_id}`}>
        <CardHeader sx={{backgroundImage: "url('https://www.gstatic.com/classroom/themes/LanguageArts.jpg')", backgroundSize: 'cover', height: '105px'}}
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
            whiteSpace: 'nowrap',
            mt: '-20px'
          }}>{classInfo.name}<br/> 
            <Typography sx={{color: 'white', fontSize: '14px', ":hover":{textDecoration: 'underline'}}}>{classInfo.subject}</Typography>
          </Typography>}
        />
      </CardActionArea>
      <CardContent sx={{ height: '150px'}} />
      <Divider />
      <CardActions disableSpacing sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <IconButton aria-label="your work">
          <Moving />
        </IconButton>
        <IconButton aria-label="folder">
          <FolderOpenOutlined />
        </IconButton>
      </CardActions>
    </Card>
  );
}