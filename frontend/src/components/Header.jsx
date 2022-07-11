import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'

function Header(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
    return (
        <header className='header'>
            <div>
                <Link to='/' style={{color: "white"}}>Dashboard</Link>
            </div>
            <ul>
                {user ? (
                    <li>
                    <button className='btn' onClick={onLogout}>
                        <FaSignOutAlt style={{color: "white"}}/> logout
                    </button>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link style={{color: "white"}} to='/login'>
                                <FaSignInAlt/> Login
                            </Link>
                        </li> 
                        <li>
                            <Link style={{color: "white"}} to='/register'>
                                <FaUser /> Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
}

export default Header;