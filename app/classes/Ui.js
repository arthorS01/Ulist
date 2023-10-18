 
 import * as events from "../events.js";


  export default class UI{

    current_view;
    
    constructor(list_manager,names_manager,auth){
        this.current_view == 0;
        this.auth = auth;
        this.list_manager = list_manager;
        this.names_manager = names_manager;
    }
    set current_view(value){
        if(typeof value !== "number" || (value > 1 || value < 0) ){
            throw new Error("Invalid value passed for setting current view");
        }
        this.current_view = value;
    }

    switch_view(e){

        let target = e.currentTarget;

        //get current screen
        let current_view = document.querySelector("#current_screen").value;
        if(this.getAttribute("data-target") != current_view){
            if(this.getAttribute("data-target") == "0"){
      
                document.querySelector("#user_area").style.transform = "translateX(0)";
                document.querySelector("#current_screen").value = "0";
                document.querySelector("#current_heading").value = "list";
            }else{
             
                document.querySelector("#user_area").style.transform = "translateX(-100vw)";
                document.querySelector("#current_screen").value = "1";
                document.querySelector("#current_heading").value = "names";
            }
            //remove active class
            let active_btn = document.querySelector(".active_btn");
         
            active_btn.classList.remove("active_btn");

            //add active class to clicked button
            target.classList.add("active_btn");
          
        }
    }

    hideOverallLoader(){
        document.getElementById("overall_page_loader").style.display = "none";
    }

    loadNames(){
        let names = this.names_manager.getNames(this.auth.getData());
 

        //create view for rovers names
        if(names.rovers.length > 0){
            let rovers_container = this.#create_container("rovers_names_container");
            rovers_container.innerHTML = this.#getNamesHTML('rovers');
            document.querySelector("#names_view .section_view").appendChild(rovers_container);

            [...(document.querySelectorAll("#rovers_names_container .delete_btn"))].forEach(button=>{
                button.addEventListener("click",events.delete_name)});
        }else{
            let container = this.#create_empty_container("rovers_names_container","No names for rovers");
            document.querySelector("#names_view .section_view").appendChild(container);    
        }

        //create view for cart names
        if(names.cart.length > 0){
            let cart_container = this.#create_container("cart_names_container");
            cart_container.innerHTML = this.#getNamesHTML('cart');
            document.querySelector("#names_view .section_view").appendChild(cart_container);

            [...(document.querySelectorAll("#cart_names_container .delete_btn"))].forEach(button=>{
                button.addEventListener("click",events.delete_name)
            })

        }else{
            let container = this.#create_empty_container("cart_names_container","No names for cart");
            document.querySelector("#names_view .section_view").appendChild(container);
            
        }


        let new_name_container = this.#create_container("new_names_container");
            new_name_container.innerHTML = this.#addNameForm();
            document.querySelector("#names_view .section_view").appendChild(new_name_container);
                
        events.name_view();
        }

    loadList(){
        let list = this.list_manager.getList(this.auth.getData());
      

        if(list.rovers){
            let rovers_container = this.#create_container("rovers_container");
            document.querySelector("#list_view .section_view").appendChild(rovers_container);
            (list.rovers).forEach(list=>{
                this.#createListEntry(list.name,"rovers",list.view);
            });
        }else{
            let container = this.#create_empty_container("rovers_container","no rovers list");
            document.querySelector("#list_view .section_view").appendChild(container);
        }
        //create cart view
        if(list.cart){
            let cart_container = this.#create_container("cart_container");
            document.querySelector("#list_view .section_view").appendChild(cart_container);
            (list.cart).forEach(list=>{
            
                this.#createListEntry(list.name,"cart",list.view);
            });
        }else{
            let container = this.#create_empty_container("cart_container","no cart list");
            document.querySelector("#list_view .section_view").appendChild(container);
        }

        let new_list_container = this.#create_container("new_list_container");
        new_list_container.innerHTML = this.#addListForm();
        document.querySelector("#list_view .section_view").appendChild(new_list_container);


        events.list_view();
    }

    #addListForm(){
       return ` <div id="addListContainer">
            <form>
                <label>Select list type</label>
                <select id='select_list_type' required>
                    <option value='rovers'>rovers</option>
                    <option value='cart' >cart</option>
                </select>
            </form>

                <div id="rovers_list_form" class='display'>

                <h4>Create rovers list</h4>

                    <form>
                        <div class='field'>
                            <label>Select start date</label>
                            <input type="date"  id='rovers_list_start_date' required></input>
                        </div>

                        <div class='field'>
                            <label>Select end date</label>
                            <input type="date" id='rovers_list_end_date' required></input>
                        </div>

                        <div class='field'>
                            <label>Select meeting days</label>
                            <div class='checkbox'><input type="checkbox" value='0' checked>Sunday</input></div>
                            <div class='checkbox'><input type="checkbox" value='1'>Monday</input></div>
                            <div class='checkbox'><input type="checkbox" value='2'>Tuesday</input></div>
                            <div class='checkbox'><input type="checkbox" value='3'>Wednesday</input></div>
                            <div class='checkbox'><input type="checkbox" value='4'>Thursday</input></div>
                            <div class='checkbox'><input type="checkbox" value='5'>Friday</input></div>
                            <div class='checkbox'><input type="checkbox" value='6'>Saturday</input></div>
                        </div>

                        <button id='create_rovers_list_btn'>Done</button>
                      
                    </form>
                </div>

                <div id="cart_list_form" >

                <h3>Create cart list</h3>
                <form>

                    <div class='field'>
                        <label>Select start date</label>
                        <input type="date" id='cart_list_start_date' required></input>
                    </div>

                    <div class='field'>
                        <label>Select end date</label>
                        <input type="date"  id='cart_list_end_date' required></input>
                    </div>

                    <div class='field'>
                        <label>Select preaching days</label>
                        <div class='checkbox'><input type="checkbox" value='0' checked>Sunday</input></div>
                        <div class='checkbox'><input type="checkbox" value='1'>Monday</input></div>
                        <div class='checkbox'><input type="checkbox" value='2'>Tuesday</input></div>
                        <div class='checkbox'><input type="checkbox" value='3'>Wednesday</input></div>
                        <div class='checkbox'><input type="checkbox" value='4'>Thursday</input></div>
                        <div class='checkbox'><input type="checkbox" value='5'>Friday</input></div>
                        <div class='checkbox'><input type="checkbox" value='6'>Saturday</input></div>
                    </div>

                <button id='create_cart_list_btn'>Done</button>

            </form>
        </div>`;
    }

    #addNameForm(){
       
       return  `
       <h2>Add a new name</h2>
        <div id="add_name_form">
        <div id="form_area">
            <form>
                <div class="form_field">
                    <div class='field'>
                        <label>Select list:</label>
                        <select id="add_list" required>
                            <option value='rovers'>rovers</option>
                            <option value='cart'>cart</option>
                        </select>
                    </div>
                     <div class='field'>
                     <label>Select title: </label>
                         <select id="add_name_title" required>
                             <option>Bro.</option>
                             <option>Sis.</option>
                         </select>
                     </div>
                     <div class='field'>
                     <label>Enter name here</label>
                        <span class="input_error">&nbsp;</span>
                         <input type="text" id="entered_name" min="3" id="name_entry" required>
                     </div>
                </div>
     
                <button>add</button>
             </form>
        </div>
        
    </div>`;



    }
    #create_container(container_name){
        let container = document.createElement("div");
        container.setAttribute("id",container_name);
        return container;
    }
    #create_empty_container(container_id,empty_message){
        let container = document.createElement("div");
        container.setAttribute("id",container_id);
        container.innerHTML = `<div class='empty_prompt'><i class='icofont-worried'></i> <p> ${empty_message}</div>`;
        return container;
    }

    

    /*
    @todo(update vailidation for form input) 
    check if string contains space
    check if string contains numbers
    check to make sure no special characters
    */
    loadFormEvents(){

        document.querySelector("#add_name_form form button").addEventListener("click",e=>{

            e.preventDefault();

            let input = document.querySelector(" #add_name_form #entered_name").value;
            let list_type = document.querySelector(" #add_name_form #add_list").value;
            let title = document.querySelector("#add_name_form #add_name_title").value;

            //remove white spaces from both ends
            input = input.trim(input);
            

            if(input=="" || input == " "){
                this.show_status("Please enter a valid name", 'f');
            }else{
                //update details in JSON data
                this.names_manager.add(this.auth.getData(),input,list_type,title).then(response=>
                     response
                ).then(data=>{
                    let new_name_container = document.createElement("div");
                    let entry = `${title} ${input}`;
                    new_name_container.setAttribute("class","name");
                    new_name_container.innerHTML = `<div class='user_icon'><i class=${(entry.includes("Bro")?'icofont-user-male':'icofont-girl-alt')}></i></div>
                    <div class='user_details'>${entry}</div>
                    <div class='name_tools'>
                        <button class='edit_btn'><i class='icofont-ui-edit'></i></button>
                        <button class='delete_btn'><i class='icofont-ui-delete'></i></button>
                    </div>`;

                    new_name_container.querySelector(".delete_btn").addEventListener("click",events.delete_name);

                    let list_type_id = (list_type == "cart")? "#cart_names_container": "#rovers_names_container";

                    let number_of_current_names = document.querySelectorAll(`${list_type_id} .name`).length;
                   
                    if(number_of_current_names==0){
                        document.querySelector(list_type_id).innerHTML = "";
                        document.querySelector(list_type_id).appendChild(new_name_container);
                    }else{
                       document.querySelector(list_type_id).appendChild(new_name_container);
                    }

                    this.show_status("Adedd successfully",'s');
                }).catch(err=>{
                    this.show_status(err,'f');
                })

                    //show confirmation message
                    //update name view   
            }
        });


        document.querySelector("#create_rovers_list_btn").addEventListener("click",e=>{
             //validate input
            
             events.addList(e)
             .then(data=>{
                document.querySelector("#overall_page_loader").style.display = "block";
                document.querySelector("#list_display_section #list_view").innerHTML = ""; 
                document.querySelector("#list_display_section #list_view").appendChild(this.#createRoversListView(data)) ;
                 document.querySelector("#list_display_section").style.display = "block";
                 document.querySelector("#list_display_tools .back_button").addEventListener("click",events.goBack);
                 document.querySelector("#save_button").addEventListener("click",events.saveList);
                 document.querySelector("#overall_page_loader").style.display = "none";

             })
             .catch(err=>{
                
                 this.show_status(err,'f');
             })
        });

        document.querySelector("#create_cart_list_btn").addEventListener("click",e=>{
           
            //validate input
         
            events.addList(e)
            .then(data=>{
                document.querySelector("#overall_page_loader").style.display = "block";
                document.querySelector("#list_display_section #list_view").innerHTML = ""; 
                document.querySelector("#list_display_section #list_view").appendChild(this.#createCartListView(data)) ;
                 document.querySelector("#list_display_section").style.display = "block";
                 document.querySelector("#list_display_tools .back_button").addEventListener("click",events.goBack);
                 document.querySelector("#save_button").addEventListener("click",events.saveList);
                 document.querySelector("#overall_page_loader").style.display = "none";
               
            })
            .catch(err=>{
                this.show_status(err,'f');
            })
        });
    }

    #getCheckedInput(inputCollection){

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

    #getNamesHTML(field){

        let names = this.auth.getData().names[field];
        let html = "";

        names.forEach(entry=>{

            html+=`<div class='name'><div class='user_icon'><i class=${(entry.includes("Bro")?'icofont-user-male':'icofont-girl-alt')}></i></div>
            <div class='user_details main_name'>${entry}</div>
            <div class='name_tools'>
                <button class='edit_btn'><i class='icofont-ui-edit'></i></button>
                <button class='delete_btn'><i class='icofont-ui-delete'></i></button>
            </div>
            </div>`
        });

        html+=`<div id='search_results_area'></div>`;
        return html;

    }

    #createRoversListView(data){
        let table = document.createElement("table");
        table.setAttribute("border",1);
        let thead = document.createElement("thead");
        thead.innerHTML =` <tr><th>Day</th><th>${data[2].charAt(0).toUpperCase() + data[2].slice(1)}</th></tr>`;
        let tbody = document.createElement("tbody");

        for(let i = 0; i<data[0].length; i++){

            let trow = document.createElement("tr");

            let date = document.createElement("td");
            date.innerText = data[0][i];

            let namePair = document.createElement("td");
            namePair.innerText = data[1][i];
            
            trow.append(date,namePair);

            tbody.appendChild(trow);
        }

        table.append(thead,tbody);

        return table;
    }

    #createCartListView(data){

        console.log(data);
        let table = document.createElement("table");
        table.setAttribute("border",1);
        let thead = document.createElement("thead");
        thead.innerHTML =` <tr><th>Day</th><th>Morinig</th><th>Afternoon</th></tr>`;
        let tbody = document.createElement("tbody");

        for(let i = 0; i<data[0].length; i++){

            let trow = document.createElement("tr");

            let date = document.createElement("td");
            date.innerText = data[0][i];

            let namePair1 = document.createElement("td");
            let namePair2 = document.createElement("td");

            let pairs = data[1][i].split("-");

            namePair1.innerText = pairs[0];
            namePair2.innerText = pairs[1];
            
            trow.append(date,namePair1,namePair2);

            tbody.appendChild(trow);
        }

        table.append(thead,tbody);

        //console.log(table.innerHTML);
        return table;
    }

    #createListEntry(listName,listType,html){
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
        view_btn.addEventListener("click",events.view_list);
        view_btn.innerHTML = "<i class='icofont-eye-alt'></i>";

        let delete_btn = document.createElement("button");
        delete_btn.innerHTML = "<i class='icofont-ui-delete'></i>"
        delete_btn.addEventListener("click",events.delete_list);

        
        tools_div.append(view_btn,delete_btn);
        
        let hidden_input = document.createElement("input");
        hidden_input.setAttribute("type","hidden");
        hidden_input.value = html;

        let containerID = (listType == "rovers")? "#rovers_container":"#cart_container";

        listTab.append(icon_div,details_div,tools_div,hidden_input);

        //check if there are other lists
        let other_lists = document.querySelectorAll(`#list_view ${containerID} .list`);
        if([...other_lists].length == 0){
            document.querySelectorAll(`#list_view ${containerID}`).innerHTML = "";
          //  listTab.append(icon_div,details_div,tools_div,hidden_input);
            document.querySelector(`#list_view ${containerID}`).append(listTab);
        }else{
            document.querySelector(`#list_view ${containerID}`).append(listTab);
        }
        
    }

    show_status(msg,type){

      let identifier = null;

      switch(type){
        case "s": identifier = "success";
        break;
        case "f":identifier = "failure"
      }
        // if message type is s
        //set class to success class
        //else set class to failure class
        //add the class that causes the
        document.querySelector("#status_board p").innerText = msg;
        document.querySelector("#status_board").classList.add(identifier);
        document.querySelector("#status_board").classList.add("animate_message");

        setTimeout(function(){
            document.querySelector("#status_board").classList.remove("animate_message");
            document.querySelector("#status_board").classList.remove(identifier);
        },3000);
        //animation to the respective div element
        //remove after 3 secs
    }
  }
