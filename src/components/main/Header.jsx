import React, { useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import Logo from "../../assets/LOGO.png";
import { Link } from "react-router-dom";



const Header = () => {
  const { userInfo , setUserInfo} = React.useContext(UserContext)

  const logoutUser = () => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/logout`,{
      credentials: 'include',
      method: 'POST'
    })
    setUserInfo(null);
  }

  // after login stay in page even refresh
  useEffect( () => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/profile`,{
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setUserInfo(data.data))
  }, [])
  return (

    <header>
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="header-left-brand">
            <img src={Logo} alt="" />
            <h2>Awaas Vishwa</h2>
          </Link>
        </div>

        <div className="header-right">
          <div className="header-right-login">
            {
              // condition ? true : false (using ternary operator)
              userInfo ? (
                <>
                  <Link to="/create-ad">List Your Property</Link>
                  <Link onClick={logoutUser}>Logout</Link>
                </>
              ) : (
                <>
                  <Link to="/login">Log In</Link>
                  <Link to="/register">Regsiter</Link>
                </>
              )
            }
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;