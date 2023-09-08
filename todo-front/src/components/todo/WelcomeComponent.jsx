import {Link, useParams} from "react-router-dom";
import {useState} from "react";
import {retrieveHelloWorldPathVariable} from "./api/HelloWorldApiService";

function WelcomeComponent() {

    const {username} = useParams()

    const [message, setMessage] = useState(null)

    function callHelloWorldRestApi() {
        console.log('called')

        retrieveHelloWorldPathVariable("Hyoseon")
            .then((response) => successfulResponse(response))
            .catch((error) => errorResponse(error))
            .finally(() => console.log("clean up"))
    }

    function successfulResponse(response) {
        console.log(response)
        setMessage(response.data.message)
    }

    function errorResponse(error) {
        console.log(error)
    }

    return (
        <div className="WelcomeComponent">
            <h1>Todo에 오신것을 환영합니다</h1>
            <div>
                안녕하세요, {username} -> <Link to="/todos">Todos</Link>
            </div>
            <div>
                <button className="btn btn-success" onClick={callHelloWorldRestApi}>
                    hello world api call
                </button>
            </div>
            <div className="text-info">{message}</div>
        </div>
    )
}

export default WelcomeComponent;