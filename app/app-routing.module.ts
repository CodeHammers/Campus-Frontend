import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: "searchWorkspace", loadChildren: "./search_workspace/search_workspace.module#SearchWorkspaceModule" },    
    { path: "searchOrganization", loadChildren: "./search_organization/search_organization.module#SearchOrganizationModule" },        
    { path: "manage", loadChildren: "./manage/manage.module#ManageModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
