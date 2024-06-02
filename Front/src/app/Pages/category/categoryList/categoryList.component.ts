import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/Models/Pagination';
import { Category } from 'src/app/Models/category';
import { CategoryService } from 'src/app/Service/category.service';

@Component({
  selector: 'app-categoryList',
  templateUrl: './categoryList.component.html'
})
export class CategoryListComponent implements OnInit {
  public categories: Category[] = [];
  modalRef?: BsModalRef;
  categorytId: number = 0;
  public pagination: Pagination = new Pagination();

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private categorySerivce: CategoryService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  public getCategories() {
    this.spinner.show();
    this.categorySerivce.getCategory(this.pagination.currentPage, this.pagination.itemsPerPages)
      .subscribe({
        next: (result: any) => {
          this.categories = result.result;
          console.log(result.pagination)
          this.pagination = result.pagination;
        },
        error: (error: any) => {
          this.toastr.error(error.error.message, 'Erro');
        }
      }).add(() => this.spinner.hide());
  }

  openModal(event: any, template: TemplateRef<any>, categorytId: number): void {
    event.stopPropagation();
    this.categorytId = categorytId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.modalRef?.hide();
  }

  confirm() {
    this.spinner.show();
    this.modalRef?.hide();
    this.categorySerivce.delete(this.categorytId).subscribe({
      next: (result: any) => {
          this.toastr.success("Excluido com sucesso!", "Deletado");
          this.getCategories();
      },
      error: (error: any) => {
        this.toastr.error(error.error.message, 'Erro');
      }
    }).add(() => this.spinner.hide());
  }

  public detail(id: number): void {
    this.router.navigate([`/categorias/detalhe/${id}`]);
  }

  public pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.getCategories()
  }

  public correctWord(word: string): string {
    switch (word.toLowerCase()) {
        case 'car':
            return 'Carro';
        case 'bus':
            return 'Onibus';
        case 'van':
            return 'Van';
        default:
            return word;
    }
}

}
