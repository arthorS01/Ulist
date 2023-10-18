import Names from "./classes/Name.js";
import List from "./classes/List.js";
import * as date_manager from "./classes/Date.js";
import Auth from "./classes/Auth.js";

const names_manager = new Names();
const list_manager = new List();
const auth = new Auth();



export function delete_name(e){

    let parent = e.currentTarget.parentElement.parentElement;
    let name = parent.querySelector(".user_details").innerHTML;
    let list_type =document.querySelector("#current_subsection").value;
    let current_subsection = document.querySelector("#current_subsection").value;
    let container_id = ( current_subsection == "rovers")? "#rovers_names_container":"#cart_names_container";

    if(parent.parentElement.getAttribute("id") == "search_results_area"){
        container_id = "#search_results_area";
    }

    (names_manager.delete(auth.getData(),name,list_type))
    .then(response=>response)
    .then(data=>{
        parent.classList.add("slider");

        setTimeout(function(){
            document.querySelector(container_id).removeChild(parent);
            let remaining_names_count = document.querySelectorAll(`${container_id} .name`).length;
            if(remaining_names_count == 0){
                //show empty message
                document.querySelector(container_id).innerHTML = `<div class='empty_prompt'><i class='icofont-worried'></i> <p>No names for ${current_subsection=='rovers'? 'rovers':'cart' }</div>`
            }
        },500,parent);

        return true;
       
    })
    .catch(err=>{
        console.log(err);
        console.log("error they oo");
        return false;
    });

}

export function delete_list(e){

    let parent = e.currentTarget.parentElement.parentElement;
    let name = parent.querySelector(".list_details").innerHTML;
    let list_type =document.querySelector("#current_subsection").value;
    let current_subsection = document.querySelector("#current_subsection").value;
    let container_id = ( current_subsection == "rovers")? "#rovers_container":"#cart_container";

    console.log(list_type);
    (list_manager.delete(auth.getData(),name,list_type))
    .then(response=>response)
    .then(data=>{
        parent.classList.add("slider");

        setTimeout(function(){
            document.querySelector(container_id).removeChild(parent);
            let remaining_list_count = document.querySelectorAll(`${container_id} .list`).length;
            if(remaining_list_count == 0){
                //show empty message
                document.querySelector(container_id).innerHTML = `<div class='empty_prompt'><i class='icofont-worried'></i> <p>No lists for ${current_subsection=='rovers'? 'rovers':'cart' }</div>`
            }
        },500,parent);

        return true;
       
    })
    .catch(err=>{
        console.log(err);
        console.log("error they oo");
        return false;
    });

}


export function name_view(){

    document.querySelector("#names_view #rovers_list_btn").addEventListener("click",e=>{
        document.querySelector("#names_view .section_selector .active").classList.remove("active");
        e.currentTarget.classList.add("active");
        document.querySelector("#names_view").classList.remove("addName");
        document.querySelector("#current_subsection").value = (e.currentTarget.querySelector("span").innerHTML).toLowerCase();
        document.querySelector("#rovers_names_container").style.display = "block";
        document.querySelector("#cart_names_container").style.display = "none";
        document.querySelector("#new_names_container").style.display = "none";
        document.querySelector("#search_area_container").classList.remove("invisible");
    });

    document.querySelector("#names_view #cart_list_btn").addEventListener("click",e=>{
        document.querySelector("#names_view").classList.remove("addName");
        document.querySelector(" #names_view .section_selector .active").classList.remove("active");
        e.currentTarget.classList.add("active");
        document.querySelector("#current_subsection").value = (e.currentTarget.querySelector("span").innerHTML).toLowerCase();
        document.querySelector("#rovers_names_container").style.display = "none";
        document.querySelector("#cart_names_container").style.display = "block";
        document.querySelector("#new_names_container").style.display = "none";
        document.querySelector("#search_area_container").classList.remove("invisible");
    });

    document.querySelector("#names_view #add_name").addEventListener("click",e=>{
        document.querySelector(" #names_view .section_selector .active").classList.remove("active");
        e.currentTarget.classList.add("active");
        document.querySelector("#names_view").classList.add("addName");
        document.querySelector("#current_subsection").value = (e.currentTarget.querySelector("span").innerHTML).toLowerCase();
        document.querySelector("#rovers_names_container").style.display = "none";
        document.querySelector("#cart_names_container").style.display = "none";
        document.querySelector("#new_names_container").style.display = "block";
        document.querySelector("#search_area_container").classList.add("invisible");
       
    });

   document.querySelector("#search_area").addEventListener("keyup",search);
 
}

