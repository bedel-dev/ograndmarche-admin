import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalConstants } from 'src/app/common/global-constants';
import { UserServiceService } from 'src/app/services/users/user-service.service';

@Component({
  selector: 'app-ccourselist',
  templateUrl: './ccourselist.component.html',
  styleUrls: ['./ccourselist.component.scss']
})
export class CcourselistComponent implements OnInit {

  constructor(private modalService: NgbModal, private route: ActivatedRoute,private router: Router,private userService:UserServiceService,private changeDetector: ChangeDetectorRef) { }
  step =2
  params =  this.route.snapshot.params.id
  ngOnInit(): void {
    this.GetAllUser()
    this.getUser()
  }



  modalContent:any
  modalContentLivre:any
  spinner = false
  open(content: any, item: any) {
    // this.spinner = true
    // this.changeDetector.detectChanges()
    this.modalContent = item
    this.modalService.open(content, { centered: true, size: "lg", windowClass: 'andro_quick-view-modal p-0'});
  }


  OpenModal(content: any, item: any) {
    // this.spinner = true
    // this.changeDetector.detectChanges()
    this.modalContent = item
    this.modalService.open(content, { centered: true, size: "lg", windowClass: 'andro_quick-view-modal p-0'});
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
 Commande:any[]=[]
 GetAllcommands(){
  this.userService.getAllCommande().subscribe((commande:any)=>{
        commande.data.forEach((com:any)=>{
          this.Commande.push(com)
        });
    //  console.log("commande :",commande)
  })
 }
  getAllU(){
    var u:any[]= [];
    this.spinner = true;
    this.changeDetector.detectChanges()
    this.userService.GetAllCourse().subscribe((res:any) =>{
      for(const item of res.data){

      //  console.log("item :",item)

        //Get transporteur

        //Get Client Commande Course
        this.Commande.forEach((commande:any)=>{
         // console.log(item.produit.toString(),commande.id)
          if(item.produit.toString()==commande.id.toString()){
            item.idcommande = commande.id.toString()
            item.IDClient = commande.userId
            item.numero_commande = commande.numero_commande
            item.montantlivraison = commande.montant
          }
        })

        this.Vente.forEach(element => {
          if(element.id.toString()==item.transporteuridentifiant&& element.role =="Transporteur"){
            item.transporteur = element.name
            item.role = element.role
          }
            
          if(item.IDClient==element.id.toString()){
            item.nameClient = element.name
          }

          if(item.typecommande =="ppai"){
            console.log("course :",item)
            console.log("course :",element.id)

            if(item.useridentifiant ==  element.id.toString()){
              item.nameClient = element.name  
            }
          }
        });


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
          if(item.idProduit==res.id.toString()){
            item.cate = res.categorie

          }
        })

       // console.log(this.categorieProduit)
        this.categorieProduit.forEach((cat:any)=>{
          if(item.cate==cat.id.toString()){
            item.cate  = cat.label
          }
        })
        var tmptime = item.date.split('T')
        item.created_at = tmptime[0]

        if(this.users.data.role=="fournisseur"||this.users.data.role=="Producteur"){
          if(this.users.data.id.toString()==item.idUser.toString()){
            this.Users.push(item)
          }
        } 
        if(this.users.data.role=="admin"){
          if(item.role=="Transporteur"){
           //&&item.typecommande=="ecommerce"

            if(this.params == "all"){
              this.Users.push(item)
              this.InitialeVar.push(item)
            }else{
              if(item.idcommande ==this.params){
                this.Users.push(item)
                this.InitialeVar.push(item)

              }
            }
          }

          if(item.typecommande =='ppai'){
           // console.log(item)
            item.montant = item.montant.split(",")[0]
          }
        }

        this.changeDetector.detectChanges();
      }
      this.Users.reverse();
      console.log(this.Users)
      this.changeDetector.detectChanges();
    },error=>{

    },()=>{
      this.UserTotals = this.Users.length
      this.spinner = false;
      this.changeDetector.detectChanges();
    //  this.GetInitiale()
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
    this.userService.GetAllproduit().subscribe((user:any) =>{
     // console.log("reponse:",user)
      user.data.forEach((element:any) => {
         //console.log(element)
         this.User.push(element)
      })
      console.log(this.User)
     // this.changeDetector.detectChanges()
    },error =>{

    },()=>{
      this.Users = []
      this.GetAllcommands()
      this.GetAllCate()
      this.GetAllVente()
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
    this.userService.GetAllCourse().subscribe((res:any) =>{

      for(const item of res.data){
        this.InitialeVar.push(item)
      }
      this.changeDetector.detectChanges();
      console.log("InitialeVar :",this.InitialeVar)
    },error=>{

    },()=>{

    })



  }


  DeleteCourse(idpub:any){
    //console.log(idpub)
   // this.spinner = true;
    this.changeDetector.detectChanges()

    this.userService.DeleteCourse(idpub).subscribe((res:any)=>{
      console.log(res)

    },error =>{


    },()=>{

      this.GetAllUser()
    //  this.spinner = false;

      this.changeDetector.detectChanges();
    })
    // /console.log("pub :",this.Users)
    this.changeDetector.detectChanges();

  }
  onSearchChange(searchValue: any): void {
    var u:any[]= [];
    this.Users = []
    this.changeDetector.detectChanges();
    for(const item of this.InitialeVar){
        //Get Client Commande Course
        //console.log("item: " , item)
        this.Commande.forEach((commande:any)=>{
          // console.log(item.produit.toString(),commande.id)
           if(item.produit.toString()==commande.id.toString()){
             item.idcommande = commande.id.toString()
             item.IDClient = commande.userId
             item.numero_commande = commande.numero_commande
             item.montantlivraison = commande.montant
           }
         })

         this.Vente.forEach(element => {
           if(element.id.toString()==item.transporteuridentifiant&& element.role =="Transporteur"){
             item.transporteur = element.name
             item.role = element.role
           }

           if(item.IDClient==element.id.toString()){
             item.nameClient = element.name
           }
         });



      // console.log("course :",item.idcommande)


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
           if(item.idProduit==res.id.toString()){
             item.cate = res.categorie

           }
         })

        // console.log(this.categorieProduit)
         this.categorieProduit.forEach((cat:any)=>{
           if(item.cate==cat.id.toString()){
             item.cate  = cat.label
           }
         })
         var tmptime = item.date.split('T')
         item.created_at = tmptime[0]

         if(this.users.data.role=="fournisseur"||this.users.data.role=="Producteur"){
           if(this.users.data.id.toString()==item.idUser.toString()){
             this.Users.push(item)
           }
         }
         if(this.users.data.role=="admin"){
           if(item.role=="Transporteur"){
            //
            // item.typecommande=="ecommerce" console.log(item)

             if(this.params == "all"){
              if(item.numero_commande.includes(searchValue.target.value) || item.transporteur.toString().includes(searchValue.target.value)){
                this.Users.push(item)
              }

             }else{
               if(item.idcommande ==this.params){
                if(item.numero_commande.includes(searchValue.target.value) || item.transporteur.toString().includes(searchValue.target.value)){
                  this.Users.push(item)
                }
               }
             }
           }
         }
         this.changeDetector.detectChanges();

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
