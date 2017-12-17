import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { Workspace } from "./shared/classes/workspaces";
import { Organization } from "./shared/classes/organization";
import { SharedModule } from "../shared/shared.module";
import { SearchBar } from "ui/search-bar";

import { SearchService } from "./shared/services/search.service"

import { SnackBar, SnackBarOptions } from "nativescript-snackbar";

@Component({
    moduleId: module.id,
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.css"],
    providers: [SearchService]
})

export class SearchComponent implements OnInit {

    public workspaces: Array<Workspace>;
    public organizations: Array<Organization>;
    public search_service: SearchService;
    public loading_data: boolean;

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

        console.log("ngInit started");

        //console.log("Changes Happened");

        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    /// Show a simple snackbar with no actions
    showSimple(msg: string) {
        // Create an instance of SnackBar
        let snackbar = new SnackBar();
        snackbar.simple(msg, 'white', '#222').then((args) => {
            //this.set('jsonResult', JSON.stringify(args));
        })
    }

    constructor(private ss: SearchService) {
        this.search_service = ss;
        this.loading_data = false;
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

    searchWorkspace(args) {

        let workspaceSearchName = <SearchBar>args.object;

        console.log("search button pressed");
        console.log(workspaceSearchName.text);

        console.log();

        if (workspaceSearchName.text != "") {
            this.loading_data = true;

            this.workspaces = [];

            this.search_service.getWorkspaces(workspaceSearchName.text).subscribe((res) => {

                this.workspaces = [];

                this.loading_data = false;
                console.log("Got the JSON");
                //rather than reteriving the data and converting it to json in service
                //we will use the full data (headers and body)
                //res.json() drops the json part 
                //res["_body"] demonstrate how much you understand the 
                //structure of the incoming data
                //try to log res as a whole and see what is the output
                console.log(JSON.stringify(res["_body"]));

                console.log("started entering aray of results");

                res["_body"].forEach((workspace) => {
                    console.log("in loop")
                    console.log(JSON.stringify(workspace));
                    this.workspaces.push(new Workspace(workspace.id, workspace.name, workspace.name, workspace.logo));
                    console.log(workspace.name);
                    console.log(workspace.logo);
                });

                console.log("Retreived !");
                //return this.items;

            }, (error) => {

                console.log("SHIT HAS HAPPANED !!!!!!!!!!");

                this.showSimple("No Internet Connection Found...");
            });

        } else {
            this.loading_data = false;

            this.workspaces = [];

        }
    }

    searchOrganiztion(args) {

        let organiztionSearchName = <SearchBar>args.object;

        console.log("search button pressed");
        console.log(organiztionSearchName.text);

        if (organiztionSearchName.text != "") {
            this.loading_data = true;
            //initializing the array before adding elements 
            this.organizations = [];

            this.search_service.getOrganization(organiztionSearchName.text).subscribe((res) => {

                this.organizations = [];

                this.loading_data = false;
                console.log("Got the JSON");
                //rather than reteriving the data and converting it to json in service
                //we will use the full data (headers and body)
                //res.json() drops the json part 
                //res["_body"] demonstrate how much you understand the 
                //structure of the incoming data
                //try to log res as a whole and see what is the output
                console.log(JSON.stringify(res["_body"]));

                console.log("started entering aray of results");

                res["_body"].forEach((organization) => {
                    console.log("in loop")
                    console.log(JSON.stringify(organization));
                    this.organizations.push(new Organization(organization.id, organization.name, organization.university, "",organization.logo));
                    console.log(organization.name);
                });

                console.log("Retreived !");
                //return this.items;

            }, (error) => {

                console.log("SHIT HAS HAPPANED !!!!!!!!!!");

                this.showSimple("No Internet Connection Found...");
            });
        } else {
            this.loading_data = false;

            this.organizations = [];
        }
    }
}