import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";

// Constants
const postContainerBorderRadius = '10px'
const postContainerBoxShadow = '0px 0px 5px 0px rgba(0,0,0,0.43)'
const Post = (props) => {
    const [discription, setDiscription] = useState();
    const { image, display, handelPopupDisplay } = props;
    const handelDiscription = (e) => {
        setDiscription(e.target.value);
    }
    const uploadImage = () => {
        const formData = new FormData();
        formData.append("discription", discription);
        formData.append("image", image);
        console.log(formData);
        handelPopupDisplay();
    }
    return (
        <>
            <Box display={display}>
                <Stack spacing={2} direction='column' flex={2} sx={{ mx: '10px', p: '10px', borderRadius: postContainerBorderRadius, boxShadow: postContainerBoxShadow }}>
                    <textarea onChange={handelDiscription} placeholder="Enter Some Discription" value={discription}></textarea>
                    <Stack>
                        <img style={{ width: '100%' }} src={localStorage.getItem('image')} alt="" />
                    </Stack>
                    <Button variant="contained" onClick={uploadImage}>Upload</Button>
                </Stack>
            </Box>
        </>
    );
}

export default Post