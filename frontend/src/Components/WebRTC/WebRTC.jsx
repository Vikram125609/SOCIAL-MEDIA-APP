// importing hooks
import React, { useCallback, useEffect, useReducer } from "react";

// importin components
import ReactPlayer from 'react-player'
import Navbar from "../Navigation/Navbar";
import { socket } from "../../socket";
import Peer from "./Peer";

const initialState = {
    stream: null,
    remoteStream: null,
    from: null,
    to: null
};

const reducer = (previousState, action) => {
    switch (action?.type) {
        case 'stream':
            return { ...previousState, stream: action?.stream };
        case 'remoteStream':
            return { ...previousState, remoteStream: action?.remoteStream };
        case 'from':
            return { ...previousState, from: action?.from };
        case 'to':
            return { ...previousState, to: action?.to };
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

    const handleCallAccepted = useCallback(({ from, ans }) => {
        Peer.setLocalDescription(ans);
        for (const track of state?.stream.getTracks()) {
            Peer.peer.addTrack(track, state?.stream);
        }
    }, [state?.stream]);

    const handleNegoNeeded = useCallback(async () => {
        const offer = await Peer.getOffer();
        socket.emit("peer:nego:needed", { offer, to: state?.to });
    }, [state?.to, socket]);

    useEffect(() => {
        Peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
        return () => {
            Peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
        };
    }, [handleNegoNeeded]);

    useEffect(() => {
        Peer.peer.addEventListener('track', async (event) => {
            const stream = event.streams;
            dispatch({ type: 'remoteStream', remoteStream: stream });
        })
    }, [])

    useEffect(() => {
        const urlParams = window.location.pathname;
        const length = urlParams.split('/').length;
        const from = urlParams.split('/')[length - 1].split('-')[0];
        const to = urlParams.split('/')[length - 1].split('-')[1];
        dispatch({ type: 'from', from: from });
        dispatch({ type: 'to', to: to });
        turnOnYourVideo();
    }, []);

    useEffect(() => {
        socket.on('video:call:accepted', handleCallAccepted);
        return () => {
            socket.off('video:call:accepted', handleCallAccepted);
        }
    }, [socket, handleCallAccepted]);

    return (
        <React.Fragment>
            <Navbar />
            <ReactPlayer url={state?.stream} width='800px' playing muted />
            {
                state?.remoteStream && <ReactPlayer url={state?.remoteStream} width='800px' playing muted />
            }
        </React.Fragment>
    )
};
export default WebRTC;