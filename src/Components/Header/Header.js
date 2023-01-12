import React from 'react';
import 'react-dropdown/style.css';
import './Header.css';
import {DropdownLink} from "../DropdownLink";

export const productsLink = [
    {
        href: "#",
        name: "products 1"
    },
    {
        href: "#",
        name: "products 2"
    },
    {
        href: "#",
        name: "products 3"
    },
];

export const resourcesLink = [
    {
        href: "#",
        name: "resources 1"
    },
    {
        href: "#",
        name: "resources 2"
    },
    {
        href: "#",
        name: "resources 3"
    },
];

function Header() {
    return (
        <div>
            <div className="header">
                <div className="container">
                    <div className="logo">
                        <img src={require("../../assets/blog.png")} alt="" width="32px"/>
                        <h3>Untiled UI</h3>
                    </div>
                    <input id="menu_toggle" type="checkbox"/>
                    <label className="menu_btn" htmlFor="menu_toggle">
                        <span></span>
                    </label>
                    <ul className="header_list">
                        <li>
                            <a href="/#">Home</a>
                        </li>
                        <li>
                            <DropdownLink name={"Products"} list={productsLink}/>
                        </li>
                        <li>
                            <DropdownLink name={"Resources"} list={resourcesLink}/>
                        </li>
                        <li>
                            <a href="/#">Pricing</a>
                        </li>
                    </ul>
                    <ul className="header_list">
                        <li>
                            <a href="/#">Log in</a>
                        </li>
                        <li>
                            <input type="button" onClick={() => alert('Sign up')} value="Sign up"/>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;