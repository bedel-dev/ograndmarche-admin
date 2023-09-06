import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { timeout } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { GlobalConstants } from 'src/app/common/global-constants';
import { UserServiceService } from 'src/app/services/users/user-service.service';

@Component({
  selector: 'app-listfournisseurs',
  templateUrl: './listfournisseurs.component.html',
  styleUrls: ['./listfournisseurs.component.scss']
})
export class ListfournisseursComponent implements OnInit {

  constructor(private http:HttpClient,private userService:UserServiceService,private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAllU()
  }
  spinner:boolean = true;
  Users:any[]=[]
  Commandes:any[]=[];
  fileurl = GlobalConstants.imagurl
  UserTotals:any
  desactivate:boolean=false

  initiateUser:any = []
  getAllU(){
    var u:any[]= [];
    this.userService.GetAlldemandeFournisseur().subscribe((res:any) =>{
      for(const item of res.data){
        this.initiateUser.push(item)
        item.nom = item.nom+" "+item.prenom
        if(item.statut_demande=="accepter"){
          this.desactivate = true
        }
        if(item.statut_demande==="initie"){
          item.statut_demande = "en attente"
        }
        this.Users.push(item)
        this.changeDetector.detectChanges();
      }
      console.log(this.Users)

      this.Users.reverse();
      this.changeDetector.detectChanges();
    },error=>{

    },()=>{
      this.UserTotals = this.Users.length
      console.log(this.Users)

    //  this.UserTotals = 0;
      this.spinner = false
      this.changeDetector.detectChanges();

    //   u.reverse()
    //   for(const item of u){
    //     this.Users.push(item)
    //  }
    })
  }

  viewgoodcni:boolean = false;
  viewgoodregistre:boolean = false;
  filecniselecterd:any
  fileregistreselecterd:any

  ViewFile(url: string,item:any){
    console.log("url file :",url);
    window.open(url   , '_blank')
    // this.download(url).subscribe((file:any)=>{
    // //  console.log(file)
    // },error=>{
    //   console.log("bad file",url)
    //   this.viewgoodcni = true
    //   this.filecniselecterd = item.urlCni
    //  // console.log(this.filecniselecterd)
    //   this.changeDetector.detectChanges()
    //   setTimeout(() => {
    //     this.viewgoodcni = false
    //     this.changeDetector.detectChanges()
    //   }, 2000);
    // },()=>{
    //   console.log("good file")
    //   this.viewgoodcni = false
    // //

    //   this.changeDetector.detectChanges()
    // })
  }


  ViewFileRegistre(url: string,item:any){
    console.log("url file :",url);
    window.open(url  , '_blank')
    // this.download(url).subscribe((file:any)=>{
    // //  console.log(file)
    // },error=>{
    //   console.log("bad file")
    //   this.viewgoodregistre = true
    //   this.fileregistreselecterd = item.urlCni
    //  // console.log(this.filecniselecterd)
    //   this.changeDetector.detectChanges()
    //   setTimeout(() => {
    //     this.viewgoodregistre = false
    //     this.changeDetector.detectChanges()
    //   }, 2000);
    // },()=>{
    //   console.log("good file")
    //   this.fileregistreselecterd = false
    //   window.open(url   , '_blank')
    //   this.changeDetector.detectChanges()
    // })
  }

  download(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    })
  }
  // downloadFile(data: Response) {
  //   const blob = new Blob([data], { type: 'text/csv' });
  //   const url= window.URL.createObjectURL(blob);
  //   window.open(url);
  // }
  deleteDelete(FournisseurID:any){
      this.spinner = true
      this.changeDetector.detectChanges();
      console.log(FournisseurID)
      this.userService.DeleteFournisseur(FournisseurID).subscribe((res:any)=>{
        console.log("reponse: " ,res)
        if(res.response.result===true){
          this.Users = [];
          this.initiateUser = [];
          this.getAllU();
          this.changeDetector.detectChanges();
        }
      },error=>{

      },()=>{
        this.spinner = false
        this.changeDetector.detectChanges();
      })
  }


  onSearchChanger(searchValue: any): void {
    // console.log(searchValue.target.value);
    this.Users = []

    var u:any[]= [];
    this.userService.GetAlldemandeFournisseur().subscribe((res:any) =>{
      for(const item of res.data){
        //console.log(item.urlprofile,this.profilurl)
        item.nom = item.nom+" "+item.prenom
        if(item.nom.includes(searchValue.target.value) ){
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
  ActiveCompte:boolean = false
  AccepteDemande(data:any){
   this.spinner = true;
   this.changeDetector.detectChanges()
    this.userService.SendMail(data,"accepter").subscribe((re:any)=>{
      console.log(re)
      if(re.response.result==true){
        setTimeout(() => {
          this.ActiveCompte = false
          this.changeDetector.detectChanges()
        }, 2000);
        this.changeDetector.detectChanges()
      }else{

      }
    },error=>{},()=>{
      this.userService.UpdateStateFournisseur(data.id).subscribe((rep:any)=>{
      //  console.log(rep.response);
      },error=>{

      },()=>{
      setTimeout(() => {
        this.ActiveCompte = false
        this.changeDetector.detectChanges()
      }, 2000);
      this.Users = [];
      this.getAllU()
      this.listeFournisseur =true
      this.spinner = false;
      this.changeDetector.detectChanges()
      })

    })
  }

  RefuseCompte:boolean = false
  RefuseDemande(data:any){
   this.spinner = true;
   this.changeDetector.detectChanges()
    this.userService.SendMail(data,"refuser").subscribe((re:any)=>{
      console.log(re)
      if(re.response.result==true){
        setTimeout(() => {
          this.ActiveCompte = false
          this.changeDetector.detectChanges()
        }, 2000);
        this.changeDetector.detectChanges()
      }else{

      }
    },error=>{},()=>{
      this.userService.UpdateStateRefuserFournisseur(data.id).subscribe((rep:any)=>{
      //  console.log(rep.response);
      },error=>{

      },()=>{
      setTimeout(() => {
        this.RefuseCompte = false
        this.changeDetector.detectChanges()
      }, 2000);
      this.Users = [];
      this.getAllU()
      this.listeFournisseur =true
      this.spinner = false;
      this.changeDetector.detectChanges()
      })

    })
  }
  listeFournisseur:boolean= true;
  fournisseurselected:any
  changeView(fournisseur:any){
    this.fournisseurselected = fournisseur  
    this.listeFournisseur =  !this.listeFournisseur;
    this.changeDetector.detectChanges();
   
    if(!this.listeFournisseur){
      console.log(this.fournisseurselected)
      this.changeDetector.detectChanges();
    }

  }
  openTab = 1;
  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
  }
  onSearchChange(searchValue: any): void {
    var u:any[]= [];
    this.Users = []
    this.changeDetector.detectChanges();
    for(const item of this.initiateUser){

      // var tmptime = item.created_at.split('T')
      // item.created_at = tmptime[0]
       if(item.nom.toString().toLowerCase().includes(searchValue.target.value.toString().toLowerCase()) ){
        this.Users.push(item)
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
