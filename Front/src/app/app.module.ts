import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserService } from './Service/user.service';
import { EmployeeService } from './Service/employee.service';
import { CategoryService } from './Service/category.service';
import { SupplierService } from './Service/supplier.service';

import { JwtInterceptor } from './Interceptors/jwt.interceptor';

import { DateFormat } from './Helpers/DateFormat.pipe';
import { NavComponent } from './Components/nav/nav.component';
import { UserComponent } from './Pages/User/User.component';
import { LoginComponent } from './Pages/User/Login/Login.component';
import { RegisterComponent } from './Pages/User/Register/Register.component';
import { ProfileComponent } from './Pages/User/Profile/Profile.component';
import { TitleComponent } from './Components/title/title.component';
import { CategoryComponent } from './Pages/category/category.component';
import { CategoryDetailComponent } from './Pages/category/categoryDetail/categoryDetail.component';
import { CategoryListComponent } from './Pages/category/categoryList/categoryList.component';
import { EmployeeComponent } from './Pages/employee/employee.component';
import { EmployeeDetailComponent } from './Pages/employee/employeeDetail/employeeDetail.component';
import { EmployeeListComponent } from './Pages/employee/employeeList/employeeList.component';
import { SupplierComponent } from './Pages/supplier/supplier.component';
import { SupplierDetailComponent } from './Pages/supplier/supplierDetail/supplierDetail.component';
import { SupplierListComponent } from './Pages/supplier/supplierList/supplierList.component';
import { ProductService } from './Service/product.service';
import { ProductComponent } from './Pages/product/product.component';
import { ProductDetailComponent } from './Pages/product/productDetail/productDetail.component';
import { ProductListComponent } from './Pages/product/productList/productList.component';
import { DateHourFormat } from './Helpers/DateHourFormat.pipe';
import { ReportsComponent } from './Pages/reports/reports.component';
import { ReportService } from './Service/report.service';



@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    DateFormat,
    DateHourFormat,
    NavComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CategoryComponent,
    CategoryDetailComponent,
    CategoryListComponent,
    EmployeeComponent,
    EmployeeDetailComponent,
    EmployeeListComponent,
    SupplierComponent,
    SupplierDetailComponent,
    SupplierListComponent,
    ProductComponent,
    ProductDetailComponent,
    ProductListComponent,
    ReportsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      }),
    ModalModule.forRoot(),
    NgxSpinnerModule,
    PaginationModule.forRoot(),
  ],
  providers: [
    UserService,
    CategoryService,
    EmployeeService,
    SupplierService,
    ProductService,
    ReportService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
