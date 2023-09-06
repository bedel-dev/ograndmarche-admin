import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global-constants';
import { UserServiceService } from 'src/app/services/users/user-service.service';

@Component({
  selector: 'app-listprixmarcher',
  templateUrl: './listprixmarcher.component.html',
  styleUrls: ['./listprixmarcher.component.scss']
})
export class ListprixmarcherComponent implements OnInit {

  constructor(private http:HttpClient,private userService:UserServiceService,private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAllU()
    this.getUser()
  }
  spinner:boolean = true;
  Users:any[]=[]
  Commandes:any[]=[];
  fileurl = GlobalConstants.imagurl
  UserTotals:any
  desactivate:boolean=false

  initiateUser:any = []


ListeSemaine: string[] = [];  
ListeCulture: string[] = [];
ListeVille: string[] = [];
  getAllU(){
    var u:any[]= [];
    this.ListeSemaine = [];
    this.ListeCulture = [];
    this.ListeVille = [];
    this.userService.GetAllprixMarcher().subscribe((res:any) =>{
      for(const item of res.data){
        this.initiateUser.push(item)
        // item.nom = item.nom+" "+item.prenom
        // if(item.statut_demande=="accepter"){
        //   this.desactivate = true
        // }
        // if(item.statut_demande==="initie"){
        //   item.statut_demande = "en attente"
        // }

        var tmptime = item.createdat.split('T')
        item.created_at = tmptime[0]

        
        if(!this.ListeSemaine.includes(item.datesorti)){
          this.ListeSemaine.push(item.datesorti)
          console.log("semaine pas encore dedans")
        }
        if(!this.ListeCulture.includes(item.libelle)){
          this.ListeCulture.push(item.libelle)
          console.log("culture pas encore dedans")
        }
        if(!this.ListeVille.includes(item.ville)){
          this.ListeVille.push(item.ville)
          console.log("Ville pas encore dedans")
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
      console.log("data=>",this.Users)

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
      this.spinner = false;
      this.changeDetector.detectChanges()
      })

    })
  }

  users:any
  getUser() {
    this.users = JSON.parse(this.userService.GetUserData()!)
    this.changeDetector.detectChanges()
   console.log(this.users)
 }


  onSearchChange(searchValue: any,type:string): void {
    console.log(searchValue.target.value.toString());
    console.log(type);
    var u:any[]= [];
    this.Users = []
    this.changeDetector.detectChanges();
    for(const item of this.initiateUser){

      var tmptime = item.createdat.split('T')
      item.created_at = tmptime[0]

      if(searchValue.target.value.toString()=="all"){
        this.Users.push(item)
      }else{
        if(type=="semaine"){
          if(item.datesorti.toString().toLowerCase().includes(searchValue.target.value.toString().toLowerCase()) ){
            this.Users.push(item)
          }
        }
        if(type=="ville"){
          if(item.ville.toString().toLowerCase().includes(searchValue.target.value.toString().toLowerCase()) ){
            this.Users.push(item)
          }
        }
        if(type=="culture"){
          console.log("je suis ici")
          if(item.libelle.toString().toLowerCase().includes(searchValue.target.value.toString().toLowerCase()) ){
            this.Users.push(item)
          }
        }
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
