import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';
import { UserServiceService } from 'src/app/services/users/user-service.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-commandelist',
  templateUrl: './commandelist.component.html',
  styleUrls: ['./commandelist.component.scss']
})
export class CommandelistComponent implements OnInit {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  AddUserForm: FormGroup;

  constructor(private modalService: NgbModal,private userService:UserServiceService,private changeDetector: ChangeDetectorRef) {
    this.AddUserForm = new FormGroup({
      trans: new FormControl(),
      enlevement:new FormControl(),
      dechargement:new FormControl(),
      montant:new FormControl()

    })


  }
  @ViewChild('content') addview !: ElementRef

  modalContent:any
  modalContentLivre:any

  open(content: any, item: any) {
    this.spinnerModale = true;
    console.log("commande :",item)
    this.GetCommandeProduit(content,item)
  }

  openLivraison(content: any, item: any) {
   var localenlevement:any[]=[]; 
   var n = 1;
   console.log("take");
   this.ProduitCommande.forEach((element)=>{
    if(item.id.toString()==element.idcommande){

      this.v.forEach((vente:any)=>{
        //console.log("iitems",item,element,vente);
        if(element.Idvendeur == vente.idUser &&element.idvente ==vente.id.toString() ){
          localenlevement.push(" enlevement ("+n+") => "+vente.enlevement)
          n = n+1;
          console.log("localenlevement =>",localenlevement)
        }
      })
    }
   })
  this.AddUserForm.controls['enlevement'].setValue(localenlevement, {onlySelf: true});
  this.AddUserForm.controls['dechargement'].setValue(item.lieuLivraison, {onlySelf: true});
  this.AddUserForm.controls['montant'].setValue(item.montantlivraison+" fr", {onlySelf: true});
  this.modalContentLivre = item
  this.modalService.open(content, { centered: true, size: "lg", windowClass: 'andro_quick-view-modal p-0'});
  }

  openLivraison2(content: any, item: any) {
    var localenlevement:any[]=[]; 
    var n = 1;
    console.log(this.ProduitCommande);
    console.log(item);
    this.ProduitCommande.forEach((element)=>{
      console.log("ici",item.id.toString()==element.idcommande);
     if(item.id.toString()==element.idcommande){
      console.log("ici");
       this.v.forEach((vente:any)=>{
         console.log("iitems",item,element,vente);
         if(element.Idvendeur == vente.idUser &&element.idvente ==vente.id.toString() ){
           localenlevement.push(" enlevement ("+n+") => "+vente.enlevement)
           n = n+1;
           console.log("localenlevement =>",localenlevement)
         }
       })
     }
    })
   this.AddUserForm.controls['enlevement'].setValue(localenlevement, {onlySelf: true});
   this.AddUserForm.controls['dechargement'].setValue(item.lieuLivraison, {onlySelf: true});
   this.AddUserForm.controls['montant'].setValue(item.montantlivraison+" fr", {onlySelf: true});
   this.modalContentLivre = item
   this.modalService.open(content, { centered: true, size: "lg", windowClass: 'andro_quick-view-modal p-0'});
   }
  form = new FormGroup({
    trans: new FormControl(null, Validators.required),
    montant:new FormControl({value: null, disabled: true}, Validators.required),

  });
  localityenlevement:any[]=[];
  userconnected:any
  ngOnInit(): void {
    var hauth =  localStorage.getItem(this.authLocalStorageToken)
     this.userconnected = JSON.parse(hauth!)
     this.getAllCourse()
    this.GetAllUser()
  }

