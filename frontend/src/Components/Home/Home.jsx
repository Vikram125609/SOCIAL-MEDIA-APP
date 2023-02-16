import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { posts, user } from "../../Api/Api";
import Post  from "../Post/Post"
import Loader from "../Loader/Loader";
import "./Home.css"

const Home = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [userdata, setUserdata] = useState();
    const me = async () => {
        const body = {
            token: localStorage.getItem('token'),
            _id: localStorage.getItem('_id')
        }
        try {
            setLoading(true);
            let data = await user(body);
            data = data?.data?.data;
            localStorage.setItem('image', data.image);
            localStorage.setItem("block_user", data.block_user);
            localStorage.setItem("follow_user", data.follow_user);
            setUserdata(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    const feed = async () => {
        try {
            let data = await posts();
            console.log(data?.data?.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            navigate('/')
        }
        else {
            me();
            // feed();
        }
    }, [])
    return (
        <div className="homeContainer">
            {
                loading ? (<Loader />) : (
                    <div>
                        <Post />
                    </div>
                )
            }
        </div>
    );
}
export default Home