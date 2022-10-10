import React,{useState} from 'react';
// import {Link} from 'react-router-dom'
import Axios from 'axios'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

 

  const handleSubmit = () => {
    console.log("Pressed")
    Axios.post('http://localhost:4001/forgot-password', {email: email})
    .then((response)=> {
      setMessage(response.data)
    })
  }

  const handleMailChange = (mail) => {
    setEmail(mail)
    // console.log(email);
    console.log(message)
  }

  return (
    <div>
        <input placeholder="Enter your email" name="email" type="email" value={email} onChange={(e) =>handleMailChange(e.target.value)}/>
        <button onClick={handleSubmit}>Submit</button>
        <p>{message}</p>
    </div>
  )
}
