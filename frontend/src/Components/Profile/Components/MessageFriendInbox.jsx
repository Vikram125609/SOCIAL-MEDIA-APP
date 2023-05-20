// importing material ui
import { Avatar, Stack, Typography, TextField, InputAdornment } from '@mui/material';

// importing sockets
import { socket } from '../../../socket';

// importing icons 
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

// importing hooks
import { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom'

// importing api's
import { chat, getAllMessage } from '../../../Api/Api';

// importing peer 
import Peer from '../../WebRTC/Peer';

const initialState = {
    message: '',
    chat: [],
    mounting: true,
}

const reducer = (currentState, action) => {
    switch (action?.type) {
        case 'message':
            return { ...currentState, message: action?.message };
        case 'chat':
            return { ...currentState, chat: [...currentState?.chat, action?.chat] };
        case 'mounting':
            return { ...currentState, mounting: action?.mounting };
        case 'getAllMessages':
            return { ...currentState, chat: action?.chat }

    }
}

const MessageFriendInbox = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();
    const { messageUser, messageUserId, closeMessageInbox } = props;
    localStorage.setItem('messageUserId', messageUserId);
    const sendMessage = async (e) => {
        if (e.keyCode === 13) {
            socket.emit('privateMessage', {
                message: state?.message,
                friend_id: messageUserId,
                user_id: localStorage.getItem('_id')
            })
            dispatch({ type: 'message', message: '' })
            const data = {
                user_id: localStorage.getItem('_id'),
                friend_id: messageUserId,
                message: state?.message
            }
            const response = await chat(data);
            dispatch({ type: 'chat', chat: response?.data?.data?.chat });
        }
    }
    const handleMessage = (e) => {
        dispatch({ type: 'message', message: e.target.value })
    }
    const getAllMessages = async (friend_id, user_id) => {
        const data = {
            friend_id: friend_id,
            user_id: user_id
        }
        const response = await getAllMessage(data);
        dispatch({ type: 'getAllMessages', chat: response?.data?.data?.chat });
    }

    const videoCall = async () => {
        const offer = await Peer.getOffer();
        const data = {
            from: localStorage.getItem('_id'),
            to: messageUserId,
            offer: offer
        }
        socket.emit('video:call', data);
        navigate(`/call/${localStorage.getItem('_id')}-${messageUserId}`);
    };

    useEffect(() => {
        socket.on('broadCast', ({ message, friend_id, user_id }) => {
            if (localStorage.getItem('messageUserId') === user_id) {
                getAllMessages(friend_id, user_id);
            }
        })
    }, []);
    useEffect(() => {
        if (state?.mounting) {
            dispatch({ type: 'mounting', mounting: false });
            return;
        }
        getAllMessages(messageUserId, localStorage.getItem('_id'));
    }, [messageUserId]);

    return (
        <>
            <Stack direction='row' justifyContent='space-around' alignItems='center'>
                <Avatar sx={{ height: 50, width: 50 }} src={messageUser?.image} />
                <Typography>{messageUser?.first_name + ' ' + messageUser?.last_name}</Typography>
                <LocalPhoneIcon />
                <VideoCallIcon onClick={videoCall} />
                <CloseIcon sx={{ cursor: 'pointer' }} onClick={() => {
                    closeMessageInbox();
                }} />
            </Stack>
            <Stack className='sendreceivedMessageUserContainer' sx={{ height: '100%', overflow: 'auto', display: 'flex', padding: 2 }}>
                {
                    state?.chat?.map((data) => {
                        return <Typography sx={{
                            textAlign: () => {
                                if (data?.user_id === localStorage.getItem('_id')) {
                                    return 'right';
                                }
                            }
                        }} key={data?._id}>{data?.message}</Typography>
                    })
                }
            </Stack>
            <TextField onChange={handleMessage} id="outlined-basic" onKeyUp={sendMessage} label="Message" value={state?.message} variant="outlined" InputProps={{
                endAdornment: <InputAdornment position="end"> <SendIcon onClick={sendMessage} sx={{ cursor: 'pointer' }} />  </InputAdornment>,
            }} />
        </>
    )
};

export default MessageFriendInbox;