
import { useContext } from "react";
import { LinkDetailsContext } from '../Contexts/LinkDetailsContext';
import { BrowserRouter as Router, Route, NavLink, Link} from "react-router-dom";
import axios from "axios";
import "../Css/LinkComponent.css";


export const LinkComponent = (props) =>{

    const {details, getLinksDetails} = useContext(LinkDetailsContext);
    const {keyword, title, link, snippet} = props.link;

    // const getLinksDetailsBtn = () =>{
    //     getLinksDetails(link, keyword, "", "");
    // }//move to link details and pass the link?
    {/* <button onClick = {getLinksDetailsBtn.bind(this, link)}>Click me</button> */}

    return(
        <div>
               <div className = "row" id = "divItem">
                    <h4>{title}</h4>
                    <a href = {`${link}`} target = "_blank">{link}</a> 
                    <p>{snippet}</p>
                    <div className = "navBtnDiv">
                        <NavLink
                            className = "navBtn"
                            to = {{
                                pathname: "/linkDetails",
                                dataPass: {link, keyword}
                            }}>
                                Go to link details
                        </NavLink>
                    </div>
               </div>
               
        </div>
    );
}
