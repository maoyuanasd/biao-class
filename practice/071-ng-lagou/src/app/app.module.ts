import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { JobDetailComponent } from './page/job-detail/job-detail.component';
import { CompanyDetailComponent } from './page/company-detail/company-detail.component';
import { GlobalNavComponent } from './component/global-nav/global-nav.component';
import { LoginComponent } from './page/login/login.component';
import { SignupComponent } from './page/signup/signup.component';
import { GlobalFooterComponent } from './component/global-footer/global-footer.component';
import { GoTopComponent } from './component/go-top/go-top.component';
import { adminBaseComponent } from './page/admin/base/base.component';
import { adminJobComponent } from './page/admin/job/job.component';
import { adminUserComponent } from './page/admin/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JobDetailComponent,
    CompanyDetailComponent,
    GlobalNavComponent,
    LoginComponent,
    SignupComponent,
    GlobalFooterComponent,
    GoTopComponent,
    adminBaseComponent,
    adminJobComponent,
    adminUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
