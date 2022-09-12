import React, { useContext } from 'react'
import ItemsContext from '../Context/ItemsContext'


function Menu() {

    const itemsContext = useContext(ItemsContext)

    function handleClick() {
      itemsContext.onNew()
    }

    function handleChange(e){
        itemsContext.onSearch(e)
    }
    return (
        <div className="menu">
            <input placeholder='Buscar...' className="search" onChange={handleChange}/>
            <button className="btn" onClick={(e) => handleClick()}>+ Nueva Nota</button>

        </div>

    )
}

export default Menu