import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
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

    useEffect(() => {

        const storedCart = getShoppingCart();
        let savedCart = [];
        // step 1.

        for (const id in storedCart) {
            //step 2 get the product by id
            const addedProduct = products.find(product => product.id === id);
            if (addedProduct) {
                // step 3. get quantity of the product
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }

            setCart(savedCart);


            console.log(addedProduct)
        }

    }, [products])

    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id)
    };

    // console.log(products)
    return (
        <div className='shop-container'>
            <div className="products-container">

                {
                    products.map(product => <Products
                        key={product.id}
                        product={product}
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