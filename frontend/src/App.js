import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import ChatPage from './pages/Chat'
import OverviewPage from './pages/Overview'
import TaskPage from './pages/Task'
import ProfilePage from './pages/Chat'
import UserPage from './pages/User'
import LoginPage from './pages/Login'
import Layout from "./layout/DefaultLayout";
import CreateTask from "./pages/CreateTask";

function App() {
  const user = JSON.parse(localStorage.getItem("userInfo"))

  return (
    <BrowserRouter>
      <Routes>
        <>
          <Route index element ={<Layout><OverviewPage/></Layout>}></Route>
          <Route path = '/chat'  element ={<Layout><ChatPage/></Layout>}></Route>
          <Route path = '/task'  element ={<Layout><TaskPage/></Layout>}></Route>
          <Route path='/task/create' element={<Layout><CreateTask /></Layout>}></Route>
          <Route path = '/profile'  element ={<Layout><ProfilePage/></Layout>}></Route>
          <Route path = '/user'  element ={<Layout><UserPage/></Layout>}></Route>
          <Route path = '/login'  element ={<LoginPage/>}></Route>

        </>
        {/* {
          user != null ? (
            <>
              <Route index element ={<Layout><OverviewPage/></Layout>}></Route>
              <Route path = '/chat'  element ={<Layout><ChatPage/></Layout>}></Route>
              <Route path = '/task'  element ={<Layout><TaskPage/></Layout>}></Route>
              <Route path = '/profile'  element ={<Layout><ProfilePage/></Layout>}></Route>
              <Route path = '/user'  element ={<Layout><UserPage/></Layout>}></Route>
              <Route path = '/login'  element={<Navigate  to="/" />}></Route>

            </>
          ) : (
              <>
                <Route index element={<Navigate to="/login" />}></Route>
                <Route path = '/chat'  element={<Navigate to="/login" />}></Route>
                <Route path = '/task'  element={<Navigate to="/login" />}></Route>
                <Route path = '/profile'  element={<Navigate  to="/login" />}></Route>
                <Route path = '/login'  element ={<LoginPage/>}></Route>
                <Route path = '/user'  element={<Navigate  to="/login" />}></Route>
                <Route path = '/login'  element ={<LoginPage/>}></Route>
              </>
          )
        } */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;