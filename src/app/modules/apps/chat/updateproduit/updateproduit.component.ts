import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UserServiceService } from 'src/app/services/users/user-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-updateproduit',
  templateUrl: './updateproduit.component.html',
  styleUrls: ['./updateproduit.component.scss']
})
export class UpdateproduitComponent implements OnInit {

  defaultLocalisation: string = '44';
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
      idcat:new FormControl(),

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
   // this.getAutorisation()
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
  GetAllVente(id:any,user:any){
    this.userService.GetAllCategorie().subscribe((rep:any)=>{
      // rep.data.forEach((element:any) => {
      //   // this.User.forEach((user:any) => {
      //   //  // console.log(element.idUser,user.id.toString())
      //   //     if(element.idUser==user.id.toString()){
      //   //       element.prod = user.name
      //   //       element.prodcontact = user.contact
      //   //     }

      //   // })
      // //  this.defaultLocalisation = element.idUser
      //   this.Vente.push(element)
      // });
      this.Vente = rep.data
      var categorie = this.Vente.filter((item:any)=> {return item.id.toString()== user.response.data.categorie})
      console.log(categorie)
      this.namefile = user.response.data.urlimage;
      this.AddUserForm.controls['email'].setValue(user.response.data.label, {onlySelf: true})
      this.AddUserForm.controls['localisation'].setValue(categorie[0].type_produit, {onlySelf: true});
      this.AddUserForm.controls['idcat'].setValue(user.response.data.categorie, {onlySelf: true});
      console.log("this.f =>",this.f.idcat.value);
      console.log("this.f =>",this.f.localisation.value);
      console.log("this.f =>",this.f.email.value);
      this.cdr.detectChanges()
      this.cdr.detectChanges()
    },error=>{

    },
    ()=>{
      // console.log(this.Vente)
      // console.log(this.Vente)
     // this.AddUserForm.controls['localisation'].setValue(this.Vente[0].id, {onlySelf: true});
    })
  }

  GetAllUser(){
    this.userService.GetVenteProduitById(this.route.snapshot.params.id).subscribe((user:any) =>{

          console.log("ici",user)
      this.GetAllVente(this.route.snapshot.params.id,user);

    },error =>{

    },()=>{
      //this.GetAllVente()
      //this.GetAllVente(this.route.snapshot.params.id);

    })
  }
  namefile:string = ""
  file_data:any=''
  file:any
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
      //console.log("this.namefile :",this.namefile)
      //this.namefile = image.size+image.type+String(Math.floor(100000 + Math.random() * 900000))+this.userconnected.token+String(Math.floor(100000 + Math.random() * 900000))

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

   this.userService.UpdateProduitVente(this.f,this.namefile,this.route.snapshot.params.id).subscribe((rep:any)=>{
    console.log(rep)
     if(rep.response.code=="402"){
     this.cdr.detectChanges();
     this.isLoading$.next(false);
     this.message = "information deja enregistré changez le numero"
     this.stateinfo = true
   // this.allreadyexiste = true;
     this.cdr.detectChanges();
     }else if(rep.response.result==true){

      // if(this.file){
      //   this.userService.UplaodIamge(this.file).subscribe((res)=>{
      //     console.log(res)
      //   })
      // }else{
      //   this.errorfeildfile = true
      // }
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
