import { Button } from "@mui/material";

// Constants
const buttonColor = 'secondary'
const Userlikesbutton = (props) => {
    const { totalLikes, setDisplay } = props;
    return (
        <>
            <Button color={buttonColor} onClick={() => {
                setDisplay()
            }}>{totalLikes} likes</Button>
        </>
    );
};

export default Userlikesbutton;