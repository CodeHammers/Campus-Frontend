import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { LoginComponent } from "./login/login.component";
import { AdminComponent } from "./admin/admin.component"

import {NativeScriptFormsModule} from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    imports: [
        NativeScriptModule,
        HomeRoutingModule,
        SharedModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule
    ],
    declarations: [
        HomeComponent,
        LoginComponent,
        AdminComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
