import { AuthModel } from './auth.model';
import { AddressModel } from './address.model';
import { SocialNetworksModel } from './social-networks.model';

export class UserModel extends AuthModel {
  id: number;
  name: string;
  contact: string;
  email: string;
  locality: string;
  user_type: string;
  username: string;
  password: string;
  created_at: string;
  updated_at: string;
  role: string;
  CoustumerID: string;
  localisation: string;
  urlprofile: string;
  ///////////////////
  // website: string;
  // language: string;
  // timeZone: string;
  // communication: {
  //   email: boolean;
  //   sms: boolean;
  //   phone: boolean;
  // };
  // email settings
  // emailSettings?: {
  //   emailNotification: boolean;
  //   sendCopyToPersonalEmail: boolean;
  //   activityRelatesEmail: {
  //     youHaveNewNotifications: boolean;
  //     youAreSentADirectMessage: boolean;
  //     someoneAddsYouAsAsAConnection: boolean;
  //     uponNewOrder: boolean;
  //     newMembershipApproval: boolean;
  //     memberRegistration: boolean;
  //   };
  //   updatesFromKeenthemes: {
  //     newsAboutKeenthemesProductsAndFeatureUpdates: boolean;
  //     tipsOnGettingMoreOutOfKeen: boolean;
  //     thingsYouMissedSindeYouLastLoggedIntoKeen: boolean;
  //     newsAboutMetronicOnPartnerProductsAndOtherServices: boolean;
  //     tipsOnMetronicBusinessProducts: boolean;
  //   };
  // };

  setUser(_user: unknown) {
    const user = _user as UserModel;
    this.id = user.id;
    this.username = user.username || '';
    this.password = user.password || '';
    this.localisation = user.localisation || '';
    this.email = user.email || '';
    this.urlprofile = user.urlprofile || './assets/media/avatars/blank.png';
    this.role = user.role || '';
    this.CoustumerID = user.CoustumerID || '';
    this.created_at = user.created_at || '';
    this.updated_at = user.updated_at || '';
    this.user_type = user.user_type || '';
    this.name = user.name || '';
  }
}
