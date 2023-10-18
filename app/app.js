import UI from "./classes/Ui.js";
import List from "./classes/List.js";
import Name from "./classes/Name.js";
import Auth from "./classes/Auth.js";


const auth = new Auth;

//check if user key exists

if(auth.checkKey()){
   
    const ui = new UI(new List, new Name, auth);
    ui.hideOverallLoader();
    ui.loadList();
    ui.loadNames();
    ui.loadFormEvents();

    document.querySelector("#view_list_btn").addEventListener("click",ui.switch_view);
    document.querySelector("#view_names_btn").addEventListener("click",ui.switch_view);
      
}else{
    let confirmPermission = confirm("This application uses your browser's storage for storing its data");
    if(confirmPermission){
        //create key 
        let sampleData = {
            list:{
                rovers:[],
                cart:[]
            },
            names:{
                rovers:[],
                cart:[]
            }
        };
        new Promise((resolve,reject)=>{
            try{
                localStorage.setItem("ulist_storage",JSON.stringify(sampleData));
                resolve(true);
            }catch(err){
                resolve("failed to allocate app storage");
            }
        }).then(_=>{
            alert("Storage space allocated successfully");
            location.reload();
        }).catch(err=>{
            alert(err);
        })  
    }else{
        location.href = "about.html";
    }   
}



  



//localStorage.clear();