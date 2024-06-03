import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/Models/Pagination';
import { Category } from 'src/app/Models/category';
import { Product } from 'src/app/Models/product';
import { ProductService } from 'src/app/Service/product.service';

@Component({
  selector: 'app-productList',
  templateUrl: './productList.component.html'
})
export class ProductListComponent implements OnInit {
  public products: Product[] = [];
  modalRef?: BsModalRef;
  productId: number = 0;
  public pagination: Pagination = new Pagination();
  public categories: Category[] = [];

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private productSerivce: ProductService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  public getProducts() {
    this.spinner.show();
    this.productSerivce.getProducts(this.pagination.currentPage, this.pagination.itemsPerPages)
      .subscribe({
        next: (result: any) => {
          this.products = result.result;
          this.pagination = result.pagination;
        },
        error: (error: any) => {
          this.toastr.error(error.error.message, 'Erro');
        }
      }).add(() => this.spinner.hide());
  }

  openModal(event: any, template: TemplateRef<any>, productId: number): void {
    event.stopPropagation();
    this.productId = productId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  decline(): void {
    this.modalRef?.hide();
  }

  confirm() {
    this.spinner.show();
    this.modalRef?.hide();
    this.productSerivce.delete(this.productId).subscribe({
      next: (result: any) => {
        this.toastr.success("Excluido com sucesso!", "Deletado");
        this.getProducts();
      },
      error: (error: any) => {
        this.toastr.error(error.error.message, 'Erro');
      }
    }).add(() => this.spinner.hide());
  }

  public detail(id: number): void {
    this.router.navigate([`/produtos/detalhe/${id}`]);
  }

  public pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getProducts()
  }

}
