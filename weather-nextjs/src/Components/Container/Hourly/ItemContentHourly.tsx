import React from "react";
export interface DataItemContentHourly {
    title?: string;
    icon?:any;
    val?:any;
}
const ItemContentHourly = (props:DataItemContentHourly) => {
    const { title, icon, val} = props;
    
    return(
        <div>
            <p className = "icon">{icon}</p>
            <p className = "title">{title}</p>
            <p className = "value">{val}</p>
            <style jsx>{`
                .value{
                    text-align:center;
                }
                .icon,.title{
                    display:inline;
                }
                .icon{
                    color:rgb(106,222,248);
                }
                .icon,.title,.value {
                    position:relative;
                    top:20px;
                }
                
            `}</style>
        </div>
    );
}
export default ItemContentHourly;