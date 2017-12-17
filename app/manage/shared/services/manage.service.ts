import { Injectable } from "@angular/core";
//import { Organization } from "../classes/organization"
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { getString } from "tns-core-modules/application-settings/application-settings";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import { Organization } from "../classes/organization";


@Injectable()
export class ManageService {

    private baseUrl = "https://ccampus.herokuapp.com";

    constructor(private http: Http) { }

    getWorkspacesManagedByUser() {
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

        
        return this.http.get(this.baseUrl + "/api/auth/workspaces", {
            headers: headers
        })

    }
    getOrganizationsManagedByUser() {
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

      
      return this.http.get(this.baseUrl + "/api/auth/organizations", {
          headers: headers
      })

  }

    saveImageToImgur(base64string : string){
        let headers = new Headers();
        headers.append("Authorization","Client-ID af7a2d4c046b449");
        headers.append("Content-Type","application/json");
        return  this.http.post("https://api.imgur.com/3/image",{image: base64string},{headers: headers});
    }

    createOrganization(orgo:Organization){
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
        let data = {
            description: orgo.desc,
            university: orgo.university,
            logo: orgo.logo,
            phone: orgo.phone,
            email: orgo.email,
            name: orgo.name
        }
        console.log("Sending Request  .. . .. ");
        return  this.http.post(this.baseUrl+"/api/organizations" , data,{headers: headers});
        /*
        params.require(:organization).permit(:name, :description, :univerity, :logo, :address, :phone, :email, :event_schedule)
        */
        /*
        create_table "organizations", force: :cascade do |t|
            t.string "name", null: false
            t.text "description"
            t.string "university", null: false
            t.string "logo"
            t.string "address", null: false
            t.string "phone", null: false
            t.string "email", null: false
            t.text "event_schedule"
            t.datetime "created_at", null: false
            t.datetime "updated_at", null: false
        end
        */        

    }



}
