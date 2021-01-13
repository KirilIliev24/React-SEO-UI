import axios from "axios";
import {createContext, useState} from "react"


export const LinkDetailsContext = createContext();

export const LinkDetailsProvider = ({children}) =>{
    const [linkDetails, setLinkDetails] = useState([]);

    const getLinksDetails = async(link) =>{
        await axios
        .get(
            `/SearchEngine/positions/byDatePeriod`,
            {headers: 
                {
                    "link" : link,
                    "startDate" : null,
                    "endDate" : null
                }})
        .then((result) => {
            const data = result.data;
            setLinkDetails(data);
           
        })
        .catch((error) => console.log(error));
    }
    return(
        <LinkDetailsContext.Provider value = {{linkDetails, getLinksDetails}}>
            {children}
        </LinkDetailsContext.Provider>
    )
}