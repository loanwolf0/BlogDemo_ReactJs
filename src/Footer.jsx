import { isToday } from 'date-fns'
import React from 'react'

const Footer = () => {
  const today = new Date();
  return (
    <footer className='Footer'>
      <p> CopyRight &copy;  { today.getFullYear()}  </p>
    </footer>
  )
}

export default Footer
