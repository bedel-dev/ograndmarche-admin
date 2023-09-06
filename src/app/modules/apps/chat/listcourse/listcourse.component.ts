import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalConstants } from 'src/app/common/global-constants';
import { UserServiceService } from 'src/app/services/users/user-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-listcourse',
  templateUrl: './listcourse.component.html',
  styleUrls: ['./listcourse.component.scss']
})
export class ListcourseComponent implements OnInit {

  constructor(private modalService: NgbModal, private userService:UserServiceService,private changeDetector: ChangeDetectorRef) {
    this.AddUserForm = new FormGroup({
      vehicule:new FormControl()
    })
     this.AddUserForm.controls['vehicule'].setValue("null", {onlySelf: true});
    }
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  userconnected:any;
  ngOnInit(): void {
    
    var hauth =  localStorage.getItem(this.authLocalStorageToken)
    this.userconnected = JSON.parse(hauth!)
    this.GetAllUser();
  }
  Users:any[]=[]
  Commandes:any[]=[];
  profilurl = GlobalConstants.imagurl
  UserTotals:any
  User:any[]=[]
  Vente:any[]=[]
  pipe = new DatePipe('en-US');
  spinner = false

  modalContent:any
  modalContent2:any

  OpenModal(content: any, item: any){
    this.AddUserForm.controls['vehicule'].setValue("null", {onlySelf: true});
    console.log(item);
    this.modalContent = item
    this.modalService.open(content, { centered: true, size: "lg", windowClass: 'andro_quick-view-modal p-0'});
  }

  OpenModal2(content: any, item: any){
    
    this.AddUserForm.controls['vehicule'].setValue("null", {onlySelf: true});
    this.modalContent2 = item
    this.GetAllvehicule(content);
  }

  AddUserForm: FormGroup;
  AddAutorisationForm: FormGroup;

  get f() {
    return this.AddUserForm.controls;
  }
  
  errorfeildCooporate = false;

    saveDrive(){

    if(this.f.vehicule.value == "null"){
      this.errorfeildCooporate = true
    }else{
      this.errorfeildCooporate = false
    }

    console.log(this.f.vehicule.value)

    if(!this.errorfeildCooporate){
      var idv = this.f.vehicule.value.split("-")[2];
      var nomv = this.f.vehicule.value.split("-")[0];
      var matv = this.f.vehicule.value.split("-")[1];


      var datas = {
        "statut" :"accepter",
        "idchauffeur":idv,
        "infochauffeur":this.f.vehicule.value,
        "statutpaiement":"partiel"
      }

      console.log(datas);

      this.userService.UpdateCourse(datas,this.modalContent2.id).subscribe((r:any)=>{
        console.log(r);
      },error =>{

      },()=>{
        var data = {
          "state" :"en course",
        }
        this.userService.UpdateChauffeur(data,idv).subscribe((user:any)=>{
          console.log(user);
          if(user["response"]["result"]=true){
            this.modalService.dismissAll();
            this.Users = [];
            this.InitialeVar = [];
            this.GetAllUser();
          }
        })
      });
    }
  }

  saveUpdatecourse(statut:String,user:any,statutp:string){

    // if(this.f.vehicule.value == "null"){
    //   this.errorfeildCooporate = true
    // }else{
    //   this.errorfeildCooporate = false
    // }

    console.log(this.f.vehicule.value)
    this.errorfeildCooporate = false
    if(!this.errorfeildCooporate){

     var datas = {
      "statutpaiement":statutp,
      "statut" :statut,
      };

      this.userService.UpdateCourse(datas,user.id).subscribe((r:any)=>{
            if(statut == "arriver"){

            }else{
              this.Users = [];
              this.InitialeVar = [];
              this.GetAllUser();
            }
      },error =>{

      },()=>{


        if(statut == "arriver"){
          var data = {
            "state" :"free",
            "idvehicule":"null",
            "namevehicule":"null",
            "matriculevehicule":"null"
          }
          this.userService.UpdateChauffeur(data,user.idchauffeur).subscribe((user:any)=>{
            console.log(user);
            if(user["response"]["result"]=true){
              this.modalService.dismissAll();
              this.Users = [];
              this.InitialeVar = [];
              this.GetAllUser();
            }
          })
        }
      });
    }
  }

