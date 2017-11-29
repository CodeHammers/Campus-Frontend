import { Component } from "@angular/core";
import { User } from "../shared/classses/user"

@Component({
    selector: "login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent  {
    public user: User;

    constructor(){

    }
}
