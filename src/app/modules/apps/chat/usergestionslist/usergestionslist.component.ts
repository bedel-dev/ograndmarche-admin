import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Prodruit } from 'src/app/model/produits';
import { UserModel } from 'src/app/modules/auth';
import { UserServiceService } from 'src/app/services/users/user-service.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-usergestionslist',
  templateUrl: './usergestionslist.component.html',
  styleUrls: ['./usergestionslist.component.scss']
})
export class UsergestionslistComponent implements OnInit {


  constructor(protected _notificationSvc: NotificationService,private route: ActivatedRoute,private router: Router,private userService:UserServiceService,private changeDetector: ChangeDetectorRef,private http: HttpClient) { }

  ngOnInit(): void {

    this.getAllU()
  }


  spinner:boolean=true
  Users:any[]=[]
  Commandes:any[]=[];
  profilurl = GlobalConstants.imagurl
  UserTotals:any
  initiateUser:any[]=[]
  getAllU(){
    var u:any[]= [];
    this.userService.GetAlluser().subscribe((res:any) =>{
      for(const item of res.data){















        
        this.initiateUser.push(item)
        var tmptime = item.created_at.split('T')
        item.created_at = tmptime[0]
        if(item.role == "conseiller" ||item.role == "fournisseur"||item.role == "Delegue" || item.role == "Producteur"|| item.role == "Transporteur"|| item.role == "Intrant"||item.role == "gpublic"||item.role == "Grossiste"){
          this.Users.push(item)
        }
        this.changeDetector.detectChanges();
      }
      this.Users.reverse();
      this.changeDetector.detectChanges();
    },error=>{

    },()=>{
      this.UserTotals = this.Users.length
      this.spinner = false
      this.changeDetector.detectChanges();

    //   u.reverse()
    //   for(const item of u){
    //     this.Users.push(item)
    //  }
    })
  }
  SuiviSold(data:any){



    //verification s'il est dans lidar +2250758854116
   // var contact = transporteurselected[0].contact.split(" ")[0]+transporteurselected[0].contact.split(" ")[1]
       var contact = "+2250758854116"
    this.userService.Getuserlidar(contact).subscribe((data:any) => {
      console.log(data)
      if(data.code == 500){

      }else if(data.code ==0){
        this.userService.Controlesole(data.beneficiaire.beneficiaire_carte.carte_id).subscribe((result:any) => {
          if(result.code ==0){

          }
  
        });
      }
    },error=>{
  
    },()=>{
  
    })
  
  }
  deleteUSer(userID:any){
    this.spinner = true
    this.Users = [];
    this.changeDetector.detectChanges();

    console.log(userID)
    this.userService.DeleteUser(userID).subscribe((res:any)=>{
      console.log(res)
      this.getAllU();
      this.changeDetector.detectChanges();
    },error=>{},()=>{
      this.spinner = false
    })
  }


  // onSearchChange(searchValue: any): void {
  //   // console.log(searchValue.target.value);
  //   this.Users = []
  //   this.changeDetector.detectChanges();
  //   console.log(this.Users)

  //     this.initiateUser.forEach((user:any)=>{
  //       var tmptime = user.created_at.split('T')
  //       user.created_at = tmptime[0]
  //       var newnam = user.name.toString().toLowerCase()
  //       if(newnam.includes(searchValue.target.value.toString().toLowerCase()) ){
  //         this.Users.push(user)
  //         this.changeDetector.detectChanges();
  //       }else{

  //       }
  //     })
  //     this.Users.reverse();
  //     this.UserTotals = this.Users.length
  //     this.changeDetector.detectChanges();

  // }


    onSearchChange(searchValue: any): void {
    var u:any[]= [];
    this.Users = []
    this.changeDetector.detectChanges();
    for(const item of this.initiateUser){

      var tmptime = item.created_at.split('T')
      item.created_at = tmptime[0]


        if(searchValue.target.value.toString().toLowerCase()=="all"){
          if(item.role == "Grossiste" || item.role == "conseiller" ||item.role == "fournisseur" || item.role == "Producteur"|| item.role == "Transporteur"|| item.role == "Livreur"|| item.role == "Intrant"||item.role == "gpublic"||item.role == "Delegue"){
            this.Users.push(item)
            this.changeDetector.detectChanges();
          }
        }
       else if(item.name.toString().toLowerCase().includes(searchValue.target.value.toString().toLowerCase())||item.role.toString().toLowerCase().includes(searchValue.target.value.toString().toLowerCase()) ){
        if(item.role == "Grossiste" ||item.role == "conseiller" ||item.role == "fournisseur" || item.role == "Producteur"|| item.role == "Transporteur"||item.role == "Livreur"|| item.role == "Intrant"||item.role == "gpublic"||item.role == "Delegue"){
          this.Users.push(item)
          this.changeDetector.detectChanges();
        }
      }else{
      //  this.Users.push(item)
        // this.Users = this.InitialeVar
        //this.GetAllUser()
      }

    }
    this.Users.reverse();
    this.UserTotals = this.Users.length
    this.changeDetector.detectChanges();
  }
  page = 1;
  count:number =0
  tableSize:number = 10
  tableSizes:any =[5,10,15,20]
  onTableDataChange(event:any){
    this.page=event
  //  this.GetCommande()
  }
  onTableSizeChange(event:any):void{
    this.tableSize = event.target.value
    this.page=1
    this.getAllU()
  }
}
