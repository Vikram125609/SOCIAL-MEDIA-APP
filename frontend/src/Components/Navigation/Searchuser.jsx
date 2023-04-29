import User from "./User";
import { Stack } from "@mui/material";

const postContainerBoxShadow = '0px 0px 5px 0px rgba(0,0,0,0.43)'
const width = '25em'
const height = '50vh'
const padding = 1;
const Searchuser = (props) => {
    const { searchUserContainerVisibility, dataSearchUserContainer } = props;
    console.log(dataSearchUserContainer)
    return (
        <Stack padding={padding} spacing={1} maxHeight={height} overflow='auto' sx={{ backgroundColor: 'white', visibility: searchUserContainerVisibility }} width={width} boxShadow={postContainerBoxShadow} position='absolute'>
            {
                dataSearchUserContainer?.map((data) => {
                    return <User key={data?._id} first_name={data?.first_name} last_name={data?.last_name} image={data?.image} _id={data?._id} />
                })
            }
        </Stack>
    );
};
export default Searchuser;