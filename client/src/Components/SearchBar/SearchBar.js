import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { searchProduct } from "../../store/actions/index";
// CSS
import './SearchBar.css';

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
		<div className="search-nav">
			<form onSubmit={(e) => onSubmit(e)}>
				{/* Input buscador */}
				<input className="se-input" name="Buscador" type="search" id='inlineFormInputGroup' placeholder='Busca algo aqui...' onChange={(e) => handlerInput(e)} />{' '}
				<button className="button-search" variant='primary' type='submit'>
				<img className= "icon-S" src="http://localhost:3001/images/lupa2.ico"></img>
				</button>
				
			</form>
		</div>
	);
}
function mapStateToProps(state) {
	return {
		products: state.products
	};
}

function mapDispatchToProps(dispatch) {
	return {
		searchProduct: (productName) => dispatch(searchProduct(productName))

	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);