import React from 'react';
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SideBtnWrap,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
  SidebarRoute,
} from './SidebarElements';


function Sidebar({ isOpen, toggle }) {
  return (
    ///reverse changes made to the sidebar
    <SidebarContainer >
      <Icon>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="#about" onClick={toggle}>
            About
          </SidebarLink>
          <SidebarLink to="#discover" onClick={toggle}>
            Discover
          </SidebarLink>
          <SidebarLink to="#Services" onClick={toggle}>
            Services
          </SidebarLink>
          <SidebarLink to="#signup" onClick={toggle}>
            Sign up
          </SidebarLink>
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute to="/signin" onClick={toggle}>
            Sign In
          </SidebarRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
}

export default Sidebar;