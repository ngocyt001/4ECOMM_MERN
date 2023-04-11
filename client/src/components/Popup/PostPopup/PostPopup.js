import Comments from '~/components/Comments';

import { Fragment, useState } from 'react';
import {
    Avatar,
    Modal,
    styled,
    alpha,
    Typography,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Divider,
    Checkbox,
    FormControl,
    OutlinedInput,
    Menu,
    MenuItem,
} from '@mui/material';
// import React, { useState, useEffect } from 'react';
import {
    MoreVert,
    Favorite,
    FavoriteBorder,
    ChatBubbleOutlineRounded,
    IosShareRounded,
    Send,
    CameraAlt,
    TurnedInNot,
    NotificationsOutlined,
    VisibilityOffOutlined,
    RemoveCircleOutline,
    HighlightOff,
} from '@mui/icons-material';
import { Box } from '@mui/system';

const SytledModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const PostPopup = ({ open, setOpen, name, time, imgURL, content, comments, likeCount, userPostImg, userMainImg }) => {
    var windowWidth = window.innerWidth;
    const StyledMenu = styled((props) => (
        <Menu
            elevation={0}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            style={{
                fontSize: 5,
                marginLeft: -15,
                boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
            }}
            {...props}
        />
    ))(({ theme }) => ({
        '& .MuiPaper-root': {
            borderRadius: 6,
            marginLeft: theme.spacing(1),
            minWidth: 200,
            color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
            boxShadow:
                'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            '& .MuiMenu-list': {
                padding: '4px 0',
            },
            '& .MuiMenuItem-root': {
                '& .MuiSvgIcon-root': {
                    fontSize: 20,
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
    const openOptions = Boolean(anchorEl);
    const handleClickOptions = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            {windowWidth > 720 ? (
                <SytledModal
                    open={open}
                    onClose={(e) => {
                        setOpen(false);
                    }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Card
                        color={'text.primary'}
                        sx={{
                            width: 1000,
                            height: 650,
                            display: 'flex',
                            boxShadow: 'none',
                            margin: '0 20px',
                            borderRadius: '10px',
                        }}
                    >
                        <CardMedia sx={{ width: '55%' }} component="img" alt={name} image={imgURL} />
                        <Box sx={{ width: '45%' }}>
                            <CardHeader
                                avatar={<Avatar aria-label="recipe" src={userPostImg} />}
                                action={
                                    <IconButton aria-label="settings" onClick={handleClickOptions}>
                                        <MoreVert />
                                    </IconButton>
                                }
                                title={name}
                                subheader={time}
                                sx={{ textTransform: 'capitalize' }}
                            />
                            <StyledMenu
                                id="demo-customized-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'demo-customized-button',
                                }}
                                anchorEl={anchorEl}
                                open={openOptions}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose} disableRipple sx={{ fontSize: 14 }}>
                                    <TurnedInNot />
                                    Save this post
                                </MenuItem>
                                <Divider sx={{ my: 0.1 }} />
                                <MenuItem onClick={handleClose} disableRipple sx={{ fontSize: 14 }}>
                                    <NotificationsOutlined />
                                    Turn on notifications
                                </MenuItem>
                                <MenuItem onClick={handleClose} disableRipple sx={{ fontSize: 14 }}>
                                    <VisibilityOffOutlined />
                                    Hide this post
                                </MenuItem>
                                <MenuItem onClick={handleClose} disableRipple sx={{ fontSize: 14 }}>
                                    <RemoveCircleOutline />
                                    Un follow
                                </MenuItem>
                                <Divider sx={{ my: 0.1 }} />
                                <MenuItem onClick={handleClose} disableRipple sx={{ fontSize: 14 }}>
                                    <HighlightOff />
                                    Delete
                                </MenuItem>
                            </StyledMenu>
                            <Divider />
                            <CardContent sx={{ height: 440, marginLeft: '-25px', overflowX: ' hidden' }}>
                                <Comments name={name} content={content} userImg={userPostImg} />
                                {comments &&
                                    comments.map((item, id) => (
                                        <Comments key={id} user={item.user} content={item.content} />
                                    ))}
                            </CardContent>
                            <Divider />
                            <CardActions sx={{ margin: '-6px 4px' }}>
                                <Box>
                                    <Checkbox
                                        icon={<FavoriteBorder />}
                                        checkedIcon={<Favorite sx={{ color: 'red' }} />}
                                    />
                                    <IconButton aria-label="comments">
                                        <ChatBubbleOutlineRounded sx={{ transform: 'translateY(1px)' }} />
                                    </IconButton>
                                    <IconButton aria-label="shares">
                                        <IosShareRounded sx={{ transform: 'translateY(-3px)' }} />
                                    </IconButton>
                                </Box>
                            </CardActions>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ marginLeft: 2, marginBottom: 1.5 }}
                            >
                                {!!likeCount ? `Liked by ${likeCount} others` : 'This post has no likes'}
                            </Typography>
                            <Box sx={{ display: 'flex', width: '97%' }}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={userMainImg}
                                    sx={{ width: 40, height: 40, marginLeft: 2 }}
                                />
                                <FormControl sx={{ position: 'relative', width: '100%', marginLeft: 2 }}>
                                    <OutlinedInput
                                        sx={{ height: 40, borderRadius: '25px' }}
                                        placeholder="Place a comment..."
                                    />
                                    <IconButton
                                        type="button"
                                        aria-label="send_message"
                                        sx={{ position: 'absolute', right: 5, margin: '5.5px 0' }}
                                        size="small"
                                    >
                                        <Send sx={{ fontSize: 20 }} />
                                    </IconButton>
                                    <IconButton
                                        type="button"
                                        aria-label="send_image"
                                        sx={{ position: 'absolute', right: 35, margin: '5.5px 0' }}
                                        size="small"
                                    >
                                        <CameraAlt sx={{ fontSize: 20 }} />
                                    </IconButton>
                                </FormControl>
                            </Box>
                        </Box>
                    </Card>
                </SytledModal>
            ) : (
                <Fragment></Fragment>
            )}
        </>
    );
};

export default PostPopup;
