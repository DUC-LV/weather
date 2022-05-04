import React from "react";
import Link from 'next/Link';
import {useState} from 'react'
interface dataHourlys {
    time: string;
    tempMax?: string;
    tempMin?: string;
    temp?: string;
    iconUrl?: string;
    status?: string;
}
interface CurrentTimeData {
    title: string;
    dataTime?: dataHourlys[],
        
    
    seeMore?: {
        title: string;
        link: string;
    }
}

const CurrentTime = (props:CurrentTimeData) => {
    const { title, dataTime, seeMore } = props;
    return(
        <>
            <div className = "current_hourly">
                <h3 className = "title_hourly">{title}</h3>
                <>
                    {dataTime?.map((item:any) => {
                        // const hours = new Date(Number(item.dt)*1000).getHours();
                        return(
                            <div className = "box2">
                                <h3 className = "box1-title">{item.time}</h3>
                                <h3 className = "box1-temp">{(item.temp-273).toFixed(1)}°C</h3>
                                <h3 className = "box1-temp">{(item.tempMax-273).toFixed(1)}°C</h3>
                                <img src = {item.iconUrl} className ="box1-icon" />
                                <h4 className = "box1-title">{item.status}</h4>
                            </div>
                        )
                    })}
                </>
                {!!seeMore && (
                    <button className ="button">
                        <Link href ={seeMore.link}>{seeMore.title}</Link>
                     </button>
                )}
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
                    @media only screen and (max-width:46.1875em){
                        .current_hourly{
                            position:relative;
                            right:80px;
                        }
                    }
                    
                `}</style>
            </div>
        </>
    );
}
export default CurrentTime;