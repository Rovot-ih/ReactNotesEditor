import React, { useContext } from 'react'
import Status from './Status'
import StatusContext from '../Context/StatusContext'

function Editor({ item, onChangeTitle, onChangeText }) {
    
    const statusContext = useContext(StatusContext)

    function handleTitleChange(e){
        onChangeTitle(e)
        statusContext.autoSave()
    }

    function handleTextChange(e){
        onChangeText(e)
        statusContext.autoSave()
    }
    return (

        <div className="editor">
            <Status statusCode={statusContext.status} />
            <div>
                <input className="title"  value={item.title} onChange={handleTitleChange}/>
            </div>
            <div className='editor-textarea'>
                <textarea className="content" value={item.text} onChange={handleTextChange} ></textarea>
            </div>
        </div>
    )
}

export default Editor