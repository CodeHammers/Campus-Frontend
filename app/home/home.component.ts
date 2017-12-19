import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { getString, setString } from "tns-core-modules/application-settings/application-settings";
import { RouterExtensions, PageRoute } from "nativescript-angular/router";

import * as elementRegistryModule from 'nativescript-angular/element-registry';
elementRegistryModule.registerElement("CardView", () => require("nativescript-cardview").CardView);

import { User } from "./shared/classes/user";

import { LoginService} from "./shared/services/login.service"


@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
    providers: [LoginService]
    
})
export class HomeComponent implements OnInit{
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    public user: User;
    public pass : string;
    public login_service : LoginService;
    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        console.log(getString("userdata","none"));
        //setString("userdata","none")
        if(getString("userdata","none")=="none"){
            console.log("no user data found")
             this.routerExtensions.navigate(["home/login"]);            
         }


         
        
        let res = JSON.parse(getString("userdata","none"));
        this.user = new User(res["email"] ,res["password"],res["password"]);
         
        console.log( JSON.stringify(this.user) );

    }

    updatePassword(){
        let id = JSON.parse(getString("userdata","none"))["id"]
        this.login_service.updatePassword(id,this.pass)
        .subscribe((data)=>{
            console.log("updated Successfully")
            console.log(JSON.stringify(data))
        },(error)=>{
            console.log("shit happen !") 
            console.log(error)           

        }) 
        
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }
    constructor(private routerExtensions: RouterExtensions,private ls: LoginService){
        this.login_service = ls;
    }

    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }
}
