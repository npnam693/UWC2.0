import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatPage from './pages/Chat'
import OverviewPage from './pages/Overview'
import TaskPage from './pages/Task'
import ProfilePage from './pages/Chat'
import Layout from "./layout/DefaultLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/'>
          <Route index element ={<Layout><OverviewPage/></Layout>}></Route>
          <Route path = 'chat' index element ={<Layout><ChatPage/></Layout>}></Route>
          <Route path = 'task' index element ={<Layout><TaskPage/></Layout>}></Route>
          <Route path = 'profile' index element ={<Layout><ProfilePage/></Layout>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;