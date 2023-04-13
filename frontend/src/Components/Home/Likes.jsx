import { Stack } from "@mui/material";
import { ReactComponent as Thumb } from './../Icons/Thumb.svg';
import { ReactComponent as Love } from './../Icons/Love.svg';
import { ReactComponent as Celebrate } from './../Icons/Celebrate.svg';
import { ReactComponent as Support } from './../Icons/Support.svg';
import { ReactComponent as Insightfull } from './../Icons/Insightfull.svg';
import { ReactComponent as Funny } from './../Icons/Funny.svg';
// importing css
import './Likes.css'
const Likes = (props) => {
    const { mouseLeaved, clickSvgButton, post_id } = props;
    const { visibilityLikeContainer } = props;

    const setSvgThumb = () => {
        clickSvgButton(<Thumb />, post_id, 1)
    }
    const setSvgLove = () => {
        clickSvgButton(<Love />, post_id, 2)
    }
    const setSvgCelebrate = () => {
        clickSvgButton(<Celebrate />, post_id, 3)
    }
    const setSvgSupport = () => {
        clickSvgButton(<Support />, post_id, 4)
    }
    const setSvgInsightfull = () => {
        clickSvgButton(<Insightfull />, post_id, 5)
    }
    const setSvgFunny = () => {
        clickSvgButton(<Funny />, post_id, 6)
    }

    return (
        <Stack onMouseLeave={() => mouseLeaved()} className="likeContainer" spacing={1} direction='row' sx={{ width: 'fit-content', visibility: visibilityLikeContainer }}>
            <Thumb onClick={setSvgThumb} className='like' />
            <Love onClick={setSvgLove} className='like' />
            <Celebrate onClick={setSvgCelebrate} className='like' />
            <Support onClick={setSvgSupport} className='like' />
            <Insightfull onClick={setSvgInsightfull} className='like' />
            <Funny onClick={setSvgFunny} className='like' />
        </Stack>
    );
};
export default Likes;