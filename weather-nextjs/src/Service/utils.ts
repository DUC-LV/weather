export const getHourFromDatetime = (dt: number) => {
    return new Date(dt * 1000).getHours();
}
export const getDayFromDatetime = (dt:number) => {
    const time = new Date(dt * 1000);
    const day = time.getDate();
    const month = time.getMonth() + 1;
}
