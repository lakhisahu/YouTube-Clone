import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {format} from "timeago.js"

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text}
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({comment}) => {
  const [channeluser,setChanneluser]=useState({})
  useEffect(()=>{
    async function fetchdata(){
      const result = await axios.post(`http://localhost:8000/user/ger?id=${comment.userId}`)
      setChanneluser(result.data)
    }
  })
  return (
    <Container>
      <Avatar src={channeluser.image} />
      <Details>
        <Name>
          {channeluser.name}<Date>{format(comment.createdAt)}</Date>
        </Name>
        <Text>
        {comment.description}
        </Text>
      </Details>
    </Container>
  );
};

export default Comment;
