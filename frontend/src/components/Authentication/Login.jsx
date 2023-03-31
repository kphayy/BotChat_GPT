import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const {login} = useContext(AuthContext);
  
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(!email || !password) {
      toast({
        title: 'Please fill all feilds!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      })
      setLoading(false);
      return;
    }

    try{
      await login({email, password});
      navigate("/chats")

    }catch(err){
      toast({
        title: 'Error Occurred!',
        description: err.response.data,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      })
      setLoading(false);
    }

  }

  return (
    <VStack spacing="10px">
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        
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

        <Button type="submit" colorScheme="purple" size="sm" style={{marginTop: "20px"}} width="100%" isLoading={loading}>
            Login
        </Button>
      </form>
    </VStack>
  )
}

export default Login