export function list_view(){

    document.querySelector("#list_view #rovers_list").addEventListener("click",e=>{
        document.querySelector("#list_view .section_selector .active").classList.remove("active");
        e.currentTarget.classList.add("active");
     
        document.querySelector("#current_subsection").value = (e.currentTarget.querySelector("span").innerHTML).toLowerCase();

        document.querySelector("#rovers_container").style.display = "block";
        document.querySelector("#cart_container").style.display = "none";
        document.querySelector("#new_list_container").style.display = "none";
    });

    document.querySelector("#list_view #cart_list").addEventListener("click",e=>{
        document.querySelector("#list_view .section_selector .active").classList.remove("active");
        e.currentTarget.classList.add("active");

        document.querySelector("#current_subsection").value = (e.currentTarget.querySelector("span").innerHTML).toLowerCase();

        document.querySelector("#rovers_container").style.display = "none";
        document.querySelector("#cart_container").style.display = "block";
        document.querySelector("#new_list_container").style.display = "none";
    });

    document.querySelector("#list_view #add_list").addEventListener("click",e=>{
        document.querySelector(" #list_view .section_selector .active").classList.remove("active");
        e.currentTarget.classList.add("active");
        document.querySelector("#current_subsection").value = (e.currentTarget.querySelector("span").innerHTML).toLowerCase();
        document.querySelector("#rovers_container").style.display = "none";
        document.querySelector("#cart_container").style.display = "none";
        document.querySelector("#new_list_container").style.display = "block";
    });

    document.querySelector("#select_list_type").addEventListener("change",e=>{
        let target = e.target;
       
        let container_id = (target.value == "rovers")? "#rovers_list_form": "#cart_list_form";

        
        document.querySelector(".display").classList.remove("display");
        document.querySelector(`${container_id}`).classList.add('display');
    })

    document.querySelector("#list_view_tools .back_button").addEventListener("click",_=>{
        document.querySelector("#list_view_section").style.display = "none";
    })
    document.querySelector("#print_btn").addEventListener("click",_=>{
        window.print();
    });
}

export function search(e){

    let search_icon = document.querySelector("#search_icon");
    let current_subsection = document.querySelector("#current_subsection").value;
    let container_id = ( current_subsection == "rovers")? "#rovers_names_container":"#cart_names_container";
    
    search_icon.querySelector("i").classList.add("icofont-close-line-circled");
    search_icon.classList.add("close_search");
    document.querySelector(`${container_id} #search_results_area`).style.display = "block";

    document.querySelector(".close_search").addEventListener("click",_e=>{
        e.target.value = "";
        document.querySelector(`${container_id} #search_results_area`).innerHTML = "";
        document.querySelector(`${container_id} #search_results_area`).style.display = "none";

        search_icon.querySelector("i").classList.remove("icofont-close-line-circled");
        search_icon.classList.remove("close_search");
    });


    let keys = (e.target).value;
    if(keys == " " || keys== ""){
        return ;
    }


    console.log(container_id);
    let all_names = document.querySelectorAll(`${container_id} .main_name`);

    all_names = [...all_names];
    let match = all_names.filter(name=>{ 
        if((name.textContent).toLowerCase().includes(keys.toLowerCase())){
            return true;
        }
    });

    let html = "";
    match.forEach(entry => {
        html+=`<div class='name'><div class='user_icon'><i class=${((entry).textContent.includes("Bro")?'icofont-user-male':'icofont-girl-alt')}></i></div>
        <div class='user_details'>${entry.textContent}</div>
        <div class='name_tools'>
            <button class='edit_btn'><i class='icofont-ui-edit'></i></button>
            <button class='delete_btn'><i class='icofont-ui-delete'></i></button>
        </div>
        </div>`;
    });

    
    document.querySelector(`${container_id} #search_results_area`).innerHTML = html;

    [...document.querySelectorAll(`${container_id} #search_results_area .delete_btn`)].forEach(button=>{
        button.addEventListener("click",e=>{

            //delete_name(e);
            if(delete_name(e)){
               
                let sibling = e.currentTarget.parentElement.parentElement.querySelector(".user_details");
                 console.log(all_names);
                all_names.find(name=>{

                    console.log(name,sibling);

                    if((name.textContent).toLowerCase() == (sibling.textContent).toLowerCase()){
                        let container = name.parentElement.parentElement;
                       
                        //container.removeChild(name.parentElement);
                    }
                });
             
                //count search entry remaining
                let search_result_count = document.querySelectorAll("#search_results_area .name").length;
                console.log(search_result_count);
                if(search_result_count == 0){
                    document.querySelector("#search_results_area").innerHTML = `<div class='empty_prompt'><i class='icofont-worried'></i> <p>No results found </div>`
                }
    
            
            }
           
    })
    
   
})

}

