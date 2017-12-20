import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { HomeComponent } from "./home.component";
import { LoginComponent } from "./login/login.component";
import { AdminComponent } from "./admin/admin.component"

const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "profile", component: HomeComponent },
    { path: "admin",component: AdminComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class HomeRoutingModule { }
