import React, {useState} from 'react';
import './Login.css';

import api from '../../services/api';

import logo from '../../assets/cotacao.svg'

export default function Loginpass({history, match}){

    const [pass, setPass] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        const id = localStorage.getItem('user');
        const response = await api.post('/loginpass',{
            id,
            pass,
        });
        if(response.data.ok){
            history.push(`/cotacoes`);
        }else{
            console.log(response.data.message);
        }
    }

    return(
        
        <div className="login-container" >
            <form onSubmit={handleSubmit} >
                <img src={logo} alt="CotApp"/>
                <p>Olá {localStorage.getItem('name')}</p>
                <input 
                placeholder="Digite sua Senha"
                value={pass}
                type="password"
                onChange={e => setPass(e.target.value)}
                />
                <button type="submit"> Enviar</button>
            </form>
        </div>
    );
}