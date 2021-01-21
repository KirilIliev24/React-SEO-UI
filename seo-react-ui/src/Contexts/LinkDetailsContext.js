
import {createContext, useState} from "react"
import axios from "axios";


export const LinkDetailsContext = createContext();

export const LinkDetailsProvider = ({children}) =>{
    const [linkDetails, setLinkDetails] = useState([]);
    const [externalLinks, setExternalLinks] = useState([]);
    const [meaningfulText, setMeaningfulText] = useState([
        {
            text: "",
            keyword: "",
            keywordsInText: 0,
            keywordsInMetaTags: 0
        }
    ]);

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
                    "singleDate" : `${date.toLocaleDateString()}`
                }})
        .then((result) => {
            const data = result.data;
            setExternalLinks(data);
           
        })
        .catch((error) => console.log(error));

        console.log(`External links for ${linkOne}\n and \n ${linkTwo}`);
    } 

    const getMeaningfulText = async(link, date) =>{
        await axios
        .get(
            `/SearchEngine/getMeaningfulText`,
            {headers: 
                {
                    "url" : link,
                    "singleDate" : `${date.toLocaleDateString()}`
                }})
        .then((result) => {
            const data = result.data;
            setMeaningfulText(data);
           
        })
        .catch((error) => console.log(error));

        console.log(`Meaningful text for ${link}`);
    }

    const resetData = () =>{
        console.log("Component unmount context");
        setLinkDetails([]);
        setExternalLinks([]);
        setMeaningfulText([
            {
                text: "",
                keyword: "",
                keywordsInText: 0,
                keywordsInMetaTags: 0
            }
        ]);
    }


    return(
        <LinkDetailsContext.Provider value = {{linkDetails, getLinksDetails, resetData, externalLinks, getExternalLinks, meaningfulText, getMeaningfulText}}>
            {children}
        </LinkDetailsContext.Provider>
    )
}