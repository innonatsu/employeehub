import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  formdata;
  apiUrl = "/api/addemployee";
  alertclass : string = "";
  alertmessage : string = "";

  constructor(private router : Router, private employeeService: EmployeeService, private http : Http) { }

  ngOnInit() {
    this.formdata = new FormGroup({
      id: new FormControl(0,Validators.compose([
        Validators.required
      ])),
      name: new FormControl("",Validators.compose([
        Validators.required
      ])),
      surname: new FormControl("", Validators.compose([
        Validators.required
      ])),
      dateOfBirth: new FormControl("",Validators.compose([
        Validators.required
      ])),
      dateOfEmployment: new FormControl("",Validators.compose([
        Validators.required
      ])),
      idNumber: new FormControl("",Validators.compose([
        Validators.required
      ])),
      idType: new FormControl("",Validators.compose([
        Validators.required
      ]))
    });
  }

  addEmployee(rdata){
    let rHeaders = new Headers({ 'Content-Type': 'application/json' });
    let roptions = new RequestOptions({ headers: rHeaders });
    
    return this.http.post(this.apiUrl, rdata, roptions)
        .map(response => response.json())
        .subscribe(data => this.handleError(data));
  }


  handleError(data){
    if(data !== null && data !== undefined)
    {
      console.log(data);
      this.employeeService.currentEmployee = data;
      this.router.navigate(['employee-leave']);
    }else{
      this.alertclass = "alert-danger";
      this.alertmessage = "Failed to register your account.";
    }
  }
}
