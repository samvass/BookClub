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

export const getUserByUserName = async (username) => {
    let endpoint = apiURL + "/users/get/" + username;
    return await apiGet(endpoint);
}

export const getAllUsers = async () => {
    let endpoint = apiURL + "/users/get";
    return await apiGet(endpoint);
}