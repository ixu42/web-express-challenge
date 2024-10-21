import React from "react";
import testProfiles from '../assets/community_placeholder.json';
import { useState, useEffect } from "react";

const Community = () => {

/* 	fetch("/api/profiles")
	.then((response) => console.log(response)) */
	const [users, setUsers] = useState(testProfiles);
	const [loading, setLoading] = useState(false);
	const [usersPerPage, setUsersPerPage] = useState(8);
	const [searchQuery, setSearchQuery] = useState("");

	let totalPages;

	if (users.users.length <= usersPerPage)
	{
		totalPages = 1;
	}
	else
	{
		totalPages = Math.floor(users.users.length / usersPerPage)
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

	const UsersOverview = ({loading, users, usersPerPage, currentPage}) => {

		let shownUsersStart;
	
		if (currentPage == 1)
		{
			shownUsersStart = 0
		}
		else
		{
			shownUsersStart = (currentPage - 1) * usersPerPage
		}

		let shownUsersEnd = (currentPage * usersPerPage)


		const  currentPageUsers = users.slice(shownUsersStart, shownUsersEnd)

		if (loading === true)
		{
			return (<h2 className="text-7xl text-center font-pokemon">Loading...</h2>)
		}
		return (
			<ul className="grid grid-cols-4">
				{currentPageUsers.map((user => (
					<li className="p-5 text-center text-3xl" key={user.username}>{user.username}<br/><br/> <img src={user.profile_pic}/> </li>
				)))
				}
			</ul>
		)
	}

	const handleSearch = () => {
		
	}

	const SearchUser = () => {
		
		return (
			<div className="flex justify-center">
				<h2 className="mx-4 font-mono text-rose-950">Search users by name: </h2>
				<input className="bg-rose-200 content-center" type="text"></input>
			</div>
		)
	}


	const Pagination = ({usersPerPage, length, currentPage}) => {

		const paginationNumbers = [];

		for (let i = 1; i <= Math.ceil(length / usersPerPage); i++)
		{
			paginationNumbers.push(i);
		}

		const handlePagination = ({pageNumber}) => {

			setCurrentPage(pageNumber)
		}

		return (
			<div className='text-4xl items-center flex justify-center m-10'>

      			{paginationNumbers.map(pageNumber => (

        			<button key={pageNumber} className={
						currentPage === pageNumber ? "text-rose-700 border-pink-950 border-2 p-2 m-3 rounded-lg bg-rose-300" : "text-rose-400 border-pink-950 border-2 p-2 m-2 rounded-md bg-rose-100"
					} onClick={() => handlePagination({pageNumber})}>{pageNumber}</button>

      			))}

    		</div>

 		 );
	}

	

	return (
		<main>
			<section>
				<h1 className="text-rose-900 font-pokemon text-center text-7xl my-10">Our community</h1>
				<SearchUser/>
				<div className="">
					<UsersOverview loading={loading} users={users.users} usersPerPage={usersPerPage} currentPage={currentPage}/>
				</div>
				<Pagination currentPage={currentPage} length={users.users.length} usersPerPage={usersPerPage}/>
			</section>
		</main>
	)
}

export default Community;