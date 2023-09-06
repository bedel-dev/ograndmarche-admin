import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-constants';
import { AuthService } from 'src/app/modules/auth';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserServiceService } from 'src/app/services/users/user-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() appHeaderDefaulMenuDisplay: boolean;
  @Input() isRtl: boolean;

  itemClass: string = 'ms-1 ms-lg-3';
  btnClass: string =
    'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px';
  userAvatarClass: string = 'symbol-35px symbol-md-40px';
  btnIconClass: string = 'svg-icon-1';
  profilurl = GlobalConstants.imagurl
  user:any = {}
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  constructor(private auth: AuthService,private changeDetector: ChangeDetectorRef,protected _notificationSvc: NotificationService,private route: ActivatedRoute,private router: Router,private userService:UserServiceService,  private http: HttpClient) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(this.authLocalStorageToken)!)
    this.getAllnotifications();
    //this.sendInfo();
    //console.log
    //this.changeDetector.detectChanges()
    //this.getUser()
  }

  sendInfo() {
    console.log("sendInfo")
    this._notificationSvc.success('Hello World','This is a success !');
  }
  notification:any[]=[]
  notificationlength:number
  getAllnotifications() {
    this.userService.getAllNotification().subscribe((res:any) => {
      console.log("response :",res)
      if(res["message"]=="authentication failed Token not valide"&&res["token"]=="error"){
        this.auth.logout();
        document.location.reload();
      }else{
      res.data.forEach((element:any) => {
          console.log(element)
        if(element.etat=="non lu"&&element.typenotif=="commande"){
          this.notification.push(element);
        }
      });
      this.notificationlength = this.notification.length  
      this.notificationlength  = 0   
      this.changeDetector.detectChanges();
      console.log("response length :",this.notificationlength)
      }
    })
  }
}
