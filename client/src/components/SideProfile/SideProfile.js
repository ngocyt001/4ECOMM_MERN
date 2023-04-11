import styles from './SideProfile.module.scss';
import Image from '~/components/Image';
import * as UserApi from '../../api/UserRequest';
import EditInfoPopup from '../Popup/EditInfoPopup';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Box, ImageList, ImageListItem } from '@mui/material';
import { Work, PersonPin, WorkspacePremium, RssFeed, Favorite } from '@mui/icons-material';
const cx = classNames.bind(styles);

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
        title: 'Bed',
    },
    {
        img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
        title: 'Books',
    },
    {
        img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
        title: 'Sink',
    },
    {
        img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
        title: 'Kitchen',
    },
    {
        img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
        title: 'Blinds',
    },
    {
        img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
        title: 'Chairs',
    },
    {
        img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
        title: 'Laptop',
    },
    {
        img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
        title: 'Doors',
    },
    {
        img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
        title: 'Storage',
    },
    {
        img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
        title: 'Candle',
    },
    {
        img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
        title: 'Coffee table',
    },
];

function AcctionBtn(props) {
    const { children, onClick } = props;

    return (
        <button className={cx('Acction-btn')} onClick={onClick}>
            {children}
        </button>
    );
}

function InfoDetails(props) {
    const { icon, text1, text2, textInfo } = props;

    return (
        <div className={cx('Info-details')}>
            <div className={cx('icon')}>{icon}</div>
            <span className={cx('text-1')}>{text1}</span>
            <span className={cx('text-info')}>{textInfo}</span>
            <span className={cx('text-2')}>{text2}</span>
        </div>
    );
}

function SideProfile() {
    // const dispatch = useDispatch();

    const params = useParams();

    // lấy id trên đường link profile/.....
    const profileUserId = params.id;

    const [profileUser, setProfileUser] = useState({});

    const { user } = useSelector((state) => state.authReducer.authData);

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
        console.log(user);
    }, [profileUserId, profileUser, user]);

    console.log(profileUserId === user._id);

    const [open, setOpen] = useState(false);

    const handleClickEdit = () => {
        setOpen(true);
    };

    return (
        <div className={cx('Container')}>
            <div className={cx('Content')}>
                <div className={cx('Content-info')}>
                    <EditInfoPopup open={open} setOpen={setOpen} data={user} />
                    <div className={cx('info-title')}>
                        <p>About me</p>
                    </div>
                    <div className={cx('info-desc')}>
                        <p>{profileUser?.about}</p>
                    </div>
                    {user._id === profileUserId ? (
                        <AcctionBtn onClick={handleClickEdit}>
                            <span>Edit Description</span>
                        </AcctionBtn>
                    ) : (
                        ''
                    )}
                    <InfoDetails
                        icon={<Work fontSize="small" />}
                        text1={'Working at'}
                        textInfo={profileUser?.workAt}
                        text2={''}
                    />
                    <InfoDetails
                        icon={<PersonPin fontSize="small" />}
                        text1={'Living at'}
                        textInfo={profileUser?.livesIn}
                        text2={''}
                    />
                    <InfoDetails
                        icon={<Favorite fontSize="small" />}
                        text1={'Relationship'}
                        textInfo={profileUser?.relationship}
                        text2={''}
                    />
                    <InfoDetails
                        icon={<WorkspacePremium fontSize="small" />}
                        text1={'Professional in'}
                        textInfo={profileUser?.skills}
                        text2={''}
                    />
                    {}
                    <InfoDetails
                        icon={<RssFeed fontSize="small" />}
                        text1={'Having'}
                        textInfo={profileUser?.followers?.length}
                        text2={'Followers'}
                    />
                    {user._id === profileUserId ? (
                        <AcctionBtn onClick={handleClickEdit}>
                            <span>Edit Pofile</span>
                        </AcctionBtn>
                    ) : (
                        ''
                    )}
                    <div className={cx('info-img')}>
                        <Image className={cx('info-img-detail')} src="https://images3.alphacoders.com/991/991454.jpg" />
                        <Image className={cx('info-img-detail')} src="https://images6.alphacoders.com/337/337342.jpg" />
                        <Image className={cx('info-img-detail')} src="https://images.alphacoders.com/299/29913.jpg" />
                    </div>
                    {user._id === profileUserId ? (
                        <AcctionBtn>
                            <span>Edit The Notable Part</span>
                        </AcctionBtn>
                    ) : (
                        ''
                    )}
                </div>

                <div className={cx('Content-img')}>
                    <div className={cx('Content-img-title')}>Photos</div>
                    <Box className={cx('image-container')}>
                        <ImageList className={cx('image-list')} variant="masonry" cols={3} gap={8}>
                            {itemData.map((item, index) => (
                                <ImageListItem className={cx('image-item')} key={index}>
                                    <img
                                        className={cx('image-item-detail')}
                                        src={`${item.img}?w=248&fit=crop&auto=format`}
                                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default SideProfile;
