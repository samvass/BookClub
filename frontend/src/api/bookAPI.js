import { apiURL } from "./apiConstants";

const apiGet = async (endpoint, sessionID="") => {
    try {
        let res = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': sessionID
            }
        });
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

const apiPost = async (endpoint, body, sessionID="") => {
    try {
        let res = await fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': sessionID
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

export const getBookByNameInDatabase = async (bookName) => {
    let endpoint = apiURL + "/books/get/db/" + bookName;
    return await apiGet(endpoint);
}

export const getBookByGenre = async (genre) => {
    let endpoint = apiURL + "/books/get/by/genre/" + genre;
    return await apiGet(endpoint);
}

export const acceptBook = async (body, sessionID) => {
    let endpoint = apiURL + "/books/accept";
    return await apiPost(endpoint, body, sessionID);
}

export const rejectBook = async (body, sessionID) => {
    let endpoint = apiURL + "/books/reject";
    return await apiPost(endpoint, body, sessionID);
}

export const leaveBookRating = async (body, bookName) => {
    let endpoint = apiURL + "/books/set/rating/" + bookName;
    return await apiPost(endpoint, body);
}