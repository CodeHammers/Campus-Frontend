import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: "search", loadChildren: "./search/search.module#SearchModule" },    
    { path: "searchOrganization", loadChildren: "./search_organization/search_organization.module#SearchOrganizationModule" },        
    { path: "manage", loadChildren: "./manage/manage.module#ManageModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
