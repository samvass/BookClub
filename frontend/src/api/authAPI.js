import { apiURL } from "./apiConstants";

const apiGet = async (endpoint) => {
    try {
        let res = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

const apiPost = async (endpoint, body, method = 'POST') => {
    try {
        let res = await fetch(endpoint, {
            method: method,
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

export const authenticateUserByToken = async (body) => {
    let endpoint = apiURL + "/auth/verifyToken";
    return await apiPost(endpoint, body);
}