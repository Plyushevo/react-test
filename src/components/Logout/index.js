import React, { useEffect } from 'react'
import { redirect, useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem("user", "")
    navigate('/login')
  }, [navigate]); //почему так? как работает функция?

  return null
}

export default Logout
