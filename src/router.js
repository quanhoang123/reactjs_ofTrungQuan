import React from 'react';						
import AllProduct from './Admin/Components/Product/AllProduct';
const routes = [						
	{					
		path : '/',				
		exact : true,				
		// main : ()=> <ContactList />				
	},
	{
		path : 'allproduct',			
		exact : true,			
		main : ()=> <AllProduct />		
	},
	{
		path : 'addproduct',			
		exact : true,			
		// main : ()=> <AllProduct />		
	}		
	// {					
	// 	path : '/product-list',				
	// 	exact : true,				
	// 	main : ()=> <ProductList />				
	// },					
    
];						
						
						
export default routes;						