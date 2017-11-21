import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ManageComponent } from "./manage.component";
import { ManageWorkspaceComponent } from "./manage_workspace/manage_workspace.component"
import { ManageOrganizationComponent } from "./manage_organization/manage_organization.component"

const routes: Routes = [
    { path: "", component: ManageComponent },
    { path: "manage_organization/:id", component: ManageOrganizationComponent },
    { path: "manage_workspace/:id", component: ManageWorkspaceComponent }    
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ManageRoutingModule { }
