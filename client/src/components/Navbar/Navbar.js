import styles from './Navbar.module.scss';
import MenuTab, { MenuItemTabs } from '../Menu';
import config from '~/config';
import { logOut } from '~/actions/AuthAction';

import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    HomeIcon,
    HomeActiveIcon,
    GroupIcon,
    GroupActiveIcon,
    ShopIcon,
    ShopActiveIcon,
    ImageIcon,
    ImageActiveIcon,
    WatchIcon,
    WatchActiveIcon,
    SearchIcon,
} from '../Icons';

import classNames from 'classnames/bind';
import { Notifications, Pets, Chat, LocalMall, Logout, Settings, PersonAdd } from '@mui/icons-material';
import {
    AppBar,
    Avatar,
    Badge,
    Box,
    InputBase,
    Menu,
    MenuItem,
    styled,
    Toolbar,
    Typography,
    Divider,
    ListItemIcon,
    IconButton,
    Container,
} from '@mui/material';
import React, { useState } from 'react';

const cx = classNames.bind(styles);

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
});

// const Search = styled('div')(({ theme }) => ({
//     backgroundColor: 'white',
//     padding: '0 10px',
//     borderRadius: theme.shape.borderRadius,
//     width: '40%',
// }));

const UserBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    [theme.breakpoints.up('sm')]: {
        display: 'none',
    },
}));
const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const { user } = useSelector((state) => state.authReducer.authData);

    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(logOut());
    };

    return (
        <AppBar
            position="sticky"
            className={cx('Wrapper')}
            sx={{ bgcolor: 'var(--white)', boxShadow: 'var(--border-mode)' }}
        >
            <Container className={cx('Container')}>
                <StyledToolbar className={cx('Toolbar')}>
                    <Box className={cx('logo')}>
                        <Typography
                            className={cx('logo-icon')}
                            variant="h6"
                            sx={{ display: { xs: 'none', sm: 'block' }, width: '30%' }}
                        >
                            4ECOMM
                        </Typography>
                        <Pets sx={{ display: { xs: 'block', sm: 'none' } }} />
                        <Box className={cx('logo-search')}>
                            <SearchIcon className={cx('logo-search-icon')} />
                            <InputBase className={cx('logo-search-input')} placeholder="search..." />
                        </Box>
                    </Box>

                    <Box className={cx('directions')} sx={{ display: 'flex' }}>
                        <MenuTab className={'Navbar'}>
                            <MenuItemTabs
                                title={null}
                                to={config.routes.home}
                                icon={<HomeIcon />}
                                activeIcon={<HomeActiveIcon />}
                                classCustom={'Navbar'}
                            />

                            <MenuItemTabs
                                title={null}
                                to={config.routes.products}
                                icon={<WatchIcon />}
                                activeIcon={<WatchActiveIcon />}
                                classCustom={'Navbar'}
                            />

                            <MenuItemTabs
                                title={null}
                                to={config.routes.groups}
                                icon={<GroupIcon />}
                                activeIcon={<GroupActiveIcon />}
                                classCustom={'Navbar'}
                            />

                            <MenuItemTabs
                                title={null}
                                to={config.routes.marketplace}
                                icon={<ShopIcon />}
                                activeIcon={<ShopActiveIcon />}
                                classCustom={'Navbar'}
                            />

                            <MenuItemTabs
                                title={null}
                                to={config.routes.products}
                                icon={<ImageIcon />}
                                activeIcon={<ImageActiveIcon />}
                                classCustom={'Navbar'}
                            />
                        </MenuTab>
                    </Box>

                    <Box className={cx('user-opts')}>
                        <IconButton className={cx('user-opts-item')}>
                            <Badge badgeContent={2} color="error">
                                <LocalMall />
                            </Badge>
                        </IconButton>
                        <IconButton className={cx('user-opts-item')} component={NavLink} to={config.routes.chat}>
                            <Badge badgeContent={5} color="error">
                                <Chat />
                            </Badge>
                        </IconButton>
                        <IconButton className={cx('user-opts-item')}>
                            <Badge badgeContent={2} color="error">
                                <Notifications />
                            </Badge>
                        </IconButton>
                        <IconButton onClick={handleClick}>
                            <Avatar
                                sx={{ width: 30, height: 30 }}
                                src={
                                    publicFolder + user.profilePicture
                                        ? publicFolder + user.profilePicture
                                        : publicFolder + 'defaultProfile.png'
                                }
                            />
                        </IconButton>
                        <UserBox onClick={handleClick}>
                            <Typography variant="span">John</Typography>
                        </UserBox>
                    </Box>
                </StyledToolbar>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            borderRadius: '8px',
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1,
                            ml: -0.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem component={NavLink} to={config.routes.currentProfile + `/${user._id}`}>
                        <Avatar
                            src={
                                publicFolder + user.profilePicture
                                    ? publicFolder + user.profilePicture
                                    : publicFolder + 'defaultProfile.png'
                            }
                        />
                        Profile
                    </MenuItem>
                    {/* </NavLink> */}
                    <MenuItem>
                        <Avatar /> My account
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Add another account
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem onClick={handleLogOut}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </Container>
        </AppBar>
    );
};

export default Navbar;
