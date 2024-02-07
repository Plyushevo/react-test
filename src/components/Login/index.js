import React, {useState} from 'react'

const initialUser = {password: "", email: ""}
const Login = () => {
  const [user, setUser] = useState(initialUser)
  const handleChange = () => {

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
    </div>
  )
}

export default Login
