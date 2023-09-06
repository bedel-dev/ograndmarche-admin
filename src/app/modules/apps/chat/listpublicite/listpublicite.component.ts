import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';
import { UserServiceService } from 'src/app/services/users/user-service.service';

@Component({
  selector: 'app-listpublicite',
  templateUrl: './listpublicite.component.html',
  styleUrls: ['./listpublicite.component.scss']
})
export class ListpubliciteComponent implements OnInit {

  constructor(private userService:UserServiceService,private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.GetAllUser()
  }
  Users:any[]=[]
  Commandes:any[]=[];
  profilurl = GlobalConstants.imagurl
  UserTotals:any
  User:any[]=[]
  Vente:any[]=[]
  pipe = new DatePipe('en-US');
  getAllU(){
    var u:any[]= [];
    this.userService.getAllPubliciter().subscribe((res:any) =>{

     // console.log(res)
      for(const item of res.data){
        //console.log(item.urlprofile,this.profilurl)
        //console.log(item.prodID,item.idBenef,vente.id.toString())

        this.Vente.forEach((vente:any) => {
             if(item.idBenef==vente.id.toString()){
              item.prodID = vente.idUser
             }

         })

        this.User.forEach((res:any)=>{
          if(item.prodID==res.id.toString()){
            item.prod = res.name
            item.prodloc = res.locality
            console.log(item.prod)
          }
        })
        var tmptime = item.createdAt.split('T')
        item.created_at = tmptime[0]

        var datecreateprod = new Date(item['createdAt']);
        datecreateprod.setDate(datecreateprod.getDate() + parseInt(item.delai))
         const myFormattedDate =    this.pipe.transform(datecreateprod, 'short');
         var date= myFormattedDate?.split(",")[0]
         var testdate = date?.split("/")
         const newDate = datecreateprod.getFullYear()+"-"+testdate![0]+"-"+testdate![1];
         console.log(newDate)
         item.dataFin =newDate
        this.Users.push(item)
        this.changeDetector.detectChanges();
      }
      this.Users.reverse();
      console.log(this.Users)
      this.changeDetector.detectChanges();
    },error=>{

    },()=>{
      this.UserTotals = this.Users.length
      this.changeDetector.detectChanges();
      this.GetInitiale()
    //   u.reverse()
    //   for(const item of u){
    //     this.Users.push(item)
    //  }
    })
  }
  GetAllVente(){

    this.userService.GetAllVente().subscribe((res:any) =>{

      console.log(res)
      res.data.forEach((item:any) =>{
        this.Vente.push(item)
      }
      )
      console.log(this.Vente)
      this.changeDetector.detectChanges();
    },
    error=>{

    },
    ()=>{
      this.getAllU()
    })
  }
  GetAllUser(){
    this.userService.GetAlluser().subscribe((user:any) =>{
      user.data.forEach((element:any) => {
         //console.log(element)
         this.User.push(element)
      })
      console.log(this.User)
      this.changeDetector.detectChanges()
    },error =>{

    },()=>{
      this.GetAllVente()
    })
  }
  deleteUSer(userID:any){

    // this.Users = [];
    // console.log(userID)
    // this.userService.DeleteUser(userID).subscribe((res:any)=>{
    //   console.log(res)

    //   this.getAllU();

    // })
  }

  InitialeVar:any[]=[]
  GetInitiale(){
    var u:any[]= [];
    this.userService.getAllPubliciter().subscribe((res:any) =>{

      for(const item of res.data){
        this.InitialeVar.push(item)
      }
      this.changeDetector.detectChanges();
      console.log("InitialeVar :",this.InitialeVar)
    },error=>{

    },()=>{

    })



  }


  DeletePublicite(idpub:any){
    //console.log(idpub)
    this.Users = []
    this.userService.DeletePublicite(idpub).subscribe((res:any)=>{
      console.log(res)
      this.GetAllUser()
    })
    // /console.log("pub :",this.Users)
    this.changeDetector.detectChanges();

  }
  onSearchChange(searchValue: any): void {
    var u:any[]= [];
    this.Users = []
    this.changeDetector.detectChanges();
    for(const item of this.InitialeVar){
      //console.log(item.urlprofile,this.profilurl)
      //console.log(item.prodID,item.idBenef,vente.id.toString())


      console.log("depart :" ,this.Users);
      this.Vente.forEach((vente:any) => {
           if(item.idBenef==vente.id.toString()){
            item.prodID = vente.idUser
           }

       })

      this.User.forEach((res:any)=>{
        if(item.prodID==res.id.toString()){
          item.prod = res.name
          item.prodloc = res.locality
          //console.log(item.prod)
        }
      })
      var tmptime = item.createdAt.split('T')
      item.created_at = tmptime[0]

      var datecreateprod = new Date(item['createdAt']);
      datecreateprod.setDate(datecreateprod.getDate() + parseInt(item.delai))
       const myFormattedDate =    this.pipe.transform(datecreateprod, 'short');
       var date= myFormattedDate?.split(",")[0]
       var testdate = date?.split("/")
       const newDate = datecreateprod.getFullYear()+"-"+testdate![0]+"-"+testdate![1];
       // console.log(newDate)
       item.dataFin =newDate
       if(item.contenu.includes(searchValue.target.value) ){
        this.Users.push(item)
        this.changeDetector.detectChanges();
      }else{
      //  this.Users.push(item)
        // this.Users = this.InitialeVar
        //this.GetAllUser()
      }

    }
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
    //this.GetAllUser()
  }
}
