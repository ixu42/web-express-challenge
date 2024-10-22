import React from "react";
import { useState, useEffect } from "react";

const Community = () => {

	const [userList, setUserList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [usersPerPage, setUsersPerPage] = useState(8);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredUsers, setFilteredUsers] = useState([])
	let totalPages;

	if (userList.length <= usersPerPage)
	{
		totalPages = 1;
	}
	else
	{
		totalPages = Math.floor(userList.length / usersPerPage)
	}

	const [currentPage, setCurrentPage] = useState(totalPages);

	const fetchUsers = async () => {
		setLoading(true);
		fetch("/api/profile")
		.then((response) => response.json())
		.then((data) => (setUserList(data)))
		.then(setLoading(false))
		.catch((error) => alert("Error fetching user list"))			
	};

	useEffect(() => {
		fetchUsers();
	}, [])

	const filterUsers = (searchQuery) => {
		setLoading(true);
		fetch("/api/profile/search?" + new URLSearchParams({
			name: searchQuery
		}))
		.then((response) => response.json())
		.then((data) => (setFilteredUsers(data)))
		.then(setLoading(false))
		.then(setUserList(filteredUsers))
		.catch((error) => alert("Error searching for users"))
	}

	useEffect(() => {
		if (searchQuery.length == 0)
		{
			fetchUsers()
		}
		else
		{
			console.log("in use effect:" ,searchQuery)
			filterUsers(searchQuery)
			console.log("Filtered users:", filteredUsers)
			setUserList(filteredUsers)
		}
	}, [searchQuery, filteredUsers])

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
					<li className="p-5 text-center text-3xl" key={user.name}>{user.name}<br/><br/> <img src={user.profile_pic}/> </li>
				)))
				}
			</ul>
		)
	}

	const handleSearch = (event) => {
		setSearchQuery(event)
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
				<div className="flex justify-center">
				<h2 className="mx-4 font-mono text-rose-950">Search users by name: </h2>
				<form>
					<input value={searchQuery} onChange={(e) => handleSearch(e.target.value)} className="bg-rose-200 content-center" type="text"/>
				</form>
				</div>
				<div className="">
					<UsersOverview loading={loading} users={userList} usersPerPage={usersPerPage} currentPage={currentPage}/>
				</div>
				<Pagination currentPage={currentPage} length={userList.length} usersPerPage={usersPerPage}/>
			</section>
		</main>
	)
	
}

export default Community;
