import { ThisReceiver } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subscription } from 'rxjs/internal/Subscription';
import { GlobalConstants } from 'src/app/common/global-constants';
import { AuthService } from 'src/app/modules/auth';
import { UserServiceService } from 'src/app/services/users/user-service.service';

@Component({
  selector: 'app-addconseil',
  templateUrl: './addconseil.component.html',
  styleUrls: ['./addconseil.component.scss']
})
export class AddconseilComponent implements OnInit {

  defaultLocalisation: string = '44';
  defaultRole: string = 'gpublic';
  constructor(private route: ActivatedRoute, private router: Router,private authService: AuthService,private cdr: ChangeDetectorRef,private fb: FormBuilder,private userService:UserServiceService,) {
    this.AddUserForm = new FormGroup({
      image: new FormControl(),
      typeProduit: new FormControl(),
      videolink: new FormControl(),
      pdflink: new FormControl(),
      description: new FormControl(),

        produit: new FormControl(),
        pass1: new FormControl(),
        pass2: new FormControl(),
        producteur: new FormControl(),
        quantite: new FormControl(),
        loc:new FormControl(),
        montant:new FormControl(),
        enlevement:new FormControl(),
        culture:new FormControl(''),

    })
    this.AddAutorisationForm = new FormGroup({
      autorisation:new FormControl()
    })

     this.AddUserForm.controls['typeProduit'].setValue("pdf", {onlySelf: true});
     this.AddUserForm.controls['produit'].setValue("null", {onlySelf: true});

    // this.AddUserForm.controls['producteur'].setValue(this.defaultLocalisation, {onlySelf: true});

    const loadingSubscr = this.isLoading$
    .asObservable()
    .subscribe((res:any) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
   }
  ngOnInit(): void {
    //newvente
    // this.getAutorisation()
     this.GetAllUser()
  }

  linkvideo:boolean = false;
  linkpdf:boolean = false;
  filevideopdf:boolean = true;
  showChangeEmailForm: boolean = false;
  showChangePasswordForm: boolean = false;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];
  datalistOptions:any[]=[]
  LieuVide:boolean = false

  onSearchChange(searchValue: any): void {
    var sessionToken = String(Math.floor(100000 + Math.random() * 900000))
  // this.Lieulivraison = searchValue.target.value
    this.userService.getloc(searchValue.target.value,sessionToken).subscribe((localite:any)=>{
      this.datalistOptions= []
      this.cdr.detectChanges()
      localite.predictions.forEach((element: any) => {
        this.datalistOptions.push(element)
        console.log(element.description)
        this.cdr.detectChanges()

      });
    })
  }

  AddUserForm: FormGroup;
  AddAutorisationForm: FormGroup;

  get f() {
    return this.AddUserForm.controls;
  }

  Vente:any[]=[]
  User:any[]=[]
  GetAllVente(){
    this.userService.GetAllCategorie().subscribe((rep:any)=>{
      //console.log(rep)
      rep.data.forEach((element:any) => {
        // this.User.forEach((user:any) => {
        //  // console.log(element.idUser,user.id.toString())
        //     if(element.idUser==user.id.toString()){
        //       element.prod = user.name
        //       element.prodcontact = user.contact
        //     }

        // })
      //  this.defaultLocalisation = element.idUser
        this.Vente.push(element)
      });
      this.cdr.detectChanges()
    },error=>{

    },
    ()=>{
    //  console.log(this.Vente)
    //  console.log(this.Vente)
   //   this.AddUserForm.controls['typevente'].setValue(this.Vente[0].id, {onlySelf: true});
    })
  }

  view:string ='conseil1';
  changeView(goto:string){
    this.view = goto;
    this.cdr.detectChanges();
  }

  users:any
  getUser() {
    this.users = JSON.parse(this.userService.GetUserData()!)
    this.cdr.detectChanges()
    console.log(this.users)
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
   this.GetAllUser()
   //this.GetAllUser()
 }

 Delete(data:any){
  this.userService.DeleteproduitConseil(data).subscribe((user:any) =>{
    console.log(user)
    this.cdr.detectChanges()
    this.GetAllUser()
    // this.router.navigate(['/apps/conseil/listconseil'])
  },error =>{

  },()=>{
    console.log(this.User)
   //       this.AddUserForm.controls['produit'].setValue(this.User[0].id, {onlySelf: true});

   // this.GetAllVente()
  })
 }

