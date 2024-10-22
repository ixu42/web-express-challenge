import React from "react";
import testData from "../assets/profile_placeholder.json";
import background from "../assets/profile_bg.png";
import UserLikedPokemon from "../components/UserLikedPokemon";
import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import UserDislikedPokemon from "../components/UserDislikedPokemon";
import defaultProfilePic from "../assets/no_profile_pic.jpg";

const Profile = () => {

    const [editingBio, setEditingBio] = useState(false);
    const [bio, setBio] = useState("Loading...")
    const [ownData, setOwnData] = useState({id: 1, name: "Loading...", bio: "loading...", profile_pic: null});
    const [likedPokemons, setLikedPokemons] = useState({user_id: -1, liked_pokemons: []})
    const [dislikedPokemons, setDislikedPokemons] = useState({user_id: -1, disliked_pokemons: []})

    const fetchProfile = () => {
        fetch("/api/profile/me")
        .then((response) => response.json())
        .then((data) => (setOwnData(data)))
        .catch((error) => alert("Error fetching user list"))			
    };

    const fetchLikedPokemon = () => {
        fetch("api/user/liked_pokemons")
        .then((response) => response.json())
        .then((data) => (setLikedPokemons(data)))
        .then(() => {console.log('Liked pokemons: ', likedPokemons)})
        .catch((error) => alert("Error fetching liked pokemons' list"))
    }

    const fetchDislikedPokemon = () => {
        fetch("api/user/disliked_pokemons")
        .then((response) => response.json())
        .then((data) => (setDislikedPokemons(data)))
        .then(() => {console.log('Disliked pokemons: ', dislikedPokemons)})
        .catch((error) => alert("Error fetching disliked pokemons' list"))
    }

    const updateBio = (event) => {
        setBio(event.target.value)
    }


  const { isAuthenticated, user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData();
    const file = fileInputRef.current.files[0]; // Get the file from the input
    if (file) {
      formData.append("profile_pic", file); // Append the file to FormData
      console.log("form data: ", formData);

      try {
        const response = await fetch("/api/profile/me/update/profile_pic", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Handle success, e.g., update the UI or show a message
        alert("Profile picture uploaded successfully!");
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        alert("Error uploading profile picture");
      }
    }
  };

  console.log("isAuthenticated:", isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      fetchProfile();
      fetchLikedPokemon();
      fetchDislikedPokemon();
    }
  }, [isAuthenticated, navigate, loading]);

  console.log("own data: ", ownData);

  const handleBio = () => {
    console.log("Handling bio");

    if (editingBio === false)
      return <p className="m-3 text-lg">{ownData.bio}</p>;
    else {
      return (
        <section className="text-lg">
          <textarea
            spellCheck="true"
            name="new_bio"
            onChange={updateBio}
            className="bg-gray-300 resize"
            cols={60}
            defaultValue={ownData.bio}
            maxLength={250}
            rows={2}
            type="text"
          />
        </section>
      );
    }
  };

  const RenderProfilePic = () => {
    console.log("rendering profile pic");
    return (
      <img
        src={defaultProfilePic}
        alt="User Profile"
        className="rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-rose-900 relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]"
      />
    );
   /*  if (ownData.profile_pic === null) {
      return (
        <img
          src={defaultProfilePic}
          alt="User Profile"
          className="rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-rose-900 relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]"
        />
      );
    } else {
      return (
        <img
          src={ownData.profile_pic}
          alt="User Profile"
          className="rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-rose-900 relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]"
        />
      );
    } */
  };

  const handleBioEditing = (event) => {
    setEditingBio(true);
  };

    const handleBioSaving = (event) => {
        setEditingBio(false);
        const newBio = {bio: bio}
        fetch("api/profile/me/update/bio", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBio)
        })
        .then(fetchProfile())
        .catch((error) => alert("Error updating bio"))
    }

    const handleNewProfilePic = (event) => {

    }

  return (
    <main>
      <section className="w-full overflow-hidden dark:bg-gray-900">
        <div className="flex flex-col">
          <img
            src={background}
            alt="pokemon in the background"
            className="w-full xl:h-[36rem] lg:h-[32rem] md:h-[28rem] sm:h-[24rem] xs:h-[20rem]"
          />
          <div className="sm:w-[80%] xs:w-[90%] mx-auto flex">
            <RenderProfilePic />
            <h1 className="w-full text-left my-4 sm:mx-4 xs:pl-4 text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-mono">
              {ownData.name}
            </h1>
          </div>
          <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
            <div className="w-fit text-gray-700 dark:text-gray-400 text-md">
              {handleBio()}
            </div>
            <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
              <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <input
                    className="text-white"
                    type="file"
                    name="profile_pic"
                    accept=".jpg, .png, .gif"
                    ref={fileInputRef}
                    required
                  />
                  <button
                    type="submit"
                    className="bg-rose-900 hover:bg-pink-950 text-white font-bold my-3 py-2 px-4 mb-6 rounded"
                  >
                    Upload new picture
                  </button>
                </form>

                <button
                  type="button"
                  onClick={handleBioSaving}
                  className="bg-rose-900 hover:bg-pink-950 text-white font-bold my-3 py-2 px-4 mb-6 rounded"
                >
                  Save bio changes
                </button>
                <button
                  type="button"
                  onClick={handleBioEditing}
                  className="bg-rose-900 hover:bg-pink-950 text-white font-bold my-3 py-2 px-4 mb-6 rounded"
                >
                  Edit bio
                </button>
              </div>
            </div>
          </div>
        </div>
        <h1 className="mb-10 font-bold w-full max-w-md m-auto rounded-lg opacity-90 border-8  bg-slate-800 text-center text-5xl font-pokemon py-6 text-white border-pink-950">
          Pokemon that I like:
        </h1>
        <UserLikedPokemon likedPokemon={testData.liked_pokemons} />
        <h1 className="mb-10 font-bold w-full max-w-md m-auto rounded-lg opacity-90 border-8  bg-slate-800 text-center text-5xl font-pokemon py-6 my-6 text-white border-pink-950">Pokemon that I dislike:</h1>
        <UserDislikedPokemon dislikedPokemon={dislikedPokemons.disliked_pokemons}/>
      </section>
    </main>
  );
};

export default Profile;
