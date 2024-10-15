import React from "react";
import testData from '../assets/profile_placeholder.json';
import background from "../assets/profile_bg.png"
import UserLikedPokemon from "../components/UserLikedPokemon"
import { useState } from "react";

const Profile = () => {

    const [editingBio, setEditingBio] = useState(false);

    const handleBio = () => {

        if (editingBio === false)
            return (<p className="m-3 text-pink-950">{testData.bio}</p>)
        else
        {
            return (
                <input type="text"/>
            )
        }
    }


	return (
	<div>
        <main className="h-screen bg-cover bg-center" style={{backgroundImage: `url(${background})`}}>
            <div className="bg-slate-500 opacity-80 pb-10 mb-10">
            <h1 className="font-bold w-full max-w-md m-auto rounded-lg opacity-80 border-8 bg-sky-700 text-center text-5xl font-pokemon py-10 text-pink-950 border-pink-950">{testData.username}</h1>
            <div className="flex justify-evenly m-8">
            <img className="max-w-md" src={testData.profile_pic}/>
            <div className="font-bold opacity-80 rounded-lg border-double text-2xl font-mono border-pink-950 border-8 bg-sky-700">
                {handleBio()}
            </div>
            </div>
            <div className="flex m-8 justify-between">
            <button type="button" onClick={() => setEditingBio(true)} className="bg-rose-900 hover:bg-pink-950 text-white font-bold my-3 py-2 px-4 mb-6 rounded">Change profile picture</button>
            <button type="button" className="bg-rose-900 hover:bg-pink-950 text-white font-bold my-3 py-2 px-4 mb-6 rounded">Edit bio</button>
            </div>
            </div>
            <h1 className="font-bold w-full max-w-md m-auto rounded-lg opacity-80 border-8  bg-sky-700 text-center text-5xl font-pokemon py-6 text-pink-950 border-pink-950">Pokemon that I like:</h1>
            <UserLikedPokemon likedPokemon={testData.liked_pokemons}/>
        </main>
    </div>
    )
}

export default Profile;