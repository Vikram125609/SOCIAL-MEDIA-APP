import { Avatar, Stack, Box, Container, Typography, Button } from '@mui/material';
const Message = (props) => {
    const { data } = props
    return (
        <>
            {
                data.map((data) => {
                    return (
                        <Box color='secondary' sx={{ display: 'flex', padding: '10px', margin: '0px 0px 0px 0px', borderRadius: '10px', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.43)' }} key={data._id}>
                            <Avatar sx={{ height: 50, width: 50 }} src={data.image} />
                            <p>{data.first_name}</p>
                            <p>{data.last_name}</p>
                        </Box>
                    )
                })
            }
        </>
    );
}
export default Message;