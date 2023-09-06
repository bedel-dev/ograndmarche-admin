import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';
import { AuthService, UserModel } from 'src/app/modules/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient,private authService: AuthService) { }
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  getloc(text:String,tokensession:String){
      return this.http.get("https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+text+"&language=fr&components=country:ci&key=AIzaSyCucatgvP-JcsWSFdofdqQ_nbgyimkVpMo&sessiontoken="+tokensession)
  }

public GetAlluser() {
 var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`
})
 return this.http.get(GlobalConstants.api_auth+'/listUsers.json',{headers: headers})
}


public logoutGlobale(){
  this.authService.logout();
  document.location.reload();
}

public GetUserData() {
  var hauth =  localStorage.getItem(this.authLocalStorageToken);
  //sconsole.log(hauth);
  return hauth;
}

public GetAllproduit() {
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
   const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${user.token}`
 })
// console.log("user token: " + user.token);
  return this.http.get(GlobalConstants.apiURL+'/produitventes/listProduitventes.json',{headers: headers})
}


public GetAllchauffeur() {
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
   const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${user.token}`
 })
 //console.log("user token: " + user.token);
  return this.http.get(GlobalConstants.apiURL+'/chauffeurs/listChauffeur.json',{headers: headers})
}

public GetAllvehicule(){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
   const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${user.token}`
 })
  return this.http.get(GlobalConstants.apiURL+'/vehicules/listVehicules.json',{headers: headers})
}

public GetAllservice(){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
   const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${user.token}`
 })
  return this.http.get(GlobalConstants.apiURL+'/servicetransport/listServicetransport.json',{headers: headers})
}

UpdateChauffeur(data:any,idvent:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  })

  // var raw = JSON.stringify({
  //   "idUser": datauser.producteur.value,
  //   "idProduit": datauser.produit.value,
  //   "typeVente": datauser.typevente.value,
  //   "description": datauser.description.value,
  //   "prix": parseInt(datauser.montant.value),
  //   "quantite":  parseInt(datauser.quantite.value),
  //   "urlImageVente": img,
  //   "categorieProduitId": "null"
  // });
// const body =JSON.stringify(t);
return this.http.post(GlobalConstants.apiURL+'/chauffeurs/edit/'+idvent+'.json',data,{headers: headers})
}

UpdateCourse(data:any,idvent:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  })

return this.http.post(GlobalConstants.apiURL+'/courses/updateCourses/'+idvent+'.json',data,{headers: headers})
}

public GetAllmontantCourse() {
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
   const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${user.token}`
 })
 console.log("user token: " + user.token);
  return this.http.get(GlobalConstants.apiURL+'/montantlivraison/listMontantlivraison.json',{headers: headers})
}
public GetAllCourse() {
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
   const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${user.token}`
 })
  //console.log("user token: " + user.token);
  return this.http.get(GlobalConstants.apiURL+'/courses/listCourses.json',{headers: headers})
}

public GetAllprod() {
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
   const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${user.token}`
 })
  return this.http.get(GlobalConstants.apiURL+'/produitventes/listProduitventes.json',{headers: headers})
}



public  forgetpassword(data:any,validationcode:any){
  // var email = data.email;
  let user = {
    "contact":data,
    "codevalidation":validationcode
  }
   const headers = new HttpHeaders()
  .append(
    'Content-Type',
    'application/json'
  );
  const body=JSON.stringify(user);
  return this.http.post(GlobalConstants.api_auth+'/adminpass.json', body, {
    headers: headers,
  })
}



