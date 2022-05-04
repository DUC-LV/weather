import React from "react";
import { FaTemperatureHigh } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi'
import { CgCompressV } from 'react-icons/cg'
import { MdVisibility } from 'react-icons/md'
import { BsFillSunriseFill,BsFillSunsetFill } from 'react-icons/bs'
import { BiWind } from 'react-icons/bi'
import { GiOrbitalRays } from 'react-icons/Gi'
interface CurrentWeatherData {
    dataCurrent?:[
        {
            time?:string,
            name?:string,
            temp?:string;
            status?:string;
            temp_day?:string;
            temp_night?:string;
            iconUrl?: string;
            humidity?:string; // độ ẩm
            pressure?:string; // áp suất
            wind_speed?:string; // tốc độ gió
            visibility?:string; // tầm nhìn
            sunrise?:string; 
            sunset?:string;
        }
    ]
}

const Current = (props:CurrentWeatherData) => {
    // const day = (new Date(Number(data?.dt)*1000)).getDay();
    // const month = (new Date(Number(data?.dt)*1000)).getMonth() + 1;
    // const year = (new Date(Number(data?.dt)*1000)).getFullYear();
    // const hourlySunrise = (new Date(Number(data?.sys?.sunrise)*1000)).getHours();
    // const secondSunrise = (new Date(Number(data?.sys?.sunrise)*1000)).getMinutes();
    // const hourlySunset = (new Date(Number(data?.sys?.sunset)*1000)).getHours();
    // const secondSunset = (new Date(Number(data?.sys?.sunset)*1000)).getMinutes();
    // let icon = <img src = {`http://openweathermap.org/img/wn/${data?.weather?.[0].icon}@2x.png`}></img>
    const { dataCurrent } = props;
    return(
        <>
            <div className = "container">
                <div className = "container_name">
                    <p className="city-name">Thời Tiết Ngày {}/{}/{} Tại {dataCurrent?.[0]?.name} </p>
                </div>
                <div className="container-state">
                    <h3 className="temp">{(Number(dataCurrent?.[0]?.temp)-273).toFixed(1)} °C</h3>
                    <h3 className="status">Trạng Thái: {dataCurrent?.[0]?.status}</h3>
                    <h3 className="temp-day">Ngày: {(Number(dataCurrent?.[0]?.temp_day)-273).toFixed(1)} °C</h3>
                    <h3 className="temp-night">Đêm: {(Number(dataCurrent?.[0]?.temp_night)-273).toFixed(1)} °C</h3>
                </div>
                <div className="icon">
                    <p>{dataCurrent?.[0]?.iconUrl}</p>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <div className="container-body">
                    <h3 className="city-names">Thời Tiết Ngày {}/{}/{} Tại {dataCurrent?.[0]?.name}</h3>
                    <h3 className="temp">{(Number(dataCurrent?.[0]?.temp)-273).toFixed(1)} °C</h3>
                    <h3 className="feel">Cảm giác như: {dataCurrent?.[0]?.status}</h3>
                    <div className="container-body-left">
                        <div className="box-left">
                            <p className="icons"><FaTemperatureHigh style = {{color:'rgb(106,222,248)'}} /> Cao/Thấp</p>
                            <p className="value">{(Number(dataCurrent?.[0]?.temp_day)-273).toFixed(1)}°/{(Number(dataCurrent?.[0]?.temp_night)-273).toFixed(1)}°</p>
                        </div>
                        <div className="box-left">
                            <p className="icons"><WiHumidity style = {{color:'rgb(106,222,248)'}} /> Độ ẩm</p>
                            <p className="value">{dataCurrent?.[0]?.humidity} %</p>
                        </div>
                        <div className="box-left">
                            <p className="icons"><CgCompressV  style = {{color:'rgb(106,222,248)'}}/> Áp suất</p>
                            <p className="value">{dataCurrent?.[0]?.pressure} mb</p>
                        </div>
                        <div className="box-left">
                            <p className="icons"><BsFillSunriseFill style = {{color:'rgb(106,222,248)'}}/> Sunrise</p>
                            <p className="value">{dataCurrent?.[0]?.sunrise}:{dataCurrent?.[0]?.sunrise}</p>
                        </div>
                    </div>
                    <div className="container-body-right">
                        <div className="box-right">
                            <p className="icons"><BiWind style = {{color:'rgb(106,222,248)'}} /> Gió</p>
                            <p className="value">{dataCurrent?.[0]?.wind_speed} km/h</p>
                        </div>
                        <div className="box-right">
                            <p className="icons"><MdVisibility style = {{color:'rgb(106,222,248)'}} /> Tầm nhìn</p>
                            <p className="value">{Number(dataCurrent?.[0]?.visibility)/1000} km</p>
                        </div>
                        <div className="box-right">
                            <p className="icons"><GiOrbitalRays style = {{color:'rgb(106,222,248)'}} /> U/V</p>
                            <p className="value">3/10</p>
                        </div>
                        <div className="box-right">
                            <p className="icons"><BsFillSunsetFill style = {{color:'rgb(106,222,248)'}} /> Sunset</p>
                            <p className="value">{dataCurrent?.[0]?.sunset}:{dataCurrent?.[0]?.sunset}</p>
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
        </>
    );
}
export default Current;