import React from 'react'
import { DeleteEmployee } from '../../../services/admin'
import './confirm.css'

const Confirmation = (props) => {
    const deleteUser = async (value) => {
        if (value) {
            await DeleteEmployee(props.data.params.email)
        }
        props.fnc({
            isShow: false,
            params: {}
        })
    }

    return (
        <section className="boxConfirmation">
            <div className="confirmation">
                <div className="msg">Você deseja excluir o usuário {props.data.params.nome} {props.data.params.sobrenome} ?</div>
                <div className="actions">
                    <button className="btnConfirm" onClick={() => deleteUser(false)}>NÃO</button>
                    <button className="btnConfirm" onClick={() => deleteUser(true)}>SIM</button>
                
                </div>
            </div>
        </section>
    )


}

export default Confirmation