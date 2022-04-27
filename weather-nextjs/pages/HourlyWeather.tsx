import React, { useCallback, useEffect, useState } from "react";
import getCurrentWeather from "../src/Service/getCurrentWeather";
import getHourlyWeather from "../src/Service/getHourlyWeather";
import { useRouter } from "next/router";
import { BiWind } from 'react-icons/bi'
import { FaTemperatureHigh } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi'
import { GiOrbitalRays } from 'react-icons/gi'
import { BsCloudFog2 } from 'react-icons/bs'
import { CgCompressV } from 'react-icons/cg'
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

const HourlyWeather = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [city,setCity] = useState('');
    const [data, setData] = useState<CurrentHourlyWeatherData | undefined>();
    const [modal, setModal] = useState(true);
    const [showToday, setShowToday] = useState(false);
    const [showTomorow, setShowTomorow] = useState(false);
    useEffect(() => {
        if (router.query['city']) {
            setCity(String(router.query['city']));
        } else {
            setCity('Vietnam') // TODO: get default city from config
        }
    }, [router.query]);
    useEffect(() => {
        setLoading(true);
        getCurrentWeather(city)
             .then(res => {
                  setCity(res.data.name)
                  if (res.data.coord.lat && res.data.coord.lon) {
                       getHourlyWeather(res.data.coord.lat, res.data.coord.lon)
                       .then(res => {
                             setData(res.data)
                        })
                    }
             })
             .finally(() => setLoading(false));
    
   },[city])
    if (loading) return <div>Loading...</div>;
    // hôm nay
    const thuToday = (new Date(Number(data?.hourly?.[0].dt)*1000)).getDay();
    const ngayToday = (new Date(Number(data?.hourly?.[0].dt)*1000)).getDate();
    const thangToday = (new Date(Number(data?.hourly?.[0].dt)*1000)).getMonth();
    const gioToday = (new Date(Number(data?.hourly?.[0].dt)*1000)).getHours();
    return (
        <>
            {/* accordion hôm nay */}
            <div className="container">
                <h3 className="container-title">Thời Tiết Hàng Giờ</h3>
                <div className="container-time">
                    <h4 className="times">Thứ {thuToday} ngày {ngayToday} tháng {thangToday}</h4>
                </div>
                <div className="accordion">
                    <div className="accordinon-title" onClick = {() => setModal(!modal)}>
                        <p className="time">{gioToday}:00</p>
                        <h4 className="temp">{(Number(data?.hourly?.[0].temp)-273).toFixed(0)} °C</h4>
                        <img src = {`http://openweathermap.org/img/wn/01d@2x.png`} className = "icon" />
                        <p className="status">{data?.hourly?.[0].weather?.[0].main}</p>
                        <p className="wind-speed"><BiWind style = {{color:'rgb(106,222,248)'}} />{data?.hourly?.[0].wind_speed}km/h</p>
                    </div>
                    {modal && <div className="accordion-content">
                        <div className="content-top">
                            <div className="content-temp">
                                <p><FaTemperatureHigh style = {{color:'rgb(106,222,248)'}} /> Nhiệt Độ</p>
                                <p>{(Number(data?.hourly?.[0].temp)-273).toFixed(0)} °C</p>
                            </div>
                            <div className="content-wind">
                                <p><BiWind style = {{color:'rgb(106,222,248)'}} /> Tốc độ gió</p>
                                <p>{data?.hourly?.[0].wind_speed}km/h</p>
                            </div>
                            <div className="content-humidity">
                                <p><WiHumidity style = {{color:'rgb(106,222,248)'}} /> Độ ẩm</p>
                                <p>{data?.hourly?.[0].humidity}%</p>
                            </div>
                        </div>
                        <div className="content-bottom">
                            <div className="content-UV">
                                <p><GiOrbitalRays style = {{color:'rgb(106,222,248)'}} /> U/V</p>
                                <p>3/10</p>
                            </div>
                            <div className="content-cloud">
                                <p><BsCloudFog2 style = {{color:'rgb(106,222,248)'}} /> Mây</p>
                                <p>{data?.hourly?.[0].clouds}%</p>
                            </div>
                            <div className="content-rain">
                                <p><CgCompressV style = {{color:'rgb(106,222,248)'}} /> Áp suất</p>
                                <p>{data?.hourly?.[0].pressure}mb</p>
                            </div>
                        </div>
                    </div>}
                </div>
                {/* sử dụng hàm map để hiển thị các hour còn lại */}
                {data?.hourly?.slice(1,23).map((item,index) => {
                    const gioToday = (new Date(Number(item.dt)*1000)).getHours();
                    return (
                    <div className="accordion">
                        <div className="accordinon-title" onClick = {() => setShowToday(!showToday)} > {/* onClick={() => toggle(i)} */}
                            <p className="time">{gioToday}:00</p>
                            <h4 className="temp">{(Number(item.temp)-273).toFixed(0)} °C</h4>
                            <img src = {`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} className = "icon" />
                            <p className="status">{item.weather?.[0].main}</p>
                            <p className="wind-speed"><BiWind style = {{color:'rgb(106,222,248)'}} />{item.wind_speed}km/h</p>
                        </div>
                        {showToday && <div className="accordion-content">
                            <div className="content-top">
                                <div className="content-temp">
                                    <p><FaTemperatureHigh style = {{color:'rgb(106,222,248)'}} /> Nhiệt Độ</p>
                                    <p>{(Number(item.temp)-273).toFixed(0)} °C</p>
                                </div>
                                <div className="content-wind">
                                    <p><BiWind style = {{color:'rgb(106,222,248)'}} /> Tốc độ gió</p>
                                    <p>{item.wind_speed}km/h</p>
                                </div>
                                <div className="content-humidity">
                                    <p><WiHumidity style = {{color:'rgb(106,222,248)'}} /> Độ ẩm</p>
                                    <p>{item.humidity}%</p>
                                </div>
                            </div>
                            <div className="content-bottom">
                                <div className="content-UV">
                                    <p><GiOrbitalRays style = {{color:'rgb(106,222,248)'}} /> U/V</p>
                                    <p>3/10</p>
                                </div>
                                <div className="content-cloud">
                                    <p><BsCloudFog2 style = {{color:'rgb(106,222,248)'}} /> Mây</p>
                                    <p>{item.clouds}%</p>
                                </div>
                                <div className="content-rain">
                                    <p><CgCompressV style = {{color:'rgb(106,222,248)'}} /> Áp suất</p>
                                    <p>{item.pressure}mb</p>
                                </div>
                            </div>
                        </div>}
                    </div>
                    );
                })}
                <style jsx>{`
                    .container{
                        height:100%;
                        width:820px;
                        background-color:white;
                        margin-left:350px;
                        border:none;
                        border-radius:10px;
                    }
                    .container-title,.container-time{
                        margin-left:30px;
                        position:relative;
                        top:20px;
                    }
                    .accordion{

                    }
                    .accordinon-title{
                        height:40px;
                        width:780px;
                        border-top:2px solid #DEDEDE;
                        margin-left:20px;
                        margin-top:50px;
                        cursor:pointer;
                    }
                    .time,.temp,.icon,.status,.wind-speed{
                        display:inline;
                        margin-left:30px;
                    }
                    .time,.temp,.status,.wind-speed{
                        position:relative;
                        bottom:50px;
                    }
                    .temp{
                        margin-left:50px;
                    }
                    .wind-speed{
                        margin-left:180px;
                    }
                    .icon{
                        margin-left:100px;
                    }
                    .accordion-content{
                        width:600px;
                        height:230px;
                        border:2px solid #DEDEDE;
                        margin-left:110px;
                        border-radius:15px;
                        margin-top:55px;
                    }
                    .content-top,.content-bottom{
                        height:100px;
                        width:500px;
                        margin-left:50px;
                    }
                    .content-top{
                        margin-top:13px;
                        border:none;
                    }
                    .content-bottom{
                        border-top:2px solid #DEDEDE;
                    }
                    .content-temp,.content-humidity,.content-wind{
                        display:inline-block;
                    }
                    .content-UV,.content-cloud,.content-rain{
                        display:inline-block;
                    }
                    .content-temp,.content-UV{
                        margin-left:60px;
                    }
                    .content-wind{
                        margin-left:60px;
                    }
                    .content-cloud{
                        margin-left:100px;
                    }
                    .content-humidity{
                        margin-left:60px;
                    }
                    .content-rain{
                        margin-left:105px;
                    }
                `}</style>
            </div>
            <br></br>
            <br></br>
            {/* accordion Ngày mai */}
            <div className="container">
                <h3 className="container-title">Thời Tiết Hàng Giờ</h3>
                <div className="container-time">
                    <h4 className="times">Ngày Mai</h4>
                </div>
                {/* sử dụng hàm map để hiển thị các hour còn lại */}
                {data?.hourly?.slice(24,47).map((item,index) => {
                    const gioToday = (new Date(Number(item.dt)*1000)).getHours();
                    return (
                    <div className="accordion">
                        <div className="accordinon-title" onClick = {() => setShowTomorow(!showTomorow)} > {/* onClick={() => toggle(i)} */}
                            <p className="time">{gioToday}:00</p>
                            <h4 className="temp">{(Number(item.temp)-273).toFixed(0)} °C</h4>
                            <img src = {`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} className = "icon" />
                            <p className="status">{item.weather?.[0].main}</p>
                            <p className="wind-speed"><BiWind />{item.wind_speed}km/h</p>
                        </div>
                        {showTomorow && <div className="accordion-content">
                            <div className="content-top">
                                <div className="content-temp">
                                    <p><FaTemperatureHigh style = {{color:'rgb(106,222,248)'}} /> Nhiệt Độ</p>
                                    <p>{(Number(item.temp)-273).toFixed(0)} °C</p>
                                </div>
                                <div className="content-wind">
                                    <p><BiWind style = {{color:'rgb(106,222,248)'}} /> Tốc độ gió</p>
                                    <p>{item.wind_speed}km/h</p>
                                </div>
                                <div className="content-humidity">
                                    <p><WiHumidity style = {{color:'rgb(106,222,248)'}} /> Độ ẩm</p>
                                    <p>{item.humidity}%</p>
                                </div>
                            </div>
                            <div className="content-bottom">
                                <div className="content-UV">
                                    <p><GiOrbitalRays style = {{color:'rgb(106,222,248)'}} /> U/V</p>
                                    <p>3/10</p>
                                </div>
                                <div className="content-cloud">
                                    <p><BsCloudFog2 style = {{color:'rgb(106,222,248)'}} /> Mây</p>
                                    <p>{item.clouds}%</p>
                                </div>
                                <div className="content-rain">
                                    <p><CgCompressV style = {{color:'rgb(106,222,248)'}} /> Áp suất</p>
                                    <p>{item.pressure}mb</p>
                                </div>
                            </div>
                        </div>}
                    </div>
                    );
                })}
                <style jsx>{`
                    .container{
                        height:100%px;
                        width:820px;
                        background-color:white;
                        margin-left:350px;
                        border:none;
                        border-radius:10px;
                    }
                    .container-title,.container-time{
                        margin-left:30px;
                        position:relative;
                        top:20px;
                    }
                    .accordion{

                    }
                    .accordinon-title{
                        height:40px;
                        width:780px;
                        border-top:2px solid #DEDEDE;
                        margin-left:20px;
                        margin-top:50px;
                        cursor:pointer;
                    }
                    .time,.temp,.icon,.status,.wind-speed{
                        display:inline;
                        margin-left:30px;
                    }
                    .time,.temp,.status,.wind-speed{
                        position:relative;
                        bottom:50px;
                    }
                    .temp{
                        margin-left:50px;
                    }
                    .wind-speed{
                        margin-left:180px;
                    }
                    .icon{
                        margin-left:100px;
                    }
                    .accordion-content{
                        width:600px;
                        height:230px;
                        border:2px solid #DEDEDE;
                        margin-left:110px;
                        border-radius:15px;
                        margin-top:55px;
                    }
                    .content-top,.content-bottom{
                        height:100px;
                        width:500px;
                        margin-left:50px;
                    }
                    .content-top{
                        margin-top:13px;
                        border:none;
                    }
                    .content-bottom{
                        border-top:2px solid #DEDEDE;
                    }
                    .content-temp,.content-humidity,.content-wind{
                        display:inline-block;
                    }
                    .content-UV,.content-cloud,.content-rain{
                        display:inline-block;
                    }
                    .content-temp,.content-UV{
                        margin-left:60px;
                    }
                    .content-wind{
                        margin-left:60px;
                    }
                    .content-cloud{
                        margin-left:100px;
                    }
                    .content-humidity{
                        margin-left:60px;
                    }
                    .content-rain{
                        margin-left:105px;
                    }
                `}</style>
            </div>
        </>
    );

    
}
export default HourlyWeather;