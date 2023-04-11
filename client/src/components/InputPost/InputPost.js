import AddPopup from '../Popup/AddPopup';
import styles from './InputPost.module.scss';
import { VideoIcon, PhotosIcon, EmojiIcon } from '../Icons';

import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import {
    ListItemAvatar,
    Avatar,
    Card,
    Divider,
    // Button,
    FormControl,
    OutlinedInput,
    Paper,
    Box,
    Stack,
} from '@mui/material';

const cx = classNames.bind(styles);

const InputPost = () => {
    const [open, setOpen] = useState(false);

    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    const { user } = useSelector((state) => state.authReducer.authData);

    const handleClick = () => {
        setOpen(true);
    };
    return (
        <Card
            className={cx('Container')}
            sx={{
                boxShadow: 'var(--border-mode)',
                borderRadius: '10px',
            }}
        >
            <AddPopup open={open} setOpen={setOpen} />
            <Box className={cx('Input')}>
                <ListItemAvatar className={cx('Input-avt')}>
                    <Avatar
                        alt="Travis Howard"
                        src={
                            publicFolder + user.profilePicture
                                ? publicFolder + user.profilePicture
                                : publicFolder + 'defaultProfile.png'
                        }
                    />
                </ListItemAvatar>
                <FormControl className={cx('Input-form')}>
                    <OutlinedInput
                        className={cx('Input-form-cnt')}
                        placeholder={"What's on your mind?, " + user.lastname}
                        onClick={handleClick}
                    />
                </FormControl>
            </Box>
            <Divider variant="middle" />
            <Stack className={cx('Actions')} spacing={1} direction="row">
                <Paper className={cx('Actions-btn')} size="Medium">
                    <VideoIcon className={cx('Actions-btn-icon')} />
                    <p>Live video</p>
                </Paper>
                <Paper className={cx('Actions-btn')} size="Medium" onClick={handleClick}>
                    <PhotosIcon className={cx('Actions-btn-icon')} />
                    <p>Media</p>
                </Paper>
                <Paper className={cx('Actions-btn')} size="Medium">
                    <EmojiIcon className={cx('Actions-btn-icon', 'icon-fix')} />
                    <p>Emotions</p>
                </Paper>
            </Stack>
        </Card>
    );
};

export default InputPost;
