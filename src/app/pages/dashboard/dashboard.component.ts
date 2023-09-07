import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ModalConfig, ModalComponent } from '../../_metronic/partials';
import { DatePipe } from '@angular/common';
import { UserServiceService } from 'src/app/services/users/user-service.service';
import { GlobalConstants } from 'src/app/common/global-constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {
  modalConfig: ModalConfig = {
    modalTitle: 'Modal title',
    dismissButtonLabel: 'Submit',
    closeButtonLabel: 'Cancel',
  };
  @ViewChild('modal') private modalComponent: ModalComponent;
  constructor(private datePipe: DatePipe,private userService:UserServiceService,private changeDetector: ChangeDetectorRef) {
  }

  async openModal() {

    return await this.modalComponent.open();
  }

  Distributeur:any[]=[];
  UserConnected:any;
  TotalRechargements:any;
  TotalCourse:any;
  pourcentRechargements:any;
  pourcentCourse:any;

  Rechargement:any[]=[];
  Course:any[]=[];



  TotalAchatcarte:any;
  TotalCousreterminer:any;
  pourcentAchatcarte:any;
  pourcentCourseTerminer:any;

  Achatcarte:any[]=[];
  CourseTerminer:any[]=[];
  AmoutGlobal=0;
  AmoutGlobalCourse=0;
  ttrembourser = 0;
  ttterminer = 0;
  ttNonrembourser = 0;
  Totaltransaction:any;
  TotalCourseEcours:any;

  pourcenttransaction:any;
  pourcenCourseEncours:any;

  transactionList:any[]=[];
  CousreEncourList:any[]=[];
  ngOnInit(): void {
    //this.GetAllUsers()
  this.UserConnected = this.userService.GetUserData()
  this.UserConnected = JSON.parse(this.UserConnected);
  //console.log("user =>",this.UserConnected);
  this.GetAllCommand(); 
  this.GetAllCourse();
  }

  GetAllCommand() {
    this.userService.getAllCommandeProduit().subscribe((com:any)=>{
     // console.log(com.data);
      for(var data of com.data){
        var localprice = parseInt(data.prixunitaire)*parseInt(data.quantite);
        
        if(data.Idvendeur==this.UserConnected.data.id.toString()){
          this.Rechargement.push(data)
          this.AmoutGlobal+=localprice;
          if(data.state =="Livré"){
            this.ttrembourser += localprice;
            this.Achatcarte.push(data);
          }else{
            this.ttNonrembourser += localprice;
            this.transactionList.push(data);
          }
        }else{
          if(this.UserConnected.data.role == "admin"){
            this.Rechargement.push(data)
            this.AmoutGlobal+=localprice;
            if(data.state =="Livré"){
              this.ttrembourser += localprice;
              this.Achatcarte.push(data);
            }else{
              this.ttNonrembourser += localprice;
              this.transactionList.push(data);
            }
          }
        }
      }
      this.TotalAchatcarte = this.Achatcarte.length;
      this.pourcentAchatcarte = (this.TotalAchatcarte*100/10000);

      this.Totaltransaction = this.transactionList.length
      this.pourcenttransaction = (this.Totaltransaction*100/10000);

      this.TotalRechargements = this.Rechargement.length;
      this.pourcentRechargements = (this.TotalRechargements*100/10000);
      this.changeDetector.detectChanges();
    })
  }

  GetAllCourse() {
    this.userService.GetAllCourse().subscribe((com:any)=>{
      console.log("ddddd",com.data);
      for(var data of com.data){
       // var localprice = parseInt(data.prixunitaire)*parseInt(data.quantite);
        
        if(data.transporteuridentifiant==this.UserConnected.data.id.toString()){
          this.Course.push(data)
          if(data.statut =="terminer"||data.statut =="arriver"){
            //this.ttrembourser += parseInt(data.montant);
            this.CourseTerminer.push(data);
          }else{
            //this.ttNonrembourser += localprice;
            this.CousreEncourList.push(data);
          }
        }else{
          if(this.UserConnected.data.role == "admin"){
            this.Course.push(data)
            if(data.statut =="terminer"||data.statut =="arriver"){
              //this.ttrembourser += parseInt(data.montant);
              this.CourseTerminer.push(data);
            }else{
              //this.ttNonrembourser += localprice;
              this.CousreEncourList.push(data);
            }
          }
        }
      }
      
       this.TotalCousreterminer = this.CourseTerminer.length;
       console.log(this.TotalCousreterminer);

       this.pourcentCourseTerminer = (this.TotalCousreterminer*100/10000);
       this.TotalCourseEcours = this.CousreEncourList.length
       this.pourcenCourseEncours = (this.TotalCourseEcours*100/10000);

       this.TotalCourse = this.Course.length;
       this.pourcentCourse = (this.TotalCourse*100/10000);
       this.changeDetector.detectChanges();
    })
  }

  // GetUser(){
  //   this.UserConnected =  this.userService.UserConnected();
  //   this.GeTalldistributeur();
  //   console.log(this.UserConnected)
  // }

  UserList:any[]=[];
  // GetAllUsers(){
  //   this.userService.GetAlluser().subscribe((user:any)=>{
  //     for(let u of user.data){
  //       this.UserList.push(u);       
  //     }
  //   })
  // }
  // getAllrechargements(){
  //   this.userService.GetAllRechargement().subscribe((recharge:any) => {
  //     for(const recharges of recharge.data){
  //       if(this.UserConnected.data.role=="admin"){
  //         this.Rechargement.push(recharges);
  //       }else if(recharges.distributeur==this.UserConnected.data.distributeur){
  //         this.Rechargement.push(recharges);
  //       }
  //     }
  //     this.changeDetector.detectChanges();
  //   },error=>{

  //   },()=>{
  //     this.TotalRechargements = this.Rechargement.length;
  //     this.pourcentRechargements = (this.TotalRechargements*100/5000);
  //     this.changeDetector.detectChanges();
  //   })
  // }

  // getAlltransaction(){
  //   this.userService.GetAllTransaction().subscribe((recharge:any) => {
  //     //this.MontantTotals+=parseInt(item.montant)
  //     for(const recharges of recharge.data){
  //       if(this.UserConnected.data.role=="admin"){
  //         this.transactionList.push(recharges)
  //         this.AmoutGlobal+=parseInt(recharges.montant)
  //         if(recharges.state =="rembourser"){
  //           this.ttrembourser+=parseInt(recharges.montant)
  //         }
  //         if(recharges.state =="en attente de remboursement"){
  //           this.ttNonrembourser+=parseInt(recharges.montant)
  //         }
  //         this.changeDetector.detectChanges()
  //       }else if(recharges.distributeur==this.UserConnected.data.distributeur){
  //         this.transactionList.push(recharges)
  //         this.AmoutGlobal+=parseInt(recharges.montant)
  //         if(recharges.state =="rembourser"){
  //           this.ttrembourser+=parseInt(recharges.montant)
  //         }
  //         if(recharges.state =="en attente de remboursement"){
  //           this.ttNonrembourser+=parseInt(recharges.montant)
  //         }
  //         this.changeDetector.detectChanges()
  //       }
  //     }
  //     this.changeDetector.detectChanges();
  //   },error=>{

  //   },()=>{
  //     this.Totaltransaction = this.transactionList.length
  //     this.pourcenttransaction = (this.Totaltransaction*100/5000);
  //     this.changeDetector.detectChanges();
  //     console.log("amount global",this.transactionList)
  //   })
  // }

  // getAllAchatcarte(){
  //   this.userService.GetAllAchat().subscribe((recharge:any) => {
  //     for(const recharges of recharge.data){


  //       if(this.UserConnected.data.role=="admin"){
  //         this.Achatcarte.push(recharges);
  //       }else if(recharges.distributeur==this.UserConnected.data.distributeur){
  //         this.Achatcarte.push(recharges);
  //       }
  //     }
  //     this.changeDetector.detectChanges();
  //   },error=>{

  //   },()=>{
  //     this.TotalAchatcarte = this.Achatcarte.length;
  //     this.pourcentAchatcarte = (this.TotalAchatcarte*100/5000);
  //     this.changeDetector.detectChanges();
  //   })
  // }
}
