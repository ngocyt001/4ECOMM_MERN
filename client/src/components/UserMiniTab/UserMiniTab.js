import styles from './UserMiniTab.module.scss';
import { followUser, unfollowUser } from '~/actions/UserAction';
import config from '~/config';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function UserMiniTab({ person }) {
    const navigate = useNavigate();

    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    const { user } = useSelector((state) => state.authReducer.authData);

    const [followed, setFollowed] = useState(person.followers.includes(user._id));

    const dispatch = useDispatch();

    const handleFollow = () => {
        followed ? dispatch(unfollowUser(person._id, user)) : dispatch(followUser(person._id, user));
        setFollowed((prev) => !prev);
    };

    const handleClickShowProfile = () => {
        navigate(config.routes.currentProfile + `/${person._id}`);
    };

    return (
        <div className={cx('Container')}>
            <div className={cx('Content')}>
                <div className={cx('Avatar')} onClick={handleClickShowProfile}>
                    <Avatar
                        alt={person.firstname}
                        src={
                            publicFolder + person.profilePicture
                                ? publicFolder + person.profilePicture
                                : publicFolder + 'defaultProfile.png'
                        }
                    />
                </div>
                <div className={cx('User')} onClick={handleClickShowProfile}>
                    <div className={cx('User-name')}>{person.firstname + ' ' + person.lastname}</div>
                    <div className={cx('User-nick-name')}>@{person.firstname}</div>
                </div>
                <div className={cx('Follow')}>
                    <button
                        className={followed ? cx('Follow-btn', 'Follow-btn-active') : cx('Follow-btn')}
                        onClick={handleFollow}
                    >
                        {followed ? 'unfollow' : 'follow'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserMiniTab;
