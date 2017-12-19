import { Injectable } from "@angular/core";
//import { Organization } from "../classes/organization"
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { getString } from "tns-core-modules/application-settings/application-settings";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import { Organization } from "../classes/organization";
import { Workspace } from "../classes/workspace";
import { Workshop } from "../classes/workshop";


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
        /*
        fetch("https://httpbin.org/get").then(function (r) {
            console.log("here he comes")
            console.log(JSON.stringify(r))
            // Argument (r) is Response!
        }).catch(function(done){});
        */
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


    getOrganization(id: number){
        let headers = new Headers();
        headers.append("Content-Type", "application/json");    
        console.log("parsing .......",id)
        return this.http.get(this.baseUrl+"/api/organizations/"+id,{headers: headers})
    }

    updateOrganization(orgo: Organization){

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
        console.log("headers are ",JSON.stringify(headers))
        let data = {
            description: orgo.desc,
            university: orgo.university,
            logo: orgo.logo,
            phone: orgo.phone,
            email: orgo.email,
            name: orgo.name
        }


        return  this.http.put(this.baseUrl+"/api/organizations/"+orgo.id , data,{headers: headers}); 
    }

    createWorkspace(w:Workspace){
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
            logo: w.logo_link,
            name: w.name,
            about: w.about
        }
     
        console.log("Sending Request  .. . .. ");
        return  this.http.post(this.baseUrl+"/api/workspaces" , data,{headers: headers});
        /*
        create_table "workspaces", force: :cascade do |t|
            t.string "name", null: false
            t.string "logo"
            t.text "about"
            t.datetime "created_at", null: false
            t.datetime "updated_at", null: false
        end

        */     

    }


    /*
    
    id	10
    title	"3D printing FTW!"
    description	"3D print anything"
    date	"2018-05-30"
    time	"12:15:00"
    */
    getWorkshopsForOrganization(id:number){
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
  
        
        return this.http.get(this.baseUrl+"/api/organizations/"+id+"/workshops",{headers: headers})
        
    }

    postWorkshop(w:Workshop,id: number){
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
            date: w.date,
            title: w.title,
            description: w.description
        }
     

        return this.http.post(this.baseUrl+"/api/organizations/"+id+"/workshops" , data,{headers: headers});
        
    }


}
