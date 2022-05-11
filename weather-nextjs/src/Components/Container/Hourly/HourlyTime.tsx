import React, {useState} from "react";
import { BiWind } from 'react-icons/bi'
import { FaTemperatureHigh } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi'
import { GiOrbitalRays } from 'react-icons/gi'
import { BsCloudFog2 } from 'react-icons/bs'
import { CgCompressV } from 'react-icons/cg'
import { getConvertTemp, getFullTimeFromDatetime, getHourFromDatetime } from "../../../Service/utils";
import ItemContentHourly from "./ItemContentHourly";
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
    const [show, setShow] = useState(null)
    const Toggle = (index:any) => {
        if(show === index){
            return setShow(null);
        }
        setShow(index)
    }
    return(
        <>
            <div className = "container">
                <h3 className="container-title">{title}</h3>
                <div className="container-time">
                    <h4 className="times">{getFullTimeFromDatetime(Number(dataHourly?.[0]?.time))}</h4>
                </div>
                <div className="accordion">
                    <div className="accordinon-titles" onClick = {() => setModal(!modal)}>
                        <p className="time">{getHourFromDatetime(Number(dataHourly?.[0]?.time))}:00</p>
                        <h4 className="temp">{getConvertTemp(Number(dataHourly?.[0]?.temp))}</h4>
                        <img className = "icon"  src = {`http://openweathermap.org/img/wn/${dataHourly?.[0]?.iconUrl}@2x.png`}  />
                        <p className="status">{dataHourly?.[0]?.status}</p>
                        <p className="wind-speed"><BiWind style = {{color:'rgb(106,222,248)'}} />{dataHourly?.[0]?.wind_speed}km/h</p>
                    </div>
                    {modal && <div className="accordion-contents">
                        <div className="content-top">
                            <div className="content-temp">
                                <ItemContentHourly
                                    title = "Nhiệt độ"
                                    icon = {<FaTemperatureHigh />}
                                    val = {getConvertTemp(Number(dataHourly?.[0]?.temp))}
                                />
                            </div>
                            <div className="content-wind">
                                <ItemContentHourly
                                    title = "Tốc độ gió"
                                    icon = {<BiWind />}
                                    val = {`${dataHourly?.[0]?.wind_speed} km/h`}
                                />
                            </div>
                            <div className="content-humidity">
                                <ItemContentHourly
                                    title = "Độ ẩm"
                                    icon = {<WiHumidity  />}
                                    val = {`${dataHourly?.[0]?.humidity}%`}
                                />
                            </div>
                        </div>
                        <div className="content-bottom">
                            <div className="content-UV">
                                <ItemContentHourly 
                                    title = "U/V"
                                    icon = {<GiOrbitalRays  />}
                                    val = {dataHourly?.[0]?.uvi}
                                />
                            </div>
                            <div className="content-cloud">
                                <ItemContentHourly 
                                    title = "Mây"
                                    icon = {<BsCloudFog2  />}
                                    val = {`${dataHourly?.[0]?.cloud}%`}
                                />
                            </div>
                            <div className="content-rain">
                                <ItemContentHourly 
                                    title = "Áp suất"
                                    icon = {<CgCompressV  />}
                                    val = {`${dataHourly?.[0]?.pressure}mb`}
                                />
                            </div>
                        </div>
                    </div>}
                    {dataHourly?.map((item:any,index) => {
                        return (
                            <div className="accordion">
                                <div className="accordinon-title" onClick={() => Toggle(index)}>
                                    <p className="time">{getHourFromDatetime(Number(item?.time))}:00</p>
                                    <h4 className="temp">{getConvertTemp(Number(item?.temp))}</h4>
                                    <img src = {`http://openweathermap.org/img/wn/${item?.iconUrl}@2x.png`} className = "icon" />
                                    <p className="status">{item?.status}</p>
                                    <p className="wind-speed"><BiWind style = {{color:'rgb(106,222,248)'}} />{item?.wind_speed}km/h</p>
                                </div>
                                <div className={show === index ? 'accordion-content show':'accordion-content'}>
                                    <div className="content-top">
                                        <div className="content-temp">
                                            <ItemContentHourly
                                                title = "Nhiệt độ"
                                                icon = {<FaTemperatureHigh />}
                                                val = {getConvertTemp(Number(item?.temp))}
                                            />
                                        </div>
                                        <div className="content-wind">
                                            <ItemContentHourly
                                                title = "Tốc độ gió"
                                                icon = {<BiWind />}
                                                val = {`${item?.wind_speed} km/h`}
                                            />
                                        </div>
                                        <div className="content-humidity">
                                            <ItemContentHourly
                                                title = "Độ ẩm"
                                                icon = {<WiHumidity  />}
                                                val = {`${item?.humidity}%`}
                                            />
                                        </div>
                                    </div>
                                    <div className="content-bottom">
                                        <div className="content-UV">
                                            <ItemContentHourly 
                                                title = "U/V"
                                                icon = {<GiOrbitalRays  />}
                                                val = {item?.uvi}
                                            />
                                        </div>
                                        <div className="content-cloud">
                                            <ItemContentHourly 
                                                title = "Mây"
                                                icon = {<BsCloudFog2  />}
                                                val = {`${item?.cloud}%`}
                                            />
                                        </div>
                                        <div className="content-rain">
                                            <ItemContentHourly 
                                                title = "Áp suất"
                                                icon = {<CgCompressV  />}
                                                val = {`${item?.pressure}mb`}
                                            />
                                        </div>
                                    </div>
                                </div>
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
                        margin-top:50px;
                    }
                    .container-title,.container-time{
                        margin-left:30px;
                        position:relative;
                        top:20px;
                    }
                    .accordinon-titles{
                        height:80px;
                        width:780px;
                        border-top:2px solid #DEDEDE;
                        margin-left:20px;
                        margin-top:5px;
                        cursor:pointer;
                    }
                    .accordinon-title{
                        height:40px;
                        width:780px;
                        border-top:2px solid #DEDEDE;
                        margin-left:20px;
                        margin-top:5px;
                        cursor:pointer;
                    }
                    .accordion-contents{
                        width:600px;
                        height:230px;
                        border:none;
                        margin-left:110px;
                        border-radius:15px;
                        margin-top:55px;
                        overflow:hidden;
                    }
                    .time,.temp,.icon,.status,.wind-speed{
                        display:inline;
                        margin-left:30px;
                    }
                    .time,.temp,.status{
                        position:relative;
                        bottom:50px;
                    }
                    .temp{
                        margin-left:60px;
                    }
                    .wind-speed{
                        float:right;
                        position:relative;
                        top:20px;
                    }
                    .icon{
                        margin-left:150px;
                    }
                    .accordion-content{
                        width:600px;
                        height:230px;
                        border:none;
                        margin-left:110px;
                        border-radius:15px;
                        margin-top:55px;
                        overflow:hidden;
                        max-height:0;
                        transition: all 0.6s cubic-bezier(0,1,0,1);
                    }
                    .accordion-content.show{
                       max-height:9999px;
                       transition: all 0.6s cubic-bezier(1,0,1,0);
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
                    @media only screen and (max-width:46.1875em){
                        .container{
                            position:relative;
                            right:80px;
                        }
                    }
                `}</style>
            </div>
        </>
    );
}
export default HourlyTime;