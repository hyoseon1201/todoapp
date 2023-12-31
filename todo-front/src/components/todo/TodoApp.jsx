import "./TodoApp.css"
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LogoutComponent from "./LogoutComponent";
import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderComponent";
import ListTodosComponent from "./ListTodosComponent";
import ErrorComponent from "./ErrorComponent";
import WelcomeComponent from "./WelcomeComponent";
import LoginComponent from "./LoginComponent";
import AuthProvider, {useAuth} from "./security/AuthContext";
import TodoComponent from "./TodoComponent";

function AuthencatedRoute({children}) {
    const authContext = useAuth()

    if (authContext.isAuthenticated)
        return children

    return <Navigate to="/" />
}


export default function TodoApp() {
    return (
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path="/" element={<LoginComponent/>}/>
                        <Route path="/login" element={<LoginComponent/>}/>

                        <Route path="/welcome/:username" element={
                            <AuthencatedRoute>
                                <WelcomeComponent/>
                            </AuthencatedRoute>
                        }/>
                        <Route path="/todos" element={
                            <AuthencatedRoute>
                                <ListTodosComponent/>
                            </AuthencatedRoute>
                        }/>

                        <Route path="/todo/:id" element={
                            <AuthencatedRoute>
                                <TodoComponent/>
                            </AuthencatedRoute>
                        }/>

                        <Route path="/logout" element={
                            <AuthencatedRoute>
                                <LogoutComponent/>
                            </AuthencatedRoute>
                        }/>

                        <Route path="*" element={<ErrorComponent/>}/>
                    </Routes>
                    <FooterComponent />
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}
