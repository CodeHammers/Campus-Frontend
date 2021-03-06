import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { WorkspaceService} from "../shared/services/workspace.service"
import { Workspace } from "../shared/classes/workspace"
import { ActivatedRoute } from "@angular/router";

@Component({
    moduleId: module.id,
    templateUrl: "./workspace_detail.component.html",
    styleUrls: ["./workspace_detail.component.css"],
    providers: [WorkspaceService]
    
    
})
export class WorkspaceDetailComponent implements OnInit {
    
    public item: Workspace;
    constructor(private w_service: WorkspaceService , private route: ActivatedRoute){
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
        this.w_service.getWorkspace(id)
        .subscribe((data) => {
            console.log("Kolo tmm  !!!");
            this.item = new Workspace(data.Result.id,data.Result.name);
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
