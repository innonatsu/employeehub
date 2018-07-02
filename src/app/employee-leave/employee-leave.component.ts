import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-leave',
  templateUrl: './employee-leave.component.html',
  styleUrls: ['./employee-leave.component.css']
})
export class EmployeeLeaveComponent implements OnInit {
  leaves = [];
  formdata;
  update : boolean = false;
  hasLeaves : boolean = false;
  apiUrl : string = "/api/leaves/";
  alertclass : string = "";
  alertmessage : string = "";
  constructor(private employeeService: EmployeeService, private http : Http) { }

  ngOnInit() {
      this.loadLeaveRequests();
      this.clearFields();
  }

  loadLeaveRequests(){
    try {
      this.http.get(this.apiUrl+this.employeeService.currentEmployee.id).map(
        (response) => response.json()
      ).subscribe(
          (data) => {this.storeData(data)}
      );
    } catch (error) {
      
    }
  }

  storeData(data){
    this.leaves = data;
    this.showLeaves();
  }

  showLeaves(){
    if(this.leaves.length === 0){
      this.hasLeaves = false;
    }else{
      this.hasLeaves = true;
    }
  }

  addLeaveRequest(rdata){
    let rHeaders = new Headers({ 'Content-Type': 'application/json' });
    let roptions = new RequestOptions({ headers: rHeaders });
    let url = (this.update) ? ("/api/leaves/"+rdata.id) : "/api/addleave";
    return this.http.post(url, rdata, roptions)
        .map(response => response.json())
        .subscribe(data => this.handleError(data));
  }

  handleError(data){
    if(this.update)
    {
      this.leaves.forEach((item,index) => {
        if(item.id === data.id){
          this.leaves.splice(index,1);
        }
      });

      this.displayAlert(data,"Leave request was updated successfully.");
      this.clearFields();
      this.update = false;
    }else{
      this.displayAlert(data,"Leave request was created successfully.");
      this.clearFields();
    }
    this.leaves.push(data);
    this.showLeaves();
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

  changeRequest(id){
    let leave = this.getLeaveRequest(id);
    let pipe = new DatePipe('en-US');
    this.formdata = new FormGroup({
      id: new FormControl(id,Validators.compose([
        
      ])),
      employeeId: new FormControl(this.employeeService.currentEmployee.id,Validators.compose([
        
      ])),
      reason: new FormControl(leave.reason,Validators.compose([
        Validators.required
      ])),
      startDate: new FormControl(pipe.transform(leave.startDate, 'yyyy-MM-dd'), Validators.compose([
        Validators.required
      ])),
      endDate: new FormControl(pipe.transform(leave.endDate, 'yyyy-MM-dd'),Validators.compose([
        Validators.required
      ]))
    });
    this.update = true;
  }


  cancelUpdate(){
    this.update = false;
    this.clearFields();
  }

  getLeaveRequest(id){
    return this.leaves.find(x => x.id === id);
  }

  exportReport(){
    try {
      this.http.get("/api/report/"+this.employeeService.currentEmployee.id).map(
        (response) => response.json()
      ).subscribe(
          (data) => {this.reportData(data)}
      );
    } catch (error) {
      
    }
  }

  reportData(data){
    let emp = this.employeeService.currentEmployee.id;
    //const headers = ['Report Key', 'Report Value'];
    let csvContent = 'data:text/plain;charset=utf-8,%EF%BB%BF';
    //csvContent += headers.join(';') + '\n';
    const row1 = ['Leaves Requested', data.leaveRequests].join(' : ');
    csvContent += row1 + '\n';
    const row2 = ['Leaves Rejected', data.leavesRejected].join(' : ');
    csvContent += row2 + '\n';

    // do the download stuff
    const encodedUri = csvContent;
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'ReportFor_employee_'+emp+'.txt');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  clearFields(){
    this.formdata = new FormGroup({
      id: new FormControl(0,Validators.compose([
        
      ])),
      employeeId: new FormControl(this.employeeService.currentEmployee.id,Validators.compose([
        
      ])),
      reason: new FormControl("",Validators.compose([
        Validators.required
      ])),
      startDate: new FormControl("", Validators.compose([
        Validators.required
      ])),
      endDate: new FormControl("",Validators.compose([
        Validators.required
      ]))
    });
  }
}
