import { useState } from "react";
import { useEffect } from "react";
import { posts, user } from "../../Api/Api";
import Loader from "../Loader/Loader";
import "./Home.css" 

const Home = () => {
    const [loading, setLoading] = useState(false);
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
        me();
        // feed();
    }, [])
    return (
        <>
            {
                loading ? (<Loader />) : (
                    <div>
                        <h1>This is the home page</h1>
                        <h1>{userdata?.first_name}</h1>
                        <h1>{userdata?.last_name}</h1>
                        <h1>{userdata?._id}</h1>
                        <h1>{userdata?.user_id}</h1>
                        <h1>{ userdata?.image }</h1>
                        <img src={userdata?.image} alt="" width={"100px"} style={{ borderRadius: "50%", objectFit: "cover" }} />
                    </div>
                )
            }
        </>
    );
}
export default Home