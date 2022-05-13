import React from "react";

export interface DataItemCurrent {
    title?: string;
    icon?:any;
    val?:string | number;
}
const ItemCurrent = (props:DataItemCurrent) => {
    const { title, icon, val } = props;
    return (
        <div>
            <p className = "icon">{icon}</p>
            <p className = "title">{title}</p>
            <p className = "value">{val}</p>
            <style jsx>{`
                .value{
                    text-align:center;
                    position:relative;
                    bottom:15px;
                    left:100px;
                }
                .icon,.title{
                    display:inline;
                }
                .icon {
                    position:relative;
                    top:23px;
                    left:5px;
                    color:rgb(106,222,248);
                }
                .title {
                    position:relative;
                    top:20px;
                    left:20px;
                }
            `}</style>
        </div>
    );
}
export default ItemCurrent;