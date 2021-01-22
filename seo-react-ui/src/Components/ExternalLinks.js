
import { useContext, useState, useEffect} from "react";
import { LinkDetailsContext } from "../Contexts/LinkDetailsContext";
import { LinksContext } from "../Contexts/LinksContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import "../Css/ExternalLinks.css"
import { useLoading, Oval } from '@agney/react-loading'; 

export const ExternalLinks = (props) =>{

    const [date, setDate] = useState(new Date());
    const [firstLink, setFirstLink] = useState(props.link);
    const [secondLink, setSecondLink] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [dropDownLinks, setDropDownLinks] = useState([{value: "", label: "none"}]);
    const [linksRows, setLinksRows] = useState(0);

    const { containerProps, indicatorEl } = useLoading({
        loading: isLoading,
        indicator: <Oval width="50" />,
      });

    const {externalLinks, getExternalLinks, resetData} = useContext(LinkDetailsContext);
    const {links} = useContext(LinksContext);

    
    useEffect(() => {
        getLinksList();
    }, [])

    //get a list with all links
    const getLinksList = () =>{
        links.map((link) => {
            setDropDownLinks(prevData => [...prevData, link.link]); 
        });
    }

    useEffect(() => {
        var linkNo = externalLinks.lenght;
        console.log("in effect " + linkNo);
        var rows = Math.ceil(linkNo);
        setLinksRows(linkNo);
    }, [externalLinks])

    useEffect(() => {
        return () => {
            resetData();
        }
    }, [])

    const getExtLinks = async() => {
        setIsLoading(true);
        await getExternalLinks(firstLink, secondLink.value, date);
        setIsLoading(false);
    }

  

    const createTable = () =>{
        let table = []
        for (let i = 0; i < 10; i++) {
            let children = []
            //Inner loop to create children
            for (let j = 0; j < 4; j++) {
              children.push(<td><a href = {externalLinks[i * 4 + j]}>{externalLinks[i * 4 + j]}</a></td>)
            }
            //Create the parent and add the children
            table.push(<tr>{children}</tr>)
          }
          return table
    }

    return (
        <div className = "container myContainer">
            <h3>External links</h3>
            {isLoading ? "Loading" :
                    <div className = "row">
                    <div className = "col-md-12">
                        <div className = "extLinkDisplay">
                            <table>
                                {createTable()}
                            </table>
                        </div>
                    </div> 
                 </div>
            }
                 
        <div className = "row datesRow">
            <div className = "col-md-5 dateDiv">
                <div><label>Date:</label></div>
                <DatePicker 
                    className = "extDatePicker"
                    selected = {date}
                    dateFormat="P"
                    onChange = {date => setDate(date)}/>
            </div>
            <div className = "col-md-5 dropDownLinksDiv">
                <div><label>Second link:</label></div>
                <Dropdown 
                    className = "linksDropDown" 
                    controlClassName='myControlClassExtLinks'
                    placeholderClassName="myPlaceholderClassExtLinks"
                    menuClassName='myMenuClassExtLinks'
                    onChange = {linkTwo => setSecondLink(linkTwo)} 
                    options = {dropDownLinks}  
                    value = "Choose second link"/>
            </div>
          </div>
          <div className = "row">
            <div className = "col-md-12 getLinksBtnDiv">
                <button className = "getLinksBtn" onClick = {getExtLinks} >Get data</button>
            </div>        
          </div>
        </div>
       
    );
}