import React, { useEffect } from 'react'
const SystemMessage = ({ close, message }) => {

    useEffect(() => {
        const timer = setTimeout(close, 3000)
        return () => clearTimeout(timer)
    }, [close])

    return (
        <li className="system-message">
            {message}
        </li>
    )
}

export default SystemMessage