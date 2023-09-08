import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./security/AuthContext";

function LoginComponent() {

    const [username, setUsername] = useState("your email")

    const [password, setPassword] = useState("")

    const [showErrorMessage, setshowErrorMessage] = useState(false)

    const navigate = useNavigate()

    const authContext = useAuth()

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    function handleSubmit() {
        if (authContext.login(username, password)) {
            navigate(`/welcome/${username}`)
        } else {
            setshowErrorMessage(true)
        }
    }

    return (
        <div className="Login">
            <h1>Todo에 오신것을 환영합니다</h1>
            {showErrorMessage && <div className="errorMessage">로그인에 실패했습니다. 다시 입력해주세요,</div>}
            <div className="LoginForm">
                <div>
                    <label>User Name : </label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label>Password : </label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>로그인</button>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent;