import React,{useState} from 'react'
import Axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ResetPassword() {

    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [passwordMatch, setPasswordMatch] = useState(true)
    const [responseMessage, setResponseMessage] = useState('')

    // get the parameters from the url
    const params = useParams();
    const id = params.id
    const token = params.token

    // on password 1 change
    const handlePass1Change = (pass1) => {
        setPassword1(pass1)
    }
    // on password 2 change
    const handlePass2Change = (pass2) => {
        setPassword2(pass2)
    }

    // on submission
    const handleSubmit = () => {
        // check for equality of passwords
        if(password1 === password2) {
            Axios.post(`http://localhost:4001/reset-password/${id}/${token}`, {pass1: password1, pass2: password2})
            .then((response)=> {
                setResponseMessage(response.data)
            })
        }
        else {
            setPasswordMatch(false)
        }
      }
  return (
    <div>
        <input placeholder="Enter new password" name="password1" type="password" value={password1} onChange={(e) =>handlePass1Change(e.target.value)}/>
        <input placeholder="Confirm new password" name="password2" type="password" value={password2} onChange={(e) =>handlePass2Change(e.target.value)}/>
        <button onClick={handleSubmit}>Reset Password</button>
        {passwordMatch ? '': <p style={{color:"red"}}>Passwords don't match!</p>}
        <p>{responseMessage}</p>
    </div>
  )
}
