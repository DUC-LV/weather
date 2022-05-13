import React, {useState} from "react";
import { BiWind } from 'react-icons/bi'
import { FaTemperatureHigh } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi'
import { GiOrbitalRays } from 'react-icons/gi'
import { BsCloudFog2,BsFillSunriseFill,BsFillSunsetFill,BsFillMoonFill,BsFillCloudMoonFill } from 'react-icons/bs'
import { CgCompressV } from 'react-icons/cg'
import { getMoonrise, getSunrise, getSunset,getMoonset, getConvertTemp} from "../../../Service/utils";
export interface Daily {
    time:number,
    temp_day:number,
    temp_night:number,
    iconUrl:string,
    status:string,
    wind_speed:number,
    humidity:string,
    cloud:string,
    uvi:number,
    pressure:number,
    sunrise:number,
    sunset:number,
    moonrise:number,
    moonset:number,
}
interface DailyWeatherData {
    title?:string,
    dataDaily?:Daily[],
}
const DailyTime = (props:DailyWeatherData) => {
    const {title , dataDaily} = props;
    const times = new Date(Number(dataDaily?.[0]?.time)*1000);
    const [show, setShow] = useState(0)
    const Toggle = (index:any) => {
        if(show === index){
            return setShow(-1);
        }
        setShow(index)
    }
    return(
        <>
            <div className="container">
            <h3 className="title">{title}</h3>
                {dataDaily?.slice(0,7)?.map((item:any,index) => {
                    const times = new Date(item.time*1000);
                    const ngays = times.getDate();
                    const thangs = times.getMonth()+1;
                    return (
                        <>
                            <div className="accordion">
                                <div className = "accodion-title" onClick={() => Toggle(index)}>
                                    <h3 className = "time">{ngays}Tháng{thangs}</h3>
                                    <p className = "temp">{(Number(item?.temp_day)-273).toFixed(0)}/{(Number(item?.temp_night)-273).toFixed(0)}</p>
                                    <img className = 'icon' src = {`http://openweathermap.org/img/wn/${item?.iconUrl}@2x.png`}></img>
                                    <p className = "status">{item?.status}</p>
                                    <p className = "wind-speed">{item?.wind_speed} km/h</p>
                                </div>
                                <div className ={show === index ? 'accordion-content show':'accordion-content'}>
                                    <div className = "accodion-content-head">
                                        <div className = "accodion-content-head1">
                                            <p className = "time1">{ngays} Th {thangs} | Ngày</p>
                                            <p className = "temp1"><FaTemperatureHigh style = {{color:'rgb(106,222,248)'}} /> {(Number(item?.temp_day)-273).toFixed(0)}</p>
                                            <p className = "title1">Chủ yếu có mây. Cao 25 độ C. <br></br>Gió ĐĐB và có thể thay đổi.</p>
                                        </div>
                                        <div className = "accodion-content-head2">
                                            <p className = "time1">{ngays} Th {thangs} | Đêm</p>
                                            <p className = "temp1"><FaTemperatureHigh style = {{color:'rgb(106,222,248)'}} /> {(Number(item?.temp_night)-273).toFixed(0)}</p>
                                            <p className = "title1">Phần nào có mây. Thấp 20 độ C. <br></br>Gió ĐN ở tốc độ 10 đến 15 km/giờ.</p>
                                        </div>
                                    </div>
                                    <div className = "accodion-content-body">
                                        <div className = "accodion-content-body1">
                                            <div className = "a1">
                                                <p className = "humidity1"><WiHumidity style = {{color:'rgb(106,222,248)'}} /> Độ ẩm</p>
                                                <p className="value">{item?.humidity} %</p>
                                                <p className = "uv1"><GiOrbitalRays style = {{color:'rgb(106,222,248)'}} /> U/V</p>
                                                <p className="value">{item?.uvi}</p>
                                                <p className = "sunrise"><BsFillSunriseFill style = {{color:'rgb(106,222,248)'}}/> Bình minh</p>
                                                <p className="value">{getSunrise(Number(item?.sunrise))}:00</p>
                                            </div>
                                            <div className = "a2">
                                                <p className="wind-speed1"><BiWind style = {{color:'rgb(106,222,248)'}} /> Gió</p>
                                                <p className="value">{item?.wind_speed} km/h</p>
                                                <p className="pressure1"><CgCompressV style = {{color:'rgb(106,222,248)'}} /> Áp suất</p>
                                                <p className="value">{item?.pressure} mb</p>
                                                <p className = "sunset"><BsFillSunsetFill style = {{color:'rgb(106,222,248)'}}/> Hoàng hôn</p>
                                                <p className="value">{getSunset(Number(item?.sunset))}:00</p>
                                            </div>
                                        </div>
                                        <div className = "accodion-content-body2">
                                            <div className = "a1">
                                                <p className = "humidity1"><WiHumidity style = {{color:'rgb(106,222,248)'}} /> Độ ẩm</p>
                                                <p className="value">{item?.humidity} %</p>
                                                <p className = "uv1"><GiOrbitalRays style = {{color:'rgb(106,222,248)'}} /> U/V</p>
                                                <p className="value">0</p>
                                                <p className = "moonrise"><BsFillCloudMoonFill style = {{color:'rgb(106,222,248)'}}/> Trăng mọc</p>
                                                <p className="value">{getMoonrise(Number(item?.moonrise))}:00</p>
                                            </div>
                                            <div className = "a2">
                                                <p className="wind-speed1"><BsCloudFog2 style = {{color:'rgb(106,222,248)'}} /> Có mây</p>
                                                <p className="value">{item?.cloud}%</p>
                                                <p className="pressure1"><CgCompressV style = {{color:'rgb(106,222,248)'}} /> Áp suất</p>
                                                <p className="value">{item?.pressure} mb</p>
                                                <p className = "moonset"><BsFillMoonFill style = {{color:'rgb(106,222,248)'}}/> Trăng lặn</p>
                                                <p className="value">{getMoonset(Number(item?.moonset))}:00</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                })}
                <style jsx>{`
                    .value{
                        margin-left:20px;
                    }
                    .a1,.a2{
                        display: inline-block;
                    }
                    .a1{
                        margin-left:20px;
                    }
                    .accodion-content-body1,.accodion-content-body2{
                        display: inline-block;
                        height:250px;
                        width:260px;
                        border:none;
                        border-radius:10px;
                        margin-top:20px;
                    }
                    .accodion-content-body2{
                        float: right;
                        position: relative;
                        right:100px;
                    }
                    .accodion-content-body1{
                        margin-left:100px;
                    }
                    .a2{
                        float: right;
                        position: relative;
                        right:20px;
                    }
                    .accordion-content{
                        height:400px;
                        width:800px;
                        border:none;
                        border-radius:5px;
                        margin-left:10px;
                        overflow:hidden;
                        max-height:0;
                        transition: all 0.6s cubic-bezier(0,1,0,1);
                    }
                    .accordion-content.show{
                       max-height:9999px;
                       transition: all 0.6s cubic-bezier(1,0,1,0);
                    }
                    .accordion-contents{
                        height:100px;
                        width:400px;
                        border-radius:5px;
                        margin-left:180px;
                        margin-top:20px;
                        overflow:hidden;
                    }
                    .accodion-content-head{
                        margin-left:20px
                    }
                    .accodion-content-head1,.accodion-content-head2{
                        display:inline-block;
                    }
                    .accodion-content-head2{
                        float:right;
                    }
                    .container{
                        width:890px;
                        height:100%;
                        border-radius:10px;
                        background-color:white;
                        margin-top:50px;
                        margin-left:350px;
                        cursor:pointer;
                    }
                    .title{
                        text-align:center;
                        position: relative;
                        top:5px;
                    }
                    .accordion-title{
                        cursor:pointer;
                        position:relative;
                        bottom:20px;
                    }
                    .accordion-titles{
                        cursor:pointer;
                        
                    }
                    .accordion{
                        width:840px;
                        margin-left:12px;
                        margin-top:5px;
                        border-top:1px solid grey;
                    }
                    .times,.temps,.statuss,.icons,.wind-speeds,.plus{
                        display:inline;
                        position:relative;
                        bottom:30px;
                    }
                    .time,.temp,.status,.icon,.wind-speed,.plus{
                        display:inline;
                        position:relative;
                        bottom:30px;
                    }
                    .temps{
                        margin-left:90px;
                    }
                    .icons{
                        margin-left:110px;
                        height:80px;
                        width:80px;
                        position: relative;
                        top:10px;
                    }
                    .statuss{
                        margin-left:40px;
                    }
                    .wind-speeds{
                        margin-left:240px;
                    }
                    .temp{
                        margin-left:80px;
                    }
                    .icon{
                        margin-left:110px;
                        height:80px;
                        width:80px;
                        position: relative;
                        top:10px;
                    }
                    .status{
                        margin-left:40px;
                    }
                    .wind-speed{
                        margin-left:240px;
                    }
                    @media only screen and (max-width:46.1875em){
                        .container{
                            position:relative;
                            right:100px;
                        }
                    }
            `}</style>
            </div>
        </>
    );
}
export default DailyTime;