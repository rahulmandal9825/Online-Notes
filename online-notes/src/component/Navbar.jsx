
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { deleteUserFailure, deleteUserSuccess, signOutUserStart, } from '../redux/user/userSlice';

function Navbar() {

    const {currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSignOut = async () => {

        try {
          dispatch(signOutUserStart());
          const res = await fetch('/api/auth/signout');
          const data = await res.json();
          if (data.success === false) {
            dispatch(deleteUserFailure(data.message));
            return;
          }
          dispatch(deleteUserSuccess(data));
          navigate("/")
        } catch (error) {
          // eslint-disable-next-line no-undef
          dispatch(deleteUserFailure(data.message));
        }
      }
   
  return (
    <div className='p-4   text-white flex justify-between px-6'>
        <Link className="flex gap-2 font-semibold text-lg" to={"/"}>
       <h1 className="text-yellow-400 hover:text-white cursor-pointer text-3xl">i</h1>
        <h1 className="hover:text-yellow-400 transition-colors cursor-pointer self-end text-2xl">Notes</h1>
       </Link>
        
      <div className="flex gap-3 self-center font-semibold text-xl ">
      {currentUser ? (
        <buttom className='hover:text-yellow-400 transition-colors border-none focus:outline-none' onClick={handleSignOut}  >Sign out</buttom>):(

            <Link  className='hover:text-yellow-400 transition-colors' to="Sign-in">Sign in</Link>
        )
}
      </div>
    </div>
  )
}

export default Navbar
