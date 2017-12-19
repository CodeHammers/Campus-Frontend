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
import { Event } from "../classes/event"
import { Branch } from "../classes/branch"
import { Room } from "../classes/room"


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

/*

0	
id	1
title	"2018 opening"
description	"kvector opening"
time	null
date	"2018-01-01"
location	"Giza"
created_at	"2017-12-19 00:03:29.380469"
updated_at	"2017-12-19 00:03:29.380469"
organization_id	29
branch_id	15
*/


    postEvent(w:Event,id: number){
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
            description: w.description,
            location : "someWhere in the fucking world"

        }
     

        return this.http.post(this.baseUrl+"/api/organizations/"+id+"/events" , data,{headers: headers});
        
    }



    grant_user_org(email: string,org_id: number){
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return this.http.post(this.baseUrl+"/api/grant/organiztion?email="+email+"&organization_id="+org_id , {},{headers: headers});
        

    }
    get_all_staff_in_org(org_id:number){
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return this.http.get(this.baseUrl+"/api/users?org_id="+org_id , {headers: headers});
    }


    getEventsForOrganization(id:number){
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
  
        
        return this.http.get(this.baseUrl+"/api/organizations/"+id+"/events",{headers: headers})
        
    }

    postBranch(b : Branch,id: number){
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
            address: b.address,
            phone: b.phone,
            number_of_rooms: b.number_of_rooms,
            email:b.email

        }
     

        return this.http.post(this.baseUrl+"/api/workspaces/"+id +"/branches", data,{headers: headers});
    }

    get_all_branches(id: number){
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
  
        
        return this.http.get(this.baseUrl+"/api/workspaces/"+id+"/branches",{headers: headers})
    }
    /*
        0	
        id	15
        address	"Dokki, Giza, Egypt"
        phone	"27856965"
        1
    */

    get_branch(id: number,w_id: number){
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this.http.get(this.baseUrl+"/api/workspaces/"+w_id+"/branches/"+id,{headers: headers})
    }

    update_branch(b:Branch,id: number){

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
        console.log(b.id)
        console.log(id)
        let data = {
            address: b.address,
            phone: b.phone,
            number_of_rooms: b.number_of_rooms,
            email:b.email

        }
        console.log("data to update",JSON.stringify(data))

        return this.http.put(this.baseUrl+"/api/workspaces/"+id +"/branches/"+b.id, data,{headers: headers});
    }

    get_rooms_for_branch(b_id:number,w_id:number){
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this.http.get(this.baseUrl+"/api/workspaces/"+b_id +"/branches/"+w_id+"/rooms",{headers: headers});
    }

    post_room(b_id:number,w_id:number,room:Room){
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
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
            capacity: room.capacity,
            price: room.price,
            services: room.services
        }

        return this.http.post(this.baseUrl+"/api/workspaces/"+b_id +"/branches/"+w_id+"/rooms", data,{headers: headers});
        
        
    }


    post_room_image(id:number,b_id:number,w_id:number,img_link:string){
        console.log(img_link)
        console.log("posting image")

        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        //the header part won't change at all in all incoming services
        //you can just copy and paste 
        //those headers are for verifiying the identity of the user on the server
        if (getString("userheaders", "none") != "none") {
            console.log("parsing ......");
            headers.append("access-token", JSON.parse(getString("userheaders", "none"))["Access-Token"]);
            headers.append("client", JSON.parse(getString("userheaders", "none")).Client);
            headers.append("uid", JSON.parse(getString("userheaders", "none")).Uid);
        }   

        return this.http.post(this.baseUrl+"/api/workspaces/"+b_id +"/branches/"+id+"/rooms/"+w_id+"/images", {image_url:img_link},{headers: headers});
        
    }


    delete_workshop(id: number,b_id:number){
        console.log("deleting workshop")
        
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        //the header part won't change at all in all incoming services
        //you can just copy and paste 
        //those headers are for verifiying the identity of the user on the server
        if (getString("userheaders", "none") != "none") {
            console.log("parsing ......");
            headers.append("access-token", JSON.parse(getString("userheaders", "none"))["Access-Token"]);
            headers.append("client", JSON.parse(getString("userheaders", "none")).Client);
            headers.append("uid", JSON.parse(getString("userheaders", "none")).Uid);
        }   
        
        return this.http.delete(this.baseUrl+"/api/organizations/"+ b_id+ "/workshops/"+id,{headers: headers});
        

    }


    

}
