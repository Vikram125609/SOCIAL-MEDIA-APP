import { Typography } from "@mui/material";
import React from "react";
const Userlist = (props) => {
    const { likes } = props;
    console.log(likes)
    return (
        <React.Fragment>
            {
                likes.map(() => {
                    return (
                        <Typography>
                            {likes?.image}
                        </Typography>
                    )
                })
            }
        </React.Fragment>
    );
};
export default Userlist;