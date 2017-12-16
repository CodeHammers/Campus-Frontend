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
import * as imagepicker from "nativescript-imagepicker";



@Component({
    selector: "login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
    providers: [LoginService]

})
export class LoginComponent  implements OnInit {
    public user: User;
    public newuser: User;
    public login_service: LoginService;

    ngOnInit(): void {
        if(getString("userdata","none")!="none"){
           
            this.routerExtensions.navigate(["home/profile"]);            
        }
        //console.log("but Why?!")
    }

    constructor(private ls: LoginService ,private routerExtensions: RouterExtensions){
    	//this.user = new User("Sayed@gmail.com","5odonyma3ako");
        this.user = new User("","");
        this.newuser = new User("","");
    	this.login_service = ls;
    }

    /// Show a simple snackbar with no actions
    showSimple(msg: string) {
        // Create an instance of SnackBar
        let snackbar = new SnackBar();
        snackbar.simple(msg, 'white', '#222').then((args) => {
             //this.set('jsonResult', JSON.stringify(args));
       })
    }

    browseForImage(){
        let self = this;
        let context = imagepicker.create({
            mode: "single" // use "multiple" for multiple selection
        });
        context
        .authorize()
        .then(function() {
            return context.present();
        })
        .then(function(selection) {
            selection.forEach(function(selected) {
                // process the selected image
                selected.getImage({ maxWidth: 200, maxHeight: 200, aspectRatio: 'fill' })
                .then((imageSource) => {
                    //console.log(imageSource.toBase64String("jpg"));
                    //this.login_service.saveImageToImgur( imageSource.toBase64String("jpg") )
                    console.log(self);
                    self.login_service.saveImageToImgur(imageSource.toBase64String("jpg"))
                    .subscribe( (res)=>{
                        console.log(JSON.stringify(res));
                    } )
                    //imageSrc.src = imageSource;
                });
            });
            //list.items = selection;
        }).catch(function (e) {
            // process error
        });

    }

    SignIn(){
   		this.login_service.signIn(this.user)
	    .subscribe((res) => {
            let message = res.json().data;
            console.log(JSON.stringify( res.headers ) )
	        console.log("reached SignIn")
            console.log(JSON.stringify(message))
            message["password"]=this.user.password;
            setString("userdata",JSON.stringify(message));
            setString("userheaders",JSON.stringify(res.headers));
            
            this.routerExtensions.navigate(["home/profile"]);
      
        }, (error) => {
            console.log("shit happen !");
            console.log(error);
            this.showSimple("Credentials are just not right");
        });
    
    	//call sign in service
    }

    SignUp(){
        this.login_service.signUp(this.newuser)
        .subscribe((res) => {
            let message = res.data;
            console.log("reached SignUp")
            console.log(this.newuser.email)
            console.log(JSON.stringify(message))
            setString("userdata",JSON.stringify(message));
            this.routerExtensions.navigate(["home/profile"]);
      
        }, (error) => {
            console.log("shit happen !");
            console.log(error);
            this.showSimple("Invalid Data ,please review");
        });
    
        //call sign in service
    }

 


}
