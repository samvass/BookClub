import { useState } from "react"
import { Button } from 'react-bootstrap';

import "./SelectPreferencesPage.css"

const SelectPreferencesPage = () => {

    const [selectedGenres, setSelectedGenres] = useState([])

    const possibleGenres =
        ["Adventure",
            "Sci-Fi",
            "History",
            "War",
            "Canada",
            "Action",
            "Autobiography",
            "Anthology",
            "Biography",
            "Business",
            "Children's",
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

    const setUserGenres = () => {
        console.log(selectedGenres)

        console.log("set user genres")

        window.location.href = "/myAccount";
    }

    return (<div>
        <h1 className="genres-title">Select your favourite genres</h1>
        <div className="genres">
            {displayGenres}
        </div>
        <div className="center">
            <button onClick={setUserGenres}>Set Genres</button>
        </div>
    </div>)
}

export default SelectPreferencesPage