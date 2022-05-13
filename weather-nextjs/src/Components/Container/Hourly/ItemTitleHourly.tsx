import React from "react";
import { BiWind } from 'react-icons/bi'
import {getHourFromDatetime, getConvertTemp } from '../../../Service/utils';

export interface DataItemTitleHourly {
    time?:number,
    temp?:number,
    iconUrl?:string,
    status?:string,
    val?:number,
}

const ItemTileHourly = (props:DataItemTitleHourly) => {
    const {time, temp, iconUrl, status, val} = props;
    return(
        <div>
            <p className="time">{getHourFromDatetime(Number(time))}</p>
            <h4 className="temp">{getConvertTemp(Number(temp))} </h4>
            <img  src = {`http://openweathermap.org/img/wn/${iconUrl}@2x.png`} className = "icon" />
            <p className="status">{status}</p>
            <p className="wind-speed"><BiWind style = {{color:'rgb(106,222,248)'}} />{val}km/h</p>
            <style jsx>{`
                .time,.temp,.icon,.status,.wind-speed{
                    display:inline;
                    margin-left:30px;
                }
                .time,.temp,.status{
                    position:relative;
                    bottom:50px;
                }
                .temp{
                    margin-left:50px;
                }
                .wind-speed{
                    float:right;
                    position:relative;
                    top:20px;
                }
                .icon{
                    margin-left:130px;
                }
            `}</style>
        </div>
    );
}
export default ItemTileHourly;