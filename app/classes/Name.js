export default class Name{
    

    getNames(appData){
        return (appData.names);
    }

    getNamesCount(appData,set){
        return appData.names[set].length;
    }

    delete(appData,name,list_type){

        return new Promise((resolve,reject)=>{

            let update_data = appData;
    
            let index = update_data.names[list_type].findIndex(entry=>{
                if(entry == name){
                    return true;
                }

                return false;
            });

            update_data.names[list_type].splice(index,1);
            try{
                localStorage.setItem("ulist_storage",JSON.stringify(update_data));
                resolve(true);
            }catch(err){
                reject(false);
            }
           
        })
    }
    add(appData,name,list_type,title){
        
           return (new Promise((resolve,reject)=>{
            //validate name
            if(/[0-9]/.test(name) ){
                
                reject("Name should only contain alphabets");
            }else{
                let data = appData;
                list_type = list_type.trim();
                if(data.names[list_type].includes(`${title} ${name}`)){
                    reject(`name already exists in ${list_type} list`);
                }else{

                    data.names[list_type].push(`${title} ${name}`);
                   localStorage.setItem("ulist_storage",JSON.stringify(data));
                    resolve(true);    
                }
          
                reject("failed to add name");
            }
           
            }))
        }

}