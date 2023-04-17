import { Avatar, Button, Stack } from "@mui/material";
import { useState } from "react";

// Contants
const buttonColor = 'secondary';
const Userlist = (props) => {
    const [variant, setVariant] = useState('outlined')
    const { first_name, last_name, image } = props;
    const follow = () => {
        if (variant === 'outlined') {
            setVariant('contained');
        }
        else {
            setVariant('outlined');
        }
    };
    return (
        <Stack my={1} spacing={2} direction='row' alignItems='center' justifyContent='space-between'>
            <Avatar src={image} />
            <span>{first_name}</span>
            <span>{last_name}</span>
            <Button variant={variant} color={buttonColor} onClick={follow}>
                Follow
            </Button>
        </Stack>
    );
};
export default Userlist;