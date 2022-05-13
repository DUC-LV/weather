export const getFullTimeFromDatetime = (dt: number) => {
    const datetime = new Date(dt * 1000);
    return `${datetime.getDate()}/${datetime.getMonth() + 1}/${datetime.getFullYear()}`
}
export const getHourFromDatetime = ( dt : number) => {
    return `${new Date(dt * 1000).getHours()}h`;
}
export const getMonthFromDatetime = ( dt : number) => {
    return `${new Date(dt * 1000).getMonth()+1}`;
}
export const getYearFromDatetime = ( dt : number) => {
    return `${new Date(dt * 1000).getFullYear()}`;
}
export const getSunrise = (dt : number) => {
    return `${new Date(dt * 1000).getHours()}h${new Date(dt * 1000).getMinutes()}`
}
export const getSunset = (dt : number) => {
    return `${new Date(dt * 1000).getHours()}h${new Date(dt * 1000).getMinutes()}`
}
export const getMoonrise = (dt : number) => {
    return `${new Date(dt * 1000).getHours()}h${new Date(dt * 1000).getMinutes()}`
}
export const getMoonset = (dt : number) => {
    return `${new Date(dt * 1000).getHours()}h${new Date(dt * 1000).getMinutes()}`
}
export const getConvertTemp = (dt : number) => {
    return `${(dt-273).toFixed(0)} °C`;
}