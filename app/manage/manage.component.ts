import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { ManageService } from "./shared/services/manage.service"
import { Organization } from "./shared/classes/organization";
import { Workspace } from "./shared/classes/workspace";
import { setString, getString, setNumber } from "tns-core-modules/application-settings/application-settings";



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
    public manage_service : ManageService;
    constructor(private m_service: ManageService){
        this.manage_service = m_service;
    

    }
    ontrans(id: number){
        console.log("sent id",id)
        setNumber("sp_id",id)
        
    }
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.workspaces = [];
        this.organizations = [];

        this.manage_service.getWorkspacesManagedByUser()
        .subscribe((data) => {
            console.log("  workspace recieved!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-><")
            console.log(JSON.stringify(data));
            //token exhange 
            //if new token introduced ,update my token
            console.log( data.headers.get("Access-Token"))
            if(data.headers.get("Access-Token")!=undefined && data.headers.get("Access-Token")!=null && data.headers.get("Access-Token")!=""  ){
                console.log("update token");
                console.log(JSON.stringify( data.headers ) )
                setString("userheaders",JSON.stringify(data.headers));                
            }
            data["_body"].forEach((workspace) => {
                console.log("printing elements")
                console.log( JSON.stringify( workspace )    )
                this.workspaces.push( new Workspace(workspace.id,workspace.name) ); 
            });
        }, (error) => {
            console.log("shit happen !");
            console.log(getString("userheaders","none"))
            setString("userheaders","none");
             console.log(error);
        });

        this.manage_service.getOrganizationsManagedByUser()
        .subscribe((data) => {
            console.log(JSON.stringify(data));            
            //token exhange 
            //if new token introduced ,update my token
            console.log( data.headers.get("Access-Token"))
            if(data.headers.get("Access-Token")!=undefined && data.headers.get("Access-Token")!=null && data.headers.get("Access-Token")!="" ){
                console.log("update token");
                console.log(JSON.stringify( data.headers ) )
                setString("userheaders",JSON.stringify(data.headers));                
            }

            data["_body"].forEach((org) => {
                console.log("printing elements")                
                console.log( JSON.stringify( org ) )
                this.organizations.push( new Organization(org.id,org.name) ); 
            });
        }, (error) => {
            console.log("shit happen !");
            console.log(getString("userheaders","none"))    
            setString("userheaders","none");            
             console.log(error);
        });

    }
    saveId(b_id: number){
        setNumber("b_id",b_id);
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
