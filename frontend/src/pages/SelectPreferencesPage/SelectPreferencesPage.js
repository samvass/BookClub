import { useEffect, useState } from "react"
import { Navigate } from 'react-router-dom';
import { getPreferencesByUsername, setPreferencesByUsername } from "../../api/userAPI"

import "./SelectPreferencesPage.css"

const SelectPreferencesPage = (props) => {

    useEffect(async () => {
        console.log(props.loggedInUser)
        const userPreferences = await getPreferencesByUsername(props.loggedInUser)
        console.log(userPreferences.data)
        setSelectedGenres(userPreferences.data)
    }, [])

    const [selectedGenres, setSelectedGenres] = useState([])
    const [successMsg, setSuccessMsg] = useState("")

    const possibleGenres = [
        "Adventure",
        "Sci-Fi",
        "History",
        "War",
        "Canada",
        "Action",
        "Autobiography",
        "Anthology",
        "Biography",
        "Business",
        "Classic",
        "Cookbook",
        "Crime",
        'Drama',
        "Fairytale",
        "Fantasy",
        "Humor",
        "Horror",
        "Journal",
        "Mystery",
        "Math",
        "Philosophy",
        "Poetry",
        "Prayer",
        "Politics",
        "Religion",
        "Romance",
        "Satire",
        "True crime",
        "Science fiction",
        "Short story",
        "Science",
        "Suspense",
        "Western",
        "Young adult"]

    const setSelected = (genre) => {
        return selectedGenres.includes(genre)
    }

    const displayGenres = possibleGenres.map((genre, index) => {
        return <div onClick={() => {
            if (selectedGenres.includes(genre)) {
                setSelectedGenres(selectedGenres.filter(allgenre => {
                    return allgenre !== genre
                }))
            } else {
                setSelectedGenres([...selectedGenres, genre])
            }
        }
        } className={`possible-genre ${setSelected(genre) ? "selected-genre" : ""}`} key={index}>{genre}</div>
    })

    const setUserGenres = async () => {
        console.log(selectedGenres)

        const body = {
            preferences: selectedGenres
        }

        const response = await setPreferencesByUsername(props.loggedInUser, body)
        console.log(response)

        setSuccessMsg("Success")
    }

    return (<div>
        <h1 className="genres-title">Select your favourite genres</h1>
        <div className="genres">
            {displayGenres}
        </div>
        <div className="center">
            <button onClick={setUserGenres}>Set Genres</button>
        </div>
        {successMsg !== "" && <Navigate to="/myAccount" />}
    </div>)
}

export default SelectPreferencesPage