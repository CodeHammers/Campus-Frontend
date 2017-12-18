import { Component, Input, OnInit } from "@angular/core";
import { getString, setString } from "tns-core-modules/application-settings/application-settings";

/* ***********************************************************
* Keep data that is displayed in your app drawer in the MyDrawer component class.
* Add new data objects that you want to display in the drawer here in the form of properties.
*************************************************************/
@Component({
    selector: "MyDrawer",
    moduleId: module.id,
    templateUrl: "./my-drawer.component.html",
    styleUrls: ["./my-drawer.component.css"]
})
export class MyDrawerComponent implements OnInit {
    /* ***********************************************************
    * The "selectedPage" is a component input property.
    * It is used to pass the current page title from the containing page component.
    * You can check how it is used in the "isPageSelected" function below.
    *************************************************************/
    public email:string;
    public name:string;
    @Input() selectedPage: string;

    ngOnInit(): void {
        if(getString("userdata","none")!="none"){
            this.email = JSON.parse( getString("userdata","none")).email 
            this.name = JSON.parse( getString("userdata","none")).name            
        }
        /* ***********************************************************
        * Use the MyDrawerComponent "onInit" event handler to initialize the properties data values.
        *************************************************************/
    }

    logout(){
        console.log("logged out sucessfully")
        setString("userdata","none");
    }
    /* ***********************************************************
    * The "isPageSelected" function is bound to every navigation item on the <MyDrawerItem>.
    * It is used to determine whether the item should have the "selected" class.
    * The "selected" class changes the styles of the item, so that you know which page you are on.
    *************************************************************/
    isPageSelected(pageTitle: string): boolean {
        return pageTitle === this.selectedPage;
    }
}
