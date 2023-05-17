// importing hooks
import React, { useEffect, useReducer } from "react";

// importin components
import ReactPlayer from 'react-player'
import Navbar from "../Navigation/Navbar";

const initialState = {
    stream: null
};

const reducer = (previousState, action) => {
    switch (action?.type) {
        case 'stream':
            return { ...previousState, stream: action?.stream };
    }
};

const WebRTC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const turnOnYourVideo = async () => {
        const constraints = {
            audio: true,
            video: true
        }
        const localStream = await navigator.mediaDevices.getUserMedia(constraints);
        dispatch({ type: 'stream', stream: localStream });
    }

    useEffect(() => {
        turnOnYourVideo();
    }, []);

    return (
        <React.Fragment>
            <Navbar />
            <ReactPlayer url={state?.stream} width='800px' playing muted />
        </React.Fragment>
    )
};
export default WebRTC;