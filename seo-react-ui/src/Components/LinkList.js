import { useContext} from "react";

import { LinksContext } from "../Contexts/LinksContext";
import { LinkComponent } from "./LinkComponent";

export const LinkList = () =>{

    const {links, setLinks} = useContext(LinksContext);

    return(
     
        <div>
               {links.map(link => {
                   <LinkComponent link = {link}/>
               })}
        </div>
    );

}
