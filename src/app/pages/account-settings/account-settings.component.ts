import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {
  linkTheme = document.querySelector('#theme');
  constructor() { }

  ngOnInit(): void {
  }
  changeTheme(themeName:string){
    const url = `./assets/css/colors/${themeName}.css`;
    this.linkTheme?.setAttribute('href',url);
    localStorage.setItem('theme',url);
  }
}