public GetAllautorisation() {
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
   const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${user.token}`
 })
  return this.http.get(GlobalConstants.api_auth_host+'autorisations/getallautorisation.json',{headers: headers})
 }

GetCommandeByuser(){

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
})
 return this.http.get(GlobalConstants.api_auth+'/listUsers.json',{headers: headers})
}

  Controlesole(data:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
 // const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
   // 'Authorization': `Bearer ${user.token}`,
  })
  var user = {
    "carte_id": data 
  }
  const body =JSON.stringify(user);
  return this.http.post("https://stageapi.lidar-platform.com/v1.4/operations/solde.json",body,{headers:headers});  
}
Getuserlidar(data:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  //const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
   // 'Authorization': `Bearer ${user.token}`,
  })
  var user = {
    "name": data 
  }
  const body =JSON.stringify(user);

  return this.http.post("https://stageapi.lidar-platform.com/v1.4/beneficiaires/retrieveBeneficiaireByPhonenumber.json",body,{headers:headers});    
}

    AddUser(datauser:any,img:any){
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
})
    var mail = ""
    if(datauser.email.value == ''){
      mail = "defaulmail@gmail.com"
    }else{
      mail= datauser.email.value
    }
    var  v = datauser.phone.value.number
    var number = datauser.phone.value.dialCode+" "+v;
    var user = {
  "name":datauser.nom.value+" "+datauser.prenom.value,
  "contact":number,
  "email":mail,
  "locality":datauser.loc.value,
  "user_type":"AGENCE",
  "username":"null",
  // "password":datauser.pass1.value,
  "password":"123",
  "role":datauser.role.value,
  "CoustumerID":4,
  "localisation":datauser.localisation.value,
  "urlprofile":img
}
//console.log(user)
const body =JSON.stringify(user);
return this.http.post(GlobalConstants.api_auth+'/add.json',body,{headers: headers})
}


AddUserFournisseur(datauser:any,img:any){
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
     'Authorization': `Bearer ${"localStorage.getItem('token')"}`
})
    var mail = ""
    if(datauser.email == ''){
      mail = "defaulmail@gmail.com"
    }else{
      mail= datauser.email
    }
var user = {
  "name":datauser.nom+" "+datauser.prenom ,
  "contact":datauser.numero,
  "email":mail,
  "locality":datauser.ville+','+datauser.lieuHabitation,
  "user_type":"AGENCE",
  "username":mail,
  "password":datauser.pass1,
  "role":datauser.typeDemande,
  "CoustumerID":"",
  "localisation":"CI",
  "urlprofile":img,
  "engin":datauser.id.toString(),
}
console.log(user)
const body =JSON.stringify(user);
return this.http.post(GlobalConstants.api_auth+'/add.json',body,{headers: headers})
}

AddPublicite(datauser:any,img:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  })

var t = {
  "idBenef":datauser.localisation.value,
  "urlImage":img,
  "contenu":datauser.email.value,
  "delai":datauser.loc.value.toString(),
  "dateDebut":"00/00/0000",
  "dateFin":"00/00/0000",
  "montant":datauser.montant.value.toString(),
}
console.log(t)
const body =JSON.stringify(t);
return this.http.post(GlobalConstants.apiURL+'/publicites/savePublicites.json',body,{headers: headers})
}
AddMontantCourse(datauser:any,img:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  })

var t = {
  "libelle":datauser.email.value.toString(),
  "montant":datauser.montant.value.toString(),
}
console.log(t)
const body =JSON.stringify(t);
return this.http.post(GlobalConstants.apiURL+'/montantlivraison/addMontantlivraison.json',body,{headers: headers})
}

AddProduitVente(datauser:any,img:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  })


var t = {
  "label":datauser.email.value,
  "categorie": datauser.localisation.value,
  "urlimage": img
}
console.log(t)
const body =JSON.stringify(t);
return this.http.post(GlobalConstants.apiURL+'/produitventes/addProduitventes.json',body,{headers: headers})
}




AddVehicule(datauser:any,img:any,userconnected:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  })
var t = {
  "nomvehicule":datauser.email.value,
  "urlvehicule":img,
  "matriculevehicule":datauser.phone.value,   
  "typevehicule" : datauser.localisation.value,
  "idcooporate" :userconnected
}
console.log(t)
const body =JSON.stringify(t);
return this.http.post(GlobalConstants.apiURL+'/vehicules/add.json',body,{headers: headers})
}

AddServiceTransport(datauser:any,img:any,userconnected:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  })
var t = {
  "transporteurid":userconnected,
  "disponibilite":"oui",
  "lieudepart":datauser.email.value,
  "destination":datauser.localisation.value,
  "quantite":parseInt(datauser.phone.value)
}
console.log(t)
const body =JSON.stringify(t);
return this.http.post(GlobalConstants.apiURL+'/servicetransport/addServicetransport.json',body,{headers: headers})
}

AddChauffeur(datauser:any,img:any,idcooporate:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  })
  var contact = datauser.phone.value.dialCode+" "+datauser.phone.value.number
  var t = {
  "nomprenom":datauser.email.value,
  "urlpermis":img,
  "contact":contact,
  "lieuhabitation" : datauser.localisation.value,
  "idvehicule" :"null" ,
  "state" : "free",
  "namevehicule" : "null",
  "matriculevehicule":"null",
  "idcooporate":idcooporate
}
console.log(t)
const body =JSON.stringify(t);
return this.http.post(GlobalConstants.apiURL+'/chauffeurs/add.json',body,{headers: headers})
}

AddConseil(datauser:any,img:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  })


var t = {
  "Type_conseil":datauser.typeProduit.value,
  "contenu_url": datauser.description.value+" == "+img,
  "id_produitconseil":datauser.produit.value
}
console.log("conseil json :",t)
const body =JSON.stringify(t);
return this.http.post(GlobalConstants.apiURL+'/guideproduction/addGuideproduction.json',body,{headers: headers})
}

AddVente(datauser:any,img:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  })

  var raw = JSON.stringify({
    "idUser": datauser.producteur.value,
    "idProduit": datauser.produit.value,
    "typeVente": datauser.typevente.value,
    "description": datauser.description.value,
    "prix": parseInt(datauser.montant.value),
    "quantite":  parseInt(datauser.quantite.value),
    "urlImageVente": img,
    "categorieProduitId": "null",
    "enlevement":datauser.enlevement.value,
    "mesure":datauser.unitmessure.value
  });


// var t = {
//   "label":datauser.email.value,
//   "categorie": datauser.localisation.value,
//   "urlimage": img
// }
console.log(raw)
// const body =JSON.stringify(t);
return this.http.post(GlobalConstants.apiURL+'/ventes/addVentes.json',raw,{headers: headers})
}
UpdateVente(datauser:any,img:any,idvent:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  })

  var raw = JSON.stringify({
    "idUser": datauser.producteur.value,
    "idProduit": datauser.produit.value,
    "typeVente": datauser.typevente.value,
    "description": datauser.description.value,
    "prix": parseInt(datauser.montant.value),
    "quantite":  parseInt(datauser.quantite.value),
    "urlImageVente": img,
    "categorieProduitId": "null"
  });


// var t = {
//   "label":datauser.email.value,
//   "categorie": datauser.localisation.value,
//   "urlimage": img
// }
console.log(raw)
// const body =JSON.stringify(t);
return this.http.post(GlobalConstants.apiURL+'/ventes/updateVentes/'+idvent+'.json',raw,{headers: headers})
}
UpdateProduitVente(datauser:any,img:any,idprod:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  })


var t = {
  "label":datauser.email.value,
  "categorie": datauser.localisation.value,
  "urlimage": img
}
console.log(t)
const body =JSON.stringify(t);
return this.http.post(GlobalConstants.apiURL+'/produitventes/updateProduitVente/'+idprod+'.json',body,{headers: headers})
}

UpdatePublicite(datauser:any,img:any,IDpub:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  })

var t = {
  "idBenef":datauser.localisation.value,
  "urlImage":img,
  "contenu":datauser.email.value,
  "delai":datauser.loc.value.toString(),
  "dateDebut":"00/00/0000",
  "dateFin":"00/00/0000",
  "montant":datauser.montant.value.toString(),
}
//console.log(t)
const body =JSON.stringify(t);
return this.http.post(GlobalConstants.apiURL+'/publicites/updatePublicites/'+IDpub+'.json',body,{headers: headers})
}


AddAutorisation(datauser:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  })
var autorisation = {
  "libelle":datauser.libelle.value,
}
console.log(user)
const body =JSON.stringify(autorisation);
return this.http.post(GlobalConstants.api_auth_host+'autorisations/addautorisation.json',body,{headers: headers})
}

UpdateUser(datauser:any,img:any,userID:any){
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
})
    var mail = ""
    if(datauser.email.value == ''){
      mail = "defaulmail@gmail.com"
    }else{
      mail= datauser.email.value
    }
    console.log(datauser.phone)
    var  v = datauser.phone.value.number
    var number = datauser.phone.value.dialCode+" "+v;
var user = {
  "name":datauser.nom.value+" "+datauser.prenom.value,
  "contact":number,
  "email":mail,
  "locality":datauser.loc.value,
  "user_type":"AGENCE",
  "username":"null",
  // "password":datauser.pass1.value,
  "role":datauser.role.value,
  "CoustumerID":4,
  "localisation":datauser.localisation.value,
  "urlprofile":img
}
//console.log(user)
const body =JSON.stringify(user);
return this.http.post(GlobalConstants.api_auth+'/edituser/'+userID+'.json',body,{headers: headers})
}

UpdateStateFournisseur(idFournisseur:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  })

var users = {
  "statut_demande":"accepter"
}
const body =JSON.stringify(users);
var test = this.http.post(GlobalConstants.apiURL+'/demandefournisseur/updateDemandeFournisseur/'+idFournisseur+'.json',body,{headers: headers})
//console.log(test  )

return test
}

UpdateStateRefuserFournisseur(idFournisseur:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  })

var users = {
  "statut_demande":"refuser"
}
const body =JSON.stringify(users);
var test = this.http.post(GlobalConstants.apiURL+'/demandefournisseur/updateDemandeFournisseur/'+idFournisseur+'.json',body,{headers: headers})
//console.log(test  )

return test
}

UpdateStateCommande(IDcommande:any,state:string){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  })

var users = {
  "statut":state
}
const body =JSON.stringify(users);
var test = this.http.post(GlobalConstants.apiURL+'/commandes/updateCommandes/'+IDcommande+'.json',body,{headers: headers})
//console.log(test  )

return test
}

UpdateStateCommandeDetail(IDcommande:any,state:string){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  })

var users = {
  "state":state
}
const body =JSON.stringify(users);
var test = this.http.post(GlobalConstants.apiURL+'/produitcommande/updateDetailcommande/'+IDcommande+'.json',body,{headers: headers})
//console.log(test  )

return test
}
GetUserByID(idUser:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  })
  return this.http.get<UserModel>(GlobalConstants.api_auth+"/getuser/"+idUser+".json",{headers:headers});
}


GetVenteProduitById(idUser:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  })
  return this.http.get(GlobalConstants.apiURL+"/produitventes/getoneproduct/"+idUser+".json",{headers:headers});
}

GetPubliciteByID(idUser:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  })
  return this.http.get(GlobalConstants.apiURL+"/publicites/pubone/"+idUser+".json",{headers:headers});
}

GetVenteByID(idUser:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  })
  return this.http.get(GlobalConstants.apiURL+"/ventes/getVentesbyID/"+idUser+".json",{headers:headers});
}
UplaodIamge(Formadata:any){
 var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Authorization': `Bearer ${user.token}`,
  //  'Content-Type': 'multipart/form-data'
})
let formParams = new FormData();
formParams.append('image', Formadata)
return this.http.post(GlobalConstants.apiURL+'/uploads/saveImage.json',formParams,{headers: headers})
}


UplaodParseExel(Formadata:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
   const user = JSON.parse(hauth!)
    const headers = new HttpHeaders({
     'Authorization': `Bearer ${user.token}`,
   //  'Content-Type': 'multipart/form-data'
 })
 let formParams = new FormData();
 formParams.append('image', Formadata)
 return this.http.post(GlobalConstants.apiURL+'/prixmarcher/addprixmarcher.json',formParams,{headers: headers})

 }


getAllautorisation(){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Authorization': `Bearer ${user.token}`,
  //  'Content-Type': 'multipart/form-data'
})
return this.http.get(GlobalConstants.api_auth_host+"autorisations/getallautorisation.json",{headers: headers})

}


getAllPubliciter(){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Authorization': `Bearer ${user.token}`,
  //  'Content-Type': 'multipart/form-data'
})
return this.http.get(GlobalConstants.apiURL+"/publicites/listPublicites.json",{headers: headers})
}
getAllCommande(){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Authorization': `Bearer ${user.token}`,
  //  'Content-Type': 'multipart/form-data'
})
return this.http.get(GlobalConstants.apiURL+"/commandes/listCommandes.json",{headers: headers})
}
DeleteCommande(idCommande:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Authorization': `Bearer ${user.token}`,
  //  'Content-Type': 'multipart/form-data'
})
return this.http.post(GlobalConstants.apiURL+"/commandes/deleteCommandes/"+idCommande+".json",{},{headers: headers})
}


DeleteCommandeDetail(idCommande:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Authorization': `Bearer ${user.token}`,
  //  'Content-Type': 'multipart/form-data'
})
return this.http.post(GlobalConstants.apiURL+"/produitcommande/deleteDetailcommande/"+idCommande+".json",{},{headers: headers})

}


getAllCommandeProduit(){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Authorization': `Bearer ${user.token}`,
  //  'Content-Type': 'multipart/form-data'
})
return this.http.get(GlobalConstants.apiURL+"/produitcommande/listProduitcommande.json",{headers: headers})

}

getAllVente(){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Authorization': `Bearer ${user.token}`,
  //  'Content-Type': 'multipart/form-data'
})
return this.http.get(GlobalConstants.apiURL+"/ventes/listVentes.json",{headers: headers})
}



getAllNotification(){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Authorization': `Bearer ${user.token}`,
  //  'Content-Type': 'multipart/form-data'
})
return this.http.get(GlobalConstants.apiURL+"/notification/listNotification.json",{headers: headers})
}

getAllConseil(){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Authorization': `Bearer ${user.token}`,
  //  'Content-Type': 'multipart/form-data'
})
return this.http.get(GlobalConstants.apiURL+"/guideproduction/listGuideproduction.json",{headers: headers})
}
DeleteUser(IDuser:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  //  'Content-Type': 'multipart/form-data'
  })
  return this.http.post(GlobalConstants.api_auth_host+"users/deleteuser/"+IDuser+".json",{},{headers: headers})
}

DeleteFournisseur(IDfournisseur:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  //  'Content-Type': 'multipart/form-data'
  })
  return this.http.post(GlobalConstants.apiURL+"/demandefournisseur/deletfournisseur/"+IDfournisseur+".json",{},{headers: headers})
}


DeletePublicite(IDuser:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  // 'Content-Type': 'multipart/form-data'
  })
  return this.http.post(GlobalConstants.apiURL+"/publicites/deletePublicites/"+IDuser+".json",{},{headers: headers})
}

DeleteMontant(IDuser:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  // 'Content-Type': 'multipart/form-data'
  })
  return this.http.post(GlobalConstants.apiURL+"/montantlivraison/deleteMontantlivraison/"+IDuser+".json",{},{headers: headers})
}



DeleteProduit(IDuser:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  // 'Content-Type': 'multipart/form-data'
  })
  return this.http.post(GlobalConstants.apiURL+"/produitventes/deleteVente/"+IDuser+".json",{},{headers: headers})
}

DeleteVente(IDuser:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  // 'Content-Type': 'multipart/form-data'
  })
  return this.http.post(GlobalConstants.apiURL+"/ventes/deleteVentes/"+IDuser+".json",{},{headers: headers})
}


DeleteGuide(IDuser:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  // 'Content-Type': 'multipart/form-data'
  })
  return this.http.post(GlobalConstants.apiURL+"/guideproduction/deleteGuideproduction/"+IDuser+".json",{},{headers: headers})
}
DeleteCourse(IDuser:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  // 'Content-Type': 'multipart/form-data'
  })
  return this.http.post(GlobalConstants.apiURL+"/courses/deleteCourses/"+IDuser+".json",{},{headers: headers})
}


Deleteautorisation(IDuser:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  //  'Content-Type': 'multipart/form-data'
  })
  return this.http.post(GlobalConstants.api_auth_host+"autorisations/deleteautorisation/"+IDuser+".json",{},{headers: headers})
}

DeleteMandat(IDuser:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.token}`,
  //  'Content-Type': 'multipart/form-data'
  })
  return this.http.post(GlobalConstants.api_auth_host+"users/deleteuser/"+IDuser+".json",{},{headers: headers})

}


