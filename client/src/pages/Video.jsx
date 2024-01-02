import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { Subscriptions, ThumbUp } from "@mui/icons-material";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../components/Comments";
import Card from "../components/Card";
import axios from "axios";
import { Await, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { videolike, videosuccess } from "../redux/videoSlice";
import {format} from "timeago.js"
import { subscription } from "../redux/userSlice";
const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recommendation = styled.div`
  flex: 2;
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Video = () => {
  const user=useSelector(state=>state.user.user)
 const currentVideo=useSelector(state=>state.video.video)
  const dispatch = useDispatch()
  const id = useParams().id
 
  const [video,setVideo]=useState({})
  const [channelUser,setChannelUser]= useState({})
  useEffect(()=>{
    async function fetchData(){
       const result = await axios.get(`http://localhost:8000/video/get?id=${id}`)
       const chanelUser = await axios.get(`http://localhost:8000/user/get?id=${result.data.userId}`)
       dispatch(videosuccess(result.data))
   
       setVideo(result.data)
      
     
       setChannelUser(chanelUser.data)
       console.log(channelUser,"channelUser");
       console.log(user,"user");
    }
    fetchData()
  },[id,dispatch])
  async function subscribe(){
    if(user.subscribedUsers?.includes(channelUser._id)){
    const result =  await axios.post("http://localhost:8000/user/unsubscribe",{
        id:channelUser._id
      })
      
     dispatch(subscription(channelUser._id))
    }else{
    const result =   await axios.post("http://localhost:8000/user/subscribe",{
        id:channelUser._id
      })
    
      dispatch(subscription(channelUser._id))
    }
  }

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width="100%"
            height="720"
            src={currentVideo?.videoUrl}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>{format(currentVideo?.createdAt)}</Info>
          <Buttons>
          
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channelUser.Image} />
            <ChannelDetail>
              <ChannelName>{channelUser.name}</ChannelName>
         
              <Description>
              {currentVideo?.description}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
        
        </Channel>
        <Hr />
        <Comments videoId={currentVideo?._id}/>
      </Content>
      <Recommendation>
      
      </Recommendation>
    </Container>
  );
};

export default Video;
