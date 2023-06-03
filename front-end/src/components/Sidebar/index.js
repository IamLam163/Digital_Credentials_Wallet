import React from 'react';
import { SidebarContainer,
     Icon, 
     CloseIcon, 
     SideBtnWrap, 
     SidebarWrapper, 
     SidebarMenu, 
     SidebarLink, 
     SidebarRoute
    } from './SidebarElements';
// import {animateScroll as scroll} from 'react-scroll';
// import { Link as LinkR } from 'react-router-dom';


function Sidebar({ isOpen, toggle }) {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
        <Icon onClick={toggle}>
            <CloseIcon />
        </Icon>
        <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="#About" onClick={toggle}>
            About
          </SidebarLink>
             <SidebarLink to="#discover" onClick={toggle}>
            Discover
          </SidebarLink>
             <SidebarLink to="#services" onClick={toggle}>
            Services
          </SidebarLink>
             <SidebarLink to="#signup" onClick={toggle}>
            Sign up
          </SidebarLink>
        </SidebarMenu>
        <SideBtnWrap>
            <SidebarRoute to="/signin" onClick={toggle}>Sign In</SidebarRoute>
        </SideBtnWrap>
        </SidebarWrapper>
    </SidebarContainer>
  )
}

export default Sidebar;