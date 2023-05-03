import { Avatar, Stack, Box, Container, Typography, Button } from '@mui/material';
import Online from './Online';
import { socket } from './../../socket';
const Message = (props) => {
    const imageClicked = (e) => {
        window.open(e.target.src);
    }
    const { data, connectedUsers } = props
    return (
        <>
            {
                data.map((data) => {
                    return (
                        <Box onClick={() => {
                            props.showHide();
                            props.getData(data);
                            props.setMessageUsersId(`${data?._id}`);
                        }} color='secondary' sx={{ display: 'flex', padding: '10px', margin: '0px 0px 0px 0px', borderRadius: '5px', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.43)' }} key={data._id}>
                            <Avatar sx={{ height: 50, width: 50, border: '1px solid' }} src={data.image} onClick={imageClicked} />
                            <Typography color='secondary' variant='body1'>{data.first_name + ' ' + data.last_name} </Typography>
                            <Online data={connectedUsers?.includes(data._id)} />
                        </Box>
                    )
                })
            }

        </>
    );
}
export default Message;