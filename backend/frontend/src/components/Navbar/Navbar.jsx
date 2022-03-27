import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  CContainer,
  CHeaderNav,
  CNavLink,
  CNavItem,
  CNavbar,
  CNavbarToggler,
  CCollapse,
  CNavbarNav,
  CNavbarBrand,
  CDropdown,
  CDropdownItem,
  CDropdownDivider,
  CDropdownMenu,
  CDropdownToggle,
  CButton,
  CImage,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import HeaderDropdown from "./HeaderDropdown";

const Navbar = ({ showSidebar, setShowSidebar }) => {
  const location = useLocation();
  const hideOn = ["/login", "/register", "/otp","/notfound"];
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  if (hideOn.includes(location.pathname)) {
    return null;
  } else {
    return (
      <CNavbar expand="lg" colorScheme="light" className="bg-light">
        <CContainer fluid>
          <CNavbarBrand className="d-flex align-items-center" href="/">
            <CImage
              src={require("../../assets/campuseerWhite.png")}
              height={48}
              alt="user"
            />{" "}
            <h4>Campuseer</h4>
          </CNavbarBrand>
          <CNavbarToggler onClick={() => setVisible(!visible)} />
          <CCollapse className="navbar-collapse" visible={visible}>
            <CNavbarNav>
              <CNavItem>
                <CNavLink href="/studentlist">Student List</CNavLink>
              </CNavItem>
            
             
              <CNavItem>
                <CButton onClick={() => navigate("/addrecord")}>
                  Add record
                </CButton>
              </CNavItem>
            </CNavbarNav>
          </CCollapse>
          <CHeaderNav className="ms-3">
            <HeaderDropdown />
          </CHeaderNav>
        </CContainer>
      </CNavbar>
    );
  }
};

export default Navbar;