  GetCommandeProduitByUser(item:any){
    this.CommandeProd = [];
    this.changeDetector.detectChanges()
    this.userService.getAllCommandeProduit().subscribe((re:any) =>{
      //console.log()
      // var test = re.data.filter((res:any) =>{
      //       return res.idcommande == item.id.toString()
      // })
      re.data.forEach((element:any) => {

        console.log("la sous commande :",element)

        for(let c of this.v){
          if(c.id.toString() == element.idvente){
            element.typeVente = c.typeVente
            element.cate = c.categorieProduitId
          }
        }
      //console.log("detailcommande :",element)
      var tmptime = element.createdAt.split('T')
      element.created_at = tmptime[0]


      var Commande = this.Users.filter((commande:any)=>{
      return commande.id.toString() == element.idcommande.toString()
      //console.log("la commande :",this.Users)
      })

        //console.log("la commande :",Commande )
        //console.log("la commande :", element.userId)
        this.UserCommande.forEach((user:any)=>{
         //
          //console.log("la commande :", element.userId)
          if(Commande.length>0){
            element.userId = Commande[0].userId
          }else{
            element.userId = "null"
          }
          if(element.userId.toString()==user.id.toString()){
              element.client = user.name
              element.numero = user.contact
              element.locality = user.locality
              element.email = user.email
              element.userId = item.userId
            }
            if(element.Idvendeur.toString()==user.id.toString()){
              element.vendeur = user.name
              element.numerovendeur = user.contact
              element.localityvendeur = user.locality
            //  item.email = user.email
            }
          })

          this.v.forEach((vente:any)=>{
            if(element.Idvendeur.toString()==vente.idUser.toString()&&this.userconnected.data.id.toString()==vente.idUser.toString()){
            //  console.log("je suis ic 2")
              element.enlevement = vente.enlevement
            }
          })

        // var count =  this.Product.filter((items) => items.idcommande == item.id);
        // item.quantite = count.length
        this.Vente.forEach((cate:any) => {
          if(cate.id.toString() == element.cate){
            element.cate = cate.label
          }
        })
        if(element.cate =="animal"){
          element.typeVente="null"
        }
          // element.lieuLivraison= item.lieuLivraison
          // element.numero_commande =item.numero_commande
      //  element.vendeurId =item.vendeurId
        if(this.userconnected.data.id.toString() == element.Idvendeur.toString()){


          var coursecommande = this.Course.filter((course:any)=>{
            return course.produit.toString() == element.idcommande.toString()
          });

          if(coursecommande.length > 0){
            if(coursecommande[0] === "initier"||coursecommande[0] === "accepter"){

            }else{
            //  element.state =coursecommande[0].statut
            }
          }

          console.log("coursecommande :",coursecommande)
          console.log("coursecommande :",element)

          this.CommandeProd.push(element)
          console.log("CommandeProd :",this.CommandeProd)
          this.InitialeVarDetaiCommande.push(element)
        }
      });
      this.changeDetector.detectChanges()

     console.log("detailcommande: " , this.InitialeVarDetaiCommande)
    },error =>{

    },
    ()=>{
      this.CommadeTotals = this.CommandeProd.length
      this.spinnerModale = false
      this.changeDetector.detectChanges()

      // this.modalContent = item
      // this.modalService.open(content, { centered: true, size: "lg", windowClass: 'andro_quick-view-modal p-0'});
    })
  }

  Users:any[]=[]
  Commandes:any[]=[];
  profilurl = GlobalConstants.imagurl
  UserTotals:any
  User:any[]=[]
  Transporteur:any[]=[];
  Vente:any[]=[]
  pipe = new DatePipe('en-US');


  get f() {
    return this.AddUserForm.controls;
  }

  stateinfo = false;
  allreadyexiste = false
  success = false;
  statework = false;


