import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginFailure, loginStart, loginsuccess } from "../redux/userSlice";
import { json } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
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

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {
  const [username,setUsername]= useState("")
  const [email,setEmail]= useState("")
  const [password,setPassword]= useState("")
  const dispatch = useDispatch()
 async function submitlogin(){
    try {
      dispatch(loginStart())
const data = await axios.post("http://localhost:8000/login",{
  email:email,
  password:password
})
console.log(data);
dispatch(loginsuccess(data.data))
localStorage.setItem("user",JSON.stringify(data.data))
    } catch (error) {
      dispatch(loginFailure())
      console.log(error);
    }
  }
  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to YouTube Clone</SubTitle>
        <Input placeholder="email" onChange={e=>setEmail(e.target.value)}/>
        <Input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}/>
        <Button onClick={submitlogin}>Sign in</Button>
        <Title>or</Title>
        <Input placeholder="username" onChange={e=>setUsername(e.target.value)}/>
        <Input placeholder="email" onChange={e=>setEmail(e.target.value)}/>
        <Input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}/>
        <Button>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
