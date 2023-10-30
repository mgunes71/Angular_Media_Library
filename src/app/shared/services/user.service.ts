import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  user = new BehaviorSubject<Nullable<any>>(null);

  constructor() {
  }

  setUser(user: Nullable<any>) {
    this.user.next(user);
  }
}
