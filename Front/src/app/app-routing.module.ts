import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './Guard/auth.guard';

import { LoginComponent } from './Pages/User/Login/Login.component';
import { UserComponent } from './Pages/User/User.component';
import { RegisterComponent } from './Pages/User/Register/Register.component';
import { ProfileComponent } from './Pages/User/Profile/Profile.component';
import { HomeComponent } from './Pages/home/home.component';
import { CategoryComponent } from './Pages/category/category.component';
import { CategoryDetailComponent } from './Pages/category/categoryDetail/categoryDetail.component';
import { CategoryListComponent } from './Pages/category/categoryList/categoryList.component';
import { EmployeeComponent } from './Pages/employee/employee.component';
import { EmployeeDetailComponent } from './Pages/employee/employeeDetail/employeeDetail.component';
import { EmployeeListComponent } from './Pages/employee/employeeList/employeeList.component';
import { SupplierComponent } from './Pages/supplier/supplier.component';
import { SupplierDetailComponent } from './Pages/supplier/supplierDetail/supplierDetail.component';
import { SupplierListComponent } from './Pages/supplier/supplierList/supplierList.component';
import { ProductComponent } from './Pages/product/product.component';
import { ProductDetailComponent } from './Pages/product/productDetail/productDetail.component';
import { ProductListComponent } from './Pages/product/productList/productList.component';
import { ReportsComponent } from './Pages/reports/reports.component';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'categorias',
        component: CategoryComponent,
        children: [
          { path: 'detalhe', component: CategoryDetailComponent },
          { path: 'detalhe/:id', component: CategoryDetailComponent },
          { path: 'lista', component: CategoryListComponent },
        ]
      },
      {
        path: 'funcionarios',
        component: EmployeeComponent,
        children: [
          { path: 'detalhe', component: EmployeeDetailComponent },
          { path: 'detalhe/:id', component: EmployeeDetailComponent },
          { path: 'lista', component: EmployeeListComponent },
        ]
      },
      {
        path: 'fornecedores',
        component: SupplierComponent,
        children: [
          { path: 'detalhe', component: SupplierDetailComponent },
          { path: 'detalhe/:id', component: SupplierDetailComponent },
          { path: 'lista', component: SupplierListComponent },
        ]
      },
      {
        path: 'produtos',
        component: ProductComponent,
        children: [
          { path: 'detalhe', component: ProductDetailComponent },
          { path: 'detalhe/:id', component: ProductDetailComponent },
          { path: 'lista', component: ProductListComponent },
        ]
      },
      {
        path: 'relatorios',
        component: ReportsComponent
      },
     ]
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: 'registro', component: RegisterComponent },
      { path: 'perfil', component: ProfileComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
