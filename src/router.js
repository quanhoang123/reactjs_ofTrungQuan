import React from 'react';						
// import AllProduct from './Admin/Components/Product/AllProduct';
import Login from './Admin/Components/AdminAccount/login';
import Content from './Admin/Components/Container/Content';
import AllUser from './Admin/Components/User/AllUser';
import SignUp from './Admin/Components/AdminAccount/signup';
import Comment from './Admin/Components/Notification/Comment';
import AdminProfile from './Admin/Components/Container/AdminProfile';
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
	},		
	{					
		path : 'adminProfile',				
		exact : true,				
		main : ()=> <AdminProfile />				
	}				
    
];						
						
						
export default routes;						