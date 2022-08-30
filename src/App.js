import './App.css';
import { BrowserRouter } from "react-router-dom";
import Router from './router';
import QuestionContextProvider from './context/question.context';
import UserContextProvider from './context/user.context';
import LayoutContextProvider from './context/layout.context';

function App() {
  return (
      <LayoutContextProvider>
        <UserContextProvider>
            <QuestionContextProvider>
              <BrowserRouter>
                <Router />
              </BrowserRouter>
            </QuestionContextProvider>
        </UserContextProvider>
      </LayoutContextProvider>
  );
}

export default App;
