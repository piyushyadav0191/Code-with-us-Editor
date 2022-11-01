import React from "react";
import {
    Nav, NavLogo, NavLink, Bars, NavMenu, NavBtn, NavBtnLink
} from "./NavbarElements";
import Contact from "../Contact/Contact";


const Navbar = () => {

    return (
        <>
            <Nav>
                <NavLogo to="/">
                    Code With Us
                </NavLogo>
                <Bars />

                <NavMenu>
                    <NavLink
                        to="/"
                        activestyle={{ color: 'white' }}
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
                        <a href="https://github.com/piyushyadav0191/Code-with-us-Editor/" target="_blank" rel="noopener noreferrer">
                            <button class="cssbuttons-io">
                                <span className="butspan"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z" fill="currentColor"></path></svg> Github</span>
                            </button>
                        </a>
                    </NavBtn>
                </NavMenu>
            </Nav>


        </>
    );
};
export default Navbar;