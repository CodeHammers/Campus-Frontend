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



@Component({
    selector: "admin",
    moduleId: module.id,
    templateUrl: "./admin.component.html",
    styleUrls: ["./admin.component.css"],
    providers: [LoginService]

})
export class AdminComponent  implements OnInit {

    public login_service: LoginService;

    ngOnInit(): void {
     
        
    }

    constructor(private ls: LoginService ,private routerExtensions: RouterExtensions){

   
    	this.login_service = ls;
    }






 


}
