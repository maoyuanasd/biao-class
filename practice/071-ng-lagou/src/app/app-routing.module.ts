import { adminUserComponent } from './page/admin/user/user.component';
import { adminJobComponent } from './page/admin/job/job.component';
import { adminBaseComponent } from './page/admin/base/base.component';
import { LoginComponent } from './page/login/login.component';
import { JobDetailComponent } from './page/job-detail/job-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { CompanyDetailComponent } from './page/company-detail/company-detail.component';
import { SignupComponent } from './page/signup/signup.component';

const routes: Routes = [
  {
    path:'' , 
    component:HomeComponent
  },
  {
    path:'job/:id',
    component:JobDetailComponent
  },
  {
    path:'company/:id',
    component:CompanyDetailComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
   path:'admin',
   component: adminBaseComponent,
   children:[
    {
      path:'job',
      component:adminJobComponent
    },
    {
      path:'user',
      component:adminUserComponent
    }
   ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
