import React, { useState } from 'react'
import { FormGroup, Input, Button } from 'reactstrap'
import {toast} from 'react-toastify';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const initialUser = {username: '', email: '', password: ''}
const Registration = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate()
  
  const signUp = async() => {
    try {
      const url = 'http://localhost:1337/api/auth/local/register'
      if (user.username && user.email && user.password) {
        const res = await axios.post(url, user);
        if (res) {
          setUser(initialUser);
          navigate('/login')
        }
        console.log(res)
      }
    } catch (error) {
      toast.error(error.message, {
        hideProgressBar: true,
      })
    }
  }

  const handleUserChange = ({target}) => {
    const {name, value} = target; //что это?
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }))
  }
  return (
    <div>
      <h2>Sign Up</h2>
      <FormGroup>
        <Input
          type='text'
          name='username'
          value={user.username}
          onChange={handleUserChange}
          placeholder='Enter your full name'
        />
        <Input
          type='email'
          name='email'
          value={user.email}
          onChange={handleUserChange}
          placeholder='Enter your email'
        />
        <Input
          type='password'
          name='password'
          value={user.password}
          onChange={handleUserChange}
          placeholder='Enter your password'
        />
        <Button onClick={signUp} >Sign Up</Button>
      </FormGroup>
    </div>
  )
}

export default Registration
