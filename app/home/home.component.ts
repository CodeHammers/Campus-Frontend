import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { getString, setString } from "tns-core-modules/application-settings/application-settings";
import { RouterExtensions, PageRoute } from "nativescript-angular/router";

import * as elementRegistryModule from 'nativescript-angular/element-registry';
elementRegistryModule.registerElement("CardView", () => require("nativescript-cardview").CardView);

import { User } from "./shared/classes/user";

import { LoginService } from "./shared/services/login.service"
import { Organization } from "../search/shared/classes/organization";
import { Card } from "./shared/classes/card";


@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
    providers: [LoginService]

})
export class HomeComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    public user: User;
    public pass: string;
    public login_service: LoginService;

    public favouriteOrgs: Array<Organization>;
    public cards: Array<Card>;
    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        console.log(getString("userdata", "none"));
        //setString("userdata","none")
        if (getString("userdata", "none") == "none") {
            console.log("no user data found")
            this.routerExtensions.navigate(["home/login"]);
        }


         
        
        let res = JSON.parse(getString("userdata","none"));
        this.user = new User(res["email"] ,res["password"],res["password"]);

        if(res["nickname"]!=""&&res["nickname"]!=null)
            this.routerExtensions.navigate(["home/admin"]);            
        


        console.log(JSON.stringify(this.user));

        this.favouriteOrgs = [];

        this.favouriteOrgs.push(new Organization(0, "test_name_1", "Cairo", "The worst of course", null));
        this.favouriteOrgs.push(new Organization(1, "test_name_2", "Cairo2", "The worst of course", null));
        this.favouriteOrgs.push(new Organization(2, "test_name_3", "Cairo3", "The worst of course", null));
        this.favouriteOrgs.push(new Organization(3, "test_name_4", "Cairo4", "The worst of course", null));
        console.log("Added 4 orgs");
        console.log(this.favouriteOrgs.length);

        this.cards = [];

        this.cards.push(new Card("IEEE Created Workshop","M.I",null));
        this.cards.push(new Card("FabLab Created Workshop","M.U",null));
        this.cards.push(new Card("Makan Created Workshop","M.Z",null));
        this.cards.push(new Card("Ana Created Workshop","M.T",null));
        console.log("Added 4 Cards");
        console.log(this.cards.length);

    }

    updatePassword() {
        let id = JSON.parse(getString("userdata", "none"))["id"]
        this.login_service.updatePassword(id, this.pass)
            .subscribe((data) => {
                console.log("updated Successfully")
                console.log(JSON.stringify(data))
            }, (error) => {
                console.log("shit happen !")
                console.log(error)

            })

    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }
    constructor(private routerExtensions: RouterExtensions, private ls: LoginService) {
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
