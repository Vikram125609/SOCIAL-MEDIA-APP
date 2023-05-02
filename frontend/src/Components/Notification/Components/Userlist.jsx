import { Avatar, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";

// Contants
const width = 50;
const height = 50;
const buttonColor = 'secondary';
const borderRadius = '10px'
const Userlist = (props) => {
    const [variant, setVariant] = useState('outlined')
    const { first_name, last_name, image, seen } = props;
    const follow = () => {
        if (variant === 'outlined') {
            setVariant('contained');
        }
        else {
            setVariant('outlined');
        }
    };
    return (
        <Stack p={1} sx={{ backgroundColor: seen ? '#dbdbdb' : '#a4a4a4', borderRadius: borderRadius }} my={1} spacing={2} direction='row' alignItems='center' justifyContent='space-between'>
            <Avatar sx={{ width: width, height: height }} src={image} />
            {
                !seen && <Typography fontWeight='900'>{first_name}</Typography>
            }
            {
                seen && <Typography fontWeight='500'>{first_name}</Typography>
            }
            {
                !seen && <Typography fontWeight='900'>{last_name}</Typography>
            }
            {
                seen && <Typography fontWeight='500'>{last_name}</Typography>
            }
            <Button variant={variant} color={buttonColor} onClick={follow}>
                Follow
            </Button>
        </Stack>
    );
};
export default Userlist;