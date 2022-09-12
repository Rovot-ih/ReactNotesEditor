import React from "react";

const StatusContext = React.createContext({
    status:0,
    autoSave:()=>{}
})

export default StatusContext