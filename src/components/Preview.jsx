import Markdown from 'react-remarkable'

function Preview({text, title}) { 
  return (
    <div className="preview">
        <div>{title}</div>
       <Markdown source = {text} />
    </div>
  )
}

export default Preview