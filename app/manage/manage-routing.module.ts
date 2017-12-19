import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ManageComponent } from "./manage.component";
import { ManageWorkspaceComponent } from "./manage_workspace/manage_workspace.component"
import { ManageOrganizationComponent } from "./manage_organization/manage_organization.component"
import { CreateOrganizationComponent } from "./create_organization/create_organization.component"
import { CreateWorkspaceComponent } from "./create_workspace/create_workspace.component";

import { ManageBranchComponent } from "./manage_workspace/manage_branch/manage_branch.component"

const routes: Routes = [
    { path: "", component: ManageComponent },
    { path: "manage_organization/:id", component: ManageOrganizationComponent },
    { path: "manage_workspace/:id", component: ManageWorkspaceComponent }    ,
    { path: "manage_workspace/:id/branch",component: ManageBranchComponent},
    { path: "create_organization",component: CreateOrganizationComponent  },
    { path: "create_workspace",component: CreateWorkspaceComponent  }
    
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ManageRoutingModule { }
