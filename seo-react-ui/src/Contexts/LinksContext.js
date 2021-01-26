import {createContext, useState} from "react"
import axios from "axios";


export const LinksContext = createContext();

export const LinksProvider = ({children}) =>{
    const [links, setLinks] = useState([]);

    const getLinks = async(keyword, startDate, endDate) =>{
        await axios
        .get(
            `https://localhost:44325/SearchEngine/getByKeyword/${keyword}`,
            {headers: 
                {
                    "startDate": `${startDate.toLocaleDateString()}`,
                    "endDate": `${endDate.toLocaleDateString()}`
                }
            })
        .then((result) => {
            const data = result.data;
            setLinks(data);
        })
        .catch((error) => console.log(error));
        console.log(keyword);
        console.log(startDate.toLocaleDateString());
        console.log(endDate.toLocaleDateString());
    }
    return(
        <LinksContext.Provider value = {{links, getLinks}}>
            {children}
        </LinksContext.Provider>
    )
}