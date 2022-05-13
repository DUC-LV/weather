import React from "react";
import { RiTempHotFill } from 'react-icons/ri';
import { WiHumidity } from 'react-icons/wi'
import { CgCompressV } from 'react-icons/cg'
import { MdVisibility } from 'react-icons/md'
import { BsFillSunriseFill,BsFillSunsetFill } from 'react-icons/bs'
import { BiWind } from 'react-icons/bi'
import { GiOrbitalRays } from 'react-icons/Gi'
import { getConvertTemp, getFullTimeFromDatetime, getSunrise, getSunset } from "../../../Service/utils";
import ItemCurrent from '../Current/ItemCurrent';
export interface Currentdata {
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
interface CurrentWeatherData {
    dataCurrent?:Currentdata[]
}

const Current = (props:CurrentWeatherData) => {
    const { dataCurrent } = props;
    return(
        <>
            <div className = "container">
                <div className = "container_name">
                    <p className="city-name">Thời Tiết Ngày {getFullTimeFromDatetime(Number(dataCurrent?.[0]?.time))} Tại {dataCurrent?.[0]?.name} </p>
                </div>
                <div className="container-state">
                    <h3 className="temp">{getConvertTemp(Number(dataCurrent?.[0]?.temp))}</h3>
                    <h3 className="status">Trạng Thái: {dataCurrent?.[0]?.status}</h3>
                    <h3 className="temp-day">Ngày: {getConvertTemp(Number(dataCurrent?.[0]?.temp_day))}</h3>
                    <h3 className="temp-night">Đêm: {getConvertTemp(Number(dataCurrent?.[0]?.temp_night))}</h3>
                </div>
                <div className="icon">
                    <img src = {`http://openweathermap.org/img/wn/${dataCurrent?.[0].iconUrl}@2x.png`}></img>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <div className="container-body">
                    <h3 className="city-names">Thời Tiết Ngày {getFullTimeFromDatetime(Number(dataCurrent?.[0]?.time))} Tại {dataCurrent?.[0]?.name}</h3>
                    <h3 className="temp">{getConvertTemp(Number(dataCurrent?.[0]?.temp))}</h3>
                    <h3 className="feel">Cảm giác như: {dataCurrent?.[0]?.status}</h3>
                    <div className="container-body-left">
                        <div className="box-left">
                            <ItemCurrent
                                title = "Cao/Thấp"
                                icon = {<RiTempHotFill />}
                                val = {getConvertTemp(Number(dataCurrent?.[0]?.temp_day))} 
                            />
                        </div>
                        <div className="box-left">
                            <ItemCurrent
                                title = "Độ ẩm"
                                icon = {<WiHumidity />}
                                val = {`${dataCurrent?.[0]?.humidity} %`}
                            />
                        </div>
                        <div className="box-left">
                            <ItemCurrent
                                title = " Áp suất"
                                icon = {<CgCompressV />}
                                val = {`${dataCurrent?.[0]?.pressure} mb`} 
                            />
                        </div>
                        <div className="box-left">
                            <ItemCurrent
                                title = "Sunrise"
                                icon = {<BsFillSunriseFill />}
                                val = {getSunrise(Number(dataCurrent?.[0]?.sunrise))} 
                            />
                        </div>
                    </div>
                    <div className="container-body-right">
                        <div className="box-right">
                            <ItemCurrent
                                title = "Gió"
                                icon = {<BiWind />}
                                val = {`${dataCurrent?.[0]?.wind_speed} km/h`} 
                            />
                        </div>
                        <div className="box-right">
                            <ItemCurrent
                                title = "Tầm nhìn"
                                icon = {<MdVisibility />}
                                val = {`${Number(dataCurrent?.[0]?.visibility)/1000} km/h`} 
                            />
                        </div>
                        <div className="box-right">
                            <ItemCurrent
                                title = "U/V"
                                icon = {<GiOrbitalRays />}
                                val = {`3/10`} 
                            />
                        </div>
                        <div className="box-right">
                            <ItemCurrent
                                title = "Sunset"
                                icon = {<BsFillSunsetFill />}
                                val = {getSunrise(Number(dataCurrent?.[0]?.sunset))} 
                            />
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
                        margin-top:30px;
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
                    @media only screen and (max-width:46.1875em){
                        .container_name,.container-state,.container-body{
                            position:relative;
                            right:80px;
                        }
                    }
                `}</style>
            </div>
        </>
    );
}
export default Current;