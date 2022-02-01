import React, {useState} from 'react';
import './Login.css';

import api from '../../services/api';

import logo from '../../assets/cotacao.svg'

export default function Login({history}){

    const [name, setName] = useState('');

    async function handleSubmit(e){
        
        e.preventDefault();
        const idU =  localStorage.getItem('user');
        const response = await api.post('/loginU',{
            name,
            idU
        });

        const { ok } = response.data;
        
        if(!ok){
            const { message } = response.data;
            console.log(message);
        }else{
            const {id} = response.data;
            localStorage.setItem('user',id);
            localStorage.setItem('name',name);
            history.push(`/pass`);
        }
    }

    return(
        
        <div className="login-container" >
            <form onSubmit={handleSubmit} >
                <img src={logo} alt="CotApp"/>
                <input 
                placeholder="Digite seu usuário"
                value={name}
                onChange={e => setName(e.target.value)}
                />
                <button type="submit"> Enviar</button>
            </form>
        </div>
    );
}