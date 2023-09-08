import {retrieveTodoApi, updateTodoApi} from "./api/TodoApiService";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "./security/AuthContext";
import {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";

export default function TodoComponent() {

    const {id} = useParams()

    const[description, setDescription] = useState('')

    const[targetDate, setTargetDate] = useState('')

    const authContext = useAuth()

    const navigate = useNavigate()

    const username = authContext.username

    useEffect(
        () => retrieveTodos(),
        [id]
    )

    function retrieveTodos() {
        retrieveTodoApi(username, id)
            .then(response => {
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            })
            .catch(error => console.log(error))
    }

    function onSubmit(values) {
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }
        console.log(todo)

        updateTodoApi(username, id, todo)
            .then(response => {
                navigate("/todos")
            })
            .catch(error => console.log(error))
    }

    function validate(values) {
        let errors = {
        }

        if(values.description.length < 3) {
            errors.description = "설명을 제대로 적으세요!"
        }

        if(values.targetDate == null) {
            errors.targetDate = "날짜를 제대로 입력하세요!"
        }

        return errors
    }

    return (
        <div className="container">
                <div>
                    <Formik initialValues={ {description, targetDate} }
                            enableReinitialize={true}
                            onSubmit={onSubmit}
                            validate={validate}
                            validateOnChange={false}
                            validateOnBlur={false}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage
                                        name="description"
                                        component="div"
                                        className="alert alert-warning"
                                    />

                                    <ErrorMessage
                                        name="targetDate"
                                        component="div"
                                        className="alert alert-warning"
                                    />
                                    <fieldset className="form-group">
                                        <label>
                                            설명
                                        </label>
                                        <Field type="text" className="form-control" name="description" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>
                                            예정 날짜
                                        </label>
                                        <Field type="date" className="form-control" name="targetDate" />
                                    </fieldset>
                                    <div>
                                        <button className="btn btn-success m-5" type="submit">저장하기</button>
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
        </div>
    )
}