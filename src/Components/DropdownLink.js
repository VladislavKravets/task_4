import React from "react";
import './Dropdown.css';

function DropdownLink(props) {
    return (
        <div className="dropdown">
            <button className="dropbtn">{props.name} <img src={require("../assets/arrow_down.png")} width="10px" alt=""/></button>
            {
                props.list != null &&
                <div className="dropdown-content">
                    {
                        props.list.map((item, index) => {
                            return <a key = {index} href={item.href}> {item.name} </a>
                        })
                    }
                </div>
            }
        </div>
    )
}

export { DropdownLink }