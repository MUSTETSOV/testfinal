import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/department.model';
// import { EyeColor } from '../models/eyeColor.model';
import { Employee } from '../models/employee.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  previewPhoto = false;
  panelTitle: string;
  datePickerConfig: Partial<BsDatepickerConfig>;
  employee: Employee;

  departments: Department[] = [
    { id: 1, name: 'Blue' },
    { id: 2, name: 'Brown' },
    { id: 3, name: 'Gray' },
    { id: 4, name: 'Green' },
    { id: 5, name: 'Hazel' }
  ];
  constructor(private _employeeService: EmployeeService,
    private _router: Router,
    private _route: ActivatedRoute) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        dateInputFormat: 'MM/DD/YYYY'
      });
  }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    });
  }

  private getEmployee(id: number) {
    if (id === 0) {
      this.employee = {
        id: null,
        _id: null,
        latitude: null,
        longitude: null,
        company: null,
        address: null,
        guid: null,
        about: null,
        tags: null,
        name: null,
        balance: null,
        age: null,
        gender: null,
        contactPreference: null,
        phoneNumber: null,
        email: '',
        registered: null,
        eyeColor: 'select',
        isActive: null,
        photoPath: null,
      };
      this.panelTitle = 'Create Employee';
      this.createEmployeeForm.reset();
    } else {
      this.panelTitle = 'Edit Employee';
      this._employeeService.getEmployee(id).subscribe(
        (employee) => this.employee = employee,
        (err: any) => console.log(err)
      );
    }
  }

  saveEmployee(): void {
    if (this.employee.id == null) {
      this._employeeService.addEmployee(this.employee).subscribe(
        (data: Employee) => {
          console.log(data);
          this.createEmployeeForm.reset();
          this._router.navigate(['list']);
        },
        (error: any) => console.log(error)
      );
    } else {
      this._employeeService.updateEmployee(this.employee).subscribe(
        () => {
          this.createEmployeeForm.reset();
          this._router.navigate(['list']);
        },
        (error: any) => console.log(error)
      );
    }
  }
}
