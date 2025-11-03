export const formateDate=(date:string)=>{
    const formattedDate = new Date(date).toLocaleDateString("en-us",{
        year:"numeric",
        month:"short",
        day:"2-digit"
    })

    return formattedDate;
}