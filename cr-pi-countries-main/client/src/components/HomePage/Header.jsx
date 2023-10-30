import React, {useState} from "react";
import './Header.css'

const Header = ({onSearch,compList,detailCountry}) => {
    const [name,setName] = useState('')

    const handleChange = (event) => {
        const name = event.target.value
        setName(name)
    }

    const handleOnSearch = () => {
        onSearch(name)
    }

    return(
        <div className="header">
            <div className="SearchBar">
                <input type="search" value={name} onChange={handleChange}/>
                {!name && <label>Ingrese nombre del país</label>}
                <button className="btn" onClick={handleOnSearch}>Buscar país</button>
            </div>

            <div className="list">
                {compList.length > 1 && (<ul>
                    {compList.map((cnty) => {
                        return <li key={cnty.id}>
                            <p onClick={()=> detailCountry(cnty.id)}>{cnty.name}</p>
                        </li>
                    })}
                </ul>)}
            </div>

        </div>
    )
}

export default Header