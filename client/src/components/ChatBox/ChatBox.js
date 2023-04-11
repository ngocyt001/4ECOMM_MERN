import styles from './ChatBox.module.scss';

import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import { getUser } from '~/api/UserRequest';
import { addMessage, getMessages } from '~/api/MessageRequest';
import {format} from "timeago.js"
import InputEmoji from 'react-input-emoji'

const cx = classNames.bind(styles);

function ChatBox({ chat, currentUser, setSendMessage, receivedMessage }) {

    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState();

    const scroll = useRef()

     // Always scroll to last Message
    useEffect(()=> {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    },[messages])


    // fetching data for header
    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser);
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId);
                setUserData(data);
            } catch (error) {
                console.log(error);
            }
        };

        if (chat !== null) getUserData();
    }, [chat, currentUser]);

    // fetch messages
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await getMessages(chat._id);
                setMessages(data);
            } catch (error) {
                console.log(error);
            }
        };

        if (chat !== null) fetchMessages();
    }, [chat]);

    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }

    const handleSend = async(e) => {
        e.preventDefault();
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat._id,
        }


        const receiverId = chat.members.find((id)=>id!==currentUser);
        // send message to socket server
        setSendMessage({...message, receiverId})
        // send message to database
        try {
          const { data } = await addMessage(message);
          setMessages([...messages, data]);
          setNewMessage("");
        }
        catch
        {
          console.log("error")
        }
    }

    // Receive Message from parent component
    useEffect(()=> {
        console.log("Message Arrived: ", receivedMessage)
        if (receivedMessage !== null && receivedMessage?.chatId === chat._id) {
        setMessages([...messages, receivedMessage]);
        }
    
    },[receivedMessage])

    return (
        <div className={cx('ChatBox-container')}>
            {chat? (
                <>
                
                    <div className={cx('chat-header')}>
                        <div className={cx('follower')}>
                            <img
                                src={
                                    userData?.profilePicture
                                        ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture
                                        : process.env.REACT_APP_PUBLIC_FOLDER + 'defaultProfile.png'
                                }
                                alt="Profile"
                                className={cx('followerImage')}
                            />
                            <div className={cx('name')} >
                                <span>
                                    {userData?.firstname} {userData?.lastname}
                                </span>
                            </div>
                        </div>
                        <hr
                            style={{
                                width: '95%',
                                border: '0.1px solid #ececec',
                                marginTop: '20px',
                            }}
                        />
                    </div>

                    {/* Chat body */}
                    <div className={cx('chat-body')} >
                    {messages.map((message) => (
                        <>
                        <div 
                            ref={scroll}
                            className={
                            message.senderId === currentUser
                                ? cx("message", "own")
                                : cx("message")
                            }
                        >
                            <span>{message.text}</span>{" "}
                            <span>{format(message.createdAt)}</span>
                        </div>
                        </>
                    ))}
                    </div>

                    {/* Chat sender */}
                    <div className={cx('chat-sender')}>
                        <div>+</div>
                        <InputEmoji 
                            value={newMessage}
                            onChange={handleChange}
                        />
                        <div className={cx('send-button')} onClick={handleSend} >Send</div>
                    </div>
                </>

            ): (
                <span className={cx('chatbox-empty-message')}>Tap anyones to chat</span> 
            )}
        </div>
    );
}

export default ChatBox;
