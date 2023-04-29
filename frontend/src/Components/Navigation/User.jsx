import { Avatar, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// constants
const padding = 1;
const width = 50
const height = 50
const User = (props) => {
    const { first_name, last_name, image, _id } = props;
    return (
        <Stack sx={{ backgroundColor: 'light' }}>
            <Grid container>
                <Grid item xs={4}>
                    <Avatar sx={{ width: width, height: height }} src={image} />
                </Grid>
                <Grid item xs={4}>
                    <Typography>{first_name}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography>{last_name}</Typography>
                </Grid>
            </Grid>
        </Stack>
    );
};
export default User;