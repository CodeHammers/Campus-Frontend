import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { SearchOrganizationRoutingModule } from "./search_organization-routing.module";

import { SearchOrganizationComponent } from "./search_organization.component";
import { OrganizationDetailComponent } from "./organization_detail/organization_detail.component"

import { NativeScriptHttpModule } from "nativescript-angular/http";


@NgModule({
    imports: [
        NativeScriptModule,
        SearchOrganizationRoutingModule,
        SharedModule,
        NativeScriptHttpModule
    ],
    declarations: [
        SearchOrganizationComponent,
        OrganizationDetailComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SearchOrganizationModule { }
