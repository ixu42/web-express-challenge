import React from "react";
import { useState } from "react";

const UserLikedPokemon = (props) => {

	const likedPokemon = props.likedPokemon

	return (
		<section className="justify-center items-center grid columns-3">
		<ul className="grid grid-cols-10 px-4 text-center pb-3 pt-3 list-inside font-bold opacity-80 rounded-lg border-double text-2xl font-mono border-pink-950 border-4 bg-slate-800">
			{
				likedPokemon.map((pokemon) => {	
					return (<li className="p-3 items-center text-white" key={pokemon}><a href={`/pokemon/${pokemon}`}>{pokemon}</a></li>)
				}
			)}
		</ul>
		</section>
	)
}

export default UserLikedPokemon;