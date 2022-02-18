import React, { useState, useEffect } from 'react';
import { getAllUsers, getUserByUserName } from '../api/userAPI';

const HomePage = () => {
    const [users, setUsers] = useState(null);

    useEffect(async () => {
        let users = await getAllUsers();
        setUsers(users.allUsers);
        console.log(users.allUsers);
    }, [])

    return <div>
        All users
        {users != null && users.map(user =>
            <div key={user.username}>
                <div>Username: {user.username}</div>
                <div>Email: {user.email}</div>
            </div>
        )}
    </div>
}

export default HomePage;