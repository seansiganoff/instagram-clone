
import './App.css';
import Home from './components/home/Home';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import React, {useState}from 'react';
import { auth } from './dbconfig/firebase';
import Post from './components/post/Post';
import Footer from './components/footer/Footer';

export const Context = React.createContext();


function App() {
  const [isAuth, setIsAuth] = useState();

const RestrictedRoute = () => {
  return <>{isAuth ? <Outlet /> : <Navigate to="/login" /> }</> //replace the second outlet with Navigate to="/login" for auth to work

}

const PrivateRoute = () => {
  return <>{!isAuth  ? <Outlet />  :  <Navigate to="/" />  }</>
}

   
  
  return (
    <div className="App">
      
      <BrowserRouter>
      <Context.Provider value={[isAuth, setIsAuth]}>
        <Routes>
          <Route element={<RestrictedRoute />}>
            <Route path='/' element={<Home />} />
            <Route path='/post' element={<Post />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
        {isAuth && <Footer />}
        </Context.Provider>
      </BrowserRouter>

    </div>
  );
}

export default App;
