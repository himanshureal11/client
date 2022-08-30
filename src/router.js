import { Navigate, useRoutes } from "react-router-dom";
import DashboardLayout from './components/layout/DashboardLayout'
import LoginLayout from "./components/layout/LoginLayout/LoginLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { ACCESS_LEVEL } from "./constant";
import PageNotFound from "./pages/pageNotFound/404";
import AddQuestion from "./pages/question/addQuestion";
import AddUser from "./pages/users/addUser";
import Login from "./pages/login/login";
import QuestionPaper from "./pages/question/questionpaper";
import Subjects from "./pages/subject/subjects";
import Test from "./pages/question/test";
import ThankYou from "./pages/thankYou/thankyou";
import User from "./pages/users/user";
import UserForm from "./pages/users/userForm";
import Users from "./pages/users/users";

export default function Router() {

    let element = useRoutes([
        {
            element: <DashboardLayout />,
            path: '/',
            children: [
                { path: '/', element: <Navigate to="/login" /> },
                {
                    element: <ProtectedRoute access_level={ACCESS_LEVEL.ADMIN} />,
                    path: '/',
                    children: [
                        { path: 'questions/:name/:id' , element:<QuestionPaper />},
                        { path: 'add_question/:name/:subject_id' , element:<AddQuestion />},
                        { path: 'edit_question/:id/:edit/:subject_id/:name' , element: <AddQuestion /> },
                        { path: 'subjects' , element:<Subjects />},
                        { path: 'users' , element:<Users />},
                        { path: 'user/:id' , element:<User />},
                        { path: 'add_user' , element:<AddUser />},
                        { path: 'edit_user/:id' , element:<AddUser />},
                    ]
                },
                {
                    element: <ProtectedRoute access_level={ACCESS_LEVEL.STUDENT} />,
                    path: '/',
                    children: [
                        {path: 'user_detail', element:<UserForm />},
                        {path: 'question_paper/:id', element:<Test />},
                        {path: 'thank', element:<ThankYou />}
                    ]
                }
            ],
        },
        {
            element: <LoginLayout />,
            path: '/',
            children: [
                { path: 'login', element: <Login /> },
            ],
        },
        {
            element: <PageNotFound />,
            path: '*',
        },
    ]);
    return element;
}