import {createContext, useState} from "react"

export const KeywordsContext = createContext();

export const KeywwordsProvider = ({children}) =>{
    const [keywords, setKeywords] = useState
    ([
        {
            id: 0,
            keyword: "coffee"
        }, 
        {
            id: 1,
            keyword: "sport"
        },
        {
            id: 2,
            keyword: "tennis"
        }
    ]);
    return(
        <KeywordsContext.Provider value = {{keywords, setKeywords}}>
            {children}
        </KeywordsContext.Provider>
    )
}