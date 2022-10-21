import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');
  
  constructor() { 
    this.getSavedThemeLink();
  }
  
  getSavedThemeLink() {
    const url = localStorage.getItem("theme") || "./assets/css/colors/default-dark.css";
    this.linkTheme?.setAttribute('href',url);

    
  }

  changeTheme(themeName:string){
    const url = `./assets/css/colors/${themeName}.css`;
    this.linkTheme?.setAttribute('href',url);
    localStorage.setItem('theme',url);
     this.checkCurrentTheme();
  }
  checkCurrentTheme(){
   const links = document.querySelectorAll('.selector');
    links.forEach(element => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');
      if(btnThemeUrl === currentTheme ){
        element.classList.add('working');
      }
  })
  
    
    }

}
