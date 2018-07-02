import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-link',
  templateUrl: './menu-link.component.html',
  styleUrls: ['./menu-link.component.css']
})
export class MenuLinkComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  showPage(page){
    if(page === "leaves")
    {
      this.router.navigate(['employee-leave']); 
    }

    if(page === "disputes")
    {
      this.router.navigate(['employee-dispute']); 
    }

    if(page === "add")
    {
      this.router.navigate(['add-employee']); 
    }
  }
  
}
