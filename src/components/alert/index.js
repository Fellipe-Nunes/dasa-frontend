import React, { useState, useEffect } from 'react'
import './alert.css'

const Alert = (props) => {
    const [isShow, setShow] = useState(props.show || false)

    const closeAlert = () => {
        setShow(false)
    }

    useEffect(() => {
        setShow(props.show)
        return () => setShow(false)
    }, [props.show])
    
  
    const createAlert = (type, icon, message = false) =>
    isShow ?
    (
        <div className={`alert alert-${type}`}>
            <i className={`fa fa-${icon}`}></i>
            <span>
                {message}     
            </span>
            <div style={{cursor : 'pointer'}} onClick={closeAlert}><i className="fa fa-close"/></div>
        </div>        
    )
    : ""

    const checkAlert = () => {
        switch (props.type){
            case 'success':
                return createAlert('success', 'check', props.message, true)
            case 'error':
                return createAlert('error', 'warning', props.message)
            default:
                return createAlert('info', 'question-circle', 'Aconteceu algo inesperado, tente novamente!')
        }
    }

    return (
        <React.Fragment>
            <div className="boxAlert">
                {checkAlert()}
            </div>
        </React.Fragment>
    )
}


export default Alert