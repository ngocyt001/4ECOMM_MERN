import styles from './Chat.module.scss';
import Navbar from '~/components/Navbar';
import Conversation from '~/components/Conversation'
import { userChats } from '../../api/ChatRequest'

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from 'react';
import { io } from "socket.io-client"



import classNames from 'classnames/bind';
import ChatBox from '~/components/ChatBox';

const cx = classNames.bind(styles);

function Chat() {
    const [chats, setChats] = useState([]);

    const dispatch = useDispatch();

    const [onlineUsers, setOnlineUsers] = useState([]);

    const [currentChat, setCurrentChat] = useState(null);

    const [sendMessage, setSendMessage] = useState(null);

    const [receivedMessage, setReceivedMessage] = useState(null);

    const { user } = useSelector((state) => state.authReducer.authData);

    console.log(user._id, 'heoooo');

    const socket = useRef()

    useEffect(() => {
        const getChats = async () => {
            try {
            const { data } = await userChats(user._id);
            setChats(data);
            } catch (error) {
            console.log(error);
            }
        };
        getChats();
    }, [user._id]);

    // Send Message to socket server
    useEffect(() => {
        if (sendMessage!==null) {
        socket.current.emit("send-message", sendMessage);}
    }, [sendMessage]);

    // Connect to Socket.io
    useEffect(() => {
        socket.current = io("http://localhost:8800");
        socket.current.emit('new-user-add', user._id);
        socket.current.on('get-users', (users) => {
            setOnlineUsers(users);
            console.log(onlineUsers);
        })
    }, [user])

    // Get the message from socket server
    useEffect(() => {
        socket.current.on("recieve-message", (data) => {
                console.log(data)
                setReceivedMessage(data);
            }
        );
    }, []);

    
    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== user._id);
        const online = onlineUsers.find((user) => user.userId === chatMember);
        return online ? true : false;
    };

  


    return (
        <>
            <Navbar />
            <div className={cx('Chat')}>
                {/* leftside chat */}
                <div className={cx('Left-side-chat')}>
                    <div className={cx('Chat-container')}>
                        <h2>Chats</h2>
                        <div className={cx('Chat-list')}>
                        {chats.map((chat) => (
                            <div
                                onClick={() => {
                                    setCurrentChat(chat);
                                }}
                            >
                                <Conversation
                                data={chat}
                                currentUser={user._id}
                                online={checkOnlineStatus(chat)}
                                />
                            </div>
                        ))}
                        </div>
                    </div>
                </div>

                {/* rightside chat */}
                <div className={cx('Right-side-chat')}>
                    <ChatBox
                        chat={currentChat}
                        currentUser={user._id}
                        receivedMessage={receivedMessage}
                        setSendMessage={setSendMessage}
                    />
                </div>
            </div>
        </>
    );
}

export default Chat;
