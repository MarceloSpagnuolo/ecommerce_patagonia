import React from 'react';
import { useState } from 'react';
import {connect} from 'react-redux';
import { useHistory } from "react-router-dom";
import { searchProduct} from "../../store/actions/index";
// CSS
import  './SearchBar.css';

function SearchBar(props) {
	const url ='localhost:3000'
	const [product, setProduct] = useState('');
	let { onSearch } = props;

	const handlerInput = (e) => {
		console.log(e.target.value);
		if (e.target.value === '') {
			setProduct('');
		}
		setProduct(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		
		alert('OK funciona Search');
		
		//onSearch(product);
		props.searchProduct(e.target.value);
		let textInput = document.getElementById('inlineFormInputGroup');
		textInput.value = '';
		setProduct(textInput.value);
		
		//window.location.href = `http://${url}/products/catalogo`
		history.push(`http://${url}/products/search?query=${product}`);	
		e.target.value = '';

	};
	let history = useHistory();
	return (
		<form onSubmit={onSubmit}>
			<div className={`d-flex`}>
				{/* Input buscador */}
				<input type="search" id='inlineFormInputGroup' placeholder='Busca algo aqui...' onChange={handlerInput} />{' '}
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
  
