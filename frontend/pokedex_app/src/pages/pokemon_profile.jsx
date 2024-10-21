import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { HandThumbDownIcon, HeartIcon } from '@heroicons/react/24/solid';


const PokemonProfile = () => {
	const { name } = useParams(); // Get the Pokémon name from the URL
	const [pokemonInfo, setPokemonInfo] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [like, setLike] = useState(false);
	const [dislike, setDislike] = useState(false);

	useEffect(() => {
	const fetchPokemonInfo = async () => {
		try {
		const response = await fetch(`/api/pokemon/${name}`);
		if (!response.ok) {
			throw new Error('Pokémon not found');
		}
		const data = await response.json();
		setPokemonInfo(data);
		} catch (error) {
		setError(error.message);
		} finally {
		setLoading(false);
		}
	};

	fetchPokemonInfo();
	}, [name]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	const handleLike = async () => {
		if (!like) {
			setLike(true);
			setDislike(false);
		try {
			const response = await fetch(`/api/pokemon/liked`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json', // Define the content type
				},
				body: JSON.stringify({
					pokemon_id: pokemonInfo.id,  // Send the appropriate data
					pokemon_name: pokemonInfo.name,
				}),
			});
		if (!response.ok) {
			throw new Error('Failed to like Pokémon');
			}
		}catch(error){
			console.error('Error in liking pokemons:', error);
		}
	}}

	const handleDislike = async () => {
		if (!dislike) {
			setLike(false);
			setDislike(true);
		try {
			const response = await fetch(`/api/pokemon/disliked`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json', // Define the content type
				},
				body: JSON.stringify({
					pokemon_id: pokemonInfo.id,  // Send the appropriate data
					pokemon_name: pokemonInfo.name,
				}),
			});
		if (!response.ok) {
			throw new Error('Failed to dislike Pokémon');
			}
		}catch(error){
			console.error('Error in disliking pokemons:', error);
		}
	}}

	return (
		<div className="pokemon-details">
			<h1 className="font-pokemon text-[#E03C31] text-6xl py-5 flex justify-evenly">{pokemonInfo.name }</h1>
			{/* Display the Pokémon's image */}
			<img
				src={pokemonInfo.image}
				alt={`${pokemonInfo.name} sprite`}
				style={{ width: '150px', height: '150px' }} // Adjust size as needed
			/>

			<div className="info-section grid grid-cols-2 gap-4">
			{/* Height */}
			<p className="font-semibold">Height:</p>
			<div className="flex items-baseline">
				<span className="min-w-[25px]">{pokemonInfo.height * 10}</span>
				<span className="ml-1">cm</span>
			</div>

			{/* Weight */}
			<p className="font-semibold">Weight:</p>
			<div className="flex items-baseline">
				<span className="min-w-[25px]">{pokemonInfo.weight * 0.1}</span>
				<span className="ml-1">kg</span>
			</div>

			{/* Type */}
			<p className="font-semibold">Type:</p>
			<div className="flex flex-col">
				<span>{pokemonInfo.types[0].type.name}</span>
				{pokemonInfo.types[1]?.type.name && <span>{pokemonInfo.types[1].type.name}</span>}
			</div>
			</div>


			<div className="stats-section">
				<h2 className="text-center text-2xl font-bold mb-4">Stats</h2> {/* Centered "Stats" heading */}
				<div className="flex flex-col space-y-2">
					{pokemonInfo.stats.map((stats, index) => (
					<div key={index} className="flex items-center">
						<p className="w-1/4 min-w-[140px] whitespace-nowrap font-semibold">{stats.stat.name}:</p> {/* Semibold stat names */}
						<div
						className="bg-blue-500 h-4 rounded"
						style={{ width: `${stats.base_stat}px` }} // Set width based on base_stat
						></div>
						<span className="ml-2">{stats.base_stat}</span>
					</div>
					))}
				</div>
			</div>

			{/* Like and Dislike Buttons */}
			<div className="flex flex-row items-center space-x-20">
				{/* Like Button */}
				<button
					onClick={handleLike}
					className="flex items-center justify-center w-16 h-16 rounded-full bg-pink-400 text-white shadow-lg transition-transform transform hover:scale-105">
					<HeartIcon className="w-8 h-8" />
				</button>

				{/* Dislike Button */}
				<button
					onClick={handleDislike}
					className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500 text-white shadow-lg transition-transform transform hover:scale-105">
					<HandThumbDownIcon className="w-8 h-8" />
				</button>
			</div>
		</div>
		/* Add more fields as needed */
	);
};

export default PokemonProfile;