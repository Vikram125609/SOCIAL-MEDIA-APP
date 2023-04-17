import { Button } from "@mui/material";

// Constants
const buttonColor = 'secondary'
const Userscommentbutton = (props) => {
    const { totalComments, setDisplay } = props;
    return (
        <>
            <Button color={buttonColor} onClick={() => {
                setDisplay();
            }}> {totalComments} Comments</Button>
        </>
    );
}
export default Userscommentbutton;