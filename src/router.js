import React from 'react';						
import AllProduct from './Admin/Components/Product/AllProduct';
import Login from './Admin/Components/AdminAccount/login';
import Content from './Admin/Components/Container/Content';
import AllUser from './Admin/Components/User/AllUser';
import SignUp from './Admin/Components/AdminAccount/signup';
import Comment from './Admin/Components/Notification/Comment';
const routes = [						
	{					
		path : '/',				
		exact : true,				
		main : ()=> <Login />				
	},
	{
		path:'/content',
		exact:true,
		main:()=><Content />
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
	},
	{
		path : 'login',			
		exact : true,			
		main : ()=> <Login />		
	},
	{
		path : 'usertable',			
		exact : true,			
		main : ()=> <AllUser />		
	},
	{
		path: 'signup',
		exact:true,
		main:()=> <SignUp />
	},
	{
		path: 'comment',
		exact:true,
		main:()=> <Comment />
	}		
	// {					
	// 	path : '/product-list',				
	// 	exact : true,				
	// 	main : ()=> <ProductList />				
	// },					
    
];						
						
						
export default routes;						