AddUserautorisation(listautorisation:any[],userID:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Authorization': `Bearer ${user.token}`,
  //  'Content-Type': 'multipart/form-data'
})
var locallist=[]

for(let d of listautorisation){
  var aut = {
    "userid":userID,
    "autorisationid":d.id,
    "libelleautorisation":d.libelle,
    "state":"true"
  }
  locallist.push(aut)
}
//  const body =JSON.stringify(locallist);
//console.log(locallist)
return this.http.post(GlobalConstants.api_auth_host+"userautorisations/adduserautorisations.json",locallist,{headers: headers})

}

AddUserautorisationfournisseur(listautorisation:any[],userID:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Authorization': `Bearer ${"user.token"}`,
  //  'Content-Type': 'multipart/form-data'
})
var locallist=[]

for(let d of listautorisation){
  var aut = {
    "userid":userID,
    "autorisationid":d.id,
    "libelleautorisation":d.libelle,
    "state":"true"
  }
  locallist.push(aut)
}
//  const body =JSON.stringify(locallist);
console.log(locallist)
return this.http.post(GlobalConstants.api_auth_host+"userautorisations/adduserautorisations.json",locallist,{headers: headers})

}
AddUserautorisationOnUpdate(listautorisation:any[],userID:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Authorization': `Bearer ${user.token}`,
  //  'Content-Type': 'multipart/form-data'
})
var locallist=[]

