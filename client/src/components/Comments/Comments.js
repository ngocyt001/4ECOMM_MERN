import React, { useState } from 'react';
import { MoreHoriz, Edit, Flag, HighlightOff } from '@mui/icons-material';
import { Avatar, IconButton, Typography, ListItem, ListItemText, Divider } from '@mui/material';
// import { useFormControl } from '@mui/material/FormControl';
// import OutlinedInput from '@mui/material/OutlinedInput';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Comments({ name, content, userImg }) {
    const StyledMenu = styled((props) => (
        <Menu
            elevation={0}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'left',
            }}
            style={{ fontSize: 5 }}
            {...props}
        />
    ))(({ theme }) => ({
        '& .MuiPaper-root': {
            borderRadius: 6,
            marginLeft: theme.spacing(1),
            minWidth: 120,
            color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
            boxShadow:
                'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            '& .MuiMenu-list': {
                padding: '4px 0',
            },
            '& .MuiMenuItem-root': {
                '& .MuiSvgIcon-root': {
                    fontSize: 14,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5),
                },
                '&:active': {
                    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
                },
            },
        },
    }));
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <ListItem alignItems="flex-start" sx={{ marginLeft: 0.3, marginTop: -1.5 }}>
            <Avatar alt={name} src={userImg} sx={{ width: 40, height: 40, transform: 'translateY(3px)', margin: 1 }} />
            <ListItemText
                sx={{ marginLeft: 1, marginRight: 1 }}
                primary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline', fontWeight: 'bold', textTransform: 'capitalize' }}
                            component="h3"
                            variant="body2"
                            color="text.primary"
                        >
                            {name}
                        </Typography>
                        <Typography
                            sx={{ display: 'inline', fontWeight: 'light', fontSize: 14, marginLeft: 1 }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {content}
                        </Typography>
                    </React.Fragment>
                }
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline', fontWeight: 'light', fontSize: 12 }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            3 mins ago
                        </Typography>
                        <Typography
                            sx={{ display: 'inline', fontWeight: 'bold', fontSize: 12, marginLeft: 1 }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            reply
                        </Typography>
                        <IconButton
                            size="small"
                            sx={{ margin: '0 5px' }}
                            aria-controls={open ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            variant="contained"
                            disableElevation
                            onClick={handleClick}
                        >
                            <MoreHoriz fontSize="small" />
                        </IconButton>
                        <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose} disableRipple sx={{ fontSize: 13 }}>
                                <Edit />
                                Edit
                            </MenuItem>
                            <MenuItem onClick={handleClose} disableRipple sx={{ fontSize: 13 }}>
                                <Flag />
                                Report
                            </MenuItem>
                            <Divider sx={{ my: 0.2 }} />
                            <MenuItem onClick={handleClose} disableRipple sx={{ fontSize: 13 }}>
                                <HighlightOff />
                                Delete
                            </MenuItem>
                        </StyledMenu>
                    </React.Fragment>
                }
            />
        </ListItem>
    );
}

export default Comments;
