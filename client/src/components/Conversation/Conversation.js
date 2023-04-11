import { getUser } from '~/api/UserRequest';
import styles from './Conversation.module.scss';

import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Avatar } from '@mui/material';

const cx = classNames.bind(styles);

function Conversation({ data, currentUser, online }) {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userId = data.members.find((id) => id !== currentUser);
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId);
                setUserData(data);
                // dispatch({type:"SAVE_USER", data:data})
                console.log(userData);
            } catch (error) {
                console.log(error);
            }
        };

        getUserData();
    }, []);

    return (
        <>
            <div className={cx('conversation')}>
                <div className={cx('container')}>
                    <div style={{position: 'relative'}}>
                    <Avatar
                        className={cx('followerImage')}
                        src={
                            userData?.profilePicture
                                ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture
                                : process.env.REACT_APP_PUBLIC_FOLDER + 'defaultProfile.png'
                        }
                        alt="Profile"
                        variant="dot"
                        overlap="circular"
                        style={{ width: '50px', height: '50px' }}
                    />
                    {online && <div className={cx('online-dot')}></div>}
                    </div>


                    <div className={cx('name')} style={{ fontSize: '0.8rem' }}>
                        <span className={cx('name-title')}>
                            {userData?.firstname} {userData?.lastname}
                        </span>
                        <span style={{ color: online ? '#51e200' : '' }}>{online ? 'Online' : 'Offline'}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Conversation;
