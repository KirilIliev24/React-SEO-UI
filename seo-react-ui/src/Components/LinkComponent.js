
import { useContext } from "react";
import { LinkDetailsContext } from '../Contexts/LinkDetailsContext';
import axios from "axios";
import "../Css/LinkComponent.css";


export const LinkComponent = (props) =>{

    const {details, getLinksDetails} = useContext(LinkDetailsContext);
    const {title, link, snippet} = props.link;

    const getLinksDetailsBtn = () =>{
        getLinksDetails(link);
    }
    return(
        <div>
               <div className = "row" id = "divItem">
                    <h4>{title}</h4>
                    <a href = {`${link}`} target = "_blank">{link}</a> 
                    <p>{snippet}</p>
                    <button onClick = {getLinksDetailsBtn.bind(this, link)}>Click me</button>
               </div>
               
        </div>
    );
}