for(let d of listautorisation){
  var aut = {
    "userid":userID,
    "autorisationid":d.id,
    "libelleautorisation":d.libelle,
    "state":d.statusVal.toString(),
  }
  locallist.push(aut)
}
// const body =JSON.stringify(locallist);
console.log(locallist)
return this.http.post(GlobalConstants.api_auth_host+"userautorisations/editautorisationusers.json",locallist,{headers: headers})
}

UpdateAutorisation(listautorisation:any[],userID:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Authorization': `Bearer ${user.token}`,
  //  'Content-Type': 'multipart/form-data'
})
var locallist=[]

for(let d of listautorisation){
  var aut = {
    "userid":userID,
    "autorisationid":d.id,
    "libelleautorisation":d.libelle,
    "state":"true"
  }
  locallist.push(aut)
}
// const body =JSON.stringify(locallist);
console.log(locallist)
return this.http.post(GlobalConstants.api_auth_host+"userautorisations/editautorisationusers.json",locallist,{headers: headers})
}


GetAlldemandeFournisseur(){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Authorization': `Bearer ${"user.token"}`,
  //  'Content-Type': 'multipart/form-data'
})
return this.http.get(GlobalConstants.apiURL+"/demandefournisseur/listDemandeFournisseur.json?espace=ecommerce",{headers: headers})
}
GetAllprixMarcher(){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Authorization': `Bearer ${"user.token"}`,
  //  'Content-Type': 'multipart/form-data'
})
return this.http.get(GlobalConstants.apiURL+"/prixmarcher/listprixmarcher.json?espace=ecommerce",{headers: headers})
}
GetAllVente(){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Authorization': `Bearer ${user.token}`,
  //  'Content-Type': 'multipart/form-data'
})
return this.http.get(GlobalConstants.apiURL+"/ventes/listVentes.json",{headers: headers})
}


