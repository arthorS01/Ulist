export default class Auth{

    user_key;

    checkKey(){
        this.user_key = localStorage.getItem("ulist_storage");
        if(this.user_key){
            return true;
        }
        return false;
    }

    getData(){

      return JSON.parse(localStorage.getItem("ulist_storage"));
    }

}