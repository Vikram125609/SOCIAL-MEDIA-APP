import React from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { AiFillHome } from "react-icons/ai";

import { BsApple } from "react-icons/bs";
import { BsFillPeopleFill } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
import { SiGooglemessages } from "react-icons/si";
import { IoMdNotifications } from "react-icons/io";
import { Navbar, Nav } from 'react-bootstrap';
const Desktop = (props) => {
    return (
        <div>
            <Navbar style={{ justifyContent: "space-between" }} id="navbar" bg='dark' variant='dark' fixed={props.fixed()}>
                <Navbar.Brand style={{ display: `${props.display()}` }}>
                    <Nav className='nav-link'> <Link to="/home"> <BsApple color={props.iconColor} size={props.iconSize} /> </Link> </Nav>
                </Navbar.Brand>
                <Form.Control style={{ "display": `${props.display()}`, "width": "20em" }} type="text" placeholder="Search" />
                <Nav style={props.navIconWidth()}>
                    <Nav className='nav-link'> <Link to="/home"> <AiFillHome color={props.iconColor} size={props.iconSize} /> </Link> </Nav>
                    <Nav className='nav-link'> <Link to="/user"> <BsFillPeopleFill color={props.iconColor} size={props.iconSize} /> </Link>  </Nav>
                    <Nav className='nav-link'> <Link to="/home"> <AiFillPlusCircle color={props.iconColor} size={props.iconSize} /> </Link>  </Nav>
                    <Nav className='nav-link'> <Link to="/user"> <IoMdNotifications color={props.iconColor} size={props.iconSize} /> </Link> </Nav>
                    <Nav className='nav-link'> <Link to="/home"> <SiGooglemessages color={props.iconColor} size={props.iconSize} /> </Link> </Nav>
                    <Nav className='nav-link' style={{ display: `${props.display()}`, margin: "0px", padding: "0px" }}> <img src={localStorage.getItem('image')} style={props.imageStyle()} alt="" /> </Nav>
                </Nav>
            </Navbar>
        </div>
    );
}

export default Desktop;