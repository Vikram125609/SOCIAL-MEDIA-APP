import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { AiFillHome } from "react-icons/ai";
import { BiAtom } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
import { SiGooglemessages } from "react-icons/si";
import { IoMdNotifications } from "react-icons/io";
import { Navbar, Nav } from 'react-bootstrap';
import "./Navigation.css"
import Mobile from './Mobile';
import Desktop from './Desktop';

let prevScrollpos = window.pageYOffset;

const iconSize = "2em"
const iconColor = "white"

window.onscroll = () => {
    let w = window.innerWidth;
    if (w < 500) {
        let currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("navbar").style.bottom = "0px";
        } else {
            let navHeight = document.getElementById("navbar").offsetHeight;
            document.getElementById("navbar").style.bottom = `${-navHeight}px`;
        }
        prevScrollpos = currentScrollPos;
    }
}

const isMobile = () => {
    let w = window.innnerWidth;
    if (w <= 500) {
        return true;
    }
    return false;
}

const navIconWidth = () => {
    let w = window.innerWidth;
    if (w < 500) {
        const mobileNavStyle = {
            width: `${w}px`,
            justifyContent: `space-around`
        }
        return mobileNavStyle
    }
    else {
        const windowNavStyle = {
            width: `${w / 2}px`,
            justifyContent: `space-around`,
            alignItem: `center`
        }
        return windowNavStyle;
    }
}

const fixed = () => {
    let w = window.innerWidth;
    if (w < 500) return "bottom"
    else return "top"
}

const display = () => {
    let w = window.innerWidth;
    if (w < 500) return "none"
    else return "block"
}

const imageStyle = () => {
    const circularImage = {
        height: "48px",
        borderRadius: "50%"
    }
    return circularImage;
}

const Navigation = () => {
    return (
        <div>
            {/* <Navbar style={{ justifyContent: "space-between" }} id="navbar" bg='dark' variant='dark' fixed={fixed()}>
                <Navbar.Brand style={{ display: `${display()}` }}>
                    <Nav className='nav-link'> <Link to="/home"> <BiAtom color={iconColor} size={iconSize} /> </Link> </Nav>
                </Navbar.Brand>
                <Form.Control style={{ "display": `${display()}`, "width": "20em" }} type="text" placeholder="Search" />
                <Nav style={navIconWidth()}>
                    <Nav className='nav-link'> <Link to="/home"> <AiFillHome color={iconColor} size={iconSize} /> </Link> </Nav>
                    <Nav className='nav-link'> <Link to="/user"> <BsFillPeopleFill color={iconColor} size={iconSize} /> </Link>  </Nav>
                    <Nav className='nav-link'> <Link to="/home"> <AiFillPlusCircle color={iconColor} size={iconSize} /> </Link>  </Nav>
                    <Nav className='nav-link'> <Link to="/user"> <IoMdNotifications color={iconColor} size={iconSize} /> </Link> </Nav>
                    <Nav className='nav-link'> <Link to="/home"> <SiGooglemessages color={iconColor} size={iconSize} /> </Link> </Nav>
                    <Nav className='nav-link' style={{ display: `${display()}`, margin: "0px", padding: "0px" }}> <img src={localStorage.getItem('image')} style={imageStyle()} alt="" /> </Nav>
                </Nav>
            </Navbar> */}
            {
                isMobile() ? (
                    <Mobile fixed={fixed} navIconWidth={navIconWidth} display={display} imageStyle={imageStyle} iconColor={iconColor} iconSize={iconSize} />
                ) : (
                    <Desktop fixed={fixed} navIconWidth={navIconWidth} display={display} imageStyle={imageStyle} iconColor={iconColor} iconSize={iconSize} />
                )
            }
        </div>
    );
};

export default Navigation;