import React from "react";
import testProfiles from '../assets/community_placeholder.json';
import { useState, useEffect } from "react";

const Community = () => {

/* 	fetch("/api/profiles")
	.then((response) => console.log(response)) */
	const [users, setUsers] = useState(testProfiles);
	const [loading, setLoading] = useState(false);
	const [usersPerPage, setUsersPerPage] = useState(40);

	console.log(users.users.length)

	let totalPages;

	if (users.users.length <= 40)
	{
		totalPages = 1;
	}
	else
	{
		totalPages = Math.floor(users.users.length / 40)
	}

	const [currentPage, setCurrentPage] = useState(totalPages);

	useEffect(() => {
		const fetchUsers = async () => {
			setLoading(true);
			setUsers(testProfiles);
			setLoading(false);
		};
		fetchUsers();
	}, [])

	const UsersOverview = (props) => {

		if (props.loading === true)
		{
			return (<h2 className="text-7xl text-center font-pokemon">Loading...</h2>)
		}
		return (
			<ul className="grid grid-cols-4">
				{users.users.map((user => (
					<li className="p-5 text-center text-3xl" key={user.username}>{user.username}<br/><br/> <img src={user.profile_pic}/> </li>
				)))
				}
			</ul>
		)
	}

	const Pagination = ({usersPerPage, length}) => {

		const paginationNumbers = [];

		for (let i = 1; i <= Math.ceil(length / postsPerPage); i++)
		{
			paginationNumbers.push(i);
		}

		return (
			<div className='pagination'>

      			{paginationNumbers.map((pageNumber) => (

        			<button key={pageNumber}>{pageNumber}</button>

      			))}

    		</div>

 		 );


	}

	return (
		<main>
			<section>
				<h1 className="text-rose-900 font-pokemon text-center text-7xl my-10">Our community</h1>
				
				<div className="">
					<UsersOverview loading={loading}/>
				</div>
			</section>
		</main>
	)
}

export default Community;