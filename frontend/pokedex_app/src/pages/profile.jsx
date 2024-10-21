import React from "react";
import testData from '../assets/profile_placeholder.json';
import background from "../assets/profile_bg.png"
import UserLikedPokemon from "../components/UserLikedPokemon"
import { useState, useEffect } from "react";

const Profile = () => {

    const [editingBio, setEditingBio] = useState(false);
    const [bio, setBio] = useState(testData.bio)
    const [ownData, setOwnData] = useState();

    useEffect(() => {
		const fetchProfile = async () => {
			fetch("/api/profile/me")
			.then((response) => response.json())
			.then((data) => (setOwnData(data)))
			.catch((error) => alert("Error fetching user list"))			
		};
		fetchProfile();
	}, [])

    console.log(ownData)

    const updateBio = (event) => {
        setBio(event.target.value)
    }

    const handleBio = () => {

        console.log("Handling bio")

        if (editingBio === false)
            return (<p className="m-3 text-lg">{bio}</p>)
        else
        {
            return (
                <section className="text-lg">
                    <textarea spellCheck="true" name="new_bio" onChange={updateBio} className="bg-gray-300 resize" cols={60} defaultValue={bio} maxLength={250} rows={2} type="text"/>
                </section>
            )
        }
    }

    const handleBioEditing = (event) => {
        setEditingBio(true);
    }

    const handleBioSaving = (event) => {
        setEditingBio(false);
        //we would send the new bio data to the server here
    }

	return (
        <main>
            <section className="w-full overflow-hidden dark:bg-gray-900">
                <div className="flex flex-col">
                    <img src={background} alt="pokemon in the background" className="w-full xl:h-[36rem] lg:h-[32rem] md:h-[28rem] sm:h-[24rem] xs:h-[20rem]"/>
                    <div className="sm:w-[80%] xs:w-[90%] mx-auto flex">
                        <img src={testData.profile_pic} alt="User Profile"
                                className="rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-rose-900 relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]" />
                        <h1
                            className="w-full text-left my-4 sm:mx-4 xs:pl-4 text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-mono">
                            {testData.name}</h1>
                    </div>
                    <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
                        <div className="w-fit text-gray-700 dark:text-gray-400 text-md">{handleBio()}</div>
                        <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
                            <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
                                <button type="button" className="bg-rose-900 hover:bg-pink-950 text-white font-bold my-3 py-2 px-4 mb-6 rounded">Change profile picture</button>
                                <button type="button" onClick={handleBioSaving} className="bg-rose-900 hover:bg-pink-950 text-white font-bold my-3 py-2 px-4 mb-6 rounded">Save bio changes</button>
                                <button type="button" onClick={handleBioEditing} className="bg-rose-900 hover:bg-pink-950 text-white font-bold my-3 py-2 px-4 mb-6 rounded">Edit bio</button>
                                <button type="button" className="bg-rose-900 hover:bg-pink-950 text-white font-bold my-3 py-2 px-4 mb-6 rounded">Upload new picture</button>
                            </div>
                    </div>
                    </div>
                </div>
                <h1 className="mb-10 font-bold w-full max-w-md m-auto rounded-lg opacity-90 border-8  bg-slate-800 text-center text-5xl font-pokemon py-6 text-white border-pink-950">Pokemon that I like:</h1>
                <UserLikedPokemon likedPokemon={testData.liked_pokemons}/>
            </section>
        </main>
    )
}

export default Profile;