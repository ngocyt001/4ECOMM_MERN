import styles from './AddPopup.module.scss';
import { uploadImage, uploadPost } from '~/actions/UploadAction';

import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import { Avatar, Modal, styled, TextField, Typography, Box } from '@mui/material';
import { EmojiEmotions, Image, PersonAdd, VideoCameraBack, Cancel } from '@mui/icons-material';

const cx = classNames.bind(styles);

const SytledModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const UserBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
});

const AddPopup = ({ open, setOpen }) => {
    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    const dispatch = useDispatch();

    const [image, setImage] = useState(null);

    const imageRef = useRef();

    const desc = useRef();

    const { user } = useSelector((state) => state.authReducer.authData);

    const loading = useSelector((state) => state.postReducer.uploading);

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img);
        }
    };

    // Reset Post Share
    const resetSharePost = () => {
        setImage(null);
        desc.current.value = '';
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        };

        if (image) {
            const data = new FormData();
            const filename = Date.now() + image.name;
            data.append('name', filename);
            data.append('file', image);
            newPost.image = filename;
            console.log(newPost);
            try {
                dispatch(uploadImage(data));
            } catch (error) {
                console.log(error);
            }
        }
        dispatch(uploadPost(newPost));
        resetSharePost();
    };
    return (
        <>
            <SytledModal
                open={open}
                onClose={(e) => {
                    setOpen(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={cx('Container')} sx={{ borderRadius: 'var(--border-radius)' }}>
                    <Typography variant="h6" color="gray" textAlign="center">
                        Create post
                    </Typography>
                    <UserBox className={cx('user-box')}>
                        <Avatar
                            src={
                                publicFolder + user.profilePicture
                                    ? publicFolder + user.profilePicture
                                    : publicFolder + 'defaultProfile.png'
                            }
                            sx={{ width: 30, height: 30 }}
                        />
                        <Typography fontWeight={500} variant="span">
                            {user.firstname + ' ' + user.lastname}
                        </Typography>
                    </UserBox>
                    <TextField
                        required
                        inputRef={desc}
                        className={cx('post-input')}
                        id="standard-multiline-static"
                        multiline
                        rows={6}
                        placeholder="What's on your mind?"
                        variant="standard"
                    />
                    {image && (
                        <div className={cx('previewImage')}>
                            <Cancel className={cx('btn-close')} onClick={() => setImage(null)} />
                            <img src={URL.createObjectURL(image)} alt="" />
                        </div>
                    )}
                    <Box className={cx('reaction')}>
                        <div className={cx('reaction-icon')}>
                            <EmojiEmotions color="primary" />
                        </div>
                        <div className={cx('reaction-icon')} onClick={() => imageRef.current.click()}>
                            <Image color="secondary" />
                        </div>
                        <div className={cx('reaction-icon')}>
                            <VideoCameraBack className={cx('reaction-icon')} color="success" />
                        </div>
                        <div className={cx('reaction-icon')}>
                            <PersonAdd className={cx('reaction-icon')} color="error" />
                        </div>
                    </Box>
                    <button className={cx('btn-submit')} onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Uploading...' : 'Post'}
                    </button>
                    <div style={{ display: 'none' }}>
                        <input type="file" name="myImage" ref={imageRef} onChange={onImageChange} />
                    </div>
                </Box>
            </SytledModal>
        </>
    );
};

export default AddPopup;
