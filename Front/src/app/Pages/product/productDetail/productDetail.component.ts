import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/Models/product';
import { ProductService } from 'src/app/Service/product.service';
import { CategoryService } from 'src/app/Service/category.service';
import { Category } from 'src/app/Models/category';
import { Supplier } from 'src/app/Models/supplier';
import { SupplierService } from 'src/app/Service/supplier.service';

@Component({
  selector: 'app-productDetail',
  templateUrl: './productDetail.component.html'
})
export class ProductDetailComponent implements OnInit {
  form!: FormGroup;
  productId: number = 0;
  product = {} as Product;
  productSave: string = 'post';
  price: number = 0;
  public categories: Category[] = [];
  public suppliers: Supplier[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCategories();
    this.getSuppliers();
    this.createProductForm();
    this.getProduct();
    this.subscribeToProductKmChanges();
  }

  public getCategories() {
    this.spinner.show();
    this.categoryService.getCategory()
      .subscribe({
        next: (result: any) => {
          this.categories = result.result;
        },
        error: (error: any) => {
          this.toastr.error(error.error.message, 'Erro');
        }
      }).add(() => this.spinner.hide());
  }

  public getSuppliers() {
    this.spinner.show();
    this.supplierService.getSupplier()
      .subscribe({
        next: (result: any) => {
          this.suppliers = result.result;
        },
        error: (error: any) => {
          this.toastr.error(error.error.message, 'Erro');
        }
      }).add(() => this.spinner.hide());
  }

  get bsConfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY HH:mm',
      containerClass: 'theme-default',
      showWeekNumbers: false,
      showTime: true,
      timeInputFormat: 'HH:mm'
    };
  }

  createProductForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      categoryId: ['' , Validators.required],
      supplierId: ['', Validators.required],
      inOrder: ['', Validators.required],
      inStock: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  public subscribeToProductKmChanges() {
    this.form.get('transportKm')!.valueChanges.subscribe(value => {
      this.calculatePrice(value);
    });
  }

  public calculatePrice(transportKm: number) {
    if(transportKm == null)
    {
      transportKm = this.form.get('transportKm')!.value.ToNumber();
    }
    return this.price = transportKm * 0.4;
  }

  public getProduct(): void {
    const productId = this.activatedRoute.snapshot.paramMap.get('id');
    if (productId != null) {
      this.spinner.show();
      this.productSave = 'put';
      this.productService.getById(+productId).subscribe(
        (product: Product) => {
          this.product = { ...product };
          this.populateForms();
          //this.calculatePrice(product.transportKm);
        },
        (error: any) => {
          this.toastr.error(error.error.message, 'Erro');
        }
      ).add(() => this.spinner.hide());
    }
  }

  populateForms() {
    this.form.patchValue({
      name: this.product.name,
      categoryId: this.product.categoryId,
      supplierId: this.product.supplierId,
      inStock: this.product.inStock,
      inOrder: this.product.inOrder,
      price: this.product.price,
    });
  }

  public save(): void {
    this.spinner.show();
    if (this.form.valid) {
      const productData= this.form.value;
      console.log(productData);
      if (this.productSave == 'post') {
        const product = { ...productData };
        console.log(product);
        this.productService.post(product).subscribe({
          next: (result: any) => {
            this.toastr.success('Produto salvo com sucesso', "Sucesso");
            this.router.navigateByUrl('/produtos/lista')
          },
          error: (error: any) => {
            this.toastr.error(error.error.Message, 'Erro');
          }
        }).add(() => this.spinner.hide())
      } else {
        const product = { id: this.product.id, ...productData};
        console.log(product);
        this.productService.put(product).subscribe({
          next: () => {
            this.toastr.success('Produto salvo com sucesso', "Sucesso");
            this.router.navigateByUrl('/produtos/lista');
          },
          error: (error: any) => {
            this.toastr.error(error.error.Message, 'Erro');
          }
        }).add(() => this.spinner.hide())
      }
    }
  }
}
