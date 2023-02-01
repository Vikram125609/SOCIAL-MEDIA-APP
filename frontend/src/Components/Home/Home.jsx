import { useState } from "react";
import { useEffect } from "react";
import { user } from "../../Api/Api";
import Loader from "../Loader/Loader";

const Home = () => {
    const [loading, setLoading] = useState(false);
    const me = async () => {
        const body = {
            token: localStorage.getItem('token'),
            _id: localStorage.getItem('_id')
        }
        try {
            setLoading(true);
            const data = await user(body);
            console.log(data?.data?.data)
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        me();
    }, [])
    return (
        <>
            {
                loading ? (<Loader />) : (
                    <div>
                        <h1>This is the home page</h1>
                    </div>
                )
            }
        </>
    );
}
export default Home