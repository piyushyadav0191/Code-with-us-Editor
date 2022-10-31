import React from "react";
import {
	Nav,
	NavLogo,
	NavLink,
	Bars,
	NavMenu,
	NavBtn,
	NavBtnLink,
} from "./NavbarElements";
import Contact from "../Contact/Contact";

const Navbar = () => {
    return (
        <>
           <Nav>
            <NavLogo to="/">
                EDIT.ME EDITOR
            </NavLogo>
            <Bars />

            <NavMenu>
                <NavLink 
                  to="/"
                  activestyle={{ color:'white' }}
                >
                    HOME
                </NavLink>
               
                <NavLink 
                to='/markup-editor'
                  activestyle={{ color: 'black' }}
                >
                    MARKUP-EDITOR
                </NavLink>
               
                <NavLink 
                  to="/contact" 
                  element={<Contact />}
                  activestyle={{ color: 'black' }}
                >
                    CONTACT
                </NavLink>
                <NavBtn>
                    <NavBtnLink to="/sign-up">Github</NavBtnLink>
                </NavBtn>
            </NavMenu>
           </Nav> 
         
           
        </>
    );
};
export default Navbar;