 profilurl = GlobalConstants.imagurl
 
  GetAllUser(){
    this.getUser()
    this.User = [];
    this.userService.GetAllproduitConseil().subscribe((user:any) =>{
      user.data.forEach((element:any) => {
         //console.log(element)
         this.User.push(element)
      })
      this.cdr.detectChanges()
    },error =>{

    },()=>{
      console.log(this.User)
     //       this.AddUserForm.controls['produit'].setValue(this.User[0].id, {onlySelf: true});

     // this.GetAllVente()
    })
  }
  namefile:string = ""
  file_data:any=''
  file :any = null;
  autorisation:any[]=[];
   getAutorisation(){
    this.userService.GetAlluser().subscribe((res:any)=>{
      if(res.status ==  true){
        for(let r of res.data){
          //console.log(r)
          if(r.role == "fournisseur" || r.role == "Producteur" || r.role == "Intrant"){

           // console.log("this.route.snapshot.params.id :",r.contact,this.route.snapshot.params.id)
            if(this.route.snapshot.params.id =="newvente")
            {
              this.autorisation.push(r)
            }else{
              if(r.contact == this.route.snapshot.params.id){
                this.autorisation.push(r)
              }
            }
          }
        }
        this.cdr.detectChanges();

      }else{

      }
    },error=>{
     // this.authService.logout()
    },()=>{
      console.log(this.autorisation)
    this.AddUserForm.controls['producteur'].setValue(this.autorisation[0].id, {onlySelf: true});

    })


  }

onChangeValue(event:any)
{
  console.log(event.target.value);


  if(event.target.value == "pdf lien"){
    this.linkpdf = true;
    this.linkvideo = false;
    this.filevideopdf = false;
    this.cdr.detectChanges();
  }

  else if(event.target.value == "video lien"){
    this.linkpdf = false;
    this.linkvideo = true;
    this.filevideopdf = false;
    this.cdr.detectChanges();
  }

  else if(event.target.value == "video"){
    this.linkpdf = false;
    this.linkvideo = false;
    this.filevideopdf = true;
    this.cdr.detectChanges();
  }

  else if(event.target.value == "pdf"){
    this.linkpdf = false;
    this.linkvideo = false;
    this.filevideopdf = true;
    this.cdr.detectChanges();
  }
}



