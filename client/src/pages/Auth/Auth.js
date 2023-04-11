import styles from './Auth.module.scss';
import images from '~/assets/images';
import Image from '~/components/Image';
import { logIn, signUp } from '~/actions/AuthAction';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { Person, Lock, Mail, AccountBox } from '@mui/icons-material';
import { faFacebookF, faTwitter, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function Auth() {
    const [logMode, setLogMode] = useState(false);
    const handleSignup = () => {
        setLogMode(true);
        resetForm();
        setTimeout(() => {
            setIsSignUp(true);
        }, 1000);
        console.log(isSignUp, 'test đăng ký');
    };

    const handleSignin = () => {
        setLogMode(false);
        resetForm();
        setTimeout(() => {
            setIsSignUp(false);
        }, 900);
        console.log(isSignUp, 'test đăng nhập');
    };

    const initialState = {
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        confirmpass: '',
    };

    const dispatch = useDispatch();

    const loading = useSelector((state) => state.authReducer.loading);

    console.log(loading);

    const [isSignUp, setIsSignUp] = useState(false);

    const [data, setData] = useState(initialState);

    const [confirmPass, setConfirmPass] = useState(true);

    // Reset Form
    const resetForm = () => {
        setData(initialState);
        setConfirmPass(confirmPass);
    };

    // handle Change in input
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // Form Submission
    const handleSubmit = (e) => {
        setConfirmPass(true);
        e.preventDefault();
        if (isSignUp) {
            data.password === data.confirmpass ? dispatch(signUp(data)) : setConfirmPass(false);
        } else {
            dispatch(logIn(data));
        }
    };
    return (
        <div className={logMode ? cx('container', 'sign-up-mode') : cx('container', 'sign-in-mode')}>
            <div className={cx('forms-container')}>
                <div className={cx('signin-signup')}>
                    {isSignUp ? (
                        <form className={cx('sign-up-form')} onSubmit={handleSubmit}>
                            <h2 className={cx('title')}>Sign up</h2>
                            <div className={cx('input-field', 'info')}>
                                <AccountBox className={cx('input-icon')} />
                                <input
                                    name="firstname"
                                    type="text"
                                    placeholder="First Name"
                                    value={data.firstname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={cx('input-field')}>
                                <Person className={cx('input-icon')} />
                                <input
                                    name="lastname"
                                    type="text"
                                    placeholder="Last Name"
                                    value={data.lastname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={cx('input-field')}>
                                <Mail className={cx('input-icon')} />
                                <input
                                    name="username"
                                    type="email"
                                    placeholder="Email"
                                    value={data.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={cx('input-field')}>
                                <Lock className={cx('input-icon')} />
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={data.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={cx('input-field')}>
                                <Lock className={cx('input-icon')} />
                                <input
                                    name="confirmpass"
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                />
                            </div>
                            <span
                                style={{
                                    color: 'red',
                                    fontSize: '12px',
                                    alignSelf: 'center',
                                    display: confirmPass ? 'none' : 'block',
                                }}
                            >
                                *Confirm Password is not same
                            </span>
                            <input
                                disabled={loading}
                                type="submit"
                                className={cx('btn')}
                                value={loading ? 'Loading...' : 'Sign up'}
                            />
                            <p className={cx('social-text')}>Or Sign up with social platforms</p>
                            <div className={cx('social-media')}>
                                <div className={cx('social-icon')}>
                                    <FontAwesomeIcon icon={faFacebookF} />
                                </div>
                                <div className={cx('social-icon')}>
                                    <FontAwesomeIcon icon={faTwitter} />
                                </div>
                                <div className={cx('social-icon')}>
                                    <FontAwesomeIcon icon={faGoogle} />
                                </div>
                                <div className={cx('social-icon')}>
                                    <FontAwesomeIcon icon={faLinkedinIn} />
                                </div>
                            </div>
                        </form>
                    ) : (
                        <form className={cx('sign-in-form')} onSubmit={handleSubmit}>
                            <h2 className={cx('title')}>Sign in</h2>
                            <div className={cx('input-field')}>
                                <Person className={cx('input-icon')} />
                                <input
                                    name="username"
                                    type="email"
                                    placeholder="Email"
                                    value={data.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={cx('input-field')}>
                                <Lock className={cx('input-icon')} />
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={data.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <input
                                disabled={loading}
                                type="submit"
                                className={cx('btn', 'solid')}
                                value={loading ? 'Loading...' : 'Login'}
                            />
                            <p className={cx('social-text')}>Or Sign in with social platforms</p>
                            <div className={cx('social-media')}>
                                <div className={cx('social-icon')}>
                                    <FontAwesomeIcon icon={faFacebookF} />
                                </div>
                                <div className={cx('social-icon')}>
                                    <FontAwesomeIcon icon={faTwitter} />
                                </div>
                                <div className={cx('social-icon')}>
                                    <FontAwesomeIcon icon={faGoogle} />
                                </div>
                                <div className={cx('social-icon')}>
                                    <FontAwesomeIcon icon={faLinkedinIn} />
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            <div className={cx('panels-container')}>
                <div className={cx('panel', 'left-panel')}>
                    <div className={cx('content')}>
                        <h3>New here ?</h3>
                        <p>
                            4ECOMM - Giải pháp phát triển sản phẩm bằng công nghệ AI và môi trường xây dựng quan hệ đối
                            tác với chi phí tối ưu nhất.
                        </p>
                        <button className={cx('btn', 'transparent')} onClick={handleSignup}>
                            Sign up
                        </button>
                    </div>
                    <Image className={cx('image')} src={images.signIn} />
                </div>
                <div className={cx('panel', 'right-panel')}>
                    <div className={cx('content')}>
                        <h3>One of us ?</h3>
                        <p>
                            4ECOMM mang đến cho bạn sự tiện dụng và tối trong việc xây dựng hệ thống sản phẩm chiến lược
                            kinh doanh.
                        </p>
                        <button className={cx('btn', 'transparent')} onClick={handleSignin}>
                            Sign in
                        </button>
                    </div>
                    <Image className={cx('image')} src={images.signUp} />
                </div>
            </div>
        </div>
    );
}

export default Auth;
