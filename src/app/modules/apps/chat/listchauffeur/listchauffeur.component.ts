import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalConstants } from 'src/app/common/global-constants';
import { UserServiceService } from 'src/app/services/users/user-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-listchauffeur',
  templateUrl: './listchauffeur.component.html',
  styleUrls: ['./listchauffeur.component.scss']
})
export class ListchauffeurComponent implements OnInit {

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

  modalContent:any
  OpenModal(content: any, item: any){
    this.AddUserForm.controls['vehicule'].setValue("null", {onlySelf: true});

    this.modalContent = item
    this.GetAllvehicule(content)
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

      var data = {
        "idvehicule" :idv,
        "namevehicule" : nomv,
        "matriculevehicule":matv
      }
      this.userService.UpdateChauffeur(data,this.modalContent.id).subscribe((user:any)=>{
        console.log(user);
        if(user["response"]["result"]=true){
          this.modalService.dismissAll();
          this.Users = [];
          this.InitialeVar = [];
          this.GetAllUser();
        }
      })
    }
  }

  vehicule:any[]=[]
  GetAllvehicule(c:any){
    this.vehicule = [];
    this.userService.GetAllvehicule().subscribe((res:any) =>{

      for(const item of res.data){
        if(this.userconnected.data.role =='admin'){
          //console.log(this.modalContent.idcooporate.toString()+" : "+item.idcooporate.toString())
          if(item.idcooporate.toString() == this.modalContent.idcooporate.toString()){ 
            var d = this.Users.filter((element:any)=>{
              return element.idvehicule.toString()==item.id.toString()
            })
            if(d.length == 0){
              this.vehicule.push(item);
            }   
          }          
        }else if(this.userconnected.data.role =='Transporteur'){
          if(item.idcooporate.toString() == this.userconnected.data.id.toString()){

            var d = this.Users.filter((element:any)=>{
              return element.idvehicule.toString()==item.id.toString()
            })
            if(d.length == 0){
              this.vehicule.push(item);
            }

          }
        }
      }

    },err=>{},
    ()=>{
      this.modalService.open(c, { centered: true, size: "lg", windowClass: 'andro_quick-view-modal p-0'});

    });
    
  }
  getAllU(){
    var u:any[]= [];
    this.userService.GetAllchauffeur().subscribe((res:any) =>{
     // console.log(res)
      for(const item of res.data){

        this.User.forEach((res:any)=>{
          if(item.idcooporate==res.id.toString()){
            item.cooperative = res.name
          }
        })
        if(item.state =="free"){
          item.state = "Libre";
        }

        if(item.namevehicule =="null"){
          item.namevehicule = "Aucun véhicule";
        }
        var tmptime = item.createdat.split('T')
        item.created_at = tmptime[0]

        if(this.userconnected.data.role == "admin"){
          this.Users.push(item)

        }else if(this.userconnected.data.role == "Transporteur"){
          if(item.idcooporate.toString() == this.userconnected.data.id.toString()){
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
    this.userService.GetAllchauffeur().subscribe((res:any) =>{

      for(const item of res.data){
        this.User.forEach((res:any)=>{
          if(item.idcooporate==res.id.toString()){
            item.cooperative = res.name
          }
        })

        if(item.state =="free"){
          item.state = "Libre";
        }

        if(item.namevehicule =="null"){
          item.namevehicule = "Aucun véhicule";
        }
        var tmptime = item.createdat.split('T')
        item.created_at = tmptime[0]
      
        if(this.userconnected.data.role == "admin"){
          this.InitialeVar.push(item)

        }else if(this.userconnected.data.role == "Transporteur"){
          if(item.idcooporate.toString() == this.userconnected.data.id.toString()){
            this.InitialeVar.push(item)
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
      if(item.nomprenom.toLowerCase().includes(searchValue.target.value.toLowerCase())||item.cooperative.toLowerCase().includes(searchValue.target.value.toLowerCase())){
        this.Users.push(item)
        this.changeDetector.detectChanges();
      }else{
        //this.Users.push(item)
        //this.Users = this.InitialeVar
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