  vehicule:any[]=[]
  msg = ""
  GetAllvehicule(c:any){
    this.vehicule = [];
    this.userService.GetAllchauffeur().subscribe((res:any) =>{
      for(const item of res.data){
        if(this.userconnected.data.role =='admin'){
          if(item.idcooporate.toString() == this.modalContent2.transporteuridentifiant.toString()){ 
            if(item.state == "free"&&item.idvehicule.toString() !== "null"){
              console.log(item);
              this.vehicule.push(item);
            }else if(item.state == "free"&&item.idvehicule.toString() == "null"){
              this.msg ="Veuillez attribuer un véhicule à l'un de vos chauffeurs libre."
            }else if(item.state !== "free"&&item.idvehicule.toString()!== "null"){
              this.msg ="Aucun chauffeur disponible"
            }else{
              this.msg ="Aucun chauffeur disponible"
            }
          } else{
            this.msg ="Aucun chauffeur"
          } 
        }else if(this.userconnected.data.role =='Transporteur'){
          if(item.idcooporate.toString() == this.userconnected.data.id.toString()){
            if(item.state == "free"&&item.idvehicule.toString() !== "null"){
              console.log(item);
              this.vehicule.push(item);
            }else if(item.state == "free"&&item.idvehicule.toString() == "null"){
              this.msg ="Veuillez attribuer un véhicule à l'un de vos chauffeurs libre."
            }else if(item.state !== "free"&&item.idvehicule.toString()!== "null"){
              this.msg ="Aucun chauffeur disponible"
            }else{
              this.msg ="Aucun chauffeur disponible"
            }
          }
        }
      }
      this.changeDetector.detectChanges();
    },error=>{
      
    },()=>{
      this.modalService.open(c, { centered: true, size: "lg", windowClass: 'andro_quick-view-modal p-0'});

    });

  }
  getAllU(){
    var u:any[]= [];
    this.userService.GetAllCourse().subscribe((res:any) =>{
      console.log("course",res)
      for(const item of res.data){

        this.User.forEach((res:any)=>{
          if(item.transporteuridentifiant==res.id.toString()){
            item.transporteur = res.name
          }
        })

        var tmptime = item.date.split('T')
        item.created_at = tmptime[0]
        item.montanttt = item.montant.split(",")[0]

        if(item.statutpaiement.toString()=="null"){
          item.statutpaiement = "non payé";
        }

        this.Vente.forEach(element => {
          if(item.useridentifiant==element.id.toString()){
            item.nameClient = element.name
          }

          if(item.typecommande =="ppai"){
            if(item.useridentifiant ==  element.id.toString()){
              item.nameClient = element.name  
            }
          }
        });

        if(this.userconnected.data.role == "admin"){
          if(item.typecommande =="ppai"){
            item.avance = item.montant.split(",")[1] 
          }else{
            item.avance = 0
          }
          this.Users.push(item)
        }else if(this.userconnected.data.role == "Transporteur"){
          if(item.transporteuridentifiant.toString() == this.userconnected.data.id.toString()){
            if(item.typecommande =="ppai"){
              item.avance = item.montant.split(",")[1] 
            }else{
              item.avance = 0
            }
            this.Users.push(item)
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
      this.changeDetector.detectChanges();
      this.GetInitiale()
    })
  }

  GetAllUser(){
    this.userService.GetAlluser().subscribe((user:any) =>{
      user.data.forEach((element:any) => {
        this.Vente.push(element);
        if(element.role=="Transporteur"){
          this.User.push(element)
        }
      })
      this.changeDetector.detectChanges()
    },error =>{

    },()=>{
     this.getAllU()
    })
  }

  DeleteProduct(userID:any){
    this.Users = [];
    console.log(userID)
    this.userService.DeleteUser(userID).subscribe((res:any)=>{
      console.log(res)

      this.getAllU();

    })
  }

  InitialeVar:any[]=[]
  GetInitiale(){
    var u:any[]= [];
    this.userService.GetAllCourse().subscribe((res:any) =>{

      for(const item of res.data){
        this.User.forEach((res:any)=>{
          if(item.transporteuridentifiant==res.id.toString()){
            item.transporteur = res.name
          }
        })

        var tmptime = item.date.split('T')
        item.created_at = tmptime[0]
        item.montanttt = item.montant.split(",")[0]

        if(item.statutpaiement.toString()=="null"){
          item.statutpaiement = "non payé";
        }

        this.Vente.forEach(element => {
          if(item.useridentifiant==element.id.toString()){
            item.nameClient = element.name
          }

          if(item.typecommande =="ppai"){
            if(item.useridentifiant ==  element.id.toString()){
              item.nameClient = element.name  
            }
          }
        });

        if(this.userconnected.data.role == "admin"&&item.typecommande =="ppai"){
          this.InitialeVar.push(item)
          item.avance  = item.montant.split(",")[1]
        }else if(this.userconnected.data.role == "Transporteur"&&item.typecommande =="ppai"){
          if(item.transporteuridentifiant.toString() == this.userconnected.data.id.toString()){
            this.InitialeVar.push(item)
            item.avance = item.montant.split(",")[1]   
          }
        }
      }
      this.changeDetector.detectChanges();
      console.log("InitialeVar :",this.InitialeVar)
    },error=>{

    },()=>{

    })



  }


  DeletesProduct(idpub:any){
    //console.log(idpub)
    this.Users = []
    this.userService.DeleteProduit(idpub).subscribe((res:any)=>{
      console.log(res)
     // this.GetAllUser()
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
      if(item.nameClient.toLowerCase().includes(searchValue.target.value.toLowerCase()||item.transporteur.toLowerCase().includes(searchValue.target.value.toLowerCase())) ){
        this.Users.push(item)
        this.changeDetector.detectChanges();
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
    //this.GetAllUser()
  }
}
