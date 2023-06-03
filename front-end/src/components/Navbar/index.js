import React from 'react'
import { FaBars } from 'react-icons/fa'
import { IconContext } from 'react-icons/lib'
import {animateScroll as scroll} from 'react-scroll'
import {Nav,
  NavbarContainer,
  NavLogo, 
  MobileIcon,
  NavMenu,
  NavItem, 
  NavLinks,
  NavBtn,
  NavBtnLink
  } from './NavbarElements';
import ApiIcon from '@mui/icons-material/Api';
  
function Navbar ({toggle}) {
  return (
    <>
    <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
            <NavbarContainer>
                <NavLogo>
                <ApiIcon sx={{ fontSize: 40 }} />
                <p style={{ fontSize: 12}}>Digital Wallet</p>
                </NavLogo>
                <MobileIcon onClick={toggle}>
                  <FaBars />
                </MobileIcon>
                <NavMenu>
                  <NavItem>
                    <NavLinks to='about' smooth={true} duration={500} spy={true} exact='true' offset={-80}>About Us</NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks to='discover' 
                  smooth={true}
                   duration={500} 
                   spy={true} 
                   exact='true' 
                   offset={-80}
                   activeClass='active'
                   >Discover</NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks to='signin' 
                  smooth={true}
                   duration={500} 
                   spy={true} 
                   exact='true' 
                   offset={-80} 
                   activeClass='active'
                   >Contact Us</NavLinks>
                </NavItem>
                <NavItem>
                <NavLinks to='services'> Services
                </NavLinks>
                </NavItem>
                <NavBtn>
                  <NavBtnLink to="/signin">Log In</NavBtnLink>
                </NavBtn>
                </NavMenu>
            </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  )
}

export default Navbar;