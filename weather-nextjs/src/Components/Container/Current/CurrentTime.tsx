import React from "react";
import Link from 'next/Link';
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

const CurrentTime = () => {
    return(
        <>
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
        </>
    )
}
export default CurrentTime;