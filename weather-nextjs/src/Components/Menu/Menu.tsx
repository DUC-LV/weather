import React ,{useState} from "react";
import Link from "next/link";
interface myCoordinates{
    city:string,
}

const Menu = (props:myCoordinates) => {
    const [isActive, setIsActive] = useState(0);
    return (
        <div className = "menu-top">
            <div className="list-menu">
                <ul>
                    <li className = {isActive === 0 ? 'items':''} onClick = {() => setIsActive(0)} >
                        <Link href = {{
                            pathname :"/"
                            }}>
                            Hôm nay
                        </Link>
                    </li>
                    <li className = {isActive === 1 ? 'items':''} onClick = {() => setIsActive(1)} >
                        <Link href = {{
                        pathname : "/HourlyWeather",
                        }}>
                            Hàng Giờ
                        </Link>
                    </li>
                    <li className = {isActive === 2 ? 'items':''} onClick = {() => setIsActive(2)} >
                        <Link href = {{
                        pathname : "/DailyWeather",
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
            {/* .list-menu{
                width: 100%;
                font-size: 18px;
                height: 30px;
                background-color:#2E3192;
                display:flex;
                justify-content:start;
            } */}
            .list-menu{
                background-image: linear-gradient(.25turn,#0C3A4D,#2B5862 60%);
                height: 30px;
                font-size: 18px;
                
            }
            li{
                float: left;
                margin-left: 320px;
                color: white;
                list-style: none;
                margin-top:3px;
            }
            .items{
                float: left;
                margin-left: 320px;
                color: white;
                list-style: none;
                margin-top:3px;
                border-bottom:3px solid white;
            }
            li:hover { background-color: LightSteelBlue;border-radius:5px; }
            li:active { background-color: SteelBlue; color: White;}
            @media all and (min-width: 800px) and (max-width: 1024px){
                .list-menu{
                    width:1100px;
                }
                ul li{
                    position:relative;
                    right:80px;
                }
            }
            @media only screen and (max-width:46.1875em){
                .list-menu{
                    width:1100px;
                }
                ul li{
                    position:relative;
                    right:80px;
                }
            }
        `}</style>
    </div>
    );
}
export default Menu;


