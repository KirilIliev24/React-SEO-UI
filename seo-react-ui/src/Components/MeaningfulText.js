import { useContext, useState, useEffect} from "react";
import { LinkDetailsContext } from "../Contexts/LinkDetailsContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Css/MeaningfulText.css";
import {Zlib, Inflate} from "react-zlib-js";

// import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive'

export const MeaningfulText = (props) =>{

    const [date, setDate] = useState(new Date());
    const [isloading, setIsLoading] = useState(true);

    const {meaningfulText, getMeaningfulText} = useContext(LinkDetailsContext);

    //this works only for 1 keyword count
    const {text, keyword, keywordsInText, keywordsInMetaTags} = meaningfulText[0];
    const [decodedText, setDecodedText] = useState("");
    useEffect(() => {
        return () => {
            setIsLoading(true);
        }
    }, [])

   

    useEffect(() => {
        console.log(text)
        decodeText(text);
    }, [meaningfulText])

    const decodeText = (encodedString) =>{
        
        try {
            const pako = require('pako');

            var strData = window.atob(encodedString);
            console.log("Strig data\n" + strData);

            const data = pako.inflateRaw(Uint8Array.from(strData, c => c.charCodeAt(0)), {to : 'string'});
            setDecodedText(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getText = async() =>{
        setIsLoading(true);
        await getMeaningfulText(props.link, date);
        setIsLoading(false);
    }

    return(
        <div className = "container textContainer">
            <h3>Meaningful text</h3>
            <div className = "row">
                <div className = "col">
                    <p className = "textParagraph">
                        {decodedText}
                    </p>
                </div>
            </div>
            <div className = "row keywordCountRow">
                <div className = "col-md-3 textOne">Keywords in text: {keywordsInText}</div>
                <div className = "col-md-3 textTwo">Keywords in meta tags: {keywordsInMetaTags}</div>
            </div>
            <div className = "row dateTextRow">
                <div className = "col-md-4 dateTextDiv">
                    <DatePicker 
                        className = "meanTextDate"
                        selected = {date}
                        dateFormat="P"
                        onChange = {date => setDate(date)}/>
                </div>
                <div className = "col-md-4 btnTextDiv">
                   <button className = "textBtn" onClick = {getText}>Get Data</button>
                </div>
            </div>
        </div>
    )
}