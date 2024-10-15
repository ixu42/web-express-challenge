import React from "react";
import testData from '../assets/profile_placeholder.json';
import background from "../assets/profile_bg.png"
import UserLikedPokemon from "../components/UserLikedPokemon"

const Profile = () => {

	return (
	<div>
        <main className="h-screen bg-cover bg-center" style={{backgroundImage: `url(${background})`}}>
            <h1 className="font-bold w-full max-w-md m-auto rounded-lg opacity-80 border bg-sky-700 text-center text-5xl font-pokemon py-6 text-pink-950 border-pink-950">{testData.username}</h1>
            <div className="flex justify-around m-8">
            <img className="max-w-md" src={testData.profile_pic}/>
            <div className="font-bold opacity-80 rounded-lg border-double text-2xl font-mono border-pink-950 border bg-sky-700">
                <p className="m-3 text-pink-950">{testData.bio}</p>
            </div>
            </div>
            <h1 className="font-bold w-full max-w-md m-auto rounded-lg opacity-80 border bg-sky-700 text-center text-5xl font-pokemon py-6 text-pink-950 border-pink-950">Pokemon that I like:</h1>
            <UserLikedPokemon likedPokemon={testData.liked_pokemons}/>
        </main>
    </div>
    )
}

export default Profile;