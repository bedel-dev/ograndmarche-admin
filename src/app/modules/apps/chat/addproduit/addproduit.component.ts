import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/modules/auth';
import { UserServiceService } from 'src/app/services/users/user-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-addproduit',
  templateUrl: './addproduit.component.html',
  styleUrls: ['./addproduit.component.scss']
})
export class AddproduitComponent implements OnInit {

  defaultLocalisation: string = 'null';
  defaultRole: string = 'gpublic';
  constructor(private route: ActivatedRoute, private router: Router,private authService: AuthService,private cdr: ChangeDetectorRef,private fb: FormBuilder,private userService:UserServiceService,) {
    this.AddUserForm = new FormGroup({
      image: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      username: new FormControl(),
      localisation: new FormControl(),
      role: new FormControl(),
      pass1: new FormControl(),
      pass2: new FormControl(),
      nom: new FormControl(),
      prenom: new FormControl(),
      loc:new FormControl(),
      montant:new FormControl(),

    })
    this.AddAutorisationForm = new FormGroup({
      autorisation:new FormControl()
    })

     this.AddUserForm.controls['localisation'].setValue(this.defaultLocalisation, {onlySelf: true});
    // this.AddUserForm.controls['role'].setValue(this.defaultRole, {onlySelf: true});

    const loadingSubscr = this.isLoading$
    .asObservable()
    .subscribe((res:any) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
   }
  ngOnInit(): void {
    this.getAutorisation()
    this.GetAllUser()
  }
  showChangeEmailForm: boolean = false;
  showChangePasswordForm: boolean = false;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];


  AddUserForm: FormGroup;
  AddAutorisationForm: FormGroup;

  get f() {
    return this.AddUserForm.controls;
  }

  Vente:any[]=[]
  User:any[]=[]
  GetAllVente(){
    this.userService.GetAllCategorie().subscribe((rep:any)=>{
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
      console.log(this.Vente)
      console.log(this.Vente)
    //  this.AddUserForm.controls['localisation'].setValue(this.Vente[0].id, {onlySelf: true});
    })
  }

  GetAllUser(){
    this.userService.GetAlluser().subscribe((user:any) =>{
      user.data.forEach((element:any) => {
         //console.log(element)
         this.User.push(element)
      })
      this.cdr.detectChanges()
    },error =>{

    },()=>{
      this.GetAllVente()
    })
  }
  file_data:any=''
  file:any
  namefile:string = ""

