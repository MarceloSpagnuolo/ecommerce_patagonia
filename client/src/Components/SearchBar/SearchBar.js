import React from 'react';
import { useState } from 'react';
import {connect} from 'react-redux';
import { useHistory } from "react-router-dom";
import { searchProduct} from "../../store/actions/index";
// CSS
import  './SearchBar.css';

function SearchBar(props) {
	const [product, setProduct] = useState('');
	let history = useHistory();
	const handlerInput = (e) => {			
		setProduct(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		props.searchProduct(product);		
		history.push(`/products/search`);	
	};
	
	return (
		<form onSubmit={(e) => onSubmit(e)}>
			<div className={`d-flex`}>
				{/* Input buscador */}
				<input name="Buscador" type="search" id='inlineFormInputGroup' placeholder='Busca algo aqui...' onChange={ (e) => handlerInput(e)} />{' '}
				<div>
					<button variant='primary' type='submit' >
						buscar
					</button>
				</div>
			</div>
		</form>
	);
}
function mapStateToProps(state) {
	return {
	  products: state.products
	};
  }
  
  function mapDispatchToProps(dispatch) {
	return {
	  searchProduct: (productName) =>dispatch(searchProduct(productName))
	  
	};
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);