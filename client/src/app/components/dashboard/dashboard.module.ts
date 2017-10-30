import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { routes } from './dashboard.routes';
import { DashboardComponent } from './home/dashboard.home.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        DashboardComponent
    ]
})
export class DashboardModule {
    public static routes = routes;
}
