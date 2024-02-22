 async function fetchHttp (url){
    const response = await fetch(`http://localhost:3000/${url}`)
    const restDate = await response.json()
    if (! response.ok){
        throw new  Error('Failed to fetch places');
    }
    return restDate
}
export function fetchMeals (){
    const data = fetchHttp("meals")
    return data ; 
}