GetAllCategorie(){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Authorization': `Bearer ${user.token}`,
  //  'Content-Type': 'multipart/form-data'
})
return this.http.get(GlobalConstants.apiURL+"/categorieproduits/getAllgorieproduit.json",{headers: headers})
}


SendMail(users_fournisseur:any,statut:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Authorization': `Bearer ${user.token}`,
  //  'Content-Type': 'multipart/form-data'
})

var data = {
    "nom":users_fournisseur.nom,
    "email":users_fournisseur.email,
    "linkcreate":GlobalConstants.linkfrontInscription,
    "typeDemande":users_fournisseur.typeDemande,
    "statut":statut
   // "etat":users_fournisseur.
  // "nom":"Bedel",
  // "email":"bedelcoulibaly8@gmail.com",
  // "linkcreate":"http://localhost:8787/v1.0/users/sendmail.json",
  // "typeDemande":"fournisseur"
}
//users_fournisseur.linkcreate = GlobalConstants.linkfrontInscription
console.log("mail data accepte :",data)
const body =JSON.stringify(data);
return this.http.post(GlobalConstants.api_auth_host+"users/sendmail.json",data,{headers: headers})
}



SendMailComfirme(users_fournisseur:any,state:any,typeDemande:any){

  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Authorization': `Bearer ${user.token}`,
  //  'Content-Type': 'multipart/form-data'
})

