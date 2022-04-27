import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import getCurrentWeather from "../src/Service/getCurrentWeather";
import getHourlyWeather from "../src/Service/getHourlyWeather";
import { FaTemperatureHigh } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi'
import { CgCompressV } from 'react-icons/cg'
import { MdVisibility } from 'react-icons/md'
import { BsFillSunriseFill,BsFillSunsetFill } from 'react-icons/bs'
import { BiWind } from 'react-icons/bi'
import { GiOrbitalRays } from 'react-icons/Gi'
import Link from 'next/link';
interface CurrentWeatherData {
    main?: {
        temp?: number,
        temp_min?:number,
        temp_max?:number,
        humidity?:number,
        pressure?:number
    },
    weather?: [
        {
            main?:string,
            description?:string,
            icon?:string
        }
    ],
    sys?: {
        sunrise?:number,
        sunset?:number
    }
    dt?:number,
    name?:string,
    visibility?:number,
    wind?: {
        speed?:number
    }
}
interface CurrentHourlyWeatherData {
    hourly?:[
        {
            dt?: number,
            temp?: number,
            feels_like?: number,
            pressure?: number,
            humidity?: number,
            dew_point?: number,
            uvi?: number,
            clouds?: number,
            visibility?: number,
            wind_speed?: number,
            wind_deg?: number,
            wind_gust?: number
            weather: [
                {
                    id?: number,
                    main?: string,
                    description?: string,
                    icon?: string
                }
            ],
            pop?: number
        },
    ]
}
interface CurrentDailyWeatherData{
    daily?: [
        {
            dt?: number,
            sunrise?: number,
            sunset?: number,
            moonrise?: number,
            moonset?: number,
            moon_phase?: number,
            temp?: {
                day?: number,
                min?: number,
                max?: number,
                night?: number,
                eve?: number,
                morn?: number
            },
            feels_like?: {
                day?: number,
                night?: number,
                eve?: number,
                morn?: number
            },
            pressure?: number,
            humidity?: number,
            dew_point?: number,
            wind_speed?: number,
            wind_deg?: number,
            wind_gust?: number,
            weather?: [
                {
                    id?: number,
                    main?: string,
                    description?: string,
                    icon?: string
                }
            ],
            clouds?: number,
            pop?: number,
            rai?: number,
            uvi?: number
        },
    ]
}

