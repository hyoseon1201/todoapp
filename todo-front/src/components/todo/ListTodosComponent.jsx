import {useEffect, useState} from "react";
import {deleteTodoApi, retrieveAllTodosForUsernameApi} from "./api/TodoApiService";
import {useAuth} from "./security/AuthContext";
import {useNavigate} from "react-router-dom";

function ListTodosComponent() {

    const today = new Date();

    const authContext = useAuth()

    const username = authContext.username

    const navigate = useNavigate()

    const targetDate = new Date(today.getFullYear()+12,
        today.getMonth(), today.getDay())

    const [todos, setTodos] = useState([])

    const [message, setMessge] = useState(null)

    useEffect(() => refreshTodos(), [])

    function refreshTodos() {
        retrieveAllTodosForUsernameApi(username)
            .then(response => {
                setTodos(response.data)})
            .catch(error => {
                console.log(error)})
    }

    function deleteTodo(id) {
        console.log("clicked" + id)
        deleteTodoApi(username, id)
            .then(
                () => {
                    setMessge(`ID = ${id} 삭제가 완료되었습니다.`)
                    refreshTodos()
                }
            )
            .catch(error => {
                console.log(error)})
    }

    function updateTodo(id) {
        navigate(`/todo/${id}`)
    }

    return (
        <div className="ListTodosComponent">
            <h1>오늘 할 일을 적어보세요!</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>설명</th>
                        <th>완료 여부</th>
                        <th>예정 날짜</th>
                        <th>삭제</th>
                        <th>수정</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                    <td><button className="btn btn-dark"
                                                onClick={() => deleteTodo(todo.id)}>삭제</button> </td>
                                    <td><button className="btn btn-success"
                                                onClick={() => updateTodo(todo.id)}>수정</button> </td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListTodosComponent;