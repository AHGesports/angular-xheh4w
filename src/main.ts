import 'zone.js/dist/zone';
import {
  ChangeDetectorRef,
  Component,
  importProvidersFrom,
  inject,
} from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { SomeComponent } from './some-component';
import { FooService } from './foo.service';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, SomeComponent, TranslateModule, NgFor],
  template: `
  <button style="margin-right:1em" (click)="onClick('Moderate')">Moderate</button> 
  <button style="margin-right:1em" (click)="onClick('Warning')">Warning</button> 
  <button style="margin-right:1em"  (click)="onClick('Critical')">Critical</button>
  <select (change)="onSelectChange($event)">
    <option>Change language</option>
    <option value="de">German</option>
    <option value="en">English</option>
  </select>
  <div style="margin:1em;">
    Note: Default language is English.
  </div>
  <hr/>
  <h3>Translate using Pipe </h3>
  <p>
  
  {{sessions?.['order_time_state']}}  in <b> {{sessions?.['order_time_state'] | translate }}</b> </p>
  <p> {{'sessions.Moderate' | translate}} </p>
  <hr/>
  <div *ngFor="let field of fields">
    {{ 'table.'+field.name | translate}}
  </div>
  `,
  // <some-component></some-component>
})
export class App {
  name = 'Angular';
  user!: any;
  sessions!: any;
  fields = [{ name: 'Table' }, { name: 'No' }];
  translateService = inject(TranslateService);
  cdr = inject(ChangeDetectorRef);
  ngOnInit() {
    this.translateService.addLangs(['en', 'de']);
    this.user = { firstName: 'Sammy', lastName: 'Shark' };

    this.translateService.onDefaultLangChange.subscribe((a) =>
      console.log({ a }, 'defaultLanguage-change')
    );

    this.translateService.onTranslationChange.subscribe((t) =>
      console.log({ t }, 'on-trans-change')
    );
    // this.translateService.use('de');
    console.log(navigator.language.split('-')[0]);
    // this.session = { order_time_state: 'Moderate' };
  }
  onClick(value: String) {
    this.sessions = { order_time_state: value };

    //use below for  de.json file look translation inside seesions object.
    // this.sessions = { order_time_state: `sessions.${value}` };

    // this.translateService.setDefaultLang('fr');
    // this.translateService.use('fr');
    // console.log(this.sessions);
    // this.translateService
    //   .get(['sessions'])
    //   .subscribe((value) => console.log({ value }));
  }
  onSelectChange(event: any) {
    console.log(event.target.value);
    this.translateService.setTranslation(event.target.value);
  }
  getValue(value: string) {
    switch (value) {
      case 'Moderate':
        return 'sessions.Moderate';
      case 'Critical':
        return 'sessions.Critical';
      case 'Warning':
        return 'sessions.Warning';
      default:
        return value;
    }
  }
}

export function createTranslateLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
        defaultLanguage: 'de', // change here en to fr to see french language default.
      })
    ),
  ],
});
