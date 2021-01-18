
import { useContext, useState, useEffect} from "react";
import { LinkDetailsContext } from "../Contexts/LinkDetailsContext";
import { LinksContext } from "../Contexts/LinksContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export const ExternalLinks = (props) =>{

    const [date, setDate] = useState(new Date());
    const [firstLink, setFirstLink] = useState(props.link);
    const [secondLink, setSecondLink] = useState("");

    const [isLoading, setIsLoading] = useState(false);
 
    const {externalLinks, getExternalLinks} = useContext(LinkDetailsContext);
    const {links} = useContext(LinksContext);
    
    const getExtLinks = () => {
        setIsLoading(true);
    }

    return (
        <div className = "row">
          <div className = "col-md-12">
              <textarea>
                  {externalLinks}
              </textarea>
          </div> 
          
          <div className = "row">
            <div className = "col-md-6 date">
                <label>Date:</label>
                <DatePicker 
                    className = "datePicker"
                    selected = {date}
                    dateFormat="P"
                    onChange = {date => setDate(date)}/>
            </div>
            <div className = "col-md-6">
                <label>Second link:</label>
                <Dropdown className = "linksDropDown" onChange = {linkTwo => setSecondLink(linkTwo)} options = {""}  value = "Choose second link" />
            </div>
          </div>
          
          <div className = "col-lg-5 getLinksBtnDiv">
            <button className = "getLinksBtn" onClick = {getExtLinks} >Get data</button>
          </div>
        </div>
    );
}