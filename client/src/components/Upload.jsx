import React, { useEffect, useState } from "react";
import styled from "styled-components";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FileUpload } from "@mui/icons-material";

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { upload } from "@testing-library/user-event/dist/upload";
axios.defaults.withCredentials = true
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 14px;
`;
const Upload = ({ setOpen }) => {
 const [video,setVideo]=useState(null)
 const [image,setImage]=useState(null)
 const [title,setTitle]=useState("")
 const [description,setDescription]=useState("")
 const [videoper,setVideoper]=useState(0)
 const [imageper,setImageper]=useState(0)
 const [videourl,setVideourl]=useState("")
 const [imageurl,setImageurl]=useState("")
 function FileUpload(file,fileType){
    const storage = getStorage(app);
    const filename = new Date().getTime()+file.name
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);
uploadTask.on('state_changed', 
  (snapshot) => {

    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    if(fileType=="video"){
      setVideoper(Math.round(progress))
    }else{
      setImageper(Math.round(progress))
    }
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
      default:
        break;
    }
  }, 
  (error) => {
    console.log(error);
  }, 
   () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      if(fileType=="video"){
        setVideourl(downloadURL)
      }else{
        setImageurl(downloadURL)
      }
    });
  }
);
 }
 
 useEffect(()=>{
   video && FileUpload(video,"video")
 },[video])
 useEffect(()=>{
 image && FileUpload(image, "image")
 },[image])
 async function uploaddata(){
 const result =  await axios.post("http://localhost:8000/addvideo",{
    title:title,
    description:description,
    thumnail:imageurl,
    videoUrl:videourl
  })
  console.log(result);
 }
  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>
      {
        videoper > 0 ?("uploading:"+videoper+"%") :(
            <Input
          type="file"
          accept="video/*"
          onChange={e=>setVideo(e.target.files[0])}
        />)
      }
        
        
        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={e=>setTitle(e.target.value)}
        
        />
        <Desc
          placeholder="Description"
          name="desc"
          rows={8}
          onChange={e=>setDescription(e.target.value)}
        />
       
        <Label>Image:</Label>
      {
        imageper > 0 ? ("uploading:"+ imageper+"%") :(
          <Input
            type="file"
            accept="image/*"
            onChange={e=>setImage(e.target.files[0])}
          />
        )
      }
          
        
        <Button onClick={uploaddata}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;