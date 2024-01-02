import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import axios from "axios";


const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
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

const Comments = ({videoId}) => {
  const [comments,setComments]= useState([])
  const [addcomment,setAddcomment]= useState("")
useEffect(()=>{
  async function fetchData(){
    const result = await axios.get(`http://localhost:8000/comment/get?id=${videoId}`)
    setComments(result.data)
    console.log(result,"comments");
  }
  fetchData();
},[videoId])
async function submitdata(){
 const result = await axios.post("http://localhost:8000/comment/addcomment",{
    videoId:videoId,
    description:addcomment
  })
  //console.log(result,"comment");
}
  return (
    <Container>
      <NewComment>
        <Avatar src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo" />
        <Input placeholder="Add a comment..." onChange={e=>setAddcomment(e.target.value)}/>
        <Subscribe onClick={submitdata}>Submit</Subscribe>
      </NewComment>
      {
        comments.map(e=>{
          return(
            <Comment comment={e}/>
          )
        })
      }
     
     
    </Container>
  );
};

export default Comments;
