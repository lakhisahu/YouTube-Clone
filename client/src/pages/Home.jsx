import React, { useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const Home = ({type}) => {
  const [video,setVideo] = useState([])
  useEffect(()=>{
    async function fetchdata(){
      const video = await axios.get(`http://localhost:8000/video/${type}`)
      console.log(video);
      setVideo(video.data)
    }
    fetchdata()
  },[type])
  return (
    <Container>
      {
        video.map(e=>{
          return(
            <Card e={e}/>
          )
        })

      
      }
     
    </Container>
  );
};

export default Home;
