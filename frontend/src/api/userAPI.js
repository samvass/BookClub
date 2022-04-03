import { apiURL } from "./apiConstants";

const apiGet = async (endpoint, sessionID) => {
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

const apiPost = async (endpoint, body, sessionID, method = 'POST') => {
    try {
        let res = await fetch(endpoint, {
            method: method,
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

export const getUserByUserName = async (username) => {
    let endpoint = apiURL + "/users/get/" + username;
    return await apiGet(endpoint);
}

export const getAllUsers = async () => {
    let endpoint = apiURL + "/users/get"; // localhost:3001/users/get
    return await apiGet(endpoint);
}

export const createAccount = async (body) => {
    let endpoint = apiURL + "/users/create";
    return await apiPost(endpoint, body);
}

export const login = async (body) => {
    let endpoint = apiURL + "/users/login";
    return await apiPost(endpoint, body);
}

export const logout = async (body, sessionID) => {
    let endpoint = apiURL + "/users/logout";
    return await apiPost(endpoint, body, sessionID);
}

export const getPreferencesByUsername = async (username, sessionID) => {
    let endpoint = apiURL + "/users/get/preferences/" + username;
    return await apiGet(endpoint, sessionID);
}

export const setPreferencesByUsername = async (username, body) => {
    let endpoint = apiURL + "/users/set/preferences/" + username;
    return await apiPost(endpoint, body);
}

export const getMyLibraryByUsername = async (username, sessionID) => {
    let endpoint = apiURL + "/users/get/myLibrary/" + username;
    return await apiGet(endpoint, sessionID);
}

export const setMyLibraryByUsername = async (username, body) => {
    let endpoint = apiURL + "/users/set/myLibrary/" + username;
    return await apiPost(endpoint, body);
}

export const changePassword = async (body, sessionID) => {
    let endpoint = apiURL + "/users/update";
    return await apiPost(endpoint, body, sessionID, 'PUT');
}

export const deleteAccount = async (body, sessionID) => {
    let endpoint = apiURL + "/users/delete";
    return await apiPost(endpoint, body, sessionID, 'DELETE');
}

export const getMyReadBookByUsername = async (username, sessionID) => {
    let endpoint = apiURL + "/users/get/myReadBook/" + username;
    return await apiGet(endpoint, sessionID);
}

export const markBookAsRead = async (username, body) => {
    let endpoint = apiURL + "/users/set/myReadBook/" + username;
    return await apiPost(endpoint, body);
}

export const getMyUnReadBookByUsername = async (username, sessionID) => {
    let endpoint = apiURL + "/users/get/myUnReadBook/" + username;
    return await apiGet(endpoint, sessionID);
}

export const markBookAsUnRead = async (username, body) => {
    let endpoint = apiURL + "/users/set/myUnReadBook/" + username;
    return await apiPost(endpoint, body);
}