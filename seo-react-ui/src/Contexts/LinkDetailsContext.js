
import {createContext, useState} from "react"
import axios from "axios";


export const LinkDetailsContext = createContext();

export const LinkDetailsProvider = ({children}) =>{
    const [linkDetails, setLinkDetails] = useState([]);
    const [externalLinks, setExternalLinks] = useState([]);

    const getLinksDetails = async(link, keyword, startDate, endDate) =>{
        await axios
        .get(
            `/SearchEngine/positions/byDatePeriod`,
            {headers: 
                {
                    "link" : link,
                    "keywords": keyword,
                    "startDate" : `${startDate.toLocaleDateString()}`,
                    "endDate" : `${endDate.toLocaleDateString()}`
                }})
        .then((result) => {
            const data = result.data;
            setLinkDetails(data);
           
        })
        .catch((error) => console.log(error));

        console.log(`Link details for ${link}`);
    }

    const getExternalLinks = async(linkOne, linkTwo, date) => {
        await axios
        .get(
            `/SearchEngine/getLinksWithRegex`,
            {headers: 
                {
                    "url" : linkOne,
                    "urlTwo" : linkTwo,
                    "date" : `${date.toLocaleDateString()}`
                }})
        .then((result) => {
            const data = result.data;
            setExternalLinks(data);
           
        })
        .catch((error) => console.log(error));

        console.log(`External links for ${linkOne}\n and \n ${linkTwo}`);
    } 

    const resetData = () =>{
        console.log("Component unmount context");
        setLinkDetails([]);
    }

    return(
        <LinkDetailsContext.Provider value = {{linkDetails, getLinksDetails, resetData, externalLinks, getExternalLinks}}>
            {children}
        </LinkDetailsContext.Provider>
    )
}