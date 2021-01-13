import { useContext, useEffect, useState} from "react";

import { LinksContext } from "../Contexts/LinksContext";
import { LinkComponent } from "./LinkComponent";

export const LinkList = () =>{

    const [loading, setLoading] = useState(false);
    const {links} = useContext(LinksContext);

    return(
     
        <div>
            {loading ? 
             <div>
              <p>Loading...</p>
            </div>
            : 
            <div className = "container">
                 {links.map((link, i) => {
                     return(
                        <LinkComponent key = {i} link = {link}/>
                    )   
               })}
            </div> 
            }
        </div>
    );

}
