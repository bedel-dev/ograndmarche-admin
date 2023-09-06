import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';
import { UserServiceService } from 'src/app/services/users/user-service.service';

@Component({
  selector: 'app-listautorisation',
  templateUrl: './listautorisation.component.html',
  styleUrls: ['./listautorisation.component.scss']
})
export class ListautorisationComponent implements OnInit {

  constructor(private userService:UserServiceService,private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAllU()
  }










  Users:any[]=[]
  Commandes:any[]=[];
  profilurl = GlobalConstants.imagurl
  UserTotals:any
  getAllU(){
    var u:any[]= [];
    this.userService.GetAllautorisation().subscribe((res:any) =>{
      console.log(res)
      for(const item of res.data){
        console.log(item.urlprofile,this.profilurl)
        var tmptime = item.created_at.split('T')
        item.created_at = tmptime[0]
        this.Users.push(item)

        this.changeDetector.detectChanges();
      }
      this.Users.reverse();
      this.changeDetector.detectChanges();
    },error=>{

    },()=>{
      this.UserTotals = this.Users.length
      this.changeDetector.detectChanges();

    //   u.reverse()
    //   for(const item of u){
    //     this.Users.push(item)
    //  }
    })
  }

  deleteUSer(userID:any){
    this.Users = [];
    console.log(userID)
    this.userService.Deleteautorisation(userID).subscribe((res:any)=>{
      console.log(res)
      this.getAllU();
      this.changeDetector.detectChanges();
    })
  }


  onSearchChange(searchValue: any): void {
    // console.log(searchValue.target.value);
    this.Users = []

    var u:any[]= [];
    this.userService.GetAllautorisation().subscribe((res:any) =>{
      for(const item of res.data){
        //console.log(item.urlprofile,this.profilurl)
        var tmptime = item.created_at.split('T')
        item.created_at = tmptime[0]
        if(item.libelle.includes(searchValue.target.value) ){
          this.Users.push(item)

        }

        this.changeDetector.detectChanges();
      }
     console.log(this.Users.length)

      this.Users.reverse();
      this.changeDetector.detectChanges();
    },error=>{

    },()=>{
      this.UserTotals = this.Users.length
      this.changeDetector.detectChanges();
    })

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