  autorisation:any[]=[];
   getAutorisation(){
    this.userService.getAllautorisation().subscribe((res:any)=>{
      console.log(res.status)
      if(res.status ==  true){
        for(let r of res.data){
          //console.log(r)
          this.autorisation.push(r)
        }
        this.cdr.detectChanges();

      }else{

      }
    },error=>{
     // this.authService.logout()
    })

   // console.log(this.autorisation)
  }
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  userconnected:any
  onFileChange(event:any) {
    var hauth =  localStorage.getItem(this.authLocalStorageToken)
     this.userconnected = JSON.parse(hauth!)
     console.log(this.userconnected.data.role)
    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      this.file = image;
      console.log('finfo',image.name,image.size,image.type);
      this.namefile = event.target.files[0].name;
     // this.namefile = image.size+"_"+String(Math.floor(100000 + Math.random() * 900000))+"."+image.type.split("/")[1]
     // console.log(image.name)
    // console.log("this.namefile :",this.namefile)
      let formData = new FormData();
      let info={id:2,name:'raja'}
      formData.append('image', image, image.name);
      formData.append('id','2');
      formData.append('tz',new Date().toISOString())
      formData.append('update','2')
      formData.append('image',JSON.stringify(info))
      this.file_data=formData


     console.log(this.file_data)

      this.cdr.detectChanges()
      this.AddUserForm.patchValue({
        fileSource: image
      });
    this.cdr.markForCheck();
    }
  }

  userved:any;
  user:any
 message:string;
 stateinfo = false;
 allreadyexiste = false
 success = false;
 errorfeildfile = false;
 errorfeildName = false;
 passewordgood = false;
 errorfeildPrenom = false;
 errorfeildlocalite = false;
 errorfeildPhone = false
 errorfeildusername = false;
 errorfeildpays = false;
 errorfeildrole = false;
 errorfeildpass1 =false;
 errorfeildpass2 = false;
 errorfeildDescription = false;
 errorfeilddelai = false;
 errorfeilmontant = false;

  addscategorie:boolean = false;
  addSousCategorie(){
    this.addscategorie = !this.addscategorie;
  }



 saveSettings() {

    //console.log("vente :"+this.f.loc.value)
   this.isLoading$.next(true);
   var statework = true;
   this.namefile = '2.jpeg';
   if(this.namefile == ""){
     statework= false
     this.errorfeildfile = true
     this.isLoading$.next(false);
   }else{
     statework= true
     this.errorfeildfile = false

   }

   if(this.f.localisation.value == null){
    statework= false
    this.errorfeildpays = true
    this.isLoading$.next(false);
  }else{
    this.errorfeildpays = false
    statework= true
  }

   if(this.f.email.value == null){
     statework= false
     this.errorfeildDescription = true
     this.isLoading$.next(false);
   }else{
     this.errorfeildDescription = false
     statework= true
   }
   this.cdr.detectChanges();
 if(!this.errorfeildfile
   &&!this.errorfeildpays
   &&!this.errorfeildDescription)
   {

    

   this.userService.AddProduitVente(this.f,this.namefile).subscribe((rep:any)=>{
    console.log(rep)
     if(rep.response.code=="402"){
     this.cdr.detectChanges();
     this.isLoading$.next(false);
     this.message = "information deja enregistré changez le numero"
     this.stateinfo = true
   // this.allreadyexiste = true;
     this.cdr.detectChanges();
     }else if(rep.response.code=="200"){

  //  this.userService.UplaodIamge(this.file).subscribe((res)=>{
  //    console.log(res)
  //  })
      //this.userved = rep.response.data.id;
       //console.log(this.userved)
      // this.accesautorisation= true;
       this.isLoading$.next(false);
       this.message = "enregistrement effectuer"
       this.success = true
       this.allreadyexiste = true;
       this.router.navigate(['/apps/chat/list-produit']);
      //  var n = rep.response.data.name.split(" ");
      //  var nom = n[0]
      //  var prenom = n[1]
      //  this.AddUserForm.controls['email'].setValue(rep.response.data.email, {onlySelf: true})
      //  this.AddUserForm.controls['email'].disable();
      //  this.AddUserForm.controls['phone'].setValue(rep.response.data.contact, {onlySelf: true});
      //  this.AddUserForm.controls['phone'].disable();
      //  this.AddUserForm.controls['username'].setValue(rep.response.data.username, {onlySelf: true});
      //  this.AddUserForm.controls['username'].disable();
      //  this.AddUserForm.controls['localisation'].setValue(rep.response.data.localisation, {onlySelf: true});
      //  this.AddUserForm.controls['localisation'].disable();
      //  this.AddUserForm.controls['role'].setValue(rep.response.data.role, {onlySelf: true});
      //  this.AddUserForm.controls['role'].disable();
      //  this.AddUserForm.controls['pass1'].setValue('********************', {onlySelf: true});
      //  this.AddUserForm.controls['pass1'].disable();
      //  this.AddUserForm.controls['pass2'].setValue('********************', {onlySelf: true});
      //  this.AddUserForm.controls['pass2'].disable();
      //  this.AddUserForm.controls['nom'].setValue(nom, {onlySelf: true});
      //  this.AddUserForm.controls['nom'].disable();
      //  this.AddUserForm.controls['prenom'].setValue(prenom, {onlySelf: true});
      //  this.AddUserForm.controls['prenom'].disable();
      //  this.AddUserForm.controls['image'].disable();
      //  this.cdr.detectChanges();
     }
     else{
       //console.log(rep.response.message)
       this.message = "errer lors de l'enregistrément"
       this.stateinfo = true
       this.isLoading$.next(false);
       this.cdr.detectChanges();
     }
   },
   error=>{
     this.message = "errer lors de l'enregistrément"
     this.stateinfo = true
     this.isLoading$.next(false);
     //this.authService.logout()
   },
   ()=>{

     setTimeout(() => {
       this.success = false
       this.stateinfo = false
       this.cdr.detectChanges();
     }, 2500);
   })

 }

 }


 saveSettingsSous() {

  //console.log("vente :"+this.f.loc.value)
 this.isLoading$.next(true);
 var statework = true;
//  if(this.namefile == ""){
//    statework= false
//    this.errorfeildfile = true
//    this.isLoading$.next(false);
//  }else{
//    statework= true
//    this.errorfeildfile = false

//  }

 if(this.f.localisation.value == null){
  statework= false
  this.errorfeildpays = true
  this.isLoading$.next(false);
}else{
  this.errorfeildpays = false
  statework= true
}

 if(this.f.email.value == null){
   statework= false
   this.errorfeildDescription = true
   this.isLoading$.next(false);
 }else{
   this.errorfeildDescription = false
   statework= true
 }
 this.cdr.detectChanges();
if(!this.errorfeildfile
 &&!this.errorfeildpays
 &&!this.errorfeildDescription)
 {

 this.userService.addCategorie(this.f).subscribe((rep:any)=>{
  console.log(rep)
   if(rep.response.code=="402"){
   this.cdr.detectChanges();
   this.isLoading$.next(false);
   this.message = "information deja enregistré changez le nom"
   this.stateinfo = true
 // this.allreadyexiste = true;
   this.cdr.detectChanges();
   }else if(rep.response.code=="200"){

//  this.userService.UplaodIamge(this.file).subscribe((res)=>{
//    console.log(res)
//  })
    //this.userved = rep.response.data.id;
     //console.log(this.userved)
    // this.accesautorisation= true;
     this.isLoading$.next(false);
     this.message = "Produit enregistré"
     this.success = true
     this.allreadyexiste = true;
     this.router.navigate(['/apps/chat/list-produit']);
    //  var n = rep.response.data.name.split(" ");
    //  var nom = n[0]
    //  var prenom = n[1]
    //  this.AddUserForm.controls['email'].setValue(rep.response.data.email, {onlySelf: true})
    //  this.AddUserForm.controls['email'].disable();
    //  this.AddUserForm.controls['phone'].setValue(rep.response.data.contact, {onlySelf: true});
    //  this.AddUserForm.controls['phone'].disable();
    //  this.AddUserForm.controls['username'].setValue(rep.response.data.username, {onlySelf: true});
    //  this.AddUserForm.controls['username'].disable();
    //  this.AddUserForm.controls['localisation'].setValue(rep.response.data.localisation, {onlySelf: true});
    //  this.AddUserForm.controls['localisation'].disable();
    //  this.AddUserForm.controls['role'].setValue(rep.response.data.role, {onlySelf: true});
    //  this.AddUserForm.controls['role'].disable();
    //  this.AddUserForm.controls['pass1'].setValue('********************', {onlySelf: true});
    //  this.AddUserForm.controls['pass1'].disable();
    //  this.AddUserForm.controls['pass2'].setValue('********************', {onlySelf: true});
    //  this.AddUserForm.controls['pass2'].disable();
    //  this.AddUserForm.controls['nom'].setValue(nom, {onlySelf: true});
    //  this.AddUserForm.controls['nom'].disable();
    //  this.AddUserForm.controls['prenom'].setValue(prenom, {onlySelf: true});
    //  this.AddUserForm.controls['prenom'].disable();
    //  this.AddUserForm.controls['image'].disable();
    //  this.cdr.detectChanges();
   }
   else{
     //console.log(rep.response.message)
     this.message = "errer lors de l'enregistrément"
     this.stateinfo = true
     this.isLoading$.next(false);
     this.cdr.detectChanges();
   }
 },
 error=>{
   this.message = "errer lors de l'enregistrément"
   this.stateinfo = true
   this.isLoading$.next(false);
   //this.authService.logout()
 },
 ()=>{

   setTimeout(() => {
     this.success = false
     this.stateinfo = false
     this.cdr.detectChanges();
   }, 2500);
 })

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
