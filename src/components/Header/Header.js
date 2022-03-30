import React from 'react'

import {Avatar} from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import './Header.css'

function Header({user}) {
  return (
    <div className='header_section'>
        <div className='header_left'>
          <AccessTimeIcon />
        </div>
        <div className='header_search'>
            <SearchIcon />
            <input className='header_input' placeholder='search somethink' />
        </div>
        <div className='header_right'>
            <HelpOutlineIcon />
        </div>
    </div>
  )
}

export default Header