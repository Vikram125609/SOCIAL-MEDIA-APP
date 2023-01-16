import axios from "axios";
import './App.css';
const allFollower = async () => {
  const response = await axios.get("http://localhost:3000/api/user/v1/allFollower");
  console.log(response.data.data);
}
const App = () => {
  allFollower();
  return (
    <>
    </>
  );
}

export default App;
