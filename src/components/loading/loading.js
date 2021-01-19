import React from 'react'
import './loading.css'
import hammer from '../../../src/assets/img/hammer.png'

const Loading = ({ show = false }) => {

    return (
        show ? (
            <div className="loading">
                <div className="martelo">
                    <img src = {hammer} alt="Carregando"/>
                </div>
            </div>
        ) : ""

    )

}
export default Loading
