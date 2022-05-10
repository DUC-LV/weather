import { useRouter } from "next/router";
import React, { useCallback } from "react";
import {useState} from "react";

const Header = () => {
    const router = useRouter();
    const [currentCity, setCurrentCity] = useState('');
    const handleClick = useCallback(() => {
        if (!currentCity) return;
        router.push(`${router.pathname}?city=${currentCity}`, `${router.pathname}?city=${currentCity}`, { shallow: true });
    }, [currentCity]);
    return (
        <div className = "container">
            <div className = "head">
                <a href = "/CurrentWeather">
                    <img src="https://img.lovepik.com/free_png/33/55/31/15858PICReMrIXaQfmKrA_PIC2018.png_860.png" alt="ảnh dự báo thời tiết" className="img-head" />
                </a>
                <a href ="/CurrentWeather">
                    <h3 className = "title-head">Weather App</h3>
                </a>
            </div>
            <div className = "body">
                <input
                    type = "text"
                    className = "input-body" 
                    placeholder="Tìm kiếm thành phố"
                    value = {currentCity}
                    onChange = {(e:any) => setCurrentCity(e.target.value)}
                ></input>
                <button
                    className = "button-body"
                    onClick={handleClick}
                >Search</button>
            </div>
            <select className = "select">
                <option>Tiếng Việt</option>
                <option>Tiếng Anh</option>
            </select>
            <style jsx>{`
                .container{
                    height: 80px;
                    width:100%;
                    background-color:#005986;
                }
                .head,.body,.select {
                    display:inline-block;
                }
                .img-head,.title-head {
                    display:inline-block;
                }
                .img-head{
                    width:60px;
                    height:60px;
                    margin-top:10px;
                    margin-left:10px;
                    cursor:pointer;
                }
                .title-head{
                    color:white;
                    position:relative;
                    left:15px;
                    bottom:20px;
                    cursor:pointer;
                }
                .input-body{
                    margin-left:350px;
                    width:400px;
                    border:none;
                    text-align:center;
                    outline:none;
                }
                input[type="text"]{
                    font-size:15px;
                }
                .input-body,.button-body{
                    height:40px;
                    border-radius:20px;
                    position:relative;
                    bottom:25px;
                }
                ::placeholder {
                    text-align:center;
                }
                .button-body{
                    margin-left:30px;
                    cursor:pointer;
                    border:none;
                }
                button:hover { background-color: LightSteelBlue; }
                button:active { background-color: SteelBlue; color: White; }
                .select{
                    float:right;
                    height:35px;
                    border-radius:10px;
                    position:relative;
                    top:22px;
                    right:50px;
                    cursor:pointer;
                }
                @media all and (min-width: 800px) and (max-width: 1024px){
                    .container{
                        width:1100px;
                    }
                    .input-body,.button-body{
                        position:relative;
                        right:80px;
                    }
                }
                @media only screen and (max-width:46.1875em){
                    .container{
                        width:1100px;
                    }
                    .input-body,.button-body{
                        position:relative;
                        right:80px;
                    }
                }
            `}</style>
        </div>
    );
}
export default Header;