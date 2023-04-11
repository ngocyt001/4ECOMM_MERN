import styles from './MainProfile.module.scss';
import Image from '~/components/Image';
import * as UserApi from '../../api/UserRequest';
import { followUser, unfollowUser } from '~/actions/UserAction';

import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { Container, AvatarGroup, Avatar } from '@mui/material';
import { AddCircle, Edit, Contactless, Telegram } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function MainProfile() {
    const { user } = useSelector((state) => state.authReducer.authData);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    const params = useParams();

    // lấy id trên đường link profile/.....
    const profileUserId = params.id;

    console.log(profileUserId);

    const [profileUser, setProfileUser] = useState({});

    useEffect(() => {
        const fetchProfileUser = async () => {
            console.log(profileUserId);
            console.log(user);
            if (profileUserId === user._id) {
                setProfileUser(user);
            } else {
                console.log('fetching');
                const { data } = await UserApi.getUser(profileUserId);
                setProfileUser(data);
                console.log(profileUser);
            }
        };
        fetchProfileUser();
        // eslint-disable-next-line
    }, [profileUserId, user]);

    const dispatch = useDispatch();

    const [followed, setFollowed] = useState(profileUser?.followers?.includes(user._id));

    useEffect(() => {
        if (profileUser?.followers?.includes(user._id)) {
            setFollowed((prev) => !prev);
            console.log(followed);
            const fetchProfileUser = async () => {
                const { data } = await UserApi.getUser(profileUserId);
                setProfileUser(data);
            };
            fetchProfileUser();
        }
        // eslint-disable-next-line
    }, [profileUser?.followers?.length]);

    const handleFollow = () => {
        followed ? dispatch(unfollowUser(profileUser._id, user)) : dispatch(followUser(profileUser._id, user));
        setFollowed((prev) => !prev);
    };
    return (
        <div className={cx('Wrapper')}>
            <div className={cx('blur')} style={{ top: '-18%', right: '0' }}></div>
            <div className={cx('blur')} style={{ top: '36%', left: '-8rem' }}></div>
            <Container className={cx('Container')}>
                <div className={cx('Content')}>
                    <Image
                        className={cx('poster')}
                        src={
                            profileUser?.coverPicture
                                ? serverPublic + profileUser?.coverPicture
                                : serverPublic + 'defaultCover.jpg'
                        }
                    />
                    <div className={cx('info')}>
                        <div className={cx('info-img')}>
                            <Image
                                className={cx('info-img-detail')}
                                src={
                                    profileUser?.profilePicture
                                        ? serverPublic + profileUser?.profilePicture
                                        : serverPublic + 'defaultProfile.png'
                                }
                            />
                        </div>
                        <div className={cx('info-content')}>
                            <div className={cx('info-content-detail')}>
                                <p className={cx('content-detail-title')}>
                                    {profileUser?.firstname + ' ' + profileUser?.lastname}
                                </p>
                                <span className={cx('content-detail-follow')}>
                                    {profileUser?.followers?.length} Followers
                                </span>
                                <AvatarGroup max={4}>
                                    <Avatar alt="Remy Sharp" src="" />
                                    <Avatar alt="Travis Howard" src="" />
                                    <Avatar alt="Cindy Baker" src="" />
                                    <Avatar alt="Agnes Walker" src="" />
                                    <Avatar alt="Trevor Henderson" src="" />
                                </AvatarGroup>
                            </div>
                            {profileUser._id === user._id ? (
                                <div className={cx('info-content-action')}>
                                    <button className={cx('content-action-add')}>
                                        <AddCircle />
                                        <p>Add to your news</p>
                                    </button>
                                    <button className={cx('content-action-edit')}>
                                        <Edit />
                                        <p>Edit your profile</p>
                                    </button>
                                </div>
                            ) : (
                                <div className={cx('info-content-action')} onClick={handleFollow}>
                                    <button
                                        className={
                                            followed
                                                ? cx('content-action-follow', 'active')
                                                : cx('content-action-follow')
                                        }
                                    >
                                        <Contactless />
                                        <p>{followed ? 'unfollow' : 'follow'}</p>
                                    </button>
                                    <button className={cx('content-action-mess')}>
                                        <Telegram />
                                        <p>Send Message</p>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default MainProfile;
