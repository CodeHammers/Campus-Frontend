import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { ManageRoutingModule } from "./manage-routing.module";
import { ManageComponent } from "./manage.component";

@NgModule({
    imports: [
        NativeScriptModule,
        ManageRoutingModule,
        SharedModule
    ],
    declarations: [
        ManageComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ManageModule { }
