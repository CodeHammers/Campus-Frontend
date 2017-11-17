import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { SearchWorkspaceComponent } from "./search_workspace.component";

const routes: Routes = [
    { path: "", component: SearchWorkspaceComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SearchWorkspaceRoutingModule { }
