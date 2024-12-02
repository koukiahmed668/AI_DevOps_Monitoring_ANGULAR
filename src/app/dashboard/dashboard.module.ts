import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostAJobRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    PostAJobRoutingModule
  ]
})
export class DashboardModule { }
