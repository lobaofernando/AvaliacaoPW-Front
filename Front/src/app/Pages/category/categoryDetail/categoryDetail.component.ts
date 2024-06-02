import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/Models/category';
import { CategoryService } from 'src/app/Service/category.service';

@Component({
  selector: 'app-categoryDetail',
  templateUrl: './categoryDetail.component.html'
})
export class CategoryDetailComponent implements OnInit {
  form!: FormGroup;
  categoryId: number = 0;
  category = {} as Category;
  categorySystem: Category[] = [];
  categorySave: string = 'post';

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCategory();
    this.validation();
  }

  public getCategory(): void {
    const categoryId = this.activatedRoute.snapshot.paramMap.get('id');
    if (categoryId != null) {
      this.spinner.show();
      this.categorySave = 'put';
      this.categoryService.getById(+categoryId).subscribe(
        (category: Category) => {
          this.category = { ...category };
          this.form.patchValue(this.category);
        },
        (error: any) => {
          this.toastr.error(error.error.message, 'Erro');
        }
      ).add(() => this.spinner.hide());
    }
  }

  public save(): void {
    this.spinner.show();
    if (this.form.valid) {
      if (this.categorySave == 'post') {
        this.category = { ... this.form.value }

        this.categoryService.post(this.category).subscribe({
          next: (result: any) => {
            this.toastr.success('Categoria salva com sucesso', "Sucesso");
            this.router.navigateByUrl('/categorias/lista');
          },
          error: (error: any) => {
            this.toastr.error(error.error.Message, 'Erro');
          }
        }).add(() => this.spinner.hide())
      } else {
        this.category = { id: this.category.id, ... this.form.value }
        this.categoryService.put(this.category).subscribe({
          next: () => {
            this.toastr.success('Categoria salva com sucesso', "Sucesso");
            this.router.navigateByUrl('/categorias/lista');
          },
          error: (error: any) => {
            this.toastr.error(error.error.Message, 'Erro');
          }
        }).add(() => this.spinner.hide())
      }
    }
  }

  get f(): any {
    return this.form.controls;
  }

  public validation(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      companyName: ['', Validators.required],
    })
  }


}
