import React, { useState, useEffect } from 'react';
import './App.css';
import { allFollowers } from './Api/Api';
const App = () => {
  const [data, setData] = useState([]);
  const allFollower = async () => {
    const data = await allFollowers();
    setData(data?.data?.data);
  }
  useEffect(() => {
    allFollower();
  },[])
  return (
    <>
      {
        data.map((data, index) => {
          return (
            <h1 key={index}>{data.first_name}</h1>
          );
        })
      }
    </>
  );
}

export default App;
