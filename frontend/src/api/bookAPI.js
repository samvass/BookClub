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

export const getBookByGenre = async (genre) => {
    let endpoint = apiURL + "/books/get/by/genre/" + genre;
    return await apiGet(endpoint);
}

export const acceptBook = async (body) => {
    let endpoint = apiURL + "/books/accept";
    return await apiPost(endpoint, body);
}