import { Avatar, Button, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material'
import React, { useEffect, useState } from 'react'
// importing icons
import { ReactComponent as Thumb } from './../../Icons/Thumb.svg';
import { ReactComponent as Love } from './../../Icons/Love.svg';
import { ReactComponent as Celebrate } from './../../Icons/Celebrate.svg';
import { ReactComponent as Support } from './../../Icons/Support.svg';
import { ReactComponent as Insightfull } from './../../Icons/Insightfull.svg';
import { ReactComponent as Funny } from './../../Icons/Funny.svg';

// importing Components
import Userlist from './Userlist';

// Constants
const color = 'secondary';
const Userlikes = (props) => {
    const [alignment, setAlignment] = useState(1);
    const [userlikes, setUserLikes] = useState([]);
    const { likes } = props;
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    useEffect(() => {
        const data = likes.filter((data) => data?.type === alignment);
        setUserLikes(data);
    }, [alignment])
    return (
        <>
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                sx={{ display: 'flex', my: '10px' }}
            >
                <ToggleButton color={color} sx={{ flex: 1 }} value={1}>
                    <Thumb />
                </ToggleButton>
                <ToggleButton color={color} sx={{ flex: 1 }} value={2}>
                    <Love />
                </ToggleButton>
                <ToggleButton color={color} sx={{ flex: 1 }} value={3}>
                    <Celebrate />
                </ToggleButton>
                <ToggleButton color={color} sx={{ flex: 1 }} value={4}>
                    <Support />
                </ToggleButton>
                <ToggleButton color={color} sx={{ flex: 1 }} value={5}>
                    <Insightfull />
                </ToggleButton>
                <ToggleButton color={color} sx={{ flex: 1 }} value={6}>
                    <Funny />
                </ToggleButton>
            </ToggleButtonGroup>
            <Stack>
                {
                    userlikes.map((data) => {
                        return (
                            <Userlist key={data?._id} image={data?.image} first_name={data?.first_name} last_name={data?.last_name} />
                        );
                    })
                }
            </Stack>
        </>
    )
}

export default Userlikes
