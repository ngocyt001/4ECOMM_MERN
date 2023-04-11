import Comments from '../Comments';
import PostPopup from '~/components/Popup/PostPopup';
import styles from './Post.module.scss';
import { likePost } from '~/api/PostRequest';
import { getUser } from '~/api/UserRequest';

import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import {
    Favorite,
    FavoriteBorder,
    MoreVert,
    IosShareRounded,
    Send,
    CameraAlt,
    ChatBubbleOutlineRounded,
    TurnedInNot,
    NotificationsOutlined,
    HighlightOff,
    RemoveCircleOutline,
    VisibilityOffOutlined,
} from '@mui/icons-material';
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Typography,
    FormControl,
    OutlinedInput,
    Box,
    Divider,
    MenuItem,
    Menu,
    styled,
    alpha,
} from '@mui/material';

const cx = classNames.bind(styles);

const Post = ({ idUser, time, imgURL, content, comments, likes, idPost }) => {
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClickPost = () => {
        setOpen(true);
    };

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
                marginLeft: -10,
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

    const { user } = useSelector((state) => state.authReducer.authData);

    const [liked, setLiked] = useState(likes.includes(user._id));

    const [likeCount, setLikeCount] = useState(likes.length);

    const [person, setPerson] = useState();

    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleSetLikes = () => {
        setLiked((prev) => !prev);
        likePost(idPost, user._id);
        liked ? setLikeCount((prev) => prev - 1) : setLikeCount((prev) => prev + 1);
    };

    useEffect(() => {
        const fetchPerson = async () => {
            const { data } = await getUser(idUser);
            setPerson(data);
        };
        fetchPerson();
    }, [idUser]);

    return (
        <Card className={cx('Container')} sx={{ borderRadius: '10px', boxShadow: 'var(--border-mode)' }}>
            <PostPopup
                open={open}
                setOpen={setOpen}
                name={person?.firstname + ' ' + person?.lastname}
                time={time}
                imgURL={imgURL ? process.env.REACT_APP_PUBLIC_FOLDER + imgURL : ''}
                content={content}
                comments={comments}
                likeCount={likeCount}
                userPostImg={
                    publicFolder + person?.profilePicture
                        ? publicFolder + person?.profilePicture
                        : publicFolder + 'defaultProfile.png'
                }
                userMainImg={
                    publicFolder + user?.profilePicture
                        ? publicFolder + user?.profilePicture
                        : publicFolder + 'defaultProfile.png'
                }
            />
            <CardHeader
                avatar={
                    <Avatar
                        sx={{ bgcolor: 'var(--primary)' }}
                        aria-label="recipe"
                        src={
                            publicFolder + person?.profilePicture
                                ? publicFolder + person?.profilePicture
                                : publicFolder + 'defaultProfile.png'
                        }
                    >
                        {person?.lastname.charAt(0).toUpperCase()}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings" onClick={handleClickOptions}>
                        <MoreVert />
                    </IconButton>
                }
                title={person?.lastname}
                subheader={time}
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

            <CardMedia
                component="img"
                height="400px"
                image={imgURL ? process.env.REACT_APP_PUBLIC_FOLDER + imgURL : ''}
                alt="Paella dish"
                onClick={handleClickPost}
                sx={{ cursor: 'pointer' }}
            />

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {content}
                </Typography>
            </CardContent>

            <Divider variant="middle" />

            <CardActions sx={{ margin: '-6px 15px' }}>
                <Box>
                    <IconButton onClick={handleSetLikes}>
                        {liked ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder />}
                    </IconButton>
                    <IconButton aria-label="comments" onClick={() => setShow(true)}>
                        <ChatBubbleOutlineRounded sx={{ transform: 'translateY(1px)' }} />
                    </IconButton>
                    <IconButton aria-label="shares">
                        <IosShareRounded sx={{ transform: 'translateY(-3px)' }} />
                    </IconButton>
                </Box>
            </CardActions>

            <Typography variant="body2" color="text.secondary" sx={{ marginLeft: 3, marginBottom: 1.5 }}>
                {!!likeCount ? `Liked by ${likeCount} others` : 'This post has no likes'}
            </Typography>

            {show ? (
                <div>
                    <Box sx={{ display: 'flex', width: '94.5%' }}>
                        <Avatar
                            alt="Remy Sharp"
                            src={
                                publicFolder + user?.profilePicture
                                    ? publicFolder + user?.profilePicture
                                    : publicFolder + 'defaultProfile.png'
                            }
                            sx={{ width: 40, height: 40, marginLeft: 3 }}
                        />
                        <FormControl sx={{ position: 'relative', width: '100%', marginLeft: 2, marginBottom: 2 }}>
                            <OutlinedInput sx={{ height: 40, borderRadius: '25px' }} placeholder="Place a comment..." />
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
                    {comments && comments.map((item, index) => <Comments key={index} user={item.user} content={item.content} />)}
                </div>
            ) : (
                <span></span>
            )}
        </Card>
    );
};

export default Post;