  onFileChange(event:any) {

    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      console.log('finfo',image.type," : ",image.size);
      if(image.type === "application/pdf"){
        this.file = image;
       // console.log('finfo',image.type); image.type ==="video/mp4" || image.type === "video/avi" ||
        this.namefile = event.target.files[0].name;

        let formData = new FormData();
        let info={id:2,name:'raja'}
        formData.append('image', image, image.name);
        formData.append('id','2');
        formData.append('tz',new Date().toISOString())
        formData.append('update','2')
        formData.append('image',JSON.stringify(info))
        this.file_data=formData


      // console.log(this.file_data)

        this.cdr.detectChanges()
        this.AddUserForm.patchValue({
          fileSource: image
        });
      this.cdr.markForCheck();
      this.errorfeildfile = false
      this.cdr.detectChanges();
      }else{
        console.log("je suis ici");
        this.errorfeildfile = true
        this.cdr.detectChanges();
      }
    }
  }


  onFileChange2(event:any) {

    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      console.log('finfo',image.type," : ",image.size);

      //if(image.size > 1000000)
      if(image.type.startsWith("image/")){
        this.file = image;
       // console.log('finfo',image.type); image.type ==="video/mp4" || image.type === "video/avi" ||
        this.namefile = event.target.files[0].name;

        let formData = new FormData();
        let info={id:2,name:'raja'}
        formData.append('image', image, image.name);
        formData.append('id','2');
        formData.append('tz',new Date().toISOString())
        formData.append('update','2')
        formData.append('image',JSON.stringify(info))
        this.file_data=formData


      // console.log(this.file_data)

        this.cdr.detectChanges()
        this.AddUserForm.patchValue({
          fileSource: image
        });
      this.cdr.markForCheck();
      this.errorfeildfile = false
      this.cdr.detectChanges();
      }else{
        console.log("je suis ici");
        this.errorfeildfile = true
        this.msg = 'Veuillez choisir une image'
        this.cdr.detectChanges();
      }
    }
  }
  msg:string = 'Ajouter un fichier';

  userved:any;
  user:any
 message:string;
 stateinfo = false;
 allreadyexiste = false
 success = false;
 errorfeildfile = false;
 errorfeildescription = false;
 errorfeildlinkpdf = false;
 errorfeildlinkvideo = false;

 errorfeildPrenom = false;
 errorfeildlocalite = false;
 errorfeildPhone = false
 errorfeildusername = false;
 errorfeildpays = false;
 errorfeildrole = false;
 errorfeildpass1 =false;
 errorfeilquantite = false;
 errorfeildDescription = false;
 errorfeilddelai = false;
 errorfeilmontant = false;
 errorfeildprod = false

 saveSettings() {
   var statework = true;


    if(this.filevideopdf == true){
      if(this.namefile == ""){
        statework= false
        this.errorfeildfile = true
        this.isLoading$.next(false);
      }else{
        statework= true
        this.errorfeildfile = false
      }
    }
    if(this.f.description.value  == null||this.f.description.value ==""){
      statework= false
      this.errorfeildescription = true
      this.isLoading$.next(false);
    }else{
      statework= true
      this.errorfeildescription = false
    }
    if(this.linkpdf == true){
      if(this.f.pdflink.value == null || this.f.pdflink.value ==""){
        statework= false
        this.errorfeildlinkpdf = true
        this.isLoading$.next(false);
      }else{
        statework= true
        this.errorfeildlinkpdf = false
      }
    }
    if(this.linkvideo == true){
      if(this.f.videolink.value == null || this.f.videolink.value ==""){
          statework= false
          this.errorfeildlinkvideo = true
          this.isLoading$.next(false);

      }else{
        if(this.f.videolink.value.includes("youtube")){
          statework= true
          this.errorfeildlinkvideo = false
        }else{
          console.log(this.f.videolink.value.includes("youtube"));
          statework= false
          this.errorfeildlinkvideo = true
          this.isLoading$.next(false);
        }
      }
    }

    if(this.f.produit.value == null || this.f.produit.value ==""){
      statework= false
      this.errorfeildprod = true
      this.isLoading$.next(false);
    }else{
      statework= true
      this.errorfeildprod = false
    }
 if(!this.errorfeildfile
    &&!this.errorfeildescription
    &&!this.errorfeildlinkpdf
    &&!this.errorfeildlinkvideo
    &&!this.errorfeildprod)
   {
  this.isLoading$.next(true);
  this.cdr.detectChanges();
    var linkdata =  this.namefile



   if(this.linkvideo == true){
    linkdata = this.f.videolink.value
   }else if(this.linkpdf == true){
    linkdata  =  this.f.pdflink.value
   }else{
    linkdata  =  this.namefile
   }
   console.log("this.f.videolink.value :",this.f.videolink.value)
   console.log("this.f.pdflink.value",this.f.pdflink.value)
   console.log(linkdata);

var isdone=  false
  this.userService.AddConseil(this.f,linkdata).subscribe((rep:any)=>{
    //console.log(rep);
    if(rep.response.code=="200"){
      isdone = true
    }else {
      isdone = false
      this.isLoading$.next(false);
      this.message = "information non enregistré"
      this.stateinfo  = true
      this.cdr.detectChanges();
    }
  },error=>{

},()=>{
    console.log(this.file)
    if(this.file ==null){

      if(isdone == true){
        this.isLoading$.next(false);
        this.message = "information enregistré"
        this.success = true
        this.cdr.detectChanges();
        setTimeout(() => {
          this.success = false
          this.stateinfo = false
          this.cdr.detectChanges();
          this.router.navigate(['/apps/chat/conseil']);
        }, 2500);
      }else{
        this.isLoading$.next(false);
        this.message = "information non  enregistré"
        this.stateinfo = true
        this.cdr.detectChanges();
        setTimeout(() => {
          this.success = false
          this.stateinfo = false
          this.cdr.detectChanges();
         }, 2500);
      }

    }else{
      this.userService.UplaodIamge(this.file).subscribe((res:any)=>{
          console.log(res)
          if(res.message == 'authentication failed Token not valide'){
          this.isLoading$.next(false);
          this.message = "votre session est expiré reconnectez vous"
          this.stateinfo = true
          this.cdr.detectChanges();
          this.userService.logoutGlobale();
        }else if(res.response.code == '200'){
            this.isLoading$.next(false);
             this.message = "information enregistré"
             this.success = true
             this.cdr.detectChanges();
             console.log(res)
            // this.allreadyexiste = true;
            setTimeout(() => {
              this.success = false
              this.stateinfo = false
              this.cdr.detectChanges();
              this.router.navigate(['/apps/chat/conseil']);
            }, 2500);
          }
          else{
            this.message = "document non enregistré"
            this.stateinfo = true
            this.isLoading$.next(false);
            this.cdr.detectChanges();
          }
      },error=>{

      },()=>{
       this.isLoading$.next(false);
       this.cdr.detectChanges();
      })
    }

  // this.userService.UplaodParseExel(this.file).subscribe((res:any)=>{
  //   console.log(res.message)

  //   if(res.message == 'authentication failed Token not valide'){
  //     this.isLoading$.next(false);
  //     this.message = "votre session est expiré reconnectez vous"
  //     this.stateinfo = true
  //     this.cdr.detectChanges();
  //     this.authService.logout();
  //     document.location.reload();
  //   }else if(res.response.code == '200'){
  //       this.isLoading$.next(false);
  //        this.message = "information enregistré"
  //        this.success = true
  //        this.cdr.detectChanges();
  //        console.log(res)
  //       // this.allreadyexiste = true;
  //       this.router.navigate(['/apps/chat/list-prix-du-marcher']);
  //     }
  //     else{
  //       this.message = "information non enregistré"
  //       this.success = true
  //       this.isLoading$.next(false);
  //       this.cdr.detectChanges();
  //     }
  // })

});
  console.log(this.namefile)
 }

 }



 saveCulture() {
  var statework = true;


   if(this.filevideopdf == true){
     if(this.namefile == ""){
       statework= false
       this.errorfeildfile = true
       this.msg = 'Ajouter un fichier';
       this.isLoading$.next(false);
     }else{
       statework= true
       this.errorfeildfile = false
     }
   }
  //  if(this.f.description.value  == null||this.f.description.value ==""){
  //    statework= false
  //    this.errorfeildescription = true
  //    this.isLoading$.next(false);
  //  }else{
  //    statework= true
  //    this.errorfeildescription = false
  //  }
  //  if(this.linkpdf == true){
  //    if(this.f.pdflink.value == null || this.f.pdflink.value ==""){
  //      statework= false
  //      this.errorfeildlinkpdf = true
  //      this.isLoading$.next(false);
  //    }else{
  //      statework= true
  //      this.errorfeildlinkpdf = false
  //    }
  //  }
  //  if(this.linkvideo == true){
  //    if(this.f.videolink.value == null || this.f.videolink.value ==""){
  //        statework= false
  //        this.errorfeildlinkvideo = true
  //        this.isLoading$.next(false);

  //    }else{
  //      if(this.f.videolink.value.includes("youtube")){
  //        statework= true
  //        this.errorfeildlinkvideo = false
  //      }else{
  //        console.log(this.f.videolink.value.includes("youtube"));
  //        statework= false
  //        this.errorfeildlinkvideo = true
  //        this.isLoading$.next(false);
  //      }
  //    }
  //  }
   //console.log("this.f.culture.value :",this.f.culture.value)
   if(this.f.culture.value == null || this.f.culture.value ==""){
     statework= false
     this.errorfeildprod = true
     this.isLoading$.next(false);
   }else{
     statework= true
     this.errorfeildprod = false
   }
if(!this.errorfeildfile
   &&!this.errorfeildprod)
  {
 this.isLoading$.next(true);
 this.cdr.detectChanges();
   var linkdata =  this.namefile



  // if(this.linkvideo == true){
  //  linkdata = this.f.videolink.value
  // }else if(this.linkpdf == true){
  //  linkdata  =  this.f.pdflink.value
  // }else{
  //  linkdata  =  this.namefile
  // }
  // console.log("this.f.videolink.value :",this.f.videolink.value)
  // console.log("this.f.pdflink.value",this.f.pdflink.value)
  // console.log(linkdata);

var isdone=  false
 this.userService.AddProductConseil(this.f,this.namefile).subscribe((rep:any)=>{
   //console.log(rep);
   if(rep.response.code=="200"){
     isdone = true
   }else {
     isdone = false
     this.isLoading$.next(false);
     this.message = "information non enregistré"
     this.stateinfo  = true
     this.cdr.detectChanges();
   }
 },error=>{

},()=>{
   console.log(this.file)
   if(this.file ==null){

     if(isdone == true){
       this.isLoading$.next(false);
       this.message = "information enregistré"
       this.success = true
       this.cdr.detectChanges();
       setTimeout(() => {
         this.success = false
         this.stateinfo = false
         this.cdr.detectChanges();
         window.location.reload();
         //this.view = 'conseil1'
         //this.router.navigate(['/apps/chat/addconseil']);
       }, 2500);
     }else{
       this.isLoading$.next(false);
       this.message = "information non  enregistré"
       this.stateinfo = true
       this.cdr.detectChanges();
       setTimeout(() => {
         this.success = false
         this.stateinfo = false
         this.cdr.detectChanges();
        }, 2500);
     }

   }else{
     this.userService.UplaodIamge(this.file).subscribe((res:any)=>{
         console.log(res)
         if(res.message == 'authentication failed Token not valide'){
         this.isLoading$.next(false);
         this.message = "votre session est expiré reconnectez vous"
         this.stateinfo = true
         this.cdr.detectChanges();
         this.userService.logoutGlobale();
       }else if(res.response.code == '200'){
           this.isLoading$.next(false);
            this.message = "information enregistré"
            this.success = true
            this.cdr.detectChanges();
            console.log(res)
           // this.allreadyexiste = true;
           setTimeout(() => {
             this.success = false
             this.stateinfo = false
             this.cdr.detectChanges();
             window.location.reload();
            // this.router.navigate(['/apps/chat/conseil']);
           }, 2500);
         }
         else{
           this.message = "document non enregistré"
           this.stateinfo = true
           this.isLoading$.next(false);
           this.cdr.detectChanges();
         }
     },error=>{

     },()=>{
      this.isLoading$.next(false);
      this.cdr.detectChanges();
     })
   }

 // this.userService.UplaodParseExel(this.file).subscribe((res:any)=>{
 //   console.log(res.message)

 //   if(res.message == 'authentication failed Token not valide'){
 //     this.isLoading$.next(false);
 //     this.message = "votre session est expiré reconnectez vous"
 //     this.stateinfo = true
 //     this.cdr.detectChanges();
 //     this.authService.logout();
 //     document.location.reload();
 //   }else if(res.response.code == '200'){
 //       this.isLoading$.next(false);
 //        this.message = "information enregistré"
 //        this.success = true
 //        this.cdr.detectChanges();
 //        console.log(res)
 //       // this.allreadyexiste = true;
 //       this.router.navigate(['/apps/chat/list-prix-du-marcher']);
 //     }
 //     else{
 //       this.message = "information non enregistré"
 //       this.success = true
 //       this.isLoading$.next(false);
 //       this.cdr.detectChanges();
 //     }
 // })

});
 console.log(this.namefile)
}

}

 autorisationListe:any[]=[]
 autorisationempty = false
 sussesauto = false
 Saveautorisation(){
   this.isLoading$.next(true);
   console.log(this.autorisationListe.length)
   if(this.autorisationListe.length==0){
     this.autorisationempty = true
     this.isLoading$.next(false);
     this.cdr.detectChanges()
   }else{
     this.autorisationempty = false
     this.userService.AddUserautorisation(this.autorisationListe,this.userved).subscribe((res:any)=>{

       console.log(res)
       if(res.response.code=="200"){
         this.sussesauto =true
         this.cdr.detectChanges()
       }
     },erro=>{
       //this.authService.logout()
     },()=>{

     })

     this.isLoading$.next(false);
     this.cdr.detectChanges()
   }
 }
 choixAutorisation(choix:any){
   this.autorisationListe.push(choix)
   this.cdr.detectChanges();
 }

 toggleEmailForm(show: boolean) {
   this.showChangeEmailForm = show;
 }

 saveEmail() {
   this.isLoading$.next(true);
   setTimeout(() => {
     this.isLoading$.next(false);
     this.showChangeEmailForm = false;
     this.cdr.detectChanges();
   }, 1500);
 }

 togglePasswordForm(show: boolean) {
   this.showChangePasswordForm = show;
 }

 savePassword() {
   this.isLoading$.next(true);
   setTimeout(() => {
     this.isLoading$.next(false);
     this.showChangePasswordForm = false;
     this.cdr.detectChanges();
   }, 1500);
 }

 public saveUsername:boolean;
 public accesautorisation:boolean = false;
 AccesCompte(data:any){
   if(data == true&&this.accesautorisation==false){
     this.saveSettings()

   }
  // console.log(data)
 }

 ngOnDestroy() {
   this.unsubscribe.forEach((sb) => sb.unsubscribe());
 }
}
