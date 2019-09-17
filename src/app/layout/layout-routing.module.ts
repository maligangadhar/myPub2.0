import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';


const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
         // { path: 'gc', loadChildren: './supply-partner/supply-partner.module#SupplyPartnerModule' },
          { path: 'search', loadChildren: './supply-partner/supply-partner.module#SupplyPartnerModule' },
          { path: '', loadChildren: './supply-partner/supply-partner.module#SupplyPartnerModule' },
        ]
    },
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
