import React, { useEffect, useState} from 'react';
import { Link }  from 'react-router-dom';
import './Cotacoes.css';
import logo from '../../assets/cotacao.svg';
import api from '../../services/api';

export default function Cotacoes ({history}) {
	const [ cotacoes, setCotacoes] = useState([]);
	const [ loading, setLoading] = useState(true);
	
	async function alterStatus(idCot){
		const response = await api.put(`/cotacao/${idCot}`);
		console.log(response.data);
		setCotacoes(cotacoes.map(cot =>{
			if(cot._id === idCot){
				cot.status = response.data.status;
				return cot;
			}
			return cot;
		}));
	}

	async function delCot(idCot,index){
		if(window.confirm(`Deseja excluir a cotação ${cotacoes[index].name}`)){
			const response = await api.delete(`/cotacao/${idCot}`);
			console.log(response.data);
			setCotacoes(cotacoes.filter(cotacao => cotacao._id !== idCot));
		}
	}

	async function editCot(idCot){
		localStorage.setItem('cotEdit',idCot);
		history.push(`/editCot`);
	}

	useEffect(()=>{
		async function loadCots() {
			
				const id = localStorage.getItem('user');
				const forn = 0;
				const response = await api.get('/cotacao',{
					headers:{
						forn,
						id
					}});
				setCotacoes(response.data);
				setLoading(false);
		}
		loadCots();
	},[]);

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

		<div className="container">
			<h1>Lista de cotações</h1>
			<div className="container">
				<Link to="/newCot">
					<button type="button" className="btn btn-success">Cadastrar Nova Cotação</button>
				</Link>
			</div>

			<div className="row">
				{cotacoes.map((cotacao,index) => (
					<div key = {cotacao._id}className="col-sm-6 my-2">  
						<div className="card">
						<div className="card-body">
							<h4 className="card-title"> <strong>{cotacao.name}</strong> </h4>
							<strong>Status:</strong>{cotacao.status?(<p className="h4 list-inline-item ml-2"><span className="badge badge-success ">Aberta</span></p>):
																	(<p className="h4 list-inline-item ml-2"><span className="badge badge-danger ">Fechada</span></p>)}
							<div className="alert alert-info" role="alert">
								<strong>Data de Criação: </strong>{cotacao.createdAt}
							</div>
							
							<button type="button" className="btn btn-outline-dark mr-1"
								onClick={()=> editCot(cotacao._id)}>Editar</button>
							<button type="button" className="btn btn-outline-danger mr-1"
								onClick={()=> delCot(cotacao._id,index)}>Excluir</button>
							<button type="button" className="btn btn-outline-warning"
								onClick={() => alterStatus(cotacao._id)}>Alterar status</button>
						</div>
						</div>
					</div>
				))}
			</div>
			{loading?(<div className="text-center">
							<h3>Carregando...</h3>
						<div className="spinner-border spiner" role="status">
  							<span className="sr-only">Loading...</span>
						</div>
					</div>):('')}
		</div>	 
	</div>



		
);
}