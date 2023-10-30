import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import {SharedModule} from "../../shared/shared.module";
import {LayoutModule} from "../../shared/modules/layout/layout.module";
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent
  ],
  imports: [

    SharedModule,
    LayoutModule,
    AuthRoutingModule,
  ],
  exports: [AuthRoutingModule]
})
export class AuthModule { }
