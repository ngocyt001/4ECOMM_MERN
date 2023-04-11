import Navbar from '~/components/Navbar';
import MainProfile from '~/components/MainProfile';
import SideProfile from '~/components/SideProfile';
import InputPost from '~/components/InputPost';
import PostList from '~/components/PostList';
import styles from './Profile.module.scss';

import classNames from 'classnames/bind';
import { useState } from 'react';
import { Container, Box, Tabs, Tab } from '@mui/material';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box className={cx('Body')} sx={{ margin: '15px 0', width: '100%' }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
function Profile() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Navbar />
            <MainProfile />
            <Container className={cx('Container')}>
                <Box className={cx('Content')}>
                    <Box className={cx('Content-tabs')} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs className={cx('Tabs')} value={value} onChange={handleChange}>
                            <Tab className={cx('Tabs-item')} label="Posts" />
                            <Tab className={cx('Tabs-item')} label="About Me" />
                            <Tab className={cx('Tabs-item')} label="Followers" />
                            <Tab className={cx('Tabs-item')} label="Explore" />
                            <Tab className={cx('Tabs-item')} label="My Shop" />
                        </Tabs>
                    </Box>
                    <TabPanel className={cx('TabPanel', 'Posts')} value={value} index={0}>
                        <Box className={cx('item-1')}>
                            <SideProfile />
                        </Box>
                        <Box className={cx('item-2')}>
                            <InputPost />
                            <PostList />
                        </Box>
                    </TabPanel>
                    <TabPanel className={cx('TabPanel')} value={value} index={1}>
                        About Me
                    </TabPanel>
                    <TabPanel className={cx('TabPanel')} value={value} index={2}>
                        Followers
                    </TabPanel>
                    <TabPanel className={cx('TabPanel')} value={value} index={3}>
                        Explore
                    </TabPanel>
                    <TabPanel className={cx('TabPanel')} value={value} index={4}>
                        My Shop
                    </TabPanel>
                </Box>
            </Container>
        </>
    );
}

export default Profile;
