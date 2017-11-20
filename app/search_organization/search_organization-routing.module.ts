import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { SearchOrganizationComponent } from "./search_organization.component";
import { OrganizationDetailComponent } from "./organization_detail/organization_detail.component";

const routes: Routes = [
    { path: "", component: SearchOrganizationComponent },
    { path: ":id", component: OrganizationDetailComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SearchOrganizationRoutingModule { }
