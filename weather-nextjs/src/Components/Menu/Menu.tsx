import React from "react";
import Link from "next/link";
interface myCoordinates{
    lat:any,
    lon:any,
    city:string,
}

const Menu = (props:myCoordinates) => {
    return (
        <div className = "menu-top">
                <div className="list-menu">
                    <ul>
                        <li>
                            <Link href = {{
                                pathname :"/"
                                }}>
                                Hôm nay
                            </Link>
                            </li>
                            <li>
                                <Link href = {{
                                pathname : "/HourlyWeather",
                                query : {lat:props.lat,lon:props.lon,city:props.city}
                                }}>
                                    Hàng Giờ
                                </Link>
                            </li>
                            <li>
                                <Link href = {{
                                pathname : "/DailyWeather",
                                query : {lat:props.lat,lon:props.lon}
                                }}>
                                    7 Ngày
                                </Link>
                            </li>
                        </ul>
                    </div>
            <style jsx>{`
                .menu-top ul{
                    margin: 0px;
                    padding: 0px;
                }
                .list-menu{
                    width: 100%;
                    font-size: 18px;
                    height: 30px;
                    background-color:#2E3192;
                    display:flex;
                    justify-content:start;
                }
                ul li {
                    float: left;
                    margin-left: 300px;
                    color: white;
                    list-style: none;
                    text-decoration: ;
                }
                li:hover{
                    border-bottom:2px solid white;
                }
            `}</style>
      </div>
    );
}
export default Menu;
