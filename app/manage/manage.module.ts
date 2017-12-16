import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { ManageRoutingModule } from "./manage-routing.module";
import { ManageComponent } from "./manage.component";
import { ManageOrganizationComponent } from "./manage_organization/manage_organization.component"
import { ManageWorkspaceComponent } from "./manage_workspace/manage_workspace.component"
import { CreateOrganizationComponent } from "./create_organization/create_organization.component"

import { NativeScriptHttpModule } from "nativescript-angular/http";


@NgModule({
    imports: [
        NativeScriptModule,
        ManageRoutingModule,
        SharedModule,
        NativeScriptHttpModule
    ],
    declarations: [
        ManageComponent,
        ManageOrganizationComponent,
        ManageWorkspaceComponent,
        CreateOrganizationComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ManageModule { }
