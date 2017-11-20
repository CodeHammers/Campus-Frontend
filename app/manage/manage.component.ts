import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { ManageService } from "./shared/services/manage.service"
import { Organization } from "./shared/classes/organization";
import { Workspace } from "./shared/classes/workspace";



@Component({
    moduleId: module.id,
    templateUrl: "./manage.component.html",
    providers: [ManageService],
    styleUrls: ["./manage.component.css"]  
})
export class ManageComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    public workspaces: Array<Workspace>;
    public organizations: Array<Organization>;
    
    constructor(private m_service: ManageService){
        m_service.getManagedOrganizations()
        .subscribe((data) => {
            console.log("Kolo tmm  !!!");
            data.Result.forEach((organization) => {
                this.organizations.push( new Organization(organization.id,organization.name) ); 
            });
        }, (error) => {
            console.log("shit happen !");
            this.organizations = [ new Organization(1,"IEEE"),new Organization(2,"K-Vector") ];
        });

        m_service.getManagedWorkspaces()
        .subscribe((data) => {
            console.log("Kolo tmm  !!!");
            data.Result.forEach((workspace) => {
                this.workspaces.push( new Workspace(workspace.id,workspace.name) ); 
            });
        }, (error) => {
            console.log("shit happen !");
            this.workspaces = [ new Workspace(1,"Magal"),new Workspace(2,"3alam khan") ];
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
