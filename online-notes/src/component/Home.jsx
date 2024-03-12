
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletenote1 } from '../redux/user/userSlice';
import {deletenote } from '../redux/user/userSlice'

function Home() {

    const [formData, setfromData] = useState({});
    const {currentUser,loading, deleteNot} = useSelector((state) => state.user);
    const [Error, setError] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [showNoteError, setShowNoteError] = useState(false);
    const [userNote, setuserNote] = useState([]);
    const dispatch = useDispatch();



  const handleNoteDelete = async (NoteId) => {
    try {
      const res = await fetch(`/api/notes/delete/${NoteId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      dispatch(deletenote());
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlechange = (e) => {
    setfromData({
        ...formData,
        [e.target.id]: e.target.value,
    });
  };




console.log(userNote);


    
    
  useEffect(() => {
    const fetchData = async () => {
      // setShowMore(false);
      try {
        setShowNoteError(false);
        const res = await fetch(`/api/notes/getnotes/${currentUser._id}`);
        const data = await res.json();

        
        if (data.success === false) {
          setShowNoteError(true);
          return;
        }
  
        setuserNote(data);
        dispatch(deletenote1());
        
      } catch (error) {
        setShowNoteError(true);
      }
    };
  
    fetchData(); // Call the function immediately
  
  }, [Loading,deleteNot]);
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.title.length < 6)
        return setError('title should be atlest 5 length');
      setLoading(true);
      setError(false);
      const res = await fetch('/api/notes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
     
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };




  return (
    <div className='flex gap-10 flex-col md:flex-row'>
     <div className="Notes-create md:w-[50%] items-center p-5">
       <h1 className='text-white font-bold text-3xl m-3 '>Create Notes</h1>
       <div className='bg-gray-600 h-[45vh] text-white rounded-3xl m-2'>
          <input type="text" placeholder="Title" id="title" onChange={handlechange} className='bg-gray-600 text-2xl focus:outline-none  p-4 w-full rounded-lg'/>
          <textarea defaultValue="" onChange={handlechange} cols="30" rows="10" placeholder="Note" id="description"   className='bg-gray-600 text-2xl focus:outline-none  p-4 w-full h-[20vh] rounded-lg'/>

          <input type="text" placeholder="Tag" id='tag' onChange={handlechange}  className='bg-gray-600 text-2xl focus:outline-none  p-4 w-full rounded-lg'/>
       </div>
       <div className='w-full flex justify-center p-3'>
               <button  onClick={handleSubmit} className=" text-white font-semibold text-lg p-2 rounded-lg hover:bg-gray-600 hover:text-white bg-yellow-500 text-black">Save Notes</button>
       </div>

    
    </div>
    <div>
    <h1 className='text-xl text-white'>Your Notes</h1>
       <div className='text-white text-center flex-wrap font-semibold flex '>
     
        {userNote.map((notes) => (
           
           <div key={notes._id} className="text-white relative  flex flex-col border-2 w-[170px] md:w-[200px] min-h-[250px] max-h-[300px] p-2 m-3 gap-2 justify-between rounded-lg border-white cursor-pointer"   >
            <i className=" cursor-pointer right-2 hover:bg-gray-600 w-6 rounded-full top-2 text-2xl bg-transparent absolute fa-solid fa-xmark" onClick={()=>{handleNoteDelete(notes._id)}}  ></i>
           <div>
               <h1 className=" text-wrap pb-3">{notes.title}</h1>
               <p className=" text-wrap min-h-[150px]">{notes.description}</p>
               <p className=" text-gray-300 text-wrap">{notes.tag}</p>
           </div>
        
           
       </div>
        
        ))}
    </div>
    </div>
   
  </div>

  );
}

export default Home;
