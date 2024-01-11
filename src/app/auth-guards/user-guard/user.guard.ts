import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
// @ts-ignore
import Promise from "$GLOBAL$";
import {StorageService} from "../../auth-services/storage-service/storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn:'root'
})

export class UserGuard implements CanActivate {

  constructor(
    private router: Router,
    private snackBar:MatSnackBar
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ):boolean {
    if (!StorageService.hasToken()){
      StorageService.signOut();
      this.router.navigateByUrl("/login");
      this.snackBar.open(
        "Your not logged-in,Login first","Close",{duration:5000}
      );
      return false;
    }
    return true;
  }
}
