import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

import { User } from "../classes/user"
import { getString } from "tns-core-modules/application-settings/application-settings";

@Injectable()
export class LoginService {
    
    private baseUrl = "https://ccampus.herokuapp.com/auth";


    constructor(private http: Http) { }
    
    signIn(user: User){
      console.log("passed to sign_in");
      let headers = new Headers();
      headers.append("Content-Type", "application/json");

     return this.http.post(this.baseUrl+"/sign_in", { email: user.email,password: user.password }, {headers:headers})
        .map(res => res);

    }

  
    signUp(user: User){
      console.log("passed to sign_up");
      let headers = new Headers();
      headers.append("Content-Type", "application/json");

      console.log(JSON.stringify(user))
     return this.http.post("https://ccampus.herokuapp.com/api/users", {/* nickname:"ragnarok",*/email: user.email,pd: user.password,image: user.logo ,name:user.name}, {headers:headers})
    

    }

    saveImageToImgur(base64string : string){
        let headers = new Headers();
        headers.append("Authorization","Client-ID af7a2d4c046b449");
        headers.append("Content-Type","application/json");
        return  this.http.post("https://api.imgur.com/3/image",{image: base64string},{headers: headers});
    }

    updatePassword(id: number, np : string){
        console.log("updating password")
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let data ={
            pd: np
        }
        return  this.http.put("https://ccampus.herokuapp.com/api/users"+id,data,{headers: headers});
        

    }

    get_admin_workspaces(){
        console.log(" get all to admin --workspaces")
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        
        return  this.http.get("https://ccampus.herokuapp.com/api/admin/workspaces",{headers: headers});
        
    }


    get_admin_organizations(){
        console.log(" get all to admin --organizations")
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        
        return  this.http.get("https://ccampus.herokuapp.com/api/admin/organizations",{headers: headers});
        
    }

    get_admin_users(){
        console.log(" get all to admin --users")
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        
        return  this.http.get("https://ccampus.herokuapp.com/api/users?fuck_off=yes",{headers: headers});
        
    }


    delete_admin_workspace(w_id: number){
        console.log(" de;lete one to admin --workspaces")
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        
        return  this.http.delete("https://ccampus.herokuapp.com/api/admin/workspaces/"+w_id,{headers: headers});
    }

    delete_admin_organization(w_id: number){
        console.log(" de;lete one to admin --organization")
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        
        return  this.http.delete("https://ccampus.herokuapp.com/api/admin/organizations/"+w_id,{headers: headers});
    }


    delete_admin_user(w_id: number){
        console.log(" de;lete one to admin --organization")
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        
        return  this.http.delete("https://ccampus.herokuapp.com/api/users/"+w_id,{headers: headers});
    }

    get_favoriates(){
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("token-type", "Bearer");

        //the header part won't change at all in all incoming services
        //you can just copy and paste 
        //those headers are for verifiying the identity of the user on the server
        if (getString("userheaders", "none") != "none") {
            console.log("parsing ......");
            headers.append("access-token", JSON.parse(getString("userheaders", "none"))["Access-Token"]);
            headers.append("client", JSON.parse(getString("userheaders", "none")).Client);
            headers.append("uid", JSON.parse(getString("userheaders", "none")).Uid);
        }

        return this.http.get( "https://ccampus.herokuapp.com/api/user/subcribe",{
            headers: headers
        })
    }


    get_feed(){
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("token-type", "Bearer");

        //the header part won't change at all in all incoming services
        //you can just copy and paste 
        //those headers are for verifiying the identity of the user on the server
        if (getString("userheaders", "none") != "none") {
            console.log("parsing ......");
            headers.append("access-token", JSON.parse(getString("userheaders", "none"))["Access-Token"]);
            headers.append("client", JSON.parse(getString("userheaders", "none")).Client);
            headers.append("uid", JSON.parse(getString("userheaders", "none")).Uid);
        }

        return this.http.get( "https://ccampus.herokuapp.com/api/user/feed",{
            headers: headers
        })
    }



    make_admin(email:string){

        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("token-type", "Bearer");


        return this.http.post("https://ccampus.herokuapp.com/api/user/adminize?email="+email,{headers: headers})
    }

    get_admins(){
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("token-type", "Bearer");


        return this.http.post("https://ccampus.herokuapp.com/api/admins",{headers: headers})
    }



}
