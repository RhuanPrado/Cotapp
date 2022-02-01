import React, { useEffect,useState} from 'react';
import logo from '../../assets/cotacao.svg';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default function EditarCot(){

	const [listProductsCot, setListProductsCot ] = useState([]);
	const [listProducts, setListProducts ] = useState([]);
	const [label, setLabel] = useState(true);
	const [cotacao, setCotacao] = useState({});
	const qtds = [];

	async function retirar(retProduto, id){
		
		if(window.confirm(`Deseja retirar esse produto da cotação ${retProduto.name} ?`)){
			
			const response = await api.put(`cotacao/${retProduto._id}/delcotacao`,{},{
				headers:{
					cot:cotacao._id,
					li:retProduto.listValuesId,
				}
			});
			var listP = listProducts;
			listP.push(response.data);
			setListProductsCot(listProductsCot.filter(produto => produto._id !== id));
			setListProducts(listP);
			
		}
	}

	async function incluir(product,qtd){

		if(!qtd){
			window.alert("Favor inserir a quantidade para incluir o produto!");
		}else{

			if(!window.confirm(`Gostaria incluir ${qtd} ${product.und} ${product.name}`)){
				return;
			}
			const response = await api.put(`cotacao/${product._id}/inccotacao`,{},{
				headers:{cot:cotacao._id, qtd:qtd}
			});
			console.log(response);
			var listCot = listProductsCot;
	
			listCot.push({
				_id: product._id,
				name: product.name,
				und: product.und,
				qtd: qtd,
				listValuesId: response.data.listValuesId,
			});
	
	
			setListProductsCot(listCot);
	
			setListProducts(listProducts.filter(produto => produto._id !== product._id));
		}

		
	}

	async function productsCot(){
		setLabel(true);
	}

	async function products(){
		setLabel(false)
	}

    useEffect(()=>{
		async function loadCot() {
            const id = localStorage.getItem('cotEdit');
			var response = await api.get(`/oneCot/${id}`);
			setCotacao(response.data);

			var listP = response.data.produtos;
			
			response = await api.get('/products',{headers:{cot:id}});
			setListProducts(response.data);
			listProducts.map(products =>{
				qtds.push(1);
			});
			

			response = await api.get('/productsCot',{headers:{cot:id}});
	
			var listNameP = response.data;
	
			var listCot = [];
	
			listP.forEach( p => {
				listNameP.forEach( p2 =>{
					if(p._id === p2._id){
						listCot.push({
							_id: p._id,
							name: p2.name,
							und: p2.und,
							qtd: p.qtd,
							listValuesId: p.listValuesId,
						});
					}
				});
			});
	

			setListProductsCot(listCot);
			
		}
		loadCot();
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
        <div className="container  back">
            <div className="container ">
                <h1> <strong>Editar de Cotação</strong></h1>
                <hr className="my-4"></hr>
                <h3> <strong>{cotacao.name}</strong></h3>
                <hr className="my-4"></hr>
            </div>
          
                <div className="form-group">

				{label?(
					<div>
						<ul className="nav nav-tabs" id="myTab" role="tablist">
							<li className="nav-item" role="presentation">
								<a className="nav-link active" id="produtos-tab" href="#productsCot" data-toggle="tab" onClick={()=> productsCot()} role="tab" aria-controls="produtos" aria-selected="true">Produtos</a>
							</li>
							<li className="nav-item" role="presentation">
								<a className="nav-link " id="incProdutos-tab" href="#products" data-toggle="tab" onClick={()=> products()} role="tab" aria-controls="incProdutos" aria-selected="false">Incluir Produtos</a>
							</li>	
						</ul>
						<div className="tab-content" id="myTabContent">
							<div className="tab-pane fade show active" id="produtosCot" role="tabpanel" aria-labelledby="produtos-tab">
								<table className="table table-hover">
									<thead>
										<tr>
										<th scope="col">Produto</th>
										<th scope="col">Unidade</th>
										<th scope="col">Quantidade</th>
										<th scope="col">Ação</th>
										</tr>
									</thead>
									<tbody>
										{listProductsCot.map((product)=>(
											<tr key={product._id}>
												<td className="col-8"><span className=" h4 ">{product.name}</span></td>
												<td> <span className="h5">{product.und}</span></td>
												<td >{product.qtd}</td>
												<td><button className="btn btn-warning" onClick={()=>retirar(product,product._id)}>retirar</button></td>
											</tr>
									))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				):(
					<div>
						<ul className="nav nav-tabs" id="myTab" role="tablist">
							<li className="nav-item" role="presentation">
								<a className="nav-link" id="produtos-tab" href="#productsCot" data-toggle="tab" onClick={()=> productsCot()} role="tab" aria-controls="produtos" aria-selected="true">Produtos</a>
							</li>
							<li className="nav-item" role="presentation">
								<a className="nav-link active" id="incProdutos-tab" href="#products" data-toggle="tab" onClick={()=> products()} role="tab" aria-controls="incProdutos" aria-selected="false">Incluir Produtos</a>
							</li>	
						</ul>
						<div className="tab-content" id="myTabContent">

							<table className="table table-hover">
								<thead>
									<tr>
									<th scope="col">Produto</th>
									<th scope="col">Unidade</th>
									<th scope="col">Quantidade</th>
									<th scope="col">Ação</th>
									</tr>
								</thead>
								<tbody>
									{listProducts.map((product,index) =>(
										<tr key={product._id}>
											<td className="col-8"><span className=" h4 ">{product.name}</span></td>
											<td> <span className="h5">{product.und}</span></td>
											<td >
												<div>
													<input 
														className="form-control maxlength-3 "
														type="number"
														id="nomeCot"
														size="3"
														min="1"
														max="999"
														maxLength="3"
														value = {qtds[index]}
														placeholder="qtd"
														autoComplete="off"
														onChange={e => qtds[index] = e.target.value }
													/>
												</div>
											</td>
											<td><button className="btn btn-success" onClick={()=>incluir(product,qtds[index])}>incluir</button></td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				)}     
                </div>
                    <Link to="/cotacoes">
                        <button type="submit" className="btn btn-danger mr-3">Cancelar</button>
                    </Link>
                    <button type="submit" className="btn btn-success">Concluir</button>

        </div>
			
    </div>
 		
);
}