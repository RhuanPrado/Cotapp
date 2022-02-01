import React, {useState} from 'react';
import './NewCot.css'
import logo from '../../assets/cotacao.svg';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default function NewCot({history}){
    const [name, setName] = useState('');
    async function newCot(e){

        e.preventDefault();
        const idU =  localStorage.getItem('user');
        const response = await api.post(`/cotacao`,{name,idU});
        console.log(response.data);
        history.push('/cotacoes');
        window.alert('Cotação Cadastrada com Sucesso!');
    }
return(
	<div>
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
				<div className="container">

						<a className="navbar-brand align-top" href="/#">
						<img src={logo} width="50" height="50" className="d-inline-block" alt="" loading="lazy"/>
							CotApp
						</a>

						<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
							<li className="nav-item active">
								<a className="nav-link" href="/cotacoes" >Cotações <span className="sr-only">(current)</span></a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/#">Fornecedores</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/#">Pedidos</a>
							</li>
						</ul>
				</div>
		</nav>
        <div className="container col-5 mt-3 py-4 back">
            <div className="container ">
                <h1> <strong>Cadastro de Cotação</strong></h1>
                <hr className="my-4"></hr>
            </div>
            <form onSubmit={newCot}>
                <div className="form-group">
                    <label htmlFor="nomeCot">Nome da cotação</label>
                    <input 
                        className="form-control"
                        id="nomeCot"
                        value = {name}
                        placeholder="Digite o nome da cotação"
                        onChange={e => setName(e.target.value)}
                        />
                    <small id="nomeHelp" className="form-text text-muted">sugerimos que coloque a data inicial e de fechamento da cotação</small>
                </div>
                    <button type="submit" className="btn btn-success mr-3">Concluir</button>
                    
                    <Link to="/cotacoes">
                        <button className="btn btn-danger">Cancelar</button>
                    </Link>
            </form>
        </div>
			
    </div>
 		
);
}