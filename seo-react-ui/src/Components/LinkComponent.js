
import { LinksContext } from "../Contexts/LinksContext";

export const LinkComponent = () =>{


    const {title, link, snippet} = this.props.link;
    return(
     
        <div className = "container">
               <div className = "row">
                    <p>{title}</p>
                    <a href = {`${link}`}>{link}</a> 
                    <p>{snippet}</p>
               </div>
        </div>
    );

}
