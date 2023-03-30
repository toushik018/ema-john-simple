import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Products from '../Product/Products';
import './Shop.css';


const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    const handleAddToCart = (product) =>{
        const newCart = [...cart, product];
        setCart(newCart);
    }; 

    console.log(products)
    return (
        <div className='shop-container'>
            <div className="products-container">
                
                {
                    products.map(product => <Products
                    key={product.id}
                    product ={product}
                    handleAddToCart={handleAddToCart}
                    ></Products>)
                }
            
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};
import './Shop.css';


export default Shop;