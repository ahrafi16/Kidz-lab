import React from 'react';
import ProductCard from '../cards/ProductCard';
import { getProducts } from '@/actions/server/product';

const Products = async () => {
    const products = await getProducts();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {products.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    );
};

export default Products;