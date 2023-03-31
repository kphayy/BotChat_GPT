import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleAvatarChange = (avatar) => {
      setLoading(true);
      if(!avatar){
        toast({
          title: 'Please selected an image!',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'bottom'
        })
        return;
      }

      if(avatar.type === "image/jpeg" || avatar.type === "image/png"){
        const data = new FormData();
        data.append("file", avatar);
        data.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
        console.log(process.env.REACT_APP_CLOUD_NAME)
        data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
        fetch( process.env.REACT_APP_URL_API_CLOUDINARY, {
          method: "POST",
          body: data,
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setAvatar(data.url.toString());
          setLoading(false);
        })
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(!name || !email || !password || !confirmPassword){
      toast({
        title: 'Please fill all the feilds!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      })
      setLoading(false);
      return;
    }

    if(password !== confirmPassword){
      toast({
        title: 'Password do not match',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      })
      setLoading(false);
      return;
    }

    try{
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }

      await axios.post("http://localhost:5000/api/auth/register", {
        name, email, password, avatar
      }, config);
      
      setLoading(false);
      navigate("/chats");
    }catch(err){
      toast({
        title: "Error Occurred!",
        status: 'error',
        description: err.response.data,
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      })
      setLoading(false);
    }
  };

  return (
    <VStack spacing="10px">
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
           value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          ></Input>
        </FormControl>

        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
             value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              type={show ? "text" : "password"}
            ></Input>
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id="confirm-password" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
             value={confirmPassword}
              placeholder="Enter your confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={show ? "text" : "password"}
            ></Input>
          </InputGroup>
        </FormControl>

        <FormControl id="avatar">
          <FormLabel>Your avatar</FormLabel>
          <InputGroup>
            <Input
              accept="img/*"
              onChange={(e) => handleAvatarChange(e.target.files[0])}
              type="file"
            ></Input>
          </InputGroup>
        </FormControl>

        <Button type="submit" colorScheme="purple" size="sm" style={{marginTop: "20px"}} width="100%" isLoading={loading}>
            Register
        </Button>
      </form>
    </VStack>
  );
};

export default Register;
