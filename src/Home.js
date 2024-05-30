import React, {  useState } from "react";
import './style.css'
import axios from 'axios';

function Home() {

    const[data,setData]=useState({
        celcius:10,
        name:'London',
        humidity:10,
        speed:2,
        image:'/images/cloud.png'
    })

    const[name,SetName]=useState("")
    const[error,setError]=useState("")


    const handleClick =()=>{
        if(name !==""){
        const apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=3bf94ca61df8fce0bce48f5dc75eaad3&units=metric`;
        axios.get(apiUrl)
        .then(res => {
            let imagePath ='';
            if(res.data.weather[0].main == 'Clouds'){
                imagePath = "/images/cloud.png"
            } else if(res.data.weather[0].main == 'Clear'){
                imagePath = "/images/clear.jpg"
            } else if(res.data.weather[0].main == 'Rain'){
                imagePath = "/images/rain.jpg"
            } else if(res.data.weather[0].main == 'Drizzle'){
                imagePath = "/images/drizzle.jpg"
            } else if(res.data.weather[0].main == 'Mist'){
                imagePath = "/images/mist.jpg"
            } else {
                imagePath = "/images/cloud.png"
            }

            console.log(res.data)
            setData({...data,celcius:res.data.main.temp,name:res.data.name,
                humidity:res.data.main.humidity,speed:res.data.wind.speed,
                image: imagePath
            })
            setError("")
        })
        .catch(err =>{
            if(err.response.status== 404){
                setError("Invalid city name")
            }
            else{
                setError("")
            }
             console.log(err)
            })
    }
}

    return (
        <div className="container">
            <div className="weather">
                <div className="search">
                    <input type="text" placeholder="Enter city name" onChange={e=> SetName(e.target.value)}/>
                    <button><img src="/Images/sea.jpg" alt="" onClick={handleClick}/></button>
                </div>
                <div className="error">
                    <p>{error}</p>
                </div>
                <div className="winfo">
                    <img src={data.image} alt="" />
                    <h1>{Math.round(data.celcius)}°C</h1>
                    <h2>{data.name}</h2>
                    <div className="details">
                        <div className="col">
                            <img src="/Images/humidity.jpg" alt="" />
                            <div className="humidity">
                                <p>{Math.round(data.humidity)}%</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                        <div className="col">
                            <img src="/Images/wind.jpg" alt="" />
                            <div className="wind">
                                <p>{Math.round(data.speed)} km/h</p>
                                <p>Wind</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;