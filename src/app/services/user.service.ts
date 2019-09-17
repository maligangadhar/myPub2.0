import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IUserDetails } from '../models/viewModels';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  /**
   * get user detials
   * @param page 
   * @param search 
   */
  getUserDetails(page , search) {
    return this.http.get<IUserDetails>(environment.userListUrl + '?page=' + page + '&per_page=100' + '?q=' + search);
  }
  
  /**
   * search gets all top 1000 records
   * @param page 
   * @param search 
   */
  getSearchAllDetails(search) {
    const param = {'q': search} ;
    return this.http.post(environment.userListUrl, param);
  }
  /**
   * get user detials by search
   * @param search 
   */
  getUserDetailsBySearch(search) {
    return this.http.get<IUserDetails>(environment.userListUrl + '?q=' + search);
  }
  
  /**
   * create new user
   * @param user 
   */
  createNewUSer(user) {
    return this.http.post(environment.userCreateUrl, user);
  }
  
  /***
   * get selected user details
   */
  getUserById(userId) {
    return this.http.get(environment.userCreateUrl + '/' + userId);
  }
  /**
   * update user email address
   * @param id 
   * @param userObj 
   */
  updateUserEmail(id, userObj) {
    return this.http.put(environment.userCreateUrl + '/' + id, userObj);
  }

  /**
   * delete user placements
   * @param user_id 
   * @param guid 
   */
  deleteUserPlacements(user_id, guid) {
    return this.http.get(environment.userCreateUrl + '/' + user_id + '/' + 'remove_placement/' + guid);
  }

  /**
   * save new user placements - for  new users
   * @param id 
   * @param cloneObj 
   */
  saveNewUserClonePlacements(cloneObj) {
    return this.http.post(environment.userCreateUrl, cloneObj);
  }

  /**
   * save clone placements - existing users
   * @param clone 
   */
  saveUserClonePlacements(id, cloneObj) {
    return this.http.put(environment.userCreateUrl + '/' + id, cloneObj);
  }
}
