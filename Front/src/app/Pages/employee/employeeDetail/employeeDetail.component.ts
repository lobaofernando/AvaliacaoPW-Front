import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/Models/employee';
import { EmployeeService } from 'src/app/Service/employee.service';

@Component({
  selector: 'app-employeeDetail',
  templateUrl: './employeeDetail.component.html'
})
export class EmployeeDetailComponent implements OnInit {
  employeeForm!: FormGroup;
  addressForm!: FormGroup;
  employeeId: number = 0;
  employee = {} as Employee;
  employeeSave: string = 'post';

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createEmployeeForm();
    this.createAddressForm();
    this.getEmployee();
  }

  get bsConfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY',
      containerClass: 'theme-default',
      showWeekNumbers: false
    };
  }

  createEmployeeForm() {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      birthDate: ['', Validators.required],
      companyName: ['', Validators.required],
      extension: ['', Validators.required],
      hireDate: ['', Validators.required],
      title: ['', Validators.required],
      phone: ['', Validators.required],
      homePhone: ['', Validators.required]
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

  public getEmployee(): void {
    const employeeId = this.activatedRoute.snapshot.paramMap.get('id');
    if (employeeId != null) {
      this.spinner.show();
      this.employeeSave = 'put';
      this.employeeService.getById(+employeeId).subscribe(
        (employee: Employee) => {
          this.employee = { ...employee };
          this.populateForms();
        },
        (error: any) => {
          this.toastr.error(error.error.message, 'Erro');
        }
      ).add(() => this.spinner.hide());
    }
  }

  populateForms() {
    this.employeeForm.patchValue({
      name: this.employee.name,
      title: this.employee.title,
      companyName: this.employee.companyName,
      extension: this.employee.extension,
      phone: this.employee.phone,
      homePhone: this.employee.homePhone,
      hireDate: new Date(this.employee.hireDate),
      birthDate: new Date(this.employee.birthDate)
    });

    console.log(this.employee);

    this.addressForm.patchValue({
      id: this.employee.address.id,
      streetAvenue: this.employee.address.streetAvenue,
      district: this.employee.address.district,
      zipCode: this.employee.address.zipCode,
      number: this.employee.address.number,
      complement: this.employee.address.complement,
      state: this.employee.address.state,
      city: this.employee.address.city
    });
  }

  public save(): void {
    this.spinner.show();
    if (this.employeeForm.valid && this.addressForm.valid) {
      const employeeData = this.employeeForm.value;
      const addressData = this.addressForm.value;

      if (this.employeeSave == 'post') {
        const employee = { ...employeeData, address: addressData };

        console.log(employee);

        this.employeeService.post(employee).subscribe({
          next: (result: any) => {
            this.toastr.success('Funcionário salvo com sucesso', "Sucesso");
            this.router.navigateByUrl('/funcionarios/lista');
          },
          error: (error: any) => {
            this.toastr.error(error.error.Message, 'Erro');
          }
        }).add(() => this.spinner.hide())
      } else {
        const employee = { id: this.employee.id, ...employeeData, address: addressData };
        console.log(employee);
        this.employeeService.put(employee).subscribe({
          next: () => {
            this.toastr.success('Funcionário salvo com sucesso', "Sucesso");
            this.router.navigateByUrl('/funcionarios/lista');
          },
          error: (error: any) => {
            this.toastr.error(error.error.Message, 'Erro');
          }
        }).add(() => this.spinner.hide())
      }
    }
  }
}
