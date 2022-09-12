import React from "react";

const itemsContext = React.createContext({
    onNew: () => { },
    onSearch: () => { }
})

export default itemsContext
