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
    const { mouseLeaved, clickSvgButton } = props;
    const { visibilityLikeContainer } = props;

    const setSvgThumb = () => {
        clickSvgButton(<Thumb />)
    }
    const setSvgLove = () => {
        clickSvgButton(<Love />)
    }
    const setSvgCelebrate = () => {
        clickSvgButton(<Celebrate />)
    }
    const setSvgSupport = () => {
        clickSvgButton(<Support />)
    }
    const setSvgInsightfull = () => {
        clickSvgButton(<Insightfull />)
    }
    const setSvgFunny = () => {
        clickSvgButton(<Funny />)
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