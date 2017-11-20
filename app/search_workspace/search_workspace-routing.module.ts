import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { SearchWorkspaceComponent } from "./search_workspace.component";
import { WorkspaceDetailComponent } from "./workspace_detail/workspace_detail.component";

const routes: Routes = [
    { path: "", component: SearchWorkspaceComponent },
    { path: ":id", component: WorkspaceDetailComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SearchWorkspaceRoutingModule { }
