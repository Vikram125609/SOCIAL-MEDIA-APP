import React, { useCallback, useEffect, useReducer } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import User from './Components/Users/User';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import SignUp from './Components/Signup/Signup';
import Post from './Components/Post/Post';
import Profile from './Components/Profile/Profile';
import Notification from './Components/Notification/Notification';
import WebRTC from './Components/WebRTC/WebRTC';
import { socket } from './socket';
import { getUserDetail } from './Api/Api';
import Peer from './Components/WebRTC/Peer';

const initialState = {
  stream: null
};

const reducer = (previousState, action) => {
  switch (action?.type) {
    case 'stream':
      return { ...previousState, stream: action?.stream };
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const getUserDetails = async (_id) => {
    const data = {
      _id: _id
    }
    const user = await getUserDetail(data);
    return user?.data?.data?.userDetail;
  };

  const handleInCommingVideoCall = useCallback(async (data) => {
    const { from, to, offer } = data;
    const user = await getUserDetails(`${from}`);
    const constraints = {
      audio: true,
      video: true
    }
    const localStream = await navigator.mediaDevices.getUserMedia(constraints);
    dispatch({ type: 'stream', stream: localStream });
    const accept_reject = prompt(`${user.first_name + ' ' + user.last_name} is calling you`);
    const ans = await Peer.getAnswer(offer);
    if (accept_reject === 'accept') {
      socket.emit('video:call:accepted', { from: to, to: from, ans: ans });
      navigate(`/call/${to}-${from}`);
    }
  }, []);

  useEffect(() => {
    socket.on('incomming:video:call', handleInCommingVideoCall);
    return () => {
      socket.off('incomming:video:call', handleInCommingVideoCall).off();
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/user" exact element={<User />} />
        <Route path="/post" exact element={<Post />} />
        <Route path="/notifications" exact element={<Notification />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/profile/:id" exact element={<Profile />} />
        <Route path="/call/:id" exact element={<WebRTC />} />
      </Routes>
    </>
  );
}

export default App;
