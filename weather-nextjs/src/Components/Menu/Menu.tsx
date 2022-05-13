import React  from "react";
import Link from "next/link";
import { useRouter } from "next/router";


const Menu = () => {
    const router = useRouter();
    return (
        <div className = "menu-top">
            <div className="list-menu">
                <ul>
                    <li className = {(router.pathname == '/CurrentWeather' || router.pathname == "/" )? 'items':''}  >
                        <Link href = {{
                            pathname :"/"
                            }}>
                            Hôm nay
                        </Link>
                    </li>
                    <li className = {router.pathname == '/HourlyWeather' ? 'items':''} >
                        <Link href = {{
                        pathname : "/HourlyWeather",
                        }}>
                            Hàng Giờ
                        </Link>
                    </li>
                    <li  className = {router.pathname == '/DailyWeather' ? 'items':''} >
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


