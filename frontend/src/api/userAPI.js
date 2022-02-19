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

export const logout = async (body) => {
    let endpoint = apiURL + "/users/logout";
    return await apiPost(endpoint, body);
}

export const viewAccountByUserName = async (username) => {
    let endpoint = apiURL + "/users/view/" + username;
    return await apiGet(endpoint);
}