export function addList(e){

   return new Promise((resolve,reject)=>{
        e.preventDefault();
        let target = e.target.parentElement;
        let list = (document.querySelector("#select_list_type").value=="rovers")?"rovers":"cart";
        let form_type_id = (list == "rovers")? "#rovers_list_form":"#cart_list_form"; 
        let all_inputs = target.querySelectorAll(`${form_type_id} input`);
        let checked_boxes = getCheckedInput(all_inputs);
        let start_date,end_date = null;

      if(checked_boxes.length == 0){
        reject("Please select at least one meeting day");
      }

      if(names_manager.getNamesCount((new Auth()).getData(),list)<2){
        reject(`Please update ${list} list first`);
      }

        switch(list){
            case "rovers":
                start_date = document.querySelector("#rovers_list_start_date").value;
                end_date =  document.querySelector("#rovers_list_end_date").value;
                break;
            case "cart":
                start_date = document.querySelector("#cart_list_start_date").value;
                end_date =  document.querySelector("#cart_list_end_date").value;
                break;
        }
        

        if(start_date=="" || end_date==""){
            reject("Please select both dates");
        }

        if(date_manager.validateDate(start_date,end_date) == false){
            
            reject("The end date should be at least the same day as the start date");
        }

    date_manager.getDateMap(new Date(start_date),new Date(end_date))
    .then(response=>{
            return response;
    })
    .then(data=>{
        date_manager.mapDatesToDays(data,checked_boxes)
        .then(response=>response)
        .then(dateMap=>{
            list_manager.createListMap(dateMap.length,auth.getData().names[list],list)
            .then(namesMap=>{
                resolve([dateMap,namesMap,list]);
            
            });
        })
    })
    .catch(err=>{
        console.log(err);
        reject(false);
    })

   })
}

function checked(checkBoxes){

    let status = true;

   status =  checkBoxes.find(checkbox=>{
        if(checkbox.checked){
            return true;
        }
    })

    return status;
}
function getCheckedInput(inputCollection){

    let result = [];

    let collection = [...inputCollection].filter(input => {

        if(input.getAttribute("type")=='checkbox'){
            return true;
        }
        
    });

    let checked = collection.filter(input=>{
        if(input.checked == true){
            return true;
        }
    });

    checked.forEach(box=>{
        result.push(box.value);
    });


    return result;
}

export function saveList(){
    let listName = prompt("Enter a title for this list");
    while(listName=="" || listName == " "){
        alert("Please enter a valid name");
        listName = prompt("Enter a name for this list");
    }
    let listHTML = document.querySelector("#list_display_section #list_view").innerHTML;
    listHTML = `<h1>${listName}</h1>` + listHTML;
    let listType = document.querySelector("#select_list_type").value;
    list_manager.save({name:listName, view:listHTML},listType)
    .then(response=>{
       alert("Your list has been saved");
        document.querySelector("#list_save_status").value = 1;
        let listTab = document.createElement("div");
        listTab.classList.add("list");
    
        let icon_div = document.createElement("div");
        icon_div.classList.add("list_icon")
        icon_div.innerHTML = "<i class='icofont-listing-box'></i>";
        
        let details_div = document.createElement("div");
        details_div.innerText = `${(listName).length > 10 ? listName.substring(0,10) + "...": listName}`;
        details_div.classList.add("list_details");
        
        let tools_div = document.createElement("div");
        tools_div.classList.add("list_tools");
        let view_btn = document.createElement("button");
        view_btn.addEventListener("click",view_list);
        view_btn.innerHTML = "<i class='icofont-eye-alt'></i>";

        let delete_btn = document.createElement("button");
        delete_btn.innerHTML = "<i class='icofont-ui-delete'></i>"
        delete_btn.addEventListener("click",delete_list);

        
        tools_div.append(view_btn,delete_btn);
        
        let hidden_input = document.createElement("input");
        hidden_input.setAttribute("type","hidden");
        hidden_input.value = listHTML;

        let containerID = (listType == "rovers")? "#rovers_container":"#cart_container";

        //check if there are other lists
        let other_lists = document.querySelectorAll(`#list_view ${containerID} .list`);
        listTab.append(icon_div,details_div,tools_div,hidden_input);
        
        if([...other_lists].length == 0){
            document.querySelectorAll(`#list_view ${containerID}`).innerHTML = "";
            document.querySelector(`#list_view ${containerID}`).append(listTab);
        }else{
            document.querySelector(`#list_view ${containerID}`).append(listTab);
        }
        document.querySelector(`#list_view ${containerID}`).appendChild(listTab);
    })
    .catch(err=>{
        console.log(err);
    })
}
export function goBack(){
    let list_save_status = document.querySelector("#list_save_status").value;
    if(list_save_status == 0){
        let confirmation = confirm("The generated list has not being saved yet. Going back without saving would discard the list. Would you like to continue?");
        if(confirmation){
            document.querySelector("#list_display_section").style.display = "none";
        }
    }else{
         document.querySelector("#list_display_section").style.display = "none";
         document.querySelector("#list_save_status").value = 0;

    }
}

export function view_list(e){
   
    let target = e.currentTarget;
    let list = e.currentTarget.parentElement.parentElement;
    //clean the view area
   document.querySelector("#list_view_section_display").innerHTML = "";
   //get the html view
    document.querySelector("#list_view_section_display").innerHTML = list.querySelector("input[type='hidden']").value;

   //inject it in the view area
   //display view area
   
   document.querySelector("#list_view_section").style.display = "block";
}
