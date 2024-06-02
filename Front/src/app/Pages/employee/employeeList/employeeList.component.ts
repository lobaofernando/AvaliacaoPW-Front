import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/Models/employee';
import { Pagination } from 'src/app/Models/Pagination';
import { EmployeeService } from 'src/app/Service/employee.service';

@Component({
  selector: 'app-employeeList',
  templateUrl: './employeeList.component.html'
})
export class EmployeeListComponent implements OnInit {
  public employees: Employee[] = [];
  modalRef?: BsModalRef;
  employeeId: number = 0;
  public pagination: Pagination = new Pagination();

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.getEmployee();
  }

  public getEmployee() {
    this.spinner.show();
    this.employeeService.getEmployees(this.pagination.currentPage, this.pagination.itemsPerPages)
      .subscribe({
        next: (result: any) => {
          this.employees = result.result;
          this.pagination = result.pagination;
        },
        error: (error: any) => {
          this.toastr.error(error.error.message, 'Erro');
        }
      }).add(() => this.spinner.hide());
  }

  openModal(event: any, template: TemplateRef<any>, employeeId: number): void {
    event.stopPropagation();
    this.employeeId = employeeId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  decline(): void {
    this.modalRef?.hide();
  }

  confirm() {
    this.spinner.show();
    this.modalRef?.hide();
    this.employeeService.delete(this.employeeId).subscribe({
      next: (result: any) => {
        this.toastr.success("Excluido com sucesso!", "Deletado");
        this.getEmployee();
      },
      error: (error: any) => {
        this.toastr.error(error.error.message, 'Erro');
      }
    }).add(() => this.spinner.hide());
  }

  public detail(id: number): void {
    this.router.navigate([`/funcionarios/detalhe/${id}`]);
  }

  public pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getEmployee()
  }

}
