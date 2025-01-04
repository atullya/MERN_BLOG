import React from 'react'
import Aside from '../Aside'
import UserProfileComponent from '../OtherComponent/UserProfileComponent'

const UserProfile = () => {
  return (
    <div className="flex min-h-screen ">
      {/* Left Sidebar */}
      <Aside />
      
      {/* Centered Profile Component */}
      <div className="flex flex-1 justify-center items-center ">
        <UserProfileComponent />
      </div>
    </div>
  )
}

export default UserProfile
