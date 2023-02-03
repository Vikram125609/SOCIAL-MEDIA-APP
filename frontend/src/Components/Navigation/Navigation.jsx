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
            <Navbar style={{ justifyContent: "space-between" }} id="navbar" bg='dark' variant='dark' fixed={fixed()}>
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
            </Navbar>

            <p style={{ textAlign: "justify" }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit quod placeat eligendi non ab labore officia. Quisquam odio dolore sapiente autem eius adipisci reprehenderit, molestiae ducimus, iste praesentium rerum expedita exercitationem. Cum commodi cumque necessitatibus voluptates eligendi minima quisquam quos, molestiae animi alias delectus nobis obcaecati deleniti dolorem magnam iure molestias ipsam atque, quae quasi temporibus doloribus exercitationem. Velit, accusantium excepturi odio porro nemo repellat facilis? Quo id vero repellendus laudantium dolores temporibus est obcaecati, aut minima facere vel, eius autem nemo. Atque, impedit! Enim sequi debitis velit eligendi molestias dicta repellat fugit impedit tempora, facere natus laboriosam quo nam, ducimus perferendis ipsam unde error fugiat veniam distinctio similique excepturi omnis? Et doloribus corporis aperiam beatae omnis perferendis facere ullam recusandae voluptatibus ea? Debitis harum reiciendis sed aspernatur ullam ipsam repellat! Obcaecati odio modi magnam qui. Fugiat deserunt ducimus, magnam, perspiciatis eos iusto distinctio rerum est, ab aspernatur a pariatur excepturi natus explicabo dolorum! Similique atque id, incidunt at sapiente suscipit delectus dolorem corrupti dolore. Quis dolorem eligendi odio quidem laudantium. Quasi, soluta architecto nam, veritatis saepe ea rem similique, inventore voluptates nisi temporibus quis reiciendis labore. Dolorum, error recusandae deleniti at quae, expedita aperiam ullam laudantium necessitatibus quas in sapiente reprehenderit quo. Sapiente, illum. Deleniti aperiam, sint voluptatum minus quibusdam quaerat maiores? Excepturi perspiciatis beatae voluptatem architecto possimus, aspernatur officia est consequuntur, veniam enim unde, cumque fuga hic incidunt autem soluta tempore aperiam. Similique adipisci dolorem officiis nemo aspernatur distinctio corporis architecto beatae ratione at officia quae, ut modi neque, corrupti necessitatibus nihil id autem consequuntur qui! Qui ipsum non facere accusantium? Odit praesentium excepturi error, harum, repudiandae, quibusdam vero sint magni laborum molestias nulla pariatur fugiat? Expedita ullam laudantium consectetur excepturi sint saepe beatae aspernatur sed odio alias molestiae explicabo unde at labore dignissimos nostrum quaerat libero nulla fugiat, veniam cumque accusantium numquam. Dolore beatae minus illo est quisquam porro, libero facilis corporis velit illum ut quam voluptatum nostrum autem facere cupiditate. Aliquam neque sed perspiciatis voluptas accusantium corporis fuga, nisi accusamus. Rerum velit adipisci libero voluptate, omnis itaque eos architecto ipsum provident quos tempore temporibus atque natus delectus doloribus facere autem ad, mollitia repellat minus. Quia modi, officia voluptas fugiat voluptates impedit nostrum vel minus velit ratione veniam inventore error amet, corporis doloribus quaerat consequuntur dolorem exercitationem aperiam vitae dolor. Natus, nemo eum! Dolore inventore ratione, accusantium quibusdam excepturi voluptas earum! Nemo quis distinctio illo facere nihil et magnam facilis officia modi quaerat veniam non, possimus rerum adipisci eius obcaecati voluptatum deleniti, ipsam expedita esse eligendi! Quisquam, aliquid asperiores incidunt earum ducimus aperiam, dignissimos voluptas in officiis hic veritatis? Dolor deleniti ipsum consequatur soluta quia maiores molestias culpa inventore, officia eos neque, magnam doloribus cupiditate provident facere. Inventore exercitationem vitae temporibus dolores tempora! Molestias facere quas sint possimus alias in quos natus cupiditate enim vero architecto, ipsam modi, ut beatae consequuntur. Quae nam optio dolor at soluta sunt corrupti eos facere totam aspernatur. Enim blanditiis ea, aspernatur commodi tenetur, provident repellat placeat molestias obcaecati architecto dolorem odit non totam ullam voluptate fuga. Beatae quia, corporis magnam veritatis alias natus hic ipsam doloribus, aliquam totam fugit delectus. Asperiores, accusantium eligendi voluptas corrupti labore repellendus fugit at voluptatem autem! Culpa nostrum deleniti nobis error fugit provident molestias natus, veritatis minus, alias aliquam ducimus harum rem dicta est repellat minima illum, iusto incidunt adipisci dolorem! A eaque nihil delectus impedit eius minima soluta cumque? Sequi doloribus dolorum nemo numquam laborum quod provident itaque at cupiditate distinctio quis voluptates pariatur repudiandae, tempore, maxime explicabo, unde quae placeat aperiam nihil id. Expedita ea minima illo molestias? Voluptatem deleniti dolores vitae totam nam laborum, laboriosam consequuntur est aut harum magni dolore aspernatur similique. Saepe incidunt deserunt perferendis blanditiis quae ducimus consectetur obcaecati nulla autem dolorum voluptate dolor perspiciatis at, cumque eos, veniam reprehenderit voluptatem vel. Magnam eius quisquam quis nulla. Necessitatibus eligendi iste, recusandae ex odio doloremque ipsam, suscipit consequuntur provident ut dolorem. Similique et mollitia sequi consequuntur laudantium asperiores iusto neque eligendi explicabo, ipsa at sunt officia voluptatum minima quibusdam eveniet! Facilis commodi quas eveniet a officiis ut reprehenderit odit illo ipsa minus saepe soluta nihil consectetur, ea unde quibusdam, vel laudantium eaque fugit dignissimos alias tenetur. Debitis atque, natus cumque esse accusamus harum quasi adipisci? Est cupiditate fuga illum temporibus, non mollitia optio aliquid molestiae eveniet necessitatibus soluta, ex deleniti voluptatum laudantium rerum veniam nisi similique assumenda perspiciatis ad dolor, omnis sapiente ullam repudiandae. Aspernatur ipsum qui sed velit odio ad porro itaque incidunt vel autem repudiandae quia error, commodi iure accusantium quos consequuntur quae labore reiciendis quis? Ipsam rem molestias recusandae voluptatem atque voluptate eaque sapiente distinctio obcaecati, deserunt magni veniam perferendis? Officia aliquam, non fuga assumenda doloribus, aliquid quos dignissimos accusantium consequuntur quidem ea exercitationem incidunt vel harum deserunt optio reiciendis amet, nulla earum eveniet quam minus sint? Eum eveniet minima vel ipsa quos! Odit sapiente voluptatibus porro consequuntur in totam est quibusdam fugiat dolore fuga ipsa incidunt repudiandae molestiae delectus repellendus, placeat unde deserunt reiciendis numquam sit? Numquam quis quod aliquam, eaque, nihil praesentium nulla placeat magnam perferendis sint commodi laborum officia aspernatur consequuntur modi ipsam quo, a voluptatum ea assumenda iure voluptatibus culpa? Earum obcaecati voluptates laboriosam consequuntur eum, id veniam eligendi quidem alias commodi perferendis aliquid quae facilis doloribus tenetur tempore adipisci unde officiis accusamus enim assumenda modi! Eius quia cupiditate autem, repudiandae molestias voluptas enim ad veritatis repellat nihil ab debitis, quisquam veniam modi excepturi obcaecati fuga laborum ipsa assumenda similique perferendis a adipisci beatae vel. Ipsa, at expedita nobis consequatur beatae ducimus molestiae id tenetur, nihil vel impedit praesentium amet. Nesciunt, optio quae quia a molestias molestiae incidunt quos, in fugiat quam, quibusdam nobis tenetur aut. Fugit, obcaecati repellat aliquid architecto eligendi vitae non quam quo necessitatibus asperiores deserunt quos! At eum corporis consectetur! Odit, est velit quibusdam exercitationem ad soluta libero vitae quaerat molestias accusamus consequuntur eius eveniet dolores labore perferendis aliquam animi asperiores iste nam earum voluptas itaque recusandae, fugit officia. Quia amet error, fuga fugit ex vel sint quas expedita eveniet!</p>
        </div>
    );
};

export default Navigation;