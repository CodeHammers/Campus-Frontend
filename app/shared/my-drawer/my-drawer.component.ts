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
    public logo_url:string;
    @Input() selectedPage: string;

    ngOnInit(): void {
        //this.logo_url = "https://avatars0.githubusercontent.com/u/26489087?s=400&v=4";
        this.logo_url = "https://scontent-cai1-1.xx.fbcdn.net/v/t1.0-9/22405387_1440232679427453_4319570387214555074_n.jpg?oh=35e277f177a5b54d00cd2c89b563be58&oe=5AC238DB";
        if(getString("userdata","none")!="none"){

            //image
            if( JSON.parse( getString("userdata","")).image != null)
              this.logo_url = JSON.parse( getString("userdata","")).image
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
