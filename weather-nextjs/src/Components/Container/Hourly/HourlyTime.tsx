import React, {useState} from "react";
import { BiWind } from 'react-icons/bi'
import { FaTemperatureHigh } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi'
import { GiOrbitalRays } from 'react-icons/gi'
import { BsCloudFog2 } from 'react-icons/bs'
import { CgCompressV } from 'react-icons/cg'
export interface Hourly {
    time:number,
    temp:number,
    iconUrl:string,
    status:string,
    wind_speed:number,
    humidity:string,
    cloud:string,
    uvi:number,
    pressure:number
}
interface CurrentHourlyWeatherData {
    title?:string,
    dataHourly?:Hourly[];
}
const HourlyTime = (props:CurrentHourlyWeatherData) => {
    const { dataHourly,title } = props;
    const [modal, setModal] = useState(true)
    const [show, setShow] = useState(false)
    const times = new Date(Number(dataHourly?.[0]?.time)*1000);
    const weekday = ["Chủ Nhật","Thứ 2","Thứ 3","Thứ 4","Thứ 5","Thứ 6","Thứ 7"];
    const thu = weekday[times.getDay()];
    const ngay = times.getDate();
    const thang = times.getMonth()+1;
    const gio = times.getHours();
    return(
        <>
            <div className = "container">
                <h3 className="container-title">{title}</h3>
                <div className="container-time">
                    <h4 className="times">{thu} ngày {ngay} tháng {thang}</h4>
                </div>
                <div className="accordion">
                    <div className="accordinon-title" onClick = {() => setModal(!modal)}>
                        <p className="time">{gio}:00</p>
                        <h4 className="temp">{(Number(dataHourly?.[0]?.temp)-273).toFixed(0)} °C</h4>
                        <img src = {`http://openweathermap.org/img/wn/${dataHourly?.[0]?.iconUrl}@2x.png`} className = "icon" />
                        <p className="status">{dataHourly?.[0]?.status}</p>
                        <p className="wind-speed"><BiWind style = {{color:'rgb(106,222,248)'}} />{dataHourly?.[0]?.wind_speed}km/h</p>
                    </div>
                    {modal && <div className="accordion-content">
                        <div className="content-top">
                            <div className="content-temp">
                                <p><FaTemperatureHigh style = {{color:'rgb(106,222,248)'}} /> Nhiệt Độ</p>
                                <p className = "value">{(Number(dataHourly?.[0]?.temp)-273).toFixed(0)} °C</p>
                            </div>
                            <div className="content-wind">
                                <p><BiWind style = {{color:'rgb(106,222,248)'}} /> Tốc độ gió</p>
                                <p className = "value">{dataHourly?.[0]?.wind_speed}km/h</p>
                            </div>
                            <div className="content-humidity">
                                <p><WiHumidity style = {{color:'rgb(106,222,248)'}} /> Độ ẩm</p>
                                <p className = "value">{dataHourly?.[0]?.humidity}%</p>
                            </div>
                        </div>
                        <div className="content-bottom">
                            <div className="content-UV">
                                <p><GiOrbitalRays style = {{color:'rgb(106,222,248)'}} /> U/V</p>
                                <p className = "value">{dataHourly?.[0]?.uvi}</p>
                            </div>
                            <div className="content-cloud">
                                <p><BsCloudFog2 style = {{color:'rgb(106,222,248)'}} /> Mây</p>
                                <p className = "value">{dataHourly?.[0]?.cloud}%</p>
                            </div>
                            <div className="content-rain">
                                <p><CgCompressV style = {{color:'rgb(106,222,248)'}} /> Áp suất</p>
                                <p className = "value">{dataHourly?.[0]?.pressure}mb</p>
                            </div>
                        </div>
                    </div>}
                    {dataHourly?.map((item:any) => {
                        const times = new Date(Number(item.time)*1000);
                        const gio = times.getHours();
                        return (
                            <div className="accordion">
                                <div className="accordinon-title" onClick = {() => setShow(!show)}>
                                    <p className="time">{gio}:00</p>
                                    <h4 className="temp">{((item.temp)-273).toFixed(0)} °C</h4>
                                    <img src = {`http://openweathermap.org/img/wn/${item?.iconUrl}@2x.png`} className = "icon" />
                                    <p className="status">{item?.status}</p>
                                    <p className="wind-speed"><BiWind style = {{color:'rgb(106,222,248)'}} />{item?.wind_speed}km/h</p>
                                </div>
                                {show && <div className="accordion-content">
                                    <div className="content-top">
                                        <div className="content-temp">
                                            <p><FaTemperatureHigh style = {{color:'rgb(106,222,248)'}} /> Nhiệt Độ</p>
                                            <p className = "value">{(Number(item?.temp)-273).toFixed(0)} °C</p>
                                        </div>
                                        <div className="content-wind">
                                            <p><BiWind style = {{color:'rgb(106,222,248)'}} /> Tốc độ gió</p>
                                            <p className = "value">{item?.wind_speed}km/h</p>
                                        </div>
                                        <div className="content-humidity">
                                            <p><WiHumidity style = {{color:'rgb(106,222,248)'}} /> Độ ẩm</p>
                                            <p className = "value">{item?.humidity}%</p>
                                        </div>
                                    </div>
                                    <div className="content-bottom">
                                        <div className="content-UV">
                                            <p><GiOrbitalRays style = {{color:'rgb(106,222,248)'}} /> U/V</p>
                                            <p className = "value">{item?.uvi}</p>
                                        </div>
                                        <div className="content-cloud">
                                            <p><BsCloudFog2 style = {{color:'rgb(106,222,248)'}} /> Mây</p>
                                            <p className = "value">{item?.cloud}%</p>
                                        </div>
                                        <div className="content-rain">
                                            <p><CgCompressV style = {{color:'rgb(106,222,248)'}} /> Áp suất</p>
                                            <p className = "value">{item?.pressure}mb</p>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                        )
                    })}
                </div>
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
                    .value{
                        text-align:center;
                    }
                `}</style>
            </div>
        </>
    );
}
export default HourlyTime;