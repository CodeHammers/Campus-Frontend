import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { OrganizationService} from "./shared/services/organization.service"
import { Organization } from "./shared/classes/organization"

@Component({
    moduleId: module.id,
    templateUrl: "./search_organization.component.html",
    styleUrls: ["./search_organization.component.css"],
    providers: [OrganizationService]
    
    
})
export class SearchOrganizationComponent implements OnInit {
    
    public myItems: Array<Organization>;
    constructor(private w_service: OrganizationService){
        this.w_service.getOrganizations()    
        .subscribe((data) => {
            console.log("Kolo tmm  !!!");
            console.log("Error  shit happen !!");
            data.Result.forEach((organization) => {
                this.myItems.push( new Organization(organization.id,organization.name) ); 
            });
        }, (error) => {
            console.log("shit happen !");
            this.myItems = [ new Organization(1,"Ebda3"),new Organization(2,"El madrsa") ];
            return this.myItems;
        });
    }

    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
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
