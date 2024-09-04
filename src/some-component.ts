import 'zone.js/dist/zone';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { FooService } from './foo.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'some-component',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
  <p>{{ 'welcomeMessage' | translate: user }}</p>
  `,
  providers: [FooService],
})
export class SomeComponent {
  name = 'Angular';
  user: any;
  fooService = inject(FooService);
  ngOnInit() {
    this.user = { firstName: 'cmp-some', lastName: 'some-cmp-lastName' };
  }
}
