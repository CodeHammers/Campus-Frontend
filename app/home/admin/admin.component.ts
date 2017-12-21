import { Component } from "@angular/core";

import { LoginService} from "../shared/services/login.service"
import { User } from "../shared/classes/user";

import { RouterExtensions, PageRoute } from "nativescript-angular/router";
import * as datePickerModule from "tns-core-modules/ui/date-picker";
import { SnackBar, SnackBarOptions } from "nativescript-snackbar";

import {
    getBoolean,
    setBoolean,
    getNumber,
    setNumber,
    getString,
    setString,
    hasKey,
    remove,
    clear
} from "application-settings";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";

import  { Workspace } from "../shared/classes/workspace"

import  { Organization } from "../shared/classes/organization"





@Component({
    selector: "admin",
    moduleId: module.id,
    templateUrl: "./admin.component.html",
    styleUrls: ["./admin.component.css"],
    providers: [LoginService]

})
export class AdminComponent  implements OnInit {


    public email :string
    public no_of_workspaces : string;
    public no_of_organizations: string;
    public no_of_users : string;

    public login_service: LoginService;
    public workspaces: Array<Workspace>;
    public organizations: Array<Organization>;
    public users : Array<Workspace>;
    public admins : Array<string>
    public admin_images: Array<string>

    ngOnInit(): void {
     this.login_service.get_admin_workspaces()
     .subscribe(
         (data)=>{
            this.workspaces = [];
            console.log("success ret ,admin workspaces")
            console.log(JSON.stringify(data))
            data["_body"].forEach(w => {
                let ws = new Workspace(w.id,w.name,w.about)
                if(w.logo!=null)
                ws.imagelink= w.logo

                this.workspaces.push( ws )
            });
            this.no_of_workspaces =  "Number of  Workspaces on the app :" + this.workspaces.length
         },
         (error)=>{
            console.log("shit japen")
            console.log(error)
         }
     )

     this.login_service.get_admin_organizations()
     .subscribe(
         (data)=>{
            this.organizations = [];
            console.log("success ret ,admin organization")
            console.log(JSON.stringify(data))
            data["_body"].forEach(w => {
                this.organizations.push(  new Organization(w.id,w.name,w.university,w.description,w.logo) )
            });
            this.no_of_organizations =  "Number of  Organizations on the app :" + this.organizations.length
            
         },
         (error)=>{
            console.log("shit japen")
            console.log(error)
         }
     )

     this.login_service.get_admin_users()
     .subscribe(
         (data)=>{
            this.users = [];
            console.log("success ret ,admin users")
            data["_body"].forEach(w => {
             console.log(JSON.stringify(data))                
                let  u = new Workspace(w.id,w.name,w.image) ;
                if(w.image!=null)
                  u.imagelink= w.image
                this.users.push(  u )
                this.no_of_users =  "Number of  Users on the app :" + this.users.length                
            });
         },
         (error)=>{
            console.log("shit japen")
            console.log(error)
         }
     )


     
     this.login_service.get_admin_users()
     .subscribe(
         (data)=>{
             console.log("------------------------.........................----------------------")
            
            console.log("success ret ,admin users")
            data["_body"].forEach(w => {
             console.log(JSON.stringify(data))                
                if( w.image !=null)
                this.admin_images.push(w.image)
                else
                this.admin_images.push("http://cohenwoodworking.com/wp-content/uploads/2016/09/image-placeholder-500x500.jpg")

                this.admins.push( w.name )
            });
         },
         (error)=>{
            console.log("shit japen")
            console.log(error)
         }
     )
        
        
    }

    add_admin(){
        this.login_service.make_admin(this.email)
        .subscribe(
            (data)=>{
               console.log("added admin")
               this.showSimple("User Added as Admin")
               console.log(JSON.stringify(data))
            
            },
            (error)=>{
               console.log("shit japen")
               this.showSimple("something Went Wrong")
               console.log(error)
            }
        )

    }


    /// Show a simple snackbar with no actions
    showSimple(msg: string) {
        // Create an instance of SnackBar
        let snackbar = new SnackBar();
        snackbar.simple(msg, 'white', '#222').then((args) => {
                //this.set('jsonResult', JSON.stringify(args));
        })
    }

    deleteWorkspace(w_id:number){
        console.log("deleting >....")
        this.login_service.delete_admin_workspace(w_id)
        .subscribe(
            (data)=>{
                console.log(JSON.stringify(data))
                if(data.status == 204){
                    this.showSimple("Workspace Deleted")
                    console.log("success")
                }
                else{
                    this.showSimple("Something Went Wrong")
                    
                    console.log("fuck ba2a")
                }
            }
        )


        this.login_service.get_admin_workspaces()
        .subscribe(
            (data)=>{
               this.workspaces = [];
               console.log("success ret ,admin workspaces")
               console.log(JSON.stringify(data))
               data["_body"].forEach(w => {
                   this.workspaces.push(  new Workspace(w.id,w.name,w.about) )
               });
               this.no_of_workspaces =  "Number of  Workspaces on the app :" + this.workspaces.length               
            },
            (error)=>{
               console.log("shit japen")
               console.log(error)
            }
        )
    }



    deleteOrganization(w_id:number){
        console.log("deleting >....")
        this.login_service.delete_admin_organization(w_id)
        .subscribe(
            (data)=>{
                console.log(JSON.stringify(data))
                if(data.status == 204){
                    this.showSimple("Organization Deleted")
                    console.log("success")
                }
                else{
                    this.showSimple("Something Went Wrong")
                    console.log("fuck ba2a")
                }
            }
        )

        
        this.login_service.get_admin_organizations()
        .subscribe(
            (data)=>{
               this.organizations = [];
               console.log("success ret ,admin organizations")
               console.log(JSON.stringify(data))
               data["_body"].forEach(w => {
                   this.organizations.push(  new Organization(w.id,w.name,w.university,w.description,w.logo) )
               });
               this.no_of_organizations =  "Number of  Organizations on the app :" + this.organizations.length               
            },
            (error)=>{
               console.log("shit japen")
               console.log(error)
            }
        )

    }



    deleteUser(w_id:number){
        console.log("deleting >....")
        this.login_service.delete_admin_user(w_id)
        .subscribe(
            (data)=>{
                console.log(JSON.stringify(data))
                if(data.status == 204){
                    console.log("success")
                    this.showSimple("User Deleted")
                }
                else{
                    this.showSimple("Something Went Wrong")
                    
                    console.log("fuck ba2a")
                }
            }
        )

        
        this.login_service.get_admin_users()
        .subscribe(
            (data)=>{
               this.users = [];
               console.log("success ret ,admin users")
               console.log("----------------------------------------------------------------")
               data["_body"].forEach(w => {
                console.log(JSON.stringify(data))                
                   this.users.push(  new Workspace(w.id,w.name,w.image)  )
               });
               this.no_of_users =  "Number of  Users on the app :" + this.users.length                
               
            },
            (error)=>{
               console.log("shit japen")
               console.log(error)
            }
        )

    }

    constructor(private ls: LoginService ,private routerExtensions: RouterExtensions){

   
    	this.login_service = ls;
    }






 


}
