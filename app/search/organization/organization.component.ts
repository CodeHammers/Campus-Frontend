import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { ActivatedRoute } from "@angular/router";


import { SearchService } from "../shared/services/search.service"
import { Organization } from "../shared/classes/organization";


@Component({
    moduleId: module.id,
    templateUrl: "./organization.component.html",
    styleUrls: ["./organization.component.css"],
    providers: [SearchService]
})

export class OrganizationComponent implements OnInit {

    public search_service: SearchService;
    public organiztion_id: number;

    public organization: Organization;
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
        console.log("ngInit started, the id =");

        this.organiztion_id = this.route.snapshot.params["id"];

        console.log(this.organiztion_id);

        this.search_service.getOrganizationInfo(this.organiztion_id)
            .subscribe((res) => {

                console.log(JSON.stringify(res.json()));

                console.log('got workspace info');

                console.log(res.json().name);
                console.log(res.json().about);

                this.organization = new Organization(res.json().id, res.json().name, res.json().university, res.json().description, res.json().logo);

                this.organization.email = res.json().email;
                this.organization.phone = res.json().phone;

                console.log(this.organization.imagelink);

                //this.workSpace.name = res.json().name;
                //this.workSpace.about = res.json().about;
                //if (res.json().logo != null)
                //     this.workSpace.imagelink = res.json().logo;
                // else
                //    this.workSpace.imagelink = 'res://campus_logo_blue';

                //this.workSpace.id = res.json().id;


            }, (error) => {
                console.log(" Network Went Down ")
            });

        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    constructor(private ss: SearchService, private route: ActivatedRoute) {
        this.search_service = ss;
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