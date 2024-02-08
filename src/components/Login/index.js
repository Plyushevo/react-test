import React, {useState} from 'react';
import { Col, Row, Button, FormGroup, Input} from 'reactstrap'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import {ToastContainer, toast} from 'react-toastify';
import { storeUser } from '../../helpers';

const initialUser = {password: "", identifier: ""}
const Login = () => {
  const [user, setUser] = useState(initialUser)
  const navigate = useNavigate();

  const handleChange = ({target}) => {
    const {name, value} = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }))
  }
  const handleLogin = async () => {
    const url = 'http://localhost:1337/api/auth/local'
    try {
      if (user.identifier && user.password) {
        const {data} = await axios.post(url, user)
        if (data.jwt) {
          storeUser(data)
          toast.success('Logged in succesfully', {
            hideProgressBar: true,
          })
          
          setUser(initialUser)
          navigate('/')
        }
      }
    } catch (error) {
      toast.error(error.message, {
        hideProgressBar: true,
      })
    } 
  }

  return (
    <div>
      <h2>Login:</h2>
      <div>
        <input 
          type="email" 
          value={user.identifier} 
          onChange={handleChange} 
          name='identifier' 
          placeholder='enter your email here' />
      </div>
      <div>
        <input 
          type="password" 
          value={user.password} 
          onChange={handleChange} 
          name='password' 
          placeholder='enter your password' />
      </div>
      <button onClick={handleLogin}>Login</button>
      <h6>
        Click <Link to='/registration'>here</Link> to signup
      </h6>
    </div>
  )
}

export default Login