const CurrentWeather = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<CurrentWeatherData | undefined>();
    const [city, setCity] = useState('');
    const [dataHourly, setDataHourly] = useState<CurrentHourlyWeatherData | undefined>();
    const [dataDaily, setDataDaily] = useState<CurrentDailyWeatherData | undefined>();
    useEffect(() => {
        if (router.query['city']) {
            setCity(String(router.query['city']));
        } else {
            setCity('Vietnam') // TODO: get default city from config
        }
    }, [router.query]);

    useEffect(() => {
        setLoading(true);
        if (!city) return;
        getCurrentWeather(city)
             .then(res => {
                 console.log(res.data)
                  setData(res.data);
                  if (res.data.coord.lat && res.data.coord.lon) {
                       getHourlyWeather(res.data.coord.lat, res.data.coord.lon)
                       .then(res => {
                           console.log(res.data)
                            setDataHourly(res.data)
                            setDataDaily(res.data)
                        })
                    }
             })
             .finally(() => setLoading(false));
    
   }, [city])
    if (loading) return <div>Loading...</div>;
    const day = (new Date(Number(data?.dt)*1000)).getDay();
    const month = (new Date(Number(data?.dt)*1000)).getMonth() + 1;
    const year = (new Date(Number(data?.dt)*1000)).getFullYear();
    const hourlySunrise = (new Date(Number(data?.sys?.sunrise)*1000)).getHours();
    const secondSunrise = (new Date(Number(data?.sys?.sunrise)*1000)).getMinutes();
    const hourlySunset = (new Date(Number(data?.sys?.sunset)*1000)).getHours();
    const secondSunset = (new Date(Number(data?.sys?.sunset)*1000)).getMinutes();
    let icon = <img src = {`http://openweathermap.org/img/wn/${data?.weather?.[0].icon}@2x.png`}></img>
    // hourly
    
    return (
        <>
            {/* Hiển thị dữ liệu từ api current */}
            <div className = "container">
                <div className = "container_name">
                    {data?.name && <p className="city-name">Thời Tiết Ngày {day}/{month}/{year} Tại {data.name}</p>}
                </div>
                <div className="container-state">
                    {data?.main?.temp && <h3 className="temp">{(Number(data.main.temp)-273).toFixed(1)} °C</h3>}
                    {data?.weather?.[0].description && <h3 className="status">Trạng Thái: {data.weather[0].main}</h3>}
                    <h3 className="temp-day">Ngày: {(Number(data?.main?.temp_max)-273).toFixed(1)} °C</h3>
                    <h3 className="temp-night">Đêm: {(Number(data?.main?.temp_min)-273).toFixed(1)} °C</h3>
                </div>
                <div className="icon">
                    <p>{icon}</p>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <div className="container-body">
                    {data?.name && <h3 className="city-names">Thời Tiết Ngày {day}/{month}/{year} Tại {data.name}</h3>}
                    {data?.main?.temp && <h3 className="temp">{(Number(data.main.temp)-273).toFixed(1)} °C</h3>}
                    <h3 className="feel">Cảm giác như: {data?.weather?.[0].description}</h3>
                    <div className="container-body-left">
                        <div className="box-left">
                            <p className="icons"><FaTemperatureHigh style = {{color:'rgb(106,222,248)'}} /> Cao/Thấp</p>
                            <p className="value">{(Number(data?.main?.temp_max)-273).toFixed(1)}°/{(Number(data?.main?.temp_min)-273).toFixed(1)}°</p>
                        </div>
                        <div className="box-left">
                            <p className="icons"><WiHumidity style = {{color:'rgb(106,222,248)'}} /> Độ ẩm</p>
                            <p className="value">{data?.main?.humidity} %</p>
                        </div>
                        <div className="box-left">
                            <p className="icons"><CgCompressV  style = {{color:'rgb(106,222,248)'}}/> Áp suất</p>
                            <p className="value">{data?.main?.pressure} mb</p>
                        </div>
                        <div className="box-left">
                            <p className="icons"><BsFillSunriseFill style = {{color:'rgb(106,222,248)'}}/> Sunrise</p>
                            <p className="value">{hourlySunrise}:{secondSunrise}</p>
                        </div>
                    </div>
                    <div className="container-body-right">
                        <div className="box-right">
                            <p className="icons"><BiWind style = {{color:'rgb(106,222,248)'}} /> Gió</p>
                            <p className="value">{data?.wind?.speed} km/h</p>
                        </div>
                        <div className="box-right">
                            <p className="icons"><MdVisibility style = {{color:'rgb(106,222,248)'}} /> Tầm nhìn</p>
                            <p className="value">{Number(data?.visibility)/1000} km</p>
                        </div>
                        <div className="box-right">
                            <p className="icons"><GiOrbitalRays style = {{color:'rgb(106,222,248)'}} /> U/V</p>
                            <p className="value">3/10</p>
                        </div>
                        <div className="box-right">
                            <p className="icons"><BsFillSunsetFill style = {{color:'rgb(106,222,248)'}} /> Sunset</p>
                            <p className="value">{hourlySunset}:{secondSunset}</p>
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    .container-body{
                        display:inline-block;
                    }
                    .container_name{
                        height: 60px;
                        width:820px;
                        background-image: linear-gradient(.25turn,#0C3A4D,#2B5862 60%);
                        margin-left:350px;
                        border:none;
                        color:white;
                        border-radius:10px 10px 0px 0px;
                        margin-top:50px;
                        text-align:center;
                        font-size:20px;
                    }
                    .city-name{
                        position:relative;
                        top:15px;
                    }
                    .container-state{
                        width:820px;
                        height:210px;
                        border:none;
                        background-image: linear-gradient(.25turn,#1B81AA,#67C5D8 60%);
                        margin-left:350px;
                        color:white;
                        border-radius:0px 0px 10px 10px;
                    }
                    .temp{
                        font-size:30px;
                        margin-left:30px;
                    }
                    .temp-day,.temp-night{
                        display:inline;
                        margin-left:30px;
                        font-size:20px;
                    }
                    .status{
                        margin-left:30px;
                        font-size:20px;
                    }
                    .icon,.container-state{
                        display:inline-block;
                    }
                    .icon{
                        position:relative;
                        right:150px;
                        bottom:20px;
                    }
                    .container-body{
                        width:820px;
                        height:510px;
                        background-color:#FFFFFF;
                        margin-left:350px;
                        border:none;
                        border-radius:10px;
                    }
                    .box-right,.box-left{
                        height:60px;
                        width:370px;
                        border-top:1px  solid grey;
                        margin-left:30px;
                    }
                    .container-body-left,.container-body-right{
                        display:inline-block;
                        margin-top:60px;
                    }
                    .icons,.value{
                        display:inline;
                    }
                    .icons{
                        position:relative;
                        top:18px;
                    }
                    .value{
                        float:right;
                        position:relative;
                        right:70px;
                    }
                    .city-names{
                        margin-left:30px;
                    }
                    .feel{
                        margin-left:30px;
                    }
                `}</style>
            </div>
            <br></br>
            <br></br>
            {/* Hiển thị dữ liệu current weather */}
            <div className = "current_hourly">
                <h3 className = "title_hourly">Dự báo từng giờ</h3>
                <div className = "box1">
                    <h4 className = "box1-title">Bây giờ</h4>
                    <h3 className = "box1-temp">{(Number(dataHourly?.hourly?.[0].temp)-273).toFixed(1)}°C</h3>
                    <img src={`http://openweathermap.org/img/wn/${dataHourly?.hourly?.[0].weather?.[0].icon}@2x.png`} className ="box1-icon" />
                    <h4 className = "box1-title">{dataHourly?.hourly?.[0].weather?.[0].description}</h4>
                </div>
                <>
                    {dataHourly?.hourly?.slice(1,5).map((item:any) => {
                        const hours = new Date(Number(item.dt)*1000).getHours();
                        return(
                            <div className = "box2">
                                <h3 className = "box1-title">{hours} : 00</h3>
                                <h3 className = "box1-temp">{(item.temp-273).toFixed(1)}°C</h3>
                                <img src = {`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} className ="box1-icon" />
                                <h4 className = "box1-title">{item.weather[0].description}</h4>
                            </div>
                        )
                    })}
                </>
                <button className ="button">
                    <Link href = "/HourlyWeather">48 Giờ tới</Link>
                </button>
                <style jsx>{`
                    .button{
                        height:30px;
                        width:100px;
                        border:none;
                        border-radius:5px;
                        margin-left:30px;
                        font-size:15px;
                    }
                    button:hover {
                        background-color:grey;
                    }
                    .title_hourly{
                        margin-left:30px;
                        position: relative;
                        top:15px;
                    }
                    .current_hourly{
                        height:400px;
                        width:820px;
                        border:none;
                        border-radius:10px;
                        background-color:white;
                        margin-left:350px;
                    }
                    .box1{
                        width:160px;
                        height:280px;
                        margin-left:10px;
                    }
                    .box1-title,.box1-temp{
                        text-align: center;
                    }
                    .box1-icon{
                        margin-left:28px;
                    }
                    .box2{
                        width:160px;
                        height:280px;
                    }
                    .box2,.box1{
                        display:inline-block;
                    }
                    
                `}</style>
            </div>
            <br></br>
            <br></br>
            {/* Hiển thị dữ liệu daily */}
            <div className = "current_hourly">
                <h3 className = "title_hourly">Dự báo Hàng Ngày</h3>
                <div className = "box1">
                    <h4 className = "box1-title">Bây giờ</h4>
                    <h3 className = "box1-temp">{(Number(dataDaily?.daily?.[0].temp?.day)-273).toFixed(1)}°C</h3>
                    <h5 className = "box1-temp">{(Number(dataDaily?.daily?.[0].temp?.night)-273).toFixed(1)}°C</h5>
                    <img src={`http://openweathermap.org/img/wn/${dataDaily?.daily?.[0].weather?.[0].icon}@2x.png`} className ="box1-icon" />
                    <h4 className = "box1-title">{dataDaily?.daily?.[0].weather?.[0].description}</h4>
                </div>
                <>
                    {dataDaily?.daily?.slice(1,5).map((item:any) => {
                        const day = new Date(Number(item.dt)*1000).getDay();
                        const month = new Date(Number(item.dt)*1000).getMonth()+1;
                        return(
                            <div className = "box2">
                                <h3 className = "box1-title">{day} / {month}</h3>
                                <h3 className = "box1-temp">{(item.temp.day-273).toFixed(1)}°C</h3>
                                <h5 className = "box1-temp">{(item.temp.night-273).toFixed(1)}°C</h5>
                                <img src = {`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} className ="box1-icon" />
                                <h4 className = "box1-title">{item.weather[0].description}</h4>
                            </div>
                        )
                    })}
                </>
                <button className ="button">
                    <Link href = "/DailyWeather">10 ngày tới</Link>
                </button>
                <style jsx>{`
                    .button{
                        height:30px;
                        width:100px;
                        border:none;
                        border-radius:5px;
                        margin-left:30px;
                        font-size:15px;
                        margin-top:30px;
                    }
                    button:hover {
                        background-color:grey;
                    }
                    .title_hourly{
                        margin-left:30px;
                        position: relative;
                        top:15px;
                    }
                    .current_hourly{
                        height:450px;
                        width:820px;
                        border:none;
                        border-radius:10px;
                        background-color:white;
                        margin-left:350px;
                    }
                    .box1{
                        width:160px;
                        height:280px;
                        margin-left:10px;
                    }
                    .box1-title,.box1-temp{
                        text-align: center;
                    }
                    .box1-icon{
                        margin-left:28px;
                    }
                    .box2{
                        width:160px;
                        height:280px;
                    }
                    .box2,.box1{
                        display:inline-block;
                    }
                `}</style>
            </div>
        </>
    );
}
export default CurrentWeather;