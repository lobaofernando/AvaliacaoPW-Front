import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/Models/Pagination';
import { Supplier } from 'src/app/Models/supplier';
import { SupplierService } from 'src/app/Service/supplier.service';

@Component({
  selector: 'app-supplierList',
  templateUrl: './supplierList.component.html'
})
export class SupplierListComponent implements OnInit {
  public suppliers: Supplier[] = [];
  modalRef?: BsModalRef;
  supplierId: number = 0;
  public pagination: Pagination = new Pagination();

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private supplierSerivce: SupplierService
  ) { }

  ngOnInit() {
    this.getSupplier();
  }

  public getSupplier() {
    this.spinner.show();
    this.supplierSerivce.getSupplier(this.pagination.currentPage, this.pagination.itemsPerPages)
      .subscribe({
        next: (result: any) => {
          this.suppliers = result.result;
          this.pagination = result.pagination;
        },
        error: (error: any) => {
          this.toastr.error(error.error.message, 'Erro');
        }
      }).add(() => this.spinner.hide());
  }

  openModal(event: any, template: TemplateRef<any>, supplierId: number): void {
    event.stopPropagation();
    this.supplierId = supplierId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  decline(): void {
    this.modalRef?.hide();
  }

  confirm() {
    this.spinner.show();
    this.modalRef?.hide();
    this.supplierSerivce.delete(this.supplierId).subscribe({
      next: (result: any) => {
        this.toastr.success("Excluido com sucesso!", "Deletado");
        this.getSupplier();
      },
      error: (error: any) => {
        this.toastr.error(error.error.message, 'Erro');
      }
    }).add(() => this.spinner.hide());
  }

  public detail(id: number): void {
    this.router.navigate([`/fornecedores/detalhe/${id}`]);
  }

  public pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getSupplier()
  }
}
