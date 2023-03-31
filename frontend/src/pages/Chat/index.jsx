import React from 'react'
import axios from 'axios'

const handleClick = async () => {
  try{
    axios.defaults.headers.common['Cookie'] = document.cookie;
    await axios.post("http://localhost:5000/api/auth/refreshtoken");
  }catch(err){
  }
}

const ChatPage = () => {
  return (
    <button onClick={handleClick}>ChatPage</button>
  )
}

export default ChatPage