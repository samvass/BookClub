const CreateAccountPage = () => {
    return <div>
        <form action="/users/create" method="POST">
            <input type="text" name="username" placeholder="username"/>
            <input type="email" name="email" placeholder="email"/>
            <input type="password" name="password" placeholder="password"/>
            <input type="submit" />
        </form>
    </div>
}

export default CreateAccountPage;