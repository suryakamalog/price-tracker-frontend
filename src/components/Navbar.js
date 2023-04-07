import { NavLink } from "react-router-dom";
import { useSelector, useDispatch} from 'react-redux';
import { authActions } from '../store/auth';
const Navbar = () => {
  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.setItem('isAuthenticated', false)
    localStorage.setItem('refresh_token', "")
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-sm">
        <a className="navbar-brand" href="/">
          Price Tracker
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 justify-content-end">
            {isAuthenticated && <li className="nav-item">
              <NavLink
                to="/productentry"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                aria-current="page"
                end
              >
                ProductEntry
              </NavLink>
            </li>}

            {isAuthenticated && <li className="nav-item">
              <NavLink
                to="/productlist"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                aria-current="page"
                end
              >
                ProductList
              </NavLink>
            </li>}
            {!isAuthenticated &&<li className="nav-item">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                aria-current="page"
                end
              >
                Login
              </NavLink>
            </li>}

            {isAuthenticated && <li className="nav-item">
              <NavLink onClick={logoutHandler} to="/login" className="nav-link" aria-current="page" end>
                Logout
              </NavLink>
            </li>}
            {!isAuthenticated && <li className="nav-item">
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                aria-current="page"
                end
              >
                SignUp
              </NavLink>
            </li>}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
