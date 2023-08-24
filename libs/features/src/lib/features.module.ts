import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { featuresRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(featuresRoutes), RouterModule],
})
export class FeaturesModule {}
