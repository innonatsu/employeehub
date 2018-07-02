import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-employee-dispute',
  templateUrl: './employee-dispute.component.html',
  styleUrls: ['./employee-dispute.component.css']
})
export class EmployeeDisputeComponent implements OnInit {
  formdata;
  disputes = [];
  alertclass : string = "";
  alertmessage : string = "";
  hasDisputes : boolean = false;
  constructor(private employeeService: EmployeeService, private http : Http) { }

  ngOnInit() {
    this.loadDisputes();
    this.clearFields();
  }

  loadDisputes(){
    try {
      this.http.get("/api/disputes/"+this.employeeService.currentEmployee.id).map(
        (response) => response.json()
      ).subscribe(
          (data) => {this.storeData(data)}
      );
    } catch (error) {
      
    }
  }

  storeData(data){
    this.disputes = data;
    this.showDisputes();
  }

  showDisputes(){
    if(this.disputes.length === 0){
      this.hasDisputes = false;
    }else{
      this.hasDisputes = true;
    }
  }
  addDispute(rdata){
    let rHeaders = new Headers({ 'Content-Type': 'application/json' });
    let roptions = new RequestOptions({ headers: rHeaders });
    let url = "/api/adddispute";
    return this.http.post(url, rdata, roptions)
        .map(response => response.json())
        .subscribe(data => this.handleError(data));
  }

  handleError(data){
    this.disputes.push(data);
    this.displayAlert(data,"Dispute was logged successfully.");
    this.clearFields();
    this.showDisputes();
  }

  displayAlert(data,message){
    if(data !== null && data !== undefined){
      this.alertclass = "alert-success";
      this.alertmessage = message;
    }else{
      this.alertclass = "alert-danger";
      this.alertmessage = "Failed to process your action.";
    }
  }

  clearFields(){
    this.formdata = new FormGroup({
      id: new FormControl(0,Validators.compose([
        
      ])),
      employeeId: new FormControl(this.employeeService.currentEmployee.id,Validators.compose([
        
      ])),
      title: new FormControl("",Validators.compose([
        Validators.required
      ])),
      description: new FormControl("", Validators.compose([
        Validators.required
      ]))
    });
  }
}
