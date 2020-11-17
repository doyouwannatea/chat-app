import React, { useEffect } from 'react'
const SystemMessage = ({ close, message }) => {

    useEffect(() => {
        setTimeout(close, 3000)
    }, [close])

    return (
        <li className="system-message">
            {message}
        </li>
    )
}

export default SystemMessage