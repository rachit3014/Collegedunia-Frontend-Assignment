import Table from "./table";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Collegeselector, getcollegedetails } from "./redux/reducer/college";
function App() {
  const dispatch=useDispatch();
  const [page,setPage]=useState(1)
  const tabledata=useSelector(Collegeselector)

  useEffect(()=>{

    dispatch(getcollegedetails(page))
  
   
},[page])
//  function for infinte Scroll
  async  function handleinfintescroll()
{

  try {
    if (window.innerHeight+document.documentElement.scrollTop+ 1 >= document.documentElement.scrollHeight)
    {
      setPage((prev)=>prev+1)
    }

    
  } catch (error) {
    console.log(error)
    
  }

}
useEffect(()=>{
  window.addEventListener('scroll',handleinfintescroll)
  return ()=>window.removeEventListener('scroll',handleinfintescroll)
},[])
  return (
    <>
    <Table colleges={tabledata}/>
    </>
    
  );
}

export default App;
