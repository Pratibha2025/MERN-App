import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart,useCart } from './contextReducer';
export default function Card(props) {
    let dispatch= useDispatchCart();
    let options = props.options;
    let priceOptions = Object.keys(options);
    //let foodItem= props.foodItem;
    const [qty,setQty]= useState(1);
    const [size,setSize]= useState("");
    const priceRef= useRef()
    let data = useCart();
    let foodItem = props.item;
    let finalPrice = qty * parseInt(options[size]); 

    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])

    const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }
    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })


    // setBtnEnable(true)

  }

    // const handleAddToCart= async()=>{
    //     await dispatch({type:"ADD", id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size})
    // }

    return (
        <div>
            <div className="card mt-3 ms-5" style={{ "width": "16rem", "maxHeight": "360px" }}>
                <img src={props.foodItem.img} className="card-img-top" style={{height:'120px',objectFit:'fill'}} alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                   
                    <div className="container w-100 h-50 ">
                        <select className="m-2 h-100  bg-success text-white rounded" onChange={(e)=>setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}> {i + 1}</option>
                                )
                            })}
                        </select>
                        <select className="m-2 h-100  bg-success text-white rounded" ref= {priceRef} onChange={(e)=>setSize(e.target.value)}>
                        {priceOptions.map((i) => {
                             return <option key={i} value={i}>{i}</option>
                             })}
                        </select>
                        <div className="d-inline h-100 text-black"> ₹{finalPrice}/- </div>
                        <hr></hr>
                        <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                   
                </div>
              
            </div>
            </div>
        
    )
}
