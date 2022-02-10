import "./MyAccountPage.scss"

const MyAccountPage = () => {

    const user = {
        username: "geener",
        email: "adamgeenen@gmail.com",
        password: "secretPassword123"
    }

    return (
        <div className="text">
            <h1>Account Info</h1>
            <div>
                <h3>Email</h3>
                <h4>{user.email}</h4>
            </div>
            <div>
                <h3>Username</h3>
                <h4>{user.username}</h4>
            </div>
            <div>
                <h3>Password</h3>
                <h4>{user.password}</h4>
            </div>
        </div>
    )

}

export default MyAccountPage