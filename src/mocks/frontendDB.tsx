export function saveToDB(list:any){
    localStorage.setItem('todos',JSON.stringify(list))
}

export function getFromDB(){
    return  JSON.parse(localStorage.todos);
}

export function updateDB(newList:any){
    localStorage.setItem('todos',JSON.stringify(newList))
}