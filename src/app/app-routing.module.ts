import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { AuthGuard } from './auth.guard';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    component:HomeComponent,
    path:''
  },
  {
    component:SellerAuthComponent,
    path:'seller-auth'
  },
  {
    component:SellerHomeComponent,
    path:'seller-home',
    canActivate: [AuthGuard]
  },
  {
    component:SellerAddProductComponent,
    path:'seller-add-product',
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
