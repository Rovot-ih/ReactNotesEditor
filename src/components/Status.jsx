import React from 'react'

function Status({statusCode}) {
  return (
    <div className="statusCodeContainer">
        {(statusCode === 0) ? '📝':''}
        {(statusCode === 1) ? 'Guardando...⏳':''}
        {(statusCode === 2) ? 'Nota guardada ✅':''}
    </div>
  )
}

export default Status