import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/modules/auth';
import { UserServiceService } from 'src/app/services/users/user-service.service';

@Component({
  selector: 'app-addvente',
  templateUrl: './addvente.component.html',
  styleUrls: ['./addvente.component.scss']
})
export class AddventeComponent implements OnInit {

  defaultLocalisation: string = '44';
  defaultRole: string = 'gpublic';
  constructor(private route: ActivatedRoute, private router: Router,private authService: AuthService,private cdr: ChangeDetectorRef,private fb: FormBuilder,private userService:UserServiceService,) {
    this.AddUserForm = new FormGroup({
      image: new FormControl(),
      description: new FormControl(),
      phone: new FormControl(),
      username: new FormControl(),
      typevente: new FormControl(),
      produit: new FormControl(),
      pass1: new FormControl(),
      pass2: new FormControl(),
      producteur: new FormControl(),
      quantite: new FormControl(),
      loc:new FormControl(),
      montant:new FormControl(),
      enlevement:new FormControl(),
      unitmessure:new FormControl()

    })
    this.AddAutorisationForm = new FormGroup({
      autorisation:new FormControl()
    })
     this.AddUserForm.controls['unitmessure'].setValue("null", {onlySelf: true});
     this.AddUserForm.controls['typevente'].setValue("null", {onlySelf: true});
    // this.AddUserForm.controls['producteur'].setValue(this.defaultLocalisation, {onlySelf: true});

    const loadingSubscr = this.isLoading$
    .asObservable()
    .subscribe((res:any) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
   }
  ngOnInit(): void {
    //newvente
    this.getAutorisation()
    this.GetAllUser()
  }
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

  GetAllUser(){
    this.userService.GetAllproduit().subscribe((user:any) =>{
      user.data.forEach((element:any) => {
         //console.log(element)
         this.User.push(element)
      })
      this.cdr.detectChanges()
    },error =>{

    },()=>{
      console.log(this.User)
            this.AddUserForm.controls['produit'].setValue(this.User[0].id, {onlySelf: true});

      this.GetAllVente()
    })
  }
  namefile:string = ""
  file_data:any=''
  file:any
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
  onFileChange(event:any) {

    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      this.file = image;
      console.log('finfo',image.name,image.size,image.type);
      this.namefile = event.target.files[0].name;

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
 errorfeilquantite = false;
 errorfeildDescription = false;
 errorfeilddelai = false;
 errorfeilmontant = false;


 saveSettings() {

    //console.log("vente :"+this.f.loc.value)
   this.isLoading$.next(true);
   var statework = true;
   if(this.namefile == ""){
     statework= false
     this.errorfeildfile = true
     this.isLoading$.next(false);
   }else{
     statework= true
     this.errorfeildfile = false

   }

   if(this.f.description.value == null){
     statework= false
     this.errorfeildDescription = true
     this.isLoading$.next(false);
   }else{
     this.errorfeildDescription = false
     statework= true
   }

   if(this.f.montant.value == null){
    statework= false
    this.errorfeilmontant = true
    this.isLoading$.next(false);
  }else{
    this.errorfeilmontant = false
    statework= true
  }
  if(this.f.quantite.value == null){
    statework= false
    this.errorfeilquantite = true
    this.isLoading$.next(false);
  }else{
    this.errorfeilquantite = false
    statework= true
  }

  if(this.f.quantite.value == null){
    statework= false
    this.errorfeilquantite = true
    this.isLoading$.next(false);
  }else{
    this.errorfeilquantite = false
    statework= true
  }
  if(this.f.enlevement.value == null){
    statework= false
    this.LieuVide = true
    this.isLoading$.next(false);
  }else{
    this.LieuVide = false
    statework= true
  }

   this.cdr.detectChanges();
 if(!this.errorfeildfile
   &&!this.errorfeildpays
   &&!this.errorfeildDescription
   &&!this.errorfeilmontant
   &&!this.errorfeilquantite
   &&!this.LieuVide)
   {

   this.userService.AddVente(this.f,this.namefile).subscribe((rep:any)=>{
    console.log(rep)
     if(rep.response.code=="402"){
     this.cdr.detectChanges();
     this.isLoading$.next(false);
     this.message = "information deja enregistré changez le numero"
     this.stateinfo = true
   // this.allreadyexiste = true;
     this.cdr.detectChanges();
     }else if(rep.response.code=="200"){

   this.userService.UplaodIamge(this.file).subscribe((res)=>{
     console.log(res)
   })
      //this.userved = rep.response.data.id;
       //console.log(this.userved)
      // this.accesautorisation= true;
       this.isLoading$.next(false);
       this.message = "Vente enregistré"
       this.success = true
       this.allreadyexiste = true;
       this.router.navigate(['/apps/chat/list-vente']);
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
