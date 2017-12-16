import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { ManageService } from "./shared/services/manage.service"
import { Organization } from "./shared/classes/organization";
import { Workspace } from "./shared/classes/workspace";
import { setString, getString } from "tns-core-modules/application-settings/application-settings";



@Component({
    moduleId: module.id,
    templateUrl: "./manage.component.html",
    providers: [ManageService],
    styleUrls: ["./manage.component.css"]  
})
export class ManageComponent implements OnInit {
    /* ****************************************1*******************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    public workspaces: Array<Workspace>;
    public organizations: Array<Organization>;
    
    constructor(private m_service: ManageService){
        m_service.getWorkspacesManagedByUser()
        .subscribe((data) => {
            console.log(JSON.stringify(data.json()));
            //token exhange 
            //if new token introduced ,update my token
            console.log( data.headers.get("Access-Token"))
            if(data.headers.get("Access-Token")!=undefined && data.headers.get("Access-Token")!=null && data.headers.get("Access-Token")!=""  ){
                console.log("update token");
                console.log(JSON.stringify( data.headers ) )
                setString("userheaders",JSON.stringify(data.headers));                
            }
            data.json().data.forEach((workspace) => {
                this.workspaces.push( new Workspace(workspace.id,workspace.name) ); 
            });
        }, (error) => {
            console.log("shit happen !");
            console.log(getString("userheaders","none"))
             console.log(error);
        });

        m_service.getOrganizationsManagedByUser()
        .subscribe((data) => {
            console.log(JSON.stringify(data.json()));

            //token exhange 
            //if new token introduced ,update my token
            console.log( data.headers.get("Access-Token"))
            if(data.headers.get("Access-Token")!=undefined && data.headers.get("Access-Token")!=null && data.headers.get("Access-Token")!="" ){
                console.log("update token");
                console.log(JSON.stringify( data.headers ) )
                setString("userheaders",JSON.stringify(data.headers));                
            }

            data.json().data.forEach((org) => {
                this.organizations.push( new Workspace(org.id,org.name) ); 
            });
        }, (error) => {
            console.log("shit happen !");
            console.log(getString("userheaders","none"))            
             console.log(error);
        });


    }
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }
    

    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }
}
