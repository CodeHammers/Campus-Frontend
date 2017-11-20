import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { OrganizationService} from "../shared/services/organization.service"
import { Organization } from "../shared/classes/organization"
import { ActivatedRoute } from "@angular/router";

@Component({
    moduleId: module.id,
    templateUrl: "./organization_detail.component.html",
    styleUrls: ["./organization_detail.component.css"],
    providers: [OrganizationService]
    
    
})
export class OrganizationDetailComponent implements OnInit {
    
    public item: Organization;
    constructor(private w_service: OrganizationService , private route: ActivatedRoute){
        //w_service.getWorkspace()
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
        const id = +this.route.snapshot.params["id"];
        this.w_service.getOrganization(id)
        .subscribe((data) => {
            console.log("Kolo tmm  !!!");
            this.item = new Organization(data.Result.id,data.Result.name);
        }, (error) => {
            console.log("shit happen !");
          
        });
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