var data = {
    "nom":users_fournisseur.client,
    "email":users_fournisseur.email,
   // "lieulivraison":users_fournisseur.lieuLivraison,
    "numero_commande":users_fournisseur.numero_commande,
    "admin":GlobalConstants.admainMail,
    "vendeurId":users_fournisseur.Idvendeur,
    "state":state,
    "type":typeDemande
}


var datas = {
  // "nom":users_fournisseur.client,
  // "email":users_fournisseur.email,
  // "lieulivraison":users_fournisseur.lieuLivraison,
  // "numero_commande":users_fournisseur.numero_commande,
  // "admin":GlobalConstants.admainMail,
  // "vendeurId":users_fournisseur.Idvendeur,
  // "state":state,
  // "type":typeDemande
  "admin": "bedel.coulibaly@lidar.ci",
  "email": "bedelcoulibaly8@gmail.com",
 // "lieulivraison": "Dokui Djomi, Abidjan, Côte d'Ivoire",
  "nom": "ismael",
  "numero_commande": "887369",
  "state": "annuler",
  "type": "global",
  "vendeurId": "133"

// "nom":"Bedel",
// "email":"bedelcoulibaly8@gmail.com",
// "linkcreate":"http://localhost:8787/v1.0/users/sendmail.json",
// "typeDemande":"fournisseur"
}
//users_fournisseur.linkcreate = GlobalConstants.linkfrontInscription
console.log("data mail: ",data)
console.log("datas mail: ",datas)

const body =JSON.stringify(data);
return this.http.post(GlobalConstants.api_auth_host+"users/sendmailConfirme.json",data,{headers: headers})
}


Addcourse(datas:any,commandes:any){
  var hauth =  localStorage.getItem(this.authLocalStorageToken)
  const user = JSON.parse(hauth!)
   const headers = new HttpHeaders({
    'Authorization': `Bearer ${user.token}`,
  //  'Content-Type': 'multipart/form-data'
})
 console.log(datas)

var data = {
    "transporteuridentifiant":datas.trans.value,
    "depart":datas.enlevement.value.toString(),
    "destination":datas.dechargement.value.toString(),
    "useridentifiant":commandes.userId.toString(),
    "produit":commandes.id.toString(),
    "quantite":commandes.quantite.toString(),
    "statut":"initier",
    "idservicetransport":"0",
    "statutpaiement":"null",
    "montant":commandes.montantlivraison,
    "typecommande":"ecommerce",
}
//users_fournisseur.linkcreate = GlobalConstants.linkfrontInscription
console.log(data)
const body = JSON.stringify(data);
return this.http.post(GlobalConstants.apiURL+"/courses/addCourses.json",data,{headers: headers})
}

}
