export function getDateMap(dateA,dateB){

    return new Promise((resolve,reject)=>{
        let date_map = [];
        let counter = 5;
        //while first date string is not the same as second date string
        try{
            date_map.push(dateA.toDateString());
            while(dateA.toDateString()!=dateB.toDateString()){
               // console.log(dateA.toDateString(),dateB.toDateString())
               
                let day = dateA.getDate();
              
                day++;
                
                dateA.setDate(day);
                date_map.push(dateA.toDateString());
            }

            resolve(date_map);
    
       }catch(err){
        console.log(err);
        reject(false)
       }
    })
}

export function mapDatesToDays(datemap,selecteddays){

    return new Promise((resolve,reject)=>{
        try{
            
            let datesToDaysMap = datemap.filter(dateString=>{
                let day = new Date(dateString).getDay();
                if(selecteddays.includes(day.toString())){
                    return true;
                }
            });

            resolve(datesToDaysMap);
        }catch(err){
            console.log(err);
            reject(false);
        }
    })
}

export function validateDate(start,end){
    let start_date = new Date(start);
    let end_date = new Date(end);

  
    if(end_date.getFullYear() < start_date.getFullYear()){
        return false;
    }else if( (end_date.getFullYear() == start_date.getFullYear()) && end_date.getMonth() < start_date.getMonth()){
        return false;
    }else if( (end_date.getFullYear() == start_date.getFullYear()) && (end_date.getMonth() == start_date.getMonth()) && end_date.getDate() < start_date.getDate()){
        return false;
    }else{
        return true;
    }
}