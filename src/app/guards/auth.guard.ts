import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router)
  if(sessionStorage.getItem("token")){
    // authorised user
    return true;
  }else{
    // unauthorised user
    alert("Unauthorised access... Please Login")
    // navigate to login
    router.navigateByUrl("/login")
    return false;
  }
};
