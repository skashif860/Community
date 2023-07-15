import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Services & Compononets

import { SubscribeComponent } from '../subscribe/subscribe.component';

// import { EqualValidator } from '../../shared/equal-validator.directive';


export const routes = [
  { path: '', component: SubscribeComponent, pathMatch: 'full' },

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SubscribeComponent],
  providers: []
})

export class SubscribeModule { }
