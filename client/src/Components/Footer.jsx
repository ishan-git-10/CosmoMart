import React from "react";

function Footer(){
    let currTime = new Date().getFullYear();
    return(
        <footer>
            <p>CosmoMart ⓒ {currTime}</p>
        </footer>  
    );
}

export default Footer;