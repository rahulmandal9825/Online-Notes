
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom'






function Signup() {

    const [formData, setfromData] = useState({})
    const [error, setError] = useState(null);
    const[loading, setLoading] = useState(false)
    const navigate = useNavigate();


  const handlechange = (e)=>{
        setfromData({
            ...formData,[e.target.id]: e.target.value,
        });
  }

  console.log(formData);
  const handlesubmit= async(e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method:'POST',
        headers:{
          'Content-Type': 'application/json'},
         
           body:JSON.stringify(formData),
      });
      const data =await res.json();
      console.log(data);
      if (!data.succes === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      console.log(data);
      setError(null);
      navigate('/Sign-in')
    
    } catch (error) {
      setLoading(false);
      setError(error.message);
      
    }
  }
   



    return (
        <div className='flex justify-center'>
            

        <div className=" w-full md:w-[50%]  mt-[100px] flex flex-col gap-10 justify-center">
            <h1 className=" text-white text-3xl text-center font-bold">Sign Up</h1>
            <form onSubmit={handlesubmit} action="" className="w-full flex flex-col gap-10 ">
                <div className=" flex gap-10 justify-evenly">
                    <h2 className="text-white font-bold text-xl self-center ">Email</h2>
                    <input
                        type="email"
                        placeholder="Email" onChange={handlechange}
                        id='email'
                        className=" text-white focus:outline-none rounded-xl w-[60%] p-3 bg-gray-600"
                    />
                </div>
                <div className="flex justify-evenly">
                    <h2 className="text-white font-bold text-xl self-center  ">Password</h2>
                    <input
                        type="password"
                        placeholder="password" onChange={handlechange}
                        id='password'
                        className="ocus:outline-none rounded-xl text-white w-[60%] p-3 bg-gray-600"
                    />
                </div>
                <button disabled={loading} className="p-3 hover:bg-gray-600 hover:text-white bg-yellow-500 text-black mr-4 rounded-xl  font-semibold w-[30%] self-center">
                {loading? 'Loading...': 'sign Up'}
                </button>
            </form>
            <div className="flex gap-3 p-5 font-semibold text-lg text-white">
                <h1>already have a account</h1>
                <Link to="/sign-in" className="text-gray-400 font-bold hover:underline hover:text-yellow-400">
                    Sign In Now
                </Link>
            </div>
        </div>
        
   </div>
    );
}

export default Signup;
