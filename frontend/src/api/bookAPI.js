import { apiURL } from "./apiConstants";

const apiGet = async (endpoint) => {
    try {
        let res = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

const apiPost = async (endpoint, body) => {
    try {
        let res = await fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        return await res.json();
    } catch (error) {
        console.log("hell0");
    }
}

export const getBookByName = async (bookName) => {
    let endpoint = apiURL + "/books/get/" + bookName;
    return await apiGet(endpoint);
}

export const getBooksByGenre = async (bookGenre) => {
    let endpoint = apiURL + "/books/get/" + bookGenre;
    return await apiGet(endpoint);
}