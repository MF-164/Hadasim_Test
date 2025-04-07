import './Login.scss'

const Login = () => {
    return(
        <div className="wapper">
            <form action="">
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" required></input>
                </div>

                <div className="input-box">
                    <input type="password" placeholder="password" required></input>
                </div>

                <div className="forgot">
                    <label><input type="checkbox"/> Remember Me</label>
                    <a href="#">Forgot Password</a>
                </div>

                <button type="submit" className="btn">Login</button>
            
                <div className="sign-up-link">
                    <p>Dont Have An Account? <a href="#">Register Now</a></p>
                </div>
            </form>
        </div>
    )
}

export default Login