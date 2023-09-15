"use strict";(self.webpackChunkOrganista=self.webpackChunkOrganista||[]).push([[362],{9640:(k,d,u)=>{u.d(d,{e8:()=>r.e});var r=u(3775)},749:(k,d,u)=>{u.d(d,{q:()=>m});var r=u(9808),n=u(7232),g=u(5e3);let m=(()=>{class p{}return p.\u0275fac=function(c){return new(c||p)},p.\u0275mod=g.oAB({type:p}),p.\u0275inj=g.cJS({imports:[r.ez,n.aw,n.aw]}),p})()},7824:(k,d,u)=>{u.d(d,{R:()=>v});var r=u(520),n=u(4816),g=u(4766),m=u(5e3),p=u(9640);let v=(()=>{class c{constructor(t,e){this.http=t,this.authService=e,this.authLocalStorageToken=`${g.N.appVersion}-${g.N.USERDATA_KEY}`}getloc(t,e){return this.http.get("https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+t+"&language=fr&components=country:ci&key=AIzaSyCucatgvP-JcsWSFdofdqQ_nbgyimkVpMo&sessiontoken="+e)}GetAlluser(){var t=localStorage.getItem(this.authLocalStorageToken);const e=JSON.parse(t),o=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${e.token}`});return this.http.get(n.t.api_auth+"/listUsers.json",{headers:o})}logoutGlobale(){this.authService.logout(),document.location.reload()}GetUserData(){return localStorage.getItem(this.authLocalStorageToken)}GetAllproduit(){var t=localStorage.getItem(this.authLocalStorageToken);const e=JSON.parse(t),o=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${e.token}`});return this.http.get(n.t.apiURL+"/produitventes/listProduitventes.json",{headers:o})}GetAllchauffeur(){var t=localStorage.getItem(this.authLocalStorageToken);const e=JSON.parse(t),o=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${e.token}`});return this.http.get(n.t.apiURL+"/chauffeurs/listChauffeur.json",{headers:o})}GetAllvehicule(){var t=localStorage.getItem(this.authLocalStorageToken);const e=JSON.parse(t),o=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${e.token}`});return this.http.get(n.t.apiURL+"/vehicules/listVehicules.json",{headers:o})}GetAllservice(){var t=localStorage.getItem(this.authLocalStorageToken);const e=JSON.parse(t),o=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${e.token}`});return this.http.get(n.t.apiURL+"/servicetransport/listServicetransport.json",{headers:o})}UpdateChauffeur(t,e){var o=localStorage.getItem(this.authLocalStorageToken);const a=JSON.parse(o),s=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${a.token}`});return this.http.post(n.t.apiURL+"/chauffeurs/edit/"+e+".json",t,{headers:s})}UpdateCourse(t,e){var o=localStorage.getItem(this.authLocalStorageToken);const a=JSON.parse(o),s=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${a.token}`});return this.http.post(n.t.apiURL+"/courses/updateCourses/"+e+".json",t,{headers:s})}GetAllmontantCourse(){var t=localStorage.getItem(this.authLocalStorageToken);const e=JSON.parse(t),o=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${e.token}`});return console.log("user token: "+e.token),this.http.get(n.t.apiURL+"/montantlivraison/listMontantlivraison.json",{headers:o})}GetAllCourse(){var t=localStorage.getItem(this.authLocalStorageToken);const e=JSON.parse(t),o=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${e.token}`});return this.http.get(n.t.apiURL+"/courses/listCourses.json",{headers:o})}GetAllprod(){var t=localStorage.getItem(this.authLocalStorageToken);const e=JSON.parse(t),o=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${e.token}`});return this.http.get(n.t.apiURL+"/produitventes/listProduitventes.json",{headers:o})}forgetpassword(t,e){let o={contact:t,codevalidation:e};const a=(new r.WM).append("Content-Type","application/json"),s=JSON.stringify(o);return this.http.post(n.t.api_auth+"/adminpass.json",s,{headers:a})}GetAllautorisation(){var t=localStorage.getItem(this.authLocalStorageToken);const e=JSON.parse(t),o=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${e.token}`});return this.http.get(n.t.api_auth_host+"autorisations/getallautorisation.json",{headers:o})}GetCommandeByuser(){const t=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`});return this.http.get(n.t.api_auth+"/listUsers.json",{headers:t})}Controlesole(t){localStorage.getItem(this.authLocalStorageToken);const o=new r.WM({"Content-Type":"application/json"}),s=JSON.stringify({carte_id:t});return this.http.post("https://stageapi.lidar-platform.com/v1.4/operations/solde.json",s,{headers:o})}Getuserlidar(t){localStorage.getItem(this.authLocalStorageToken);const o=new r.WM({"Content-Type":"application/json"}),s=JSON.stringify({name:t});return this.http.post("https://stageapi.lidar-platform.com/v1.4/beneficiaires/retrieveBeneficiaireByPhonenumber.json",s,{headers:o})}AddUser(t,e){const o=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`});const h=JSON.stringify({name:t.nom.value+" "+t.prenom.value,contact:t.phone.value.dialCode+" "+t.phone.value.number,email:""==t.email.value?"defaulmail@gmail.com":t.email.value,locality:t.loc.value,user_type:"AGENCE",username:"null",password:t.pass1.value,role:t.role.value,CoustumerID:4,localisation:t.localisation.value,urlprofile:e});return this.http.post(n.t.api_auth+"/add.json",h,{headers:o})}AddUserfournisseur(t,e){const o=new r.WM({"Content-Type":"application/json",Authorization:"Bearer localStorage.getItem('token')"});var a,s={name:t.nom+" "+t.prenom,contact:t.numero,email:a=""==t.email?"defaulmail@gmail.com":t.email,locality:t.ville+","+t.lieuHabitation,user_type:"AGENCE",username:a,password:t.pass1,role:t.typeDemande,CoustumerID:"",localisation:"CI",urlprofile:e,engin:t.id.toString()};console.log(s);const i=JSON.stringify(s);return this.http.post(n.t.api_auth+"/add.json",i,{headers:o})}AddPublicite(t,e){var o=localStorage.getItem(this.authLocalStorageToken);const a=JSON.parse(o),s=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${a.token}`});var i={idBenef:t.localisation.value,urlImage:e,contenu:t.email.value,delai:t.loc.value.toString(),dateDebut:"00/00/0000",dateFin:"00/00/0000",montant:t.montant.value.toString()};console.log(i);const l=JSON.stringify(i);return this.http.post(n.t.apiURL+"/publicites/savePublicites.json",l,{headers:s})}AddMontantCourse(t,e){var o=localStorage.getItem(this.authLocalStorageToken);const a=JSON.parse(o),s=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${a.token}`});var i={libelle:t.email.value.toString(),montant:t.montant.value.toString()};console.log(i);const l=JSON.stringify(i);return this.http.post(n.t.apiURL+"/montantlivraison/addMontantlivraison.json",l,{headers:s})}AddProduitVente(t,e){var o=localStorage.getItem(this.authLocalStorageToken);const a=JSON.parse(o),s=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${a.token}`});var i={label:t.email.value,categorie:t.localisation.value,urlimage:e};console.log(i);const l=JSON.stringify(i);return this.http.post(n.t.apiURL+"/produitventes/addProduitventes.json",l,{headers:s})}AddVehicule(t,e,o){var a=localStorage.getItem(this.authLocalStorageToken);const s=JSON.parse(a),i=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${s.token}`});var l={nomvehicule:t.email.value,urlvehicule:e,matriculevehicule:t.phone.value,typevehicule:t.localisation.value,idcooporate:o};console.log(l);const h=JSON.stringify(l);return this.http.post(n.t.apiURL+"/vehicules/add.json",h,{headers:i})}AddServiceTransport(t,e,o){var a=localStorage.getItem(this.authLocalStorageToken);const s=JSON.parse(a),i=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${s.token}`});var l={transporteurid:o,disponibilite:"oui",lieudepart:t.email.value,destination:t.localisation.value,quantite:parseInt(t.phone.value)};console.log(l);const h=JSON.stringify(l);return this.http.post(n.t.apiURL+"/servicetransport/addServicetransport.json",h,{headers:i})}AddChauffeur(t,e,o){var a=localStorage.getItem(this.authLocalStorageToken);const s=JSON.parse(a),i=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${s.token}`});var h={nomprenom:t.email.value,urlpermis:e,contact:t.phone.value.dialCode+" "+t.phone.value.number,lieuhabitation:t.localisation.value,idvehicule:"null",state:"free",namevehicule:"null",matriculevehicule:"null",idcooporate:o};console.log(h);const S=JSON.stringify(h);return this.http.post(n.t.apiURL+"/chauffeurs/add.json",S,{headers:i})}AddConseil(t,e){var o=localStorage.getItem(this.authLocalStorageToken);const a=JSON.parse(o),s=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${a.token}`});var i={Type_conseil:t.typeProduit.value,contenu_url:t.description.value+" == "+e,id_produitconseil:t.produit.value};console.log("conseil json :",i);const l=JSON.stringify(i);return this.http.post(n.t.apiURL+"/guideproduction/addGuideproduction.json",l,{headers:s})}AddVente(t,e){var o=localStorage.getItem(this.authLocalStorageToken);const a=JSON.parse(o),s=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${a.token}`});var i=JSON.stringify({idUser:t.producteur.value,idProduit:t.produit.value,typeVente:t.typevente.value,description:t.description.value,prix:parseInt(t.montant.value),quantite:parseInt(t.quantite.value),urlImageVente:e,categorieProduitId:"null",enlevement:t.enlevement.value,mesure:t.unitmessure.value});return console.log(i),this.http.post(n.t.apiURL+"/ventes/addVentes.json",i,{headers:s})}UpdateVente(t,e,o){var a=localStorage.getItem(this.authLocalStorageToken);const s=JSON.parse(a),i=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${s.token}`});var l=JSON.stringify({idUser:t.producteur.value,idProduit:t.produit.value,typeVente:t.typevente.value,description:t.description.value,prix:parseInt(t.montant.value),quantite:parseInt(t.quantite.value),urlImageVente:e,categorieProduitId:"null"});return console.log(l),this.http.post(n.t.apiURL+"/ventes/updateVentes/"+o+".json",l,{headers:i})}UpdateProduitVente(t,e,o){var a=localStorage.getItem(this.authLocalStorageToken);const s=JSON.parse(a),i=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${s.token}`});var l={label:t.email.value,categorie:t.localisation.value,urlimage:e};console.log(l);const h=JSON.stringify(l);return this.http.post(n.t.apiURL+"/produitventes/updateProduitVente/"+o+".json",h,{headers:i})}UpdatePublicite(t,e,o){var a=localStorage.getItem(this.authLocalStorageToken);const s=JSON.parse(a),i=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${s.token}`});var l={idBenef:t.localisation.value,urlImage:e,contenu:t.email.value,delai:t.loc.value.toString(),dateDebut:"00/00/0000",dateFin:"00/00/0000",montant:t.montant.value.toString()};const h=JSON.stringify(l);return this.http.post(n.t.apiURL+"/publicites/updatePublicites/"+o+".json",h,{headers:i})}AddAutorisation(t){var e=localStorage.getItem(this.authLocalStorageToken);const o=JSON.parse(e),a=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${o.token}`});var s={libelle:t.libelle.value};console.log(o);const i=JSON.stringify(s);return this.http.post(n.t.api_auth_host+"autorisations/addautorisation.json",i,{headers:a})}UpdateUser(t,e,o){const a=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`});var s;s=""==t.email.value?"defaulmail@gmail.com":t.email.value,console.log(t.phone);const S=JSON.stringify({name:t.nom.value+" "+t.prenom.value,contact:t.phone.value.dialCode+" "+t.phone.value.number,email:s,locality:t.loc.value,user_type:"AGENCE",username:"null",role:t.role.value,CoustumerID:4,localisation:t.localisation.value,urlprofile:e});return this.http.post(n.t.api_auth+"/edituser/"+o+".json",S,{headers:a})}UpdateStatefournisseur(t){var e=localStorage.getItem(this.authLocalStorageToken);const o=JSON.parse(e),a=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${o.token}`}),i=JSON.stringify({statut_demande:"accepter"});return this.http.post(n.t.apiURL+"/demandefournisseur/updateDemandefournisseur/"+t+".json",i,{headers:a})}UpdateStateRefuserfournisseur(t){var e=localStorage.getItem(this.authLocalStorageToken);const o=JSON.parse(e),a=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${o.token}`}),i=JSON.stringify({statut_demande:"refuser"});return this.http.post(n.t.apiURL+"/demandefournisseur/updateDemandefournisseur/"+t+".json",i,{headers:a})}UpdateStateCommande(t,e){var o=localStorage.getItem(this.authLocalStorageToken);const a=JSON.parse(o),s=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${a.token}`}),l=JSON.stringify({statut:e});return this.http.post(n.t.apiURL+"/commandes/updateCommandes/"+t+".json",l,{headers:s})}UpdateStateCommandeDetail(t,e){var o=localStorage.getItem(this.authLocalStorageToken);const a=JSON.parse(o),s=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${a.token}`}),l=JSON.stringify({state:e});return this.http.post(n.t.apiURL+"/produitcommande/updateDetailcommande/"+t+".json",l,{headers:s})}GetUserByID(t){var e=localStorage.getItem(this.authLocalStorageToken);const o=JSON.parse(e),a=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${o.token}`});return this.http.get(n.t.api_auth+"/getuser/"+t+".json",{headers:a})}GetVenteProduitById(t){var e=localStorage.getItem(this.authLocalStorageToken);const o=JSON.parse(e),a=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${o.token}`});return this.http.get(n.t.apiURL+"/produitventes/getoneproduct/"+t+".json",{headers:a})}GetPubliciteByID(t){var e=localStorage.getItem(this.authLocalStorageToken);const o=JSON.parse(e),a=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${o.token}`});return this.http.get(n.t.apiURL+"/publicites/pubone/"+t+".json",{headers:a})}GetVenteByID(t){var e=localStorage.getItem(this.authLocalStorageToken);const o=JSON.parse(e),a=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${o.token}`});return this.http.get(n.t.apiURL+"/ventes/getVentesbyID/"+t+".json",{headers:a})}UplaodIamge(t){var e=localStorage.getItem(this.authLocalStorageToken);const o=JSON.parse(e),a=new r.WM({Authorization:`Bearer ${o.token}`});let s=new FormData;return s.append("image",t),this.http.post(n.t.apiURL+"/uploads/saveImage.json",s,{headers:a})}UplaodParseExel(t){var e=localStorage.getItem(this.authLocalStorageToken);const o=JSON.parse(e),a=new r.WM({Authorization:`Bearer ${o.token}`});let s=new FormData;return s.append("image",t),this.http.post(n.t.apiURL+"/prixmarcher/addprixmarcher.json",s,{headers:a})}getAllautorisation(){var t=localStorage.getItem(this.authLocalStorageToken);const e=JSON.parse(t),o=new r.WM({Authorization:`Bearer ${e.token}`});return this.http.get(n.t.api_auth_host+"autorisations/getallautorisation.json",{headers:o})}getAllPubliciter(){var t=localStorage.getItem(this.authLocalStorageToken);const e=JSON.parse(t),o=new r.WM({Authorization:`Bearer ${e.token}`});return this.http.get(n.t.apiURL+"/publicites/listPublicites.json",{headers:o})}getAllCommande(){var t=localStorage.getItem(this.authLocalStorageToken);const e=JSON.parse(t),o=new r.WM({Authorization:`Bearer ${e.token}`});return this.http.get(n.t.apiURL+"/commandes/listCommandes.json",{headers:o})}DeleteCommande(t){var e=localStorage.getItem(this.authLocalStorageToken);const o=JSON.parse(e),a=new r.WM({Authorization:`Bearer ${o.token}`});return this.http.post(n.t.apiURL+"/commandes/deleteCommandes/"+t+".json",{},{headers:a})}DeleteCommandeDetail(t){var e=localStorage.getItem(this.authLocalStorageToken);const o=JSON.parse(e),a=new r.WM({Authorization:`Bearer ${o.token}`});return this.http.post(n.t.apiURL+"/produitcommande/deleteDetailcommande/"+t+".json",{},{headers:a})}getAllCommandeProduit(){var t=localStorage.getItem(this.authLocalStorageToken);const e=JSON.parse(t),o=new r.WM({Authorization:`Bearer ${e.token}`});return this.http.get(n.t.apiURL+"/produitcommande/listProduitcommande.json",{headers:o})}getAllVente(){var t=localStorage.getItem(this.authLocalStorageToken);const e=JSON.parse(t),o=new r.WM({Authorization:`Bearer ${e.token}`});return this.http.get(n.t.apiURL+"/ventes/listVentes.json",{headers:o})}getAllNotification(){var t=localStorage.getItem(this.authLocalStorageToken);const e=JSON.parse(t),o=new r.WM({Authorization:`Bearer ${e.token}`});return this.http.get(n.t.apiURL+"/notification/listNotification.json",{headers:o})}getAllConseil(){var t=localStorage.getItem(this.authLocalStorageToken);const e=JSON.parse(t),o=new r.WM({Authorization:`Bearer ${e.token}`});return this.http.get(n.t.apiURL+"/guideproduction/listGuideproduction.json",{headers:o})}DeleteUser(t){var e=localStorage.getItem(this.authLocalStorageToken);const o=JSON.parse(e),a=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${o.token}`});return this.http.post(n.t.api_auth_host+"users/deleteuser/"+t+".json",{},{headers:a})}Deletefournisseur(t){var e=localStorage.getItem(this.authLocalStorageToken);const o=JSON.parse(e),a=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${o.token}`});return this.http.post(n.t.apiURL+"/demandefournisseur/deletfournisseur/"+t+".json",{},{headers:a})}DeletePublicite(t){var e=localStorage.getItem(this.authLocalStorageToken);const o=JSON.parse(e),a=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${o.token}`});return this.http.post(n.t.apiURL+"/publicites/deletePublicites/"+t+".json",{},{headers:a})}DeleteMontant(t){var e=localStorage.getItem(this.authLocalStorageToken);const o=JSON.parse(e),a=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${o.token}`});return this.http.post(n.t.apiURL+"/montantlivraison/deleteMontantlivraison/"+t+".json",{},{headers:a})}DeleteProduit(t){var e=localStorage.getItem(this.authLocalStorageToken);const o=JSON.parse(e),a=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${o.token}`});return this.http.post(n.t.apiURL+"/produitventes/deleteVente/"+t+".json",{},{headers:a})}DeleteVente(t){var e=localStorage.getItem(this.authLocalStorageToken);const o=JSON.parse(e),a=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${o.token}`});return this.http.post(n.t.apiURL+"/ventes/deleteVentes/"+t+".json",{},{headers:a})}DeleteGuide(t){var e=localStorage.getItem(this.authLocalStorageToken);const o=JSON.parse(e),a=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${o.token}`});return this.http.post(n.t.apiURL+"/guideproduction/deleteGuideproduction/"+t+".json",{},{headers:a})}DeleteCourse(t){var e=localStorage.getItem(this.authLocalStorageToken);const o=JSON.parse(e),a=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${o.token}`});return this.http.post(n.t.apiURL+"/courses/deleteCourses/"+t+".json",{},{headers:a})}Deleteautorisation(t){var e=localStorage.getItem(this.authLocalStorageToken);const o=JSON.parse(e),a=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${o.token}`});return this.http.post(n.t.api_auth_host+"autorisations/deleteautorisation/"+t+".json",{},{headers:a})}DeleteMandat(t){var e=localStorage.getItem(this.authLocalStorageToken);const o=JSON.parse(e),a=new r.WM({"Content-Type":"application/json",Authorization:`Bearer ${o.token}`});return this.http.post(n.t.api_auth_host+"users/deleteuser/"+t+".json",{},{headers:a})}AddUserautorisation(t,e){var o=localStorage.getItem(this.authLocalStorageToken);const a=JSON.parse(o),s=new r.WM({Authorization:`Bearer ${a.token}`});var i=[];for(let h of t)i.push({userid:e,autorisationid:h.id,libelleautorisation:h.libelle,state:"true"});return this.http.post(n.t.api_auth_host+"userautorisations/adduserautorisations.json",i,{headers:s})}AddUserautorisationfournisseur(t,e){var o=localStorage.getItem(this.authLocalStorageToken);JSON.parse(o);const s=new r.WM({Authorization:"Bearer user.token"});var i=[];for(let h of t)i.push({userid:e,autorisationid:h.id,libelleautorisation:h.libelle,state:"true"});return console.log(i),this.http.post(n.t.api_auth_host+"userautorisations/adduserautorisations.json",i,{headers:s})}AddUserautorisationOnUpdate(t,e){var o=localStorage.getItem(this.authLocalStorageToken);const a=JSON.parse(o),s=new r.WM({Authorization:`Bearer ${a.token}`});var i=[];for(let h of t){var l={userid:e,autorisationid:h.id,libelleautorisation:h.libelle,state:h.statusVal.toString()};i.push(l)}return console.log(i),this.http.post(n.t.api_auth_host+"userautorisations/editautorisationusers.json",i,{headers:s})}UpdateAutorisation(t,e){var o=localStorage.getItem(this.authLocalStorageToken);const a=JSON.parse(o),s=new r.WM({Authorization:`Bearer ${a.token}`});var i=[];for(let h of t)i.push({userid:e,autorisationid:h.id,libelleautorisation:h.libelle,state:"true"});return console.log(i),this.http.post(n.t.api_auth_host+"userautorisations/editautorisationusers.json",i,{headers:s})}GetAlldemandefournisseur(){var t=localStorage.getItem(this.authLocalStorageToken);JSON.parse(t);const o=new r.WM({Authorization:"Bearer user.token"});return this.http.get(n.t.apiURL+"/demandefournisseur/listDemandefournisseur.json?espace=ecommerce",{headers:o})}GetAllprixMarcher(){var t=localStorage.getItem(this.authLocalStorageToken);JSON.parse(t);const o=new r.WM({Authorization:"Bearer user.token"});return this.http.get(n.t.apiURL+"/prixmarcher/listprixmarcher.json?espace=ecommerce",{headers:o})}GetAllVente(){var t=localStorage.getItem(this.authLocalStorageToken);const e=JSON.parse(t),o=new r.WM({Authorization:`Bearer ${e.token}`});return this.http.get(n.t.apiURL+"/ventes/listVentes.json",{headers:o})}GetAllCategorie(){var t=localStorage.getItem(this.authLocalStorageToken);const e=JSON.parse(t),o=new r.WM({Authorization:`Bearer ${e.token}`});return this.http.get(n.t.apiURL+"/categorieproduits/getAllgorieproduit.json",{headers:o})}SendMail(t,e){var o=localStorage.getItem(this.authLocalStorageToken);const a=JSON.parse(o),s=new r.WM({Authorization:`Bearer ${a.token}`});var i={nom:t.nom,email:t.email,linkcreate:n.t.linkfrontInscription,typeDemande:t.typeDemande,statut:e};return console.log("mail data accepte :",i),JSON.stringify(i),this.http.post(n.t.api_auth_host+"users/sendmail.json",i,{headers:s})}SendMailComfirme(t,e,o){var a=localStorage.getItem(this.authLocalStorageToken);const s=JSON.parse(a),i=new r.WM({Authorization:`Bearer ${s.token}`});var l={nom:t.client,email:t.email,numero_commande:t.numero_commande,admin:n.t.admainMail,vendeurId:t.Idvendeur,state:e,type:o};return console.log("data mail: ",l),console.log("datas mail: ",{admin:"bedel.coulibaly@lidar.ci",email:"bedelcoulibaly8@gmail.com",nom:"ismael",numero_commande:"887369",state:"annuler",type:"global",vendeurId:"133"}),JSON.stringify(l),this.http.post(n.t.api_auth_host+"users/sendmailConfirme.json",l,{headers:i})}Addcourse(t,e){var o=localStorage.getItem(this.authLocalStorageToken);const a=JSON.parse(o),s=new r.WM({Authorization:`Bearer ${a.token}`});console.log(t);var i={transporteuridentifiant:t.trans.value,depart:t.enlevement.value.toString(),destination:t.dechargement.value.toString(),useridentifiant:e.userId.toString(),produit:e.id.toString(),quantite:e.quantite.toString(),statut:"initier",idservicetransport:"0",statutpaiement:"null",montant:e.montantlivraison,typecommande:"ecommerce"};return console.log(i),JSON.stringify(i),this.http.post(n.t.apiURL+"/courses/addCourses.json",i,{headers:s})}}return c.\u0275fac=function(t){return new(t||c)(m.LFG(r.eN),m.LFG(p.e8))},c.\u0275prov=m.Yz7({token:c,factory:c.\u0275fac,providedIn:"root"}),c})()}}]);