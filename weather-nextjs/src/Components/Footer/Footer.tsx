import React from "react";
import { BsFacebook } from 'react-icons/bs';
import {AiFillTwitterCircle,AiFillInstagram,AiFillYoutube} from 'react-icons/ai';





const Footer = () => {
    return (
        <div className = "footer">
            <div className = "footer_title_left">
                <h3 className = "footer_title_left_title">Kết nối với chúng tôi</h3>
                <a href = "https://www.facebook.com/TheWeatherChannel" className = "iconFb">
                    <BsFacebook />
                </a>
                <a href = "https://twitter.com/weatherchannel" className = "iconTw">
                    <AiFillTwitterCircle />
                </a>
                <a href = "https://www.instagram.com/weatherchannel/" className = "iconIg">
                    <AiFillInstagram />
                </a>
                <a href = "https://www.youtube.com/user/TheWeatherChannel" className = "iconYb">
                    <AiFillYoutube />
                </a>
            </div>
            <div className = "footer_title_right">
                <img src="https://st.quantrimang.com/photos/image/2019/05/23/tai-widget-thoi-tiet-cho-blog-trang-web-1.jpg" alt="" className="img__" />
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className = "footer_footer1">
                <h4 className="title1">Phản hồi</h4>
                <h4 className="title2">API thời tiết</h4>
                <h4 className="title3">Phòng họp báo</h4>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div className = "footer_footer2">
                <h4 className="title4">Điều Khoản Sử Dụng |</h4>
                <h4 className="title5">Chính Sách Về Quyền Riêng Tư |</h4>
                <h4 className="title6">Tuyên Bố Về Khả Năng Truy Cập |</h4>
                <h4 className="title7">Nhà Cung Cấp Dữ Liệu</h4>
            </div>
            <style jsx>{`
                .footer_footer1{
                    text-align: center;
                }
                .title1,.title2,.title3{
                    display:inline;
                    padding-left:10px;
                }
                .title4,.title5,.title6,.title7{
                    display:inline;
                    padding-left:10px;
                }
                .footer_footer2{
                    text-align: center;
                }
                .footer{
                    height:500px;
                    width:100%;
                    background-color:white;
                    margin-top:10px;
                }
                .footer_title_left_title{
                    font-size:20px;
                }
                .footer_title_left,.footer_title_right{
                    display:inline-block;
                }
                .footer_title_left{
                    margin-left:200px;
                    margin-top:50px;
                }
                .footer_title_right{
                    float:right;
                    margin-right:220px;
                    margin-top:70px;
                }
                .iconFb,.iconTw,.iconIg,.iconYb{
                    border:1px solid black;
                    border-radius:45%;
                    background-color:#CFDAF9;
                    padding:5px;
                    margin-left:13px;
                }
                .iconFb:hover,.iconTw:hover,.iconIg:hover,.iconYb:hover{
                    background-color:blue;
                }
                .img__{
                    height:80px;
                    width:280px;
                }
                @media only screen and (max-width:46.1875em){
                    .footer{
                        width:1100px;
                    }
                }
            `}</style>
        </div>
    );
}
export default Footer;