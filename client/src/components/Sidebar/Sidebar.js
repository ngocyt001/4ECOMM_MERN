import styles from './Sidebar.module.scss';
import {
    HomeIcon,
    HomeActiveIcon,
    BoxIcon,
    BoxActiveIcon,
    DashBoardIcon,
    DashBoardActiveIcon,
    GroupIcon,
    GroupActiveIcon,
    ShopIcon,
    ShopActiveIcon,
    SettingIcon,
    SettingActiveIcon,
    ProfileIcon,
    ProfileActiveIcon,
    MoonIcon,
} from '../Icons';
import MenuTab, { MenuItemTabs } from '../Menu';
import config from '~/config';
import Image from '../Image';

import { useSelector } from 'react-redux';
import { Clear } from '@mui/icons-material';
import classNames from 'classnames/bind';
import { Box, Card, List, ListItem, ListItemButton, ListItemIcon, Switch } from '@mui/material';

const cx = classNames.bind(styles);

const Sidebar = ({ mode, setMode }) => {
    const { user } = useSelector((state) => state.authReducer.authData);
    return (
        <Box
            className={cx('Container')}
            flex={2}
            pt={3}
            pl={2}
            pr={1}
            sx={{
                display: { xs: 'none', sm: 'none', md: 'block' },
            }}
        >
            <Card
                className={cx('Content')}
                sx={{
                    boxShadow: 'var(--border-mode)',
                    borderRadius: '10px',
                }}
            >
                <List>
                    <ListItem disablePadding className={cx('list-item')}>
                        <MenuTab>
                            <MenuItemTabs
                                title="Homepage"
                                to={config.routes.home}
                                icon={<HomeIcon />}
                                activeIcon={<HomeActiveIcon />}
                                classCustom={'Sidebar'}
                            />
                        </MenuTab>
                    </ListItem>

                    <ListItem disablePadding className={cx('list-item')}>
                        <MenuTab>
                            <MenuItemTabs
                                title="Products"
                                to={config.routes.products}
                                icon={<BoxIcon className={cx('icon-fix')} />}
                                activeIcon={<BoxActiveIcon />}
                                classCustom={'Sidebar'}
                            />
                        </MenuTab>
                    </ListItem>

                    <ListItem disablePadding className={cx('list-item')}>
                        <MenuTab>
                            <MenuItemTabs
                                title="Dashboard"
                                to={config.routes.dashboard}
                                icon={<DashBoardIcon />}
                                activeIcon={<DashBoardActiveIcon />}
                                classCustom={'Sidebar'}
                            />
                        </MenuTab>
                    </ListItem>

                    <ListItem disablePadding className={cx('list-item')}>
                        <MenuTab>
                            <MenuItemTabs
                                title="Groups"
                                to={config.routes.groups}
                                icon={<GroupIcon />}
                                activeIcon={<GroupActiveIcon />}
                                classCustom={'Sidebar'}
                            />
                        </MenuTab>
                    </ListItem>

                    <ListItem disablePadding className={cx('list-item')}>
                        <MenuTab>
                            <MenuItemTabs
                                title="Marketplace"
                                to={config.routes.marketplace}
                                icon={<ShopIcon />}
                                activeIcon={<ShopActiveIcon />}
                                classCustom={'Sidebar'}
                            />
                        </MenuTab>
                    </ListItem>

                    <ListItem disablePadding className={cx('list-item')}>
                        <MenuTab>
                            <MenuItemTabs
                                title="Settings"
                                to={config.routes.settings}
                                icon={<SettingIcon />}
                                activeIcon={<SettingActiveIcon />}
                                classCustom={'Sidebar'}
                            />
                        </MenuTab>
                    </ListItem>

                    <ListItem disablePadding className={cx('list-item')}>
                        <MenuTab>
                            <MenuItemTabs
                                title="Profile"
                                to={config.routes.currentProfile + `/${user._id}`}
                                icon={<ProfileIcon />}
                                activeIcon={<ProfileActiveIcon />}
                                classCustom={'Sidebar'}
                            />
                        </MenuTab>
                    </ListItem>

                    <ListItem disablePadding className={cx('list-item')}>
                        <ListItemButton className={cx('list-item-btn')}>
                            <ListItemIcon className={cx('list-item-icon')}>
                                <MoonIcon className={cx('list-item-icon_item', 'mode')} />
                            </ListItemIcon>
                            <Switch onChange={(e) => setMode(mode === 'light' ? 'dark' : 'light')} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Card>

            <Card
                className={cx('Content_invitations')}
                sx={{
                    boxShadow: 'var(--border-mode)',
                    borderRadius: '10px',
                }}
            >
                <Image
                    src="https://cdn.searchenginejournal.com/wp-content/uploads/2021/11/metaverse-marketing-619d04870a8c8-sej.png"
                    className={cx('invitations-img')}
                />
                <p className={cx('invitations-title')}>How to build a strong company</p>
                <div className={cx('invitations-btn')}>
                    <div className={cx('invitations-btn-acp')}>
                        <p>Accept Invitation</p>
                    </div>
                    <div className={cx('invitations-btn-deny')}>
                        <Clear fontSize="small" sx={{ opacity: 0.6 }} />
                    </div>
                </div>
            </Card>
        </Box>
    );
};

export default Sidebar;
