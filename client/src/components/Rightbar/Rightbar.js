import styles from './Rightbar.module.scss';
import UserMiniTab from '../UserMiniTab';
import { getAllUser } from '~/api/UserRequest';

import { Stack, Box, Typography, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const Rightbar = () => {
    const itemData = [
        {
            img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            title: 'Breakfast',
            content: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
        },
        {
            img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            title: 'Burger',
            content: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
        },
        {
            img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            title: 'Camera',
            content: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
        },
        {
            img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            title: 'Coffee',
            content: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
        },
    ];

    const itemRequest = [
        {
            userImg:
                'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
            user: 'Tyrel Barrows',
        },
        {
            userImg:
                'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
            user: 'John Gomez',
        },
    ];

    const [persons, setPersons] = useState([]);

    const { user } = useSelector((state) => state.authReducer.authData);

    useEffect(() => {
        const fetchPersons = async () => {
            const { data } = await getAllUser();
            setPersons(data);
        };
        fetchPersons();
    }, []);

    return (
        <Box flex={2} pt={2} pr={2} pl={1} sx={{ display: { xs: 'none', sm: 'block' } }} className={cx('Wrapper')}>
            <Box className={cx('Container')} sx={{ width: { xs: '30%', md: '22%', lg: 260 } }}>
                <Typography className={cx('Title')} variant="h6" mb={1}>
                    Requests
                </Typography>
                <Stack>
                    {itemRequest.map((item, id) => (
                        <Card
                            key={id}
                            className={cx('Card-req')}
                            sx={{
                                width: '96%',
                                margin: ' auto',
                                marginBottom: '15px',
                                boxShadow: 'var(--border-mode)',
                                borderRadius: '10px',
                            }}
                        >
                            <Box className={cx('Card-req-info')}>
                                <CardMedia
                                    className={cx('Card-req-media')}
                                    component="img"
                                    image={`${item.userImg}?w=1080&h=1080&fit=crop&auto=format`}
                                    alt={item.user}
                                />
                                <Typography className={cx('Card-req-cnt')}>
                                    <span>{item.user} </span>
                                    want to add you to friends
                                </Typography>
                            </Box>

                            <Stack direction="row" spacing={1} className={cx('Card-req-btn')}>
                                <div className={cx('Card-req-btn-acp')}>
                                    <p>Accept</p>
                                </div>
                                <div className={cx('Card-req-btn-deny')}>Decline</div>
                            </Stack>
                        </Card>
                    ))}
                </Stack>
                <Typography className={cx('Title')} variant="h6" mb={1}>
                    Sponsored
                </Typography>
                {itemData.map((item, id) => (
                    <Card
                        key={id}
                        className={cx('Card-spon')}
                        sx={{ boxShadow: 'var(--border-mode)', borderRadius: '10px' }}
                    >
                        <CardActionArea className={cx('Card-spon-item')}>
                            <CardMedia
                                className={cx('Card-spon-media')}
                                component="img"
                                height="140"
                                image={`${item.img}?w=1080&h=1080&fit=crop&auto=format`}
                                alt={item.title}
                            />
                            <CardContent className={cx('Card-spon-cnt')}>
                                <Typography className={cx('Card-spon-cnt-title')} variant="h6" component="div">
                                    {item.title}
                                </Typography>
                                <Typography className={cx('Card-spon-cnt-text')} color="text.primary">
                                    {item.content}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
                <Typography className={cx('Title')} mt={2} mb={1}>
                    People You May know
                </Typography>

                {
                    // eslint-disable-next-line
                    persons.map((person, id) => {
                        if (user._id !== person._id) return <UserMiniTab person={person} id={id} />;
                    })
                }
            </Box>
        </Box>
    );
};

export default Rightbar;
