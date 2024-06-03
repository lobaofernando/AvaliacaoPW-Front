import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Supplier } from 'src/app/Models/supplier';
import { SupplierService } from 'src/app/Service/supplier.service';

@Component({
  selector: 'app-supplierDetail',
  templateUrl: './supplierDetail.component.html'
})
export class SupplierDetailComponent implements OnInit {
  supplierForm!: FormGroup;
  addressForm!: FormGroup;
  supplierId: number = 0;
  supplier = {} as Supplier;
  supplierSave: string = 'post';

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createSupplierForm();
    this.createAddressForm();
    this.getSupplier();
  }

  get bsConfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY',
      containerClass: 'theme-default',
      showWeekNumbers: false,
      showTime: true,
      timeInputFormat: 'HH:mm'
    };
  }

  createSupplierForm() {
    this.supplierForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  createAddressForm() {
    this.addressForm = this.fb.group({
      id: [0],
      streetAvenue: ['', Validators.required],
      district: ['', Validators.required],
      zipCode: ['', Validators.required],
      number: [''],
      complement: [''],
      state: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  public getSupplier(): void {
    const supplierId = this.activatedRoute.snapshot.paramMap.get('id');
    if (supplierId != null) {
      this.spinner.show();
      this.supplierSave = 'put';
      this.supplierService.getById(+supplierId).subscribe(
        (supplier: Supplier) => {
          this.supplier = { ...supplier };
          this.populateForms();
        },
        (error: any) => {
          this.toastr.error(error.error.message, 'Erro');
        }
      ).add(() => this.spinner.hide());
    }
  }

  populateForms() {
    this.supplierForm.patchValue({
      name: this.supplier.name,
      title: this.supplier.title,
      phone: this.supplier.phone
    });

    this.addressForm.patchValue({
      id: this.supplier.address.id,
      streetAvenue: this.supplier.address.streetAvenue,
      district: this.supplier.address.district,
      zipCode: this.supplier.address.zipCode,
      number: this.supplier.address.number,
      complement: this.supplier.address.complement,
      state: this.supplier.address.state,
      city: this.supplier.address.city
    });
  }

  public save(): void {
    this.spinner.show();
    if (this.supplierForm.valid && this.addressForm.valid) {
      const supplierData = this.supplierForm.value;
      const addressData = this.addressForm.value;

      
      if (this.supplierSave == 'post') {
        const supplier = { ...supplierData, address: addressData };
        console.log(this.supplier);

        this.supplierService.post(supplier).subscribe({
          next: (result: any) => {
            this.toastr.success('Fornecedor salvo com sucesso', "Sucesso");
            this.router.navigateByUrl('/fornecedores/lista');
          },
          error: (error: any) => {
            this.toastr.error(error.error.Message, 'Erro');
          }
        }).add(() => this.spinner.hide())
      } else {
        const supplier = { id: this.supplier.id, ...supplierData, address: addressData };
        console.log(this.supplier);
        this.supplierService.put(supplier).subscribe({
          next: () => {
            this.toastr.success('Fornecedor salvo com sucesso', "Sucesso");
            this.router.navigateByUrl('/fornecedores/lista');
          },
          error: (error: any) => {
            this.toastr.error(error.error.Message, 'Erro');
          }
        }).add(() => this.spinner.hide())
      }
    }
  }
}
