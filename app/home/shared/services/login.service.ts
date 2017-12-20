import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

import { User } from "../classes/user"

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
     return this.http.post("https://ccampus.herokuapp.com/api/users", { email: user.email,pd: user.password,image: user.logo ,name:user.name}, {headers:headers})
    

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

}
