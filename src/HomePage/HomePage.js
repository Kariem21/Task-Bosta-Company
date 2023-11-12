import React from 'react'
import './HomePage.css'
import { useNavigate } from 'react-router-dom'
export default function HomePage() {
  const navigate = useNavigate();


  const GotToDetails=(id)=>{
    navigate(`/deliveryDetails/${id}`);
  }
  return (
    <div className='HomePageContainer'>
      
      <h1>Choose Id To Track</h1>

      <div style={{cursor:"pointer"}} onClick={()=>GotToDetails(`67151313`)} ><h3>67151313</h3></div>
      <div style={{cursor:"pointer"}} onClick={()=>GotToDetails(`7234258`)}><h3>7234258</h3></div>
      <div style={{cursor:"pointer"}}onClick={()=>GotToDetails(`13737343`)}><h3>13737343</h3></div>


      

    </div>
  )
}
