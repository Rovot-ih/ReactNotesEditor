import {useEffect} from 'react'

function useDocumentTitle(text, defaultValue) {
    useEffect(() => {
        document.title = (!text) ? defaultValue : text
    
      })
}

export default useDocumentTitle