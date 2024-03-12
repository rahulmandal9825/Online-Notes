import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signInStart, signInSuccess, signInFailure} from "../redux/user/userSlice";

function Signin() {

    const [formData, setfromData] = useState({});
    const {loading, error , currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();



    const handlechange = (e) => {
        setfromData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart());
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(formData),
            });
            const data = await res.json();
         
            if (data.succes === false) {
                dispatch(signInFailure(data.message));

                return;
            }
            dispatch(signInSuccess(data));
            navigate("/");
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
        console.log(currentUser);
    };



  return (
 <div className='flex justify-center'>
    <div className=" w-full md:w-[50%] mt-[100px] flex flex-col gap-10 justify-center">
      <h1 className=" text-white text-3xl text-center font-bold">Sign In</h1>
      <form onSubmit={handlesubmit} action="" className="w-full flex flex-col gap-10 ">
        <div className=" flex gap-10 justify-evenly">
        <h2 className="text-white font-bold text-xl self-center ">Email</h2>
        <input type="email" placeholder="Email" id='email' onChange={handlechange} className=" text-white focus:outline-none rounded-xl w-[60%] p-3 bg-gray-600" />
        </div>
        <div className="flex justify-evenly">
        <h2 className="text-white font-bold text-xl self-center  ">Password</h2>
        <input type="password" placeholder="password" id='password' onChange={handlechange} className="ocus:outline-none rounded-xl text-white w-[60%] p-3 bg-gray-600" />
        </div>
        <button disabled={loading}className=" hover:bg-gray-600 hover:text-white bg-yellow-500 text-black mr-4 rounded-xl font-semibold w-[30%] self-center p-3"> {loading ? "Loading" : "sign In"}</button>
        </form> 
        <div className="flex gap-3 p-5 font-semibold text-lg text-white">
            <h1>Dont have a account</h1> 
           <Link to="/sign-up" className='text-gray-400 font-bold hover:underline hover:text-yellow-400'>Sign Up Now</Link> 
        </div>
    </div>
</div>
  )
}

export default Signin
