import { Avatar, Box, Button, Stack, Typography } from "@mui/material";

// Importing Icons
import { PhotoCamera } from "@material-ui/icons";
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import ArticleIcon from '@mui/icons-material/Article';

// Constants
const postImageWidth = '75px';
const postImageHeight = '75px';
const postContainerBorderRadius = '10px'
const postContainerBoxShadow = '0px 0px 5px 0px rgba(0,0,0,0.43)'

const Createpost = (props) => {
    const { handelPopupDisplay, handelImage } = props;
    const setImage = (e) => {
        handelImage(e.target.files[0]);
        handelPopupDisplay();
    }
    return (
        <Box>
            <Stack spacing={2} sx={{ mx: '10px', p: '10px', borderRadius: postContainerBorderRadius, boxShadow: postContainerBoxShadow }}>
                <Stack direction='row' alignItems='center' spacing={2}>
                    <Avatar sx={{ width: postImageWidth, height: postImageHeight }} src={localStorage.getItem('image')} />
                    <Typography fontSize='20px' textAlign='left' padding='10px' width='100%' sx={{ boxShadow: postContainerBoxShadow, borderRadius: '50px' }}>Create a post</Typography>
                </Stack>
                <Stack spacing={2} justifyContent='space-around' direction='row'>
                    <Stack sx={{ cursor: 'pointer' }} spacing={2} direction='row'>
                        <Button fullWidth variant="outlined" component="label" endIcon={<PhotoCamera />}>
                            <input hidden accept="image/*" multiple type="file" onChange={setImage} />
                            Photo
                        </Button>
                    </Stack>
                    <Stack sx={{ cursor: 'pointer' }} spacing={2} direction='row'>
                        <Button color="secondary" fullWidth variant="outlined" component="label" endIcon={<SmartDisplayIcon color="secondary" />}>
                            <input hidden accept="video/*" multiple type="file" onChange={setImage} />
                            Video
                        </Button>
                    </Stack>
                    <Stack sx={{ cursor: 'pointer' }} spacing={2} direction='row'>
                        <Button color="success" fullWidth variant="outlined" component="label" endIcon={<ArticleIcon color="success" />}>
                            <input hidden accept="pdf/*" multiple type="file" onChange={setImage} />
                            Article
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}
export default Createpost;