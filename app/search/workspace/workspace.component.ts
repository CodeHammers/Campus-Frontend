import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { ActivatedRoute } from "@angular/router";


import { SearchService } from "../shared/services/search.service"
import { Branch } from "../shared/classes/branch"
import { Workspace } from "../shared/classes/workspaces";
import { getNumber, setNumber } from "tns-core-modules/application-settings/application-settings";


@Component({
    moduleId: module.id,
    templateUrl: "./workspace.component.html",
    styleUrls: ["./workspace.component.css"],
    providers: [SearchService]
})

export class WorkspaceComponent implements OnInit {

    public branches: Array<Branch>;
    public search_service: SearchService;
    public loading_data: boolean;
    public workspace_id: number;

    public workSpace: Workspace;
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/

    transfertobranch(id: number){
        console.log("-----------------><---------------")
        console.log("tranferred to branch")
        setNumber("current_b",id);
        console.log(getNumber("current_b",0))
        console.log("-----------------<>---------------")
    }
    ngOnInit(): void {
        console.log("ngInit started, the id =");
        this.workspace_id = getNumber("current_w",this.route.snapshot.params["id"])
        
        this.search_service.getWorkspaceInfo(this.workspace_id)
            .subscribe((res) => {

                console.log(JSON.stringify(res.json()));

                console.log('got workspace info');

                //console.log(res.json().name);
                //console.log(res.json().about);

                this.workSpace = new Workspace(res.json().id, res.json().name, res.json().about, res.json().logo);

                console.log(this.workSpace.imagelink);

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

        console.log(this.workspace_id);

        this.search_service.getWorkspaceBranches(this.workspace_id)
            .subscribe((res) => {
                this.loading_data = false;
                this.branches = [];
                console.log(JSON.stringify(res["_body"]));

                console.log("started entering aray of results");

                res["_body"].forEach((branch) => {
                    console.log("in loop")
                    console.log(JSON.stringify(branch));
                    this.branches.push(new Branch(branch.id, branch.address));
                });

                console.log("Retreived !");

            }, (error) => {
                console.log(" Network Went Down ")

            });
        //console.log("Changes Happened");

        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    constructor(private ss: SearchService, private route: ActivatedRoute) {
        this.branches = [];
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