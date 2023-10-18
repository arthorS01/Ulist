export default class List{
    
    list = [];

    constructor(){
        //get all the list from local storage
     
    }
    get list(){
        if(this.list.length == 0){
            return false;
        }
        return this.list;
    }
    getList(data){
        return data.list;
        
    }

    createListMap(dataMapLenght,list,type){
        console.log(type);
        return new Promise((resolve,reject)=>{
            try{

                //get the lenght
                //set names array to []
                let names = [];
                //get list of names
                //for each of the dates

                let names_list_copy = [...list];

                for(let i = 0; i<dataMapLenght; i++){
                                   
                    let entry = this.getNamesEntry(names_list_copy,list);
                    if(type == "cart"){
                        entry = `${entry}-${this.getNamesEntry(names_list_copy,list)}`;
                    }
                    
                    names.push(entry);
                }

                resolve(names);
            
            }catch(err){
                console.log(err);
                resolve(false);
            }
        })
    }

    getNamesEntry(names_list_copy,list){

        if(names_list_copy.length <=2){
            names_list_copy = [...list];
        }
        
        let rand_num = Math.floor(Math.random() * names_list_copy.length);
        
        let randomName1 = names_list_copy[rand_num];
        names_list_copy.splice(rand_num,1);

      
        
        rand_num = Math.floor(Math.random() * names_list_copy.length);
        let randomName2 = names_list_copy[rand_num];
        

        names_list_copy.splice(rand_num,1);

        let name_pair = `${randomName1} and ${randomName2}`;

        return name_pair;

    }
    delete(appData,name,list_type){
        
        return new Promise((resolve,reject)=>{

            let update_data = appData;
          
            list_type = list_type.trim();
            let index = (update_data.list[list_type]).findIndex(entry=>{
                if(entry == name){
                    return true;
                }

                return false;
            });

            update_data.list[list_type].splice(index,1);
            try{
                localStorage.setItem("ulist_storage",JSON.stringify(update_data));
                resolve(true);
            }catch(err){
                reject(false);
            }
           
        })
    }
    save(list_obj,listType){
        return new Promise((resolve,reject)=>{
            try{
                listType = listType.trim();
                let currentData = JSON.parse(localStorage.getItem("ulist_storage"));
                currentData.list[listType].push(list_obj);

                localStorage.setItem("ulist_storage",JSON.stringify(currentData));
                resolve(true);
            }catch(err){
                console.log(err);
                reject(false);
            }    

        })
    }
}