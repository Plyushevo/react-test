import React from 'react'
import CustomNav from '../CustomNav'
import { userData } from '../../helpers'

const Home = () => {
  const {username} = userData() || {}
  return (
    <div>
      <CustomNav />
      <div>
        <h2>Welcome {username}</h2>
      </div>
    </div>
  )
}

export default Home;
