import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';
import { UserServiceService } from 'src/app/services/users/user-service.service';

@Component({
  selector: 'app-listconseil',
  templateUrl: './listconseil.component.html',
  styleUrls: ['./listconseil.component.scss']
})
export class ListconseilComponent implements OnInit {

  constructor(private userService:UserServiceService,private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.GetAllUser()
    this.getUser()
  }
  Users:any[]=[]
  Commandes:any[]=[];
  profilurl = GlobalConstants.imagurl
  UserTotals:any
    User:any[]=[]
  Vente:any[]=[]
  pipe = new DatePipe('en-US');


  users:any
  getUser() {
    this.users = JSON.parse(this.userService.GetUserData()!)
    this.changeDetector.detectChanges()
    console.log(this.users)
 }
  getAllU(){
    var u:any[]= [];
    this.userService.getAllConseil().subscribe((res:any) =>{
     // console.log(res)
      for(const item of res.data){
        console.log("User",this.User)
        //console.log(item.prodID,item.idBenef,vente.id.toString())
        // this.Vente.forEach((vente:any) => {
        //      if(item.idUser==vente.id.toString()){
        //       item.prodID = vente.id;
        //       item.prod = vente.name;
        //       item.prodloc = vente.locality
        //      }
        //  })

        this.User.forEach((res:any)=>{
          if(item.id_produitconseil==res.id.toString()){
           // item.cate = res.categorie
            item.produit = res.libelle
            item.urlimageProduit = res.url_image
          }
        })
        item.description = item.contenu_url.split("==")[0]
       // console.log(this.categorieProduit)
        // this.categorieProduit.forEach((cat:any)=>{
        //   if(item.cate==cat.id.toString()){
        //     item.cate  = cat.label
        //   }
        // })
        var tmptime = item.created_at.split('T')
        item.created_at = tmptime[0]
        //  console.log(item['created_at'])
        //console.log(item.prod)

        // var datecreateprod = new Date(item['created_at']);
        //    datecreateprod.setDate(datecreateprod.getDate() + parseInt(item.delai))
        //  const myFormattedDate =    this.pipe.transform(datecreateprod, 'short');
        //  var date= myFormattedDate?.split(",")[0]
        //  var testdate = date?.split("/")
        //  const newDate = datecreateprod.getFullYear()+"-"+testdate![0]+"-"+testdate![1];
        //  item.dataFin =newDate


        if(this.users.data.role=="fournisseur"||this.users.data.role=="Producteur"){
          if(this.users.data.id.toString()==item.idUser.toString()){
            this.Users.push(item)
            this.InitialeVar.push(item)
          }
        }
        if(this.users.data.role=="admin"||this.users.data.role=="adminfafa"){
          this.Users.push(item)
          this.InitialeVar.push(item)
        }
        this.changeDetector.detectChanges();
      }
      this.Users.reverse();
      console.log(this.Users)
      this.changeDetector.detectChanges();
    },error=>{

    },()=>{
      this.UserTotals = this.Users.length
      this.changeDetector.detectChanges();
     // this.GetInitiale()
    })
  }

  GetAllVente(){
    this.userService.GetAlluser().subscribe((res:any) =>{
      console.log(res)
      res.data.forEach((item:any) =>{
        this.Vente.push(item)
      }
      )
     // console.log(this.Vente)
      this.changeDetector.detectChanges();
    },
    error=>{

    },
    ()=>{
      this.getAllU()
    })
  }

  GetAllUser(){
    this.userService.GetAllproduitConseil().subscribe((user:any) =>{
     // console.log("reponse:",user)
      user.data.forEach((element:any) => {
         //console.log(element)
      this.User.push(element)
      })
      console.log(this.User)
     // this.changeDetector.detectChanges()
    },error =>{

    },()=>{
      //this.GetAllCate()
     // this.GetAllVente()
     this.getAllU();
    })
  }
  categorieProduit:any[]=[]
  GetAllCate(){
    this.userService.GetAllCategorie().subscribe((user:any) =>{
      user.data.forEach((element:any) => {
         //console.log(element)
         this.categorieProduit.push(element)
      })
      console.log(this.User)
     // this.changeDetector.detectChanges()
    },error =>{

    },()=>{
     //this.GetAllVente()
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
    this.userService.getAllVente().subscribe((res:any) =>{

      for(const item of res.data){
        this.InitialeVar.push(item)
      }
      this.changeDetector.detectChanges();
      console.log("InitialeVar :",this.InitialeVar)
    },error=>{

    },()=>{

    })



  }


  DeleteVente(idpub:any){
    //console.log(idpub)
    this.Users = []
    this.userService.DeleteGuide(idpub).subscribe((res:any)=>{
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
        this.Vente.forEach((vente:any) => {
          if(item.idUser==vente.id.toString()){
           item.prodID = vente.id;
           item.prod = vente.name;
           item.prodloc = vente.locality
          }
      })


      this.User.forEach((res:any)=>{
        if(item.categorieProduitId==res.id.toString()){
          item.cate = res.label

        }
      })
     var tmptime = item.created_at.split('T')
     item.created_at = tmptime[0]
     //  console.log(item['created_at'])
    // console.log(item.prod)

     // var datecreateprod = new Date(item['created_at']);
     //    datecreateprod.setDate(datecreateprod.getDate() + parseInt(item.delai))
     //  const myFormattedDate =    this.pipe.transform(datecreateprod, 'short');
     //  var date= myFormattedDate?.split(",")[0]
     //  var testdate = date?.split("/")
     //  const newDate = datecreateprod.getFullYear()+"-"+testdate![0]+"-"+testdate![1];
     //  item.dataFin =newDate

       if(item.produit.toLowerCase().includes(searchValue.target.value.toLowerCase()) ){
        if(this.users.data.role=="admin"||this.users.data.role=="adminfafa"){
          this.Users.push(item)
          }
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
