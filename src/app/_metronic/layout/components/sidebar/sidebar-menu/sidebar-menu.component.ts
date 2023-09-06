import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/users/user-service.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {

  constructor(private userService:UserServiceService) { }

  ngOnInit(): void {
    this.getUser();
  }
  user:any
  getUser() {
     this.user = JSON.parse(this.userService.GetUserData()!)

  //  console.log(this.user)
  }
}
