import styles from './EditInfoPopup.module.scss';
import { uploadImage } from '~/actions/UploadAction';
import { updateUser } from '~/actions/UserAction';

import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import { Modal, styled, OutlinedInput, Box } from '@mui/material';

const cx = classNames.bind(styles);

const SytledModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const EditInfoPopup = ({ open, setOpen, data }) => {
    const { password, ...other } = data;

    const [formData, setFormData] = useState(other);

    const [profileImage, setProfileImage] = useState(null);

    const [coverImage, setCoverImage] = useState(null);

    const dispatch = useDispatch();

    const param = useParams();

    // const user_test = useSelector((state) => state.authReducer.authData);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            event.target.name === 'profileImage' ? setProfileImage(img) : setCoverImage(img);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let UserData = formData;
        if (profileImage) {
            const data = new FormData();
            const fileName = Date.now() + profileImage.name;
            data.append('name', fileName);
            data.append('file', profileImage);
            UserData.profilePicture = fileName;
            try {
                dispatch(uploadImage(data));
            } catch (err) {
                console.log(err);
            }
        }
        if (coverImage) {
            const data = new FormData();
            const fileName = Date.now() + coverImage.name;
            data.append('name', fileName);
            data.append('file', coverImage);
            UserData.coverPicture = fileName;
            try {
                dispatch(uploadImage(data));
            } catch (err) {
                console.log(err);
            }
        }
        dispatch(updateUser(param.id, UserData));
        console.log(UserData);
        setOpen(false);
    };

    return (
        <>
            <SytledModal
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={cx('Container')} sx={{ borderRadius: 'var(--border-radius)' }}>
                    <div className={cx('Content')}>
                        <div className={cx('Title')}>
                            <h2>Edit Your Profile</h2>
                        </div>
                        <div className={cx('Name')}>
                            <div className={cx('Last-Name')}>
                                <OutlinedInput
                                    name="lastname"
                                    className={cx('Last-Name-input')}
                                    placeholder="Last Name"
                                    onChange={handleChange}
                                    value={formData.lastname}
                                />
                            </div>
                            <div className={cx('First-Name')}>
                                <OutlinedInput
                                    name="firstname"
                                    className={cx('First-Name-input')}
                                    placeholder="First Name"
                                    onChange={handleChange}
                                    value={formData.firstname}
                                />
                            </div>
                        </div>
                        <div className={cx('Works')}>
                            <OutlinedInput
                                onChange={handleChange}
                                name="workAt"
                                className={cx('Works-input')}
                                placeholder="Works At"
                                value={formData.workAt}
                            />
                        </div>
                        <div className={cx('Address')}>
                            <div className={cx('Address-lives')}>
                                <OutlinedInput
                                    name="livesIn"
                                    className={cx('Address-lives-input')}
                                    placeholder="Lives in"
                                    onChange={handleChange}
                                    value={formData.livesIn}
                                />
                            </div>
                            <div className={cx('Address-country')}>
                                <OutlinedInput
                                    name="country"
                                    className={cx('Address-country-input')}
                                    placeholder="Country"
                                    onChange={handleChange}
                                    value={formData.country}
                                />
                            </div>
                        </div>
                        <div className={cx('Relationship')}>
                            <OutlinedInput
                                name="relationship"
                                className={cx('Relationship-input')}
                                placeholder="Relationship"
                                onChange={handleChange}
                                value={formData.relationship}
                            />
                        </div>
                        <div className={cx('Skill')}>
                            <OutlinedInput
                                onChange={handleChange}
                                name="skills"
                                className={cx('Skill-input')}
                                placeholder="Professional in"
                                value={formData.skills}
                            />
                        </div>
                        <div className={cx('CoverPage')}>
                            <p>Profile image</p>
                            <input type="file" name="profileImage" onChange={onImageChange} />
                            <p>Cover image</p>
                            <input type="file" name="coverImage" onChange={onImageChange} />
                        </div>
                        <div className={cx('Btn')}>
                            <button className={cx('Btn-submit')} onClick={handleSubmit}>
                                Update
                            </button>
                        </div>
                    </div>
                </Box>
            </SytledModal>
        </>
    );
};

export default EditInfoPopup;