  livreurselect:boolean=false
  laodaddcourses :boolean=false
//modal.close('Save click')

todoLivraison:boolean=false
todoLivraisonComptefaible:boolean;

SuiviSold(data:any){
  console.log(data.target.value)
  var transporteurselected = this.Transporteur.filter((d:any) => {
    return d.id.toString() == data.target.value
  })
  this.livreurselect  = false
  this.todoLivraison = false;
  this.todoLivraisonComptefaible = false;
   //console.log("Trans :",transporteurselected[0].contact.split(" ")[0]+transporteurselected[0].contact.split(" ")[1])
   //console.log("commande :",this.modalContentLivre) 
   //verification s'il est dans lidar +2250758854116
   var contact = transporteurselected[0].contact.split(" ")[0]+transporteurselected[0].contact.split(" ")[1]
    //var contact = "+2250708742553"
    this.userService.Getuserlidar(contact).subscribe((data:any) => {
    console.log(data)
    if(data.code == 500){
      this.todoLivraison = true;
      this.changeDetector.detectChanges()
      // setTimeout(() => {
      //   this.todoLivraison = false;

      //   this.stateinfo = false
      //   this.cdr.detectChanges();
      // }, 2500);
      
    }else if(data.code ==0){
      console.log("modale => ",this.modalContentLivre.montantlivraison);
      this.livreurselect  = false
      this.userService.Controlesole(data.beneficiaire.beneficiaire_carte.carte_id).subscribe((result:any) => {
        if(result.code ==0){
          var amount = parseInt(this.modalContentLivre.montant) + parseInt(this.modalContentLivre.montantlivraison);
          console.log("amount g => ",amount);
          if(result.solde<=amount){
            console.log("is possible to attribute")
            this.todoLivraisonComptefaible = true;
            // this.changeDetector.detectChanges();
          }else{
            console.log(result.solde)
            console.log("is not possible to attribute")
            this.todoLivraisonComptefaible = false;
            // this.changeDetector.detectChanges();
          }
          console.log("todoLivraisonComptefaible => ",this.todoLivraisonComptefaible);
        }
      });
    }
  },error=>{

  },()=>{

  })

}
  sendcourses = false;
  saveSettings(){
    if(this.f.trans.value == null){
      this.livreurselect= true
      this.changeDetector.detectChanges();

    }else{
      this.livreurselect = false
      this.changeDetector.detectChanges();

    }


    if(!this.livreurselect&&!this.todoLivraison&&!this.todoLivraisonComptefaible){
      this.laodaddcourses = true;
      this.changeDetector.detectChanges();
      this.userService.Addcourse(this.f,this.modalContentLivre).subscribe((course:any)=>{
      console.log(course)
      },error=>{

      },()=>{

        this.Updatecommande(this.modalContentLivre,"livraison")
        this.modalContentLivre.statut = "livraison"
        // this.Users.forEach(element => {
        //   if(element.id.toString()== this.modalContentLivre.id){
        //     element.
        //   }
        // });
        this.message = "ajout de course reuissi"
        this.sendcourses = true
        this.laodaddcourses = false
        this.changeDetector.detectChanges();
        // update commande
        setTimeout(() => {
          this.sendcourses = false;
          this.modalService.dismissAll()
          this.changeDetector.detectChanges();
        },1500);
      //  this.userService.UpdateStateCommande(this.modalContentLivre.id,"livraison")
      })
    }
  }
  Updatecommande(data:any,state:string){
    this.Users = [];
  this.changeDetector.detectChanges();
  console.log("data dans update :", data)
  this.userService.UpdateStateCommande(data.id,state).subscribe((rep:any)=>{
    },error=>{

    },()=>{
    //  this.isLoading = false    
    this.getAllU()
    })
    this.isLoadingsecond = false;
    this.changeDetector.detectChanges();  
}
  getAllU(){
    var u:any[]= [];
    this.userService.getAllCommande().subscribe((res:any) =>{

      for(const item of res.data){
        var coursecommande = this.Course.filter((course:any)=>{
          return course.produit.toString() == item.id.toString()
        });

        if(coursecommande.length > 0){
          if(coursecommande[0] === "initier"||coursecommande[0] === "accepter"){

          }else{
           // console.log("coursecommande :",item.statut)
          //  item.statut = coursecommande[0].statut
          //  console.log("coursecommande statut :",item.statut)
          }
        }

        this.UserCommande.forEach((user:any)=>{
          if(item.userId.toString()==user.id.toString()){
            item.client = user.name
            item.numero = user.contact
            item.locality = user.locality
            item.email = user.email
          }
          // if(item.vendeurId.toString()==user.id.toString()){
          //   item.vendeur = user.name
          //   item.numerovendeur = user.contact
          //   item.localityvendeur = user.locality
          // //  item.email = user.email
          // }
        })
        this.v.forEach((vente:any)=>{
          if(item.vendeurId.toString()==vente.idUser.toString()){
              item.enlevement = vente.enlevement
          }
        })

        var tmptime = item.createdAt.split('T')
        item.created_at = tmptime[0]




        var count =  this.ProduitCommande.filter((items) => items.idcommande == item.id);
        item.quantite = count.length


        var produitcommande =  this.ProduitCommande.filter((items) => items.idcommande == item.id && items.state =="accepter");

        var produitcommandeannuler =  this.ProduitCommande.filter((items) => items.idcommande == item.id && items.state =="annuler");

        if(produitcommande.length == item.quantite){
          if(item.statut=="en attente"){
            item.statut  = "accepter";
          }else{

          }

        }

        if(produitcommandeannuler.length == item.quantite){
          if(item.statut=="en attente"){
            item.statut  = "annuler";
          }else{

          }
        }
        console.log("item :",item)

        this.Users.push(item)
        this.changeDetector.detectChanges();
      }
      this.Users.reverse();
      console.log(this.Users)
      this.changeDetector.detectChanges();
    },error=>{

    },()=>{
      this.UserTotals = this.Users.length
      this.GetInitiale()
      this.spinner = false
     //    this.UserTotals = 0
      this.changeDetector.detectChanges();

    //   u.reverse()
    //   for(const item of u){
    //     this.Users.push(item)
    //  }
    })
  }
  ProduitCommande:any[]=[]
  GetAllVente(){

    this.userService.GetAllCategorie().subscribe((res:any) =>{

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
    this.User = [];
    this.ProduitCommande = [];
    this.getAllDemandefournisseur() 
    this.userService.GetAllproduit().subscribe((user:any) =>{
    
      user.data.forEach((element:any) => {
         this.User.push(element)
      })
      //.log(this.User)
      this.changeDetector.detectChanges()
    },error =>{

    },()=>{
      this.GetVente()
      this.GetAllVente()
      this.getAlluserCommande()
      this.userService.getAllCommandeProduit().subscribe((r:any)=>{
        r.data.forEach((element:any) => {
          this.ProduitCommande.push(element);
        });
        console.log(this.ProduitCommande)
      },error=>{

      },()=>{
        if(this.userconnected.data.role == "fournisseur"||this.userconnected.data.role == "Producteur"){
          console.log("je suis prod ou fournisseur");
          this.GetCommandeProduitByUser(this.userconnected.data.id)
        }
      })
    })
  }
  UserCommande:any[]=[]
  Course:any[]=[]

  getAllCourse(){
    this.Course = [];
    this.userService.GetAllCourse().subscribe((res:any) =>{
      res.data.forEach((course:any) => {
        this.Course.push(course);
      })
    })
  }
  demandefournisseur:any[]=[]
  getAllDemandefournisseur(){
    this.demandefournisseur = [];
    this.userService.GetAlldemandefournisseur().subscribe((res:any) =>{
      res.data.forEach((course:any) => {
        this.demandefournisseur.push(course);
      })
     // console.log("reponse demande :",this.demandefournisseur)
      this.changeDetector.detectChanges();
    })
  }
  livreurlibre:boolean
  getAlluserCommande(){
    var cousertransporteur
    this.userService.GetAlluser().subscribe((res:any) =>{
      res.data.forEach((r:any)=>{
        this.UserCommande.push(r)
        console.log("")
        //console.log("transporteur :",r.name)
        if(r.role ==="Transporteur"){
          console.log("transporteurs: ",r.name)
         // this.Transporteur.push(r)
         //console.log("reponse demande :",this.demandefournisseur)
          
         cousertransporteur = this.Course.filter((item:any)=>{
            return item.transporteuridentifiant === r.id.toString()
         })
         console.log("cousertransporteur :",cousertransporteur)

         if(cousertransporteur.length === 0){ 
         // if(r.engin=="moto"){
          this.demandefournisseur.forEach((data:any)=>{
            if(data.id.toString() === r.engin.toString()){
             // console.log("data : ", data)
              r.engin = data.typeVente.toString()  
            }
          })
        // var ds = this.demandefournisseur.filter((item:any)=>{
        //   console.log("item :",item.id.toString(),r.engin.toString())

        //     return item.id.toString() ===r.engin.toString()
        //   })
        //   console.log("item :",ds)
            this.Transporteur.push(r)
         // }
         }else if (cousertransporteur.length>0){
          var t = cousertransporteur.filter((item:any)=>{
              return item.statut ==="terminer"||item.statut ==="arriver"
          })
           //console.log("Course :",t)   && r.engin==="moto"
           //console.log("rrrrrrrr :",cousertransporteur.length - t.length)
          if((cousertransporteur.length - t.length==0)){
            //if(r.engin=="moto"){
           var dem =    this.demandefournisseur.filter((item:any)=>{
                return item.statut ==="terminer"||item.statut ==="arriver"
              })
              console.log("terminer")
              this.Transporteur.push(r)
           // }
          }
         }
        }
      })
    },error=>{

    },()=>{
      if(this.Transporteur.length===0){
        this.livreurlibre =true;
        this.changeDetector.detectChanges()
      }

    })
    this.changeDetector.detectChanges()

  }
  v:any[]=[]
  GetVente(){
    this.userService.getAllVente().subscribe((res:any)=>{
      res.data.forEach((item:any) =>{
        this.v.push(item)
      })
      this.changeDetector.detectChanges()
      console.log("res :",this.v)
    })
  }
  CommandeProd:any[]=[]
  spinnerModale:boolean=false
  CommadeTotals:any
  GetCommandeProduit(content:any,item:any){
    this.modalContent = item
    this.modalService.open(content, { centered: true, size: "lg", windowClass: 'andro_quick-view-modal p-0'});

    this.CommandeProd = [];
    this.changeDetector.detectChanges()
    this.userService.getAllCommandeProduit().subscribe((re:any) =>{
      var test = re.data.filter((res:any) =>{
            return res.idcommande == item.id.toString()
          })
      test.forEach((element:any) => {
        for(let c of this.v){
          if(c.id.toString() == element.idvente){
            element.typeVente = c.typeVente
            element.cate = c.categorieProduitId
          }
        }
        console.log("element :",element)
        this.UserCommande.forEach((user:any)=>{
          //  console.log()
            if(item.userId.toString()==user.id.toString()){
              element.client = user.name
              element.numero = user.contact
              element.locality = user.locality
              element.email = user.email
              element.userId = item.userId
            }
            if(element.Idvendeur.toString()==user.id.toString()){
              element.vendeur = user.name
              element.numerovendeur = user.contact
              element.localityvendeur = user.locality
            //  item.email = user.email
            }
          })

          this.v.forEach((vente:any)=>{
            if(element.Idvendeur.toString()==vente.idUser.toString()){
              element.enlevement = vente.enlevement
            }
          })

        // var count =  this.Product.filter((items) => items.idcommande == item.id);
        // item.quantite = count.length
        this.Vente.forEach((cate:any) => {
          if(cate.id.toString() == element.cate){
            element.cate = cate.label
          }
        })
        if(element.cate =="animal"){
          element.typeVente="null"
        }
        element.lieuLivraison= item.lieuLivraison
        element.numero_commande =item.numero_commande
      //  element.vendeurId =item.vendeurId
        this.CommandeProd.push(element)

        console.log("CommandeProd",this.CommandeProd)
      });
      this.changeDetector.detectChanges()

      console.log(test)
    },error =>{

    },
    ()=>{
      this.CommadeTotals = this.CommandeProd.length
      this.spinnerModale = false
      this.changeDetector.detectChanges()

      // this.modalContent = item
      // this.modalService.open(content, { centered: true, size: "lg", windowClass: 'andro_quick-view-modal p-0'});
    })
  }

  DeleteCommande(userID:any){

    // this.Users = [];
    // console.log(userID)
    // this.userService.DeleteCommande(userID).subscribe((res:any)=>{
    //   console.log(res)

    //   this.getAllU();

    // })
    console.log(this.userconnected.data.role)
    this.spinner = true;
    this.changeDetector.detectChanges();
    if(this.userconnected.data.role == 'admin'){
      this.Users = []
      this.userService.DeleteCommande(userID).subscribe((res:any)=>{
        console.log(res)

      },error =>{

      },()=>{
        this.userService.DeleteCommandeDetail(userID).subscribe((res:any) =>{
          console.log(res)
          if(res.response.result ===true){
            this.getAllU()
            this.spinner = false;
            this.changeDetector.detectChanges();
          }


        })
      })
      this.changeDetector.detectChanges();
    }else{
      this.CanDeleted = true;
      setTimeout(() => {
        this.CanDeleted = false;
        this.changeDetector.detectChanges();
      }, 1500);
    }
  }

  InitialeVar:any[]=[]
  InitialeVarDetaiCommande:any[]=[]
  GetInitiale(){
    var u:any[]= [];
    this.userService.getAllCommande().subscribe((res:any) =>{

      for(const item of res.data){
        this.InitialeVar.push(item)
      }
      this.changeDetector.detectChanges();
      console.log("InitialeVar :",this.InitialeVar)
    },error=>{

    },()=>{

    })



  }
  CanDeleted:boolean=false;

  DeletesProduct(idpub:any){
    //console.log(idpub)
    console.log(this.userconnected.data.role)
    if(this.userconnected.data.role == 'admin'){
      this.Users = []
      this.userService.DeleteProduit(idpub).subscribe((res:any)=>{
        console.log(res)
       // this.GetAllUser()
       this.GetAllUser()
      })
      // /console.log("pub :",this.Users)
      this.changeDetector.detectChanges();
    }else{
      this.CanDeleted = true;
    }
  }
  onSearchChange(searchValue: any): void {
    console.log(searchValue)
    var u:any[]= [];
    this.Users = []
    this.changeDetector.detectChanges();
    for(const item of this.InitialeVar){

   var tmptime = item.createdAt.split('T')
   item.created_at = tmptime[0]

      this.UserCommande.forEach((user:any)=>{
        console.log()
        if(item.userId.toString()==user.id.toString()){
          item.client = user.name
          item.numero = user.contact
          item.locality = user.locality
        }
      })
       if(item.numero_commande.includes(searchValue.target.value) || item.numero.toString().includes(searchValue.target.value)){

        var count =  this.ProduitCommande.filter((items) => items.idcommande == item.id);
        item.quantite = count.length

        var produitcommande =  this.ProduitCommande.filter((items) => items.idcommande == item.id && items.state =="accepter");

        if(produitcommande.length == item.quantite){
          if(item.statut=="en attente"){
            item.statut  = "accepter";
          }else{

          }

        }
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
  onSearchChangeDetailCommande(searchValue: any): void {
   // console.log(searchValue)
    var u:any[]= [];
    this.CommandeProd  = []
    this.changeDetector.detectChanges();
    for(const item of this.InitialeVarDetaiCommande){

        var tmptime = item.createdAt.split('T')
        item.created_at = tmptime[0]
        if(item.titre.includes(searchValue.target.value)){
          if(this.userconnected.data.id.toString()==item.Idvendeur.toString()){
            this.CommandeProd.push(item)
            this.changeDetector.detectChanges();
          }
        }else{
        //  this.Users.push(item)
          // this.Users = this.InitialeVar
          //this.GetAllUser()
        }
      // this.UserCommande.forEach((user:any)=>{
      //   console.log()
      //   if(item.userId.toString()==user.id.toString()){
      //     item.client = user.name
      //     item.numero = user.contact
      //     item.locality = user.locality
      //   }
      // })


    }
    //this.UserTotals = this.Users.length
    this.changeDetector.detectChanges();
  }
  spinner:boolean=true

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
  ActiveCompte:boolean = false
  isLoading:boolean = false
  message:any = ""
    AccepteDemandeGlobal(data:any,state:string){
    console.log("data dans AccepteDemandeGlobal    :", data)
    console.log("state dans AccepteDemandeGlobal    :", this.state)

    this.userService.SendMailComfirme(data,state,"global").subscribe((re:any)=>{
      console.log("reponse mail global :",re)
      if(re.response.result==true){

      }else{


      }
    },error=>{
      console.log("error dans AccepteDemandeGlobal    :", error)
    },()=>{
      this.userService.UpdateStateCommande(data.idcommande,state).subscribe((rep:any)=>{
      //  this.Users = []
              if(state==="accepter"){
                this.message = "commande confirmer"
              }
              if(state==="annuler"){
                this.message = "commande annuler"
              }


        this.isLoading = false
        this.isLoadingsecond = false
        this.changeDetector.detectChanges()
      //  console.log(rep.response);
      },error=>{

      },()=>{
      //  this.isLoading = false
      setTimeout(() => {
        this.isLoading = false
        this.changeDetector.detectChanges()
      }, 2000);

      this.getAllU()
      //  this.spinner = false;
      })

    })
  }
  updateCommandeDetail:boolean=false
state:any
  UpdateCommande(data:any,state:string){
      this.isLoading = true
    //    this.spinnerModale = true
    this.changeDetector.detectChanges();
    //console.log("data dans update :", data)
    this.userService.SendMailComfirme(data,state,"only").subscribe((re:any)=>{
      console.log(re)
      if(re.response.result==true){

      }else{


      }
    },error=>{},
    ()=>{
      this.userService.UpdateStateCommandeDetail(data.id,state).subscribe((rep:any)=>{
      //  this.Users = []
      //  console.log(rep.response);
      },error=>{

      },()=>{
      //  this.isLoading = false

      if(state==="accepter"){
        this.state="accepter"
      }
      if(state==="annuler"){
        this.state="annuler"
      }
      this.GetAllCommandedetails(data)
      })
    })
  }
  isLoadingsecond:boolean
  UpdateCommandeforPrduct(data:any,state:string){
    console.log("je suis ici");
      this.isLoadingsecond = true
    //    this.spinnerModale = true
    this.changeDetector.detectChanges();
    console.log("data dans update UpdateCommandeforPrduct:", data)
    this.userService.SendMailComfirme(data,state,"only").subscribe((re:any)=>{
      console.log(re)
      if(re.response.result==true){

      }else{

      }
    },error=>{},()=>{
      this.userService.UpdateStateCommandeDetail(data.id,state).subscribe((rep:any)=>{
      //  this.Users = []
      //  console.log(rep.response);
      },error=>{

      },()=>{
      //  this.isLoading = false

      if(state==="accepter"){
        this.state="accepter"
      }
      if(state==="annuler"){
        this.state="annuler"
      }
      this.GetAllCommandedetails(data)
      })
      this.isLoadingsecond = false;
      this.changeDetector.detectChanges();  
    })
  }
  GetAllCommandedetails(cID:any) {
    console.log("data dans GetAllCommandedetails :", cID)

    var newcommandeproduit:any;
    var commandeTotale:any;
    this.userService.getAllCommandeProduit().subscribe((re:any) =>{
      var test = re.data.filter((res:any) =>{
            return res.idcommande == cID.idcommande.toString()
          })
        // :",test)
        this.CommandeProd = [];
        console.log("detail commande"," : ",cID)
        this.changeDetector.detectChanges()
        newcommandeproduit = test;
        commandeTotale = newcommandeproduit.length;
        test.forEach((element:any) => {
        for(let c of this.v){
          if(c.id.toString() == element.idvente){
            element.typeVente = c.typeVente
            element.cate = c.categorieProduitId
          }
        }
        console.log(element)
        this.UserCommande.forEach((user:any)=>{
          //  console.log()
                  if(cID.userId != null){
                    if(cID.userId.toString()==user.id.toString()){
                      element.client = user.name
                      element.numero = user.contact
                      element.locality = user.locality
                      element.email = user.email
                      element.userId = user.id
  
                    }
                  }
            if(element.Idvendeur.toString()==user.id.toString()){
              element.vendeur = user.name
              element.numerovendeur = user.contact
              element.localityvendeur = user.locality
            //  item.email = user.email
            }
          })
          this.v.forEach((vente:any)=>{
            if(element.Idvendeur.toString()==vente.idUser.toString()){
              element.enlevement = vente.enlevement
            }
          })

        // var count =  this.Product.filter((items) => items.idcommande == item.id);
        // item.quantite = count.length
        this.Vente.forEach((cate:any) => {
          if(cate.id.toString() == element.cate){
            element.cate = cate.label
          }
        })
        if(element.cate =="animal"){
          element.typeVente="null"
        }
        if(this.userconnected.data.role=="admin"){
          this.CommandeProd.push(element)
        }

        if(this.userconnected.data.role=="fournisseur"||this.userconnected.data.role=="Producteur"){

          if(this.userconnected.data.id.toString() == element.Idvendeur.toString()){
            var tmptime = element.createdAt.split('T')
            element.created_at = tmptime[0]
            var com =   this.Users.filter((commande:any)=>{
              return commande.id.toString() == element.idcommande
            })
            element.numero_commande = com[0].numero_commande

            this.changeDetector.detectChanges()

            this.CommandeProd.push(element)
            this.InitialeVarDetaiCommande.push(element)
          }
        }
        

      });
      this.changeDetector.detectChanges()
      console.log("dataof : ",this.CommandeProd)
    //  console.log(test)
    },error =>{
      console.log(error)
    },
    ()=>{
    //  this.updateCommandeDetail=true
      setTimeout(() => {
        this.updateCommandeDetail = false
        this.changeDetector.detectChanges()
      }, 2000);
      var com = this.Users.filter((commande:any)=>{
        return commande.id.toString() == cID.idcommande
      })
      cID.numero_commande = com[0].numero_commande
      cID.lieuLivraison = com[0].lieuLivraison
      cID.email = com[0].email
      console.log("testxxx : ",com[0])
      this.CommadeTotals = this.CommandeProd.length
      this.spinnerModale = false
      this.changeDetector.detectChanges()

      var prduitaccepte =  newcommandeproduit.filter((dc:any)=>{
        return dc.state == "accepter"
      })
      console.log("produit total: ",commandeTotale)
      console.log("produit accepte: ",prduitaccepte.length)

      if(commandeTotale == prduitaccepte.length){
        console.log(' je peux faire la mise a jour de la commande globle avec state accepter')
        this.AccepteDemandeGlobal(cID,"accepter")
        //this.modalContent['statut'] = "accepter";
      }
      else if(commandeTotale < prduitaccepte.length ||commandeTotale > prduitaccepte.length){
        var prduitannuler =  newcommandeproduit.filter((dc:any)=>{
          return dc.state == "annuler"
        })
        if(prduitannuler.length==commandeTotale){
          console.log('je peux faire la mise a jour de la commande globle avec state annuler')
              this.AccepteDemandeGlobal(cID,"annuler")
              //this.modalContent['statut'] = "annuler";
        }else{
          console.log("je suis dans 1")
          this.updateCommandeDetail = true
          this.isLoading = false;
          this.isLoadingsecond = false
          if(this.state==="accepter"){
            this.message = "commande confirmer"
          }
          if(this.state==="annuler"){
            this.message = "commande annuler"
          }
          this.changeDetector.detectChanges()
          // var prduitattende =  this.CommandeProd.filter((dc:any)=>{
          //   return dc.state == "en attente"
          // })
          // if(prduitattende.length>0){
          //   console.log(' je peux faire la mise a jour de la commande globle avec state en attente')
          // }
        }
      }else{
        console.log("je suis dans 2")
        this.isLoading = false;
        this.isLoadingsecond = false;
        if(this.state==="accepter"){
          console.log("je suis dans 3")
          this.message = "commande confirmer"
        }
        if(this.state==="annuler"){
          console.log("je suis dans 4")
          this.message = "commande annuler"
        }
        
        this.changeDetector.detectChanges()
      }
      window.location.reload();
      // this.modalContent = item
      // this.modalService.open(content, { centered: true, size: "lg", windowClass: 'andro_quick-view-modal p-0'});
    })




  }
}
