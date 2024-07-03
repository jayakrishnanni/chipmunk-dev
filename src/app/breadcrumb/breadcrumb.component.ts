import { Component } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  breadcrumbs$ = this.breadcrumbService.breadcrumbs$;

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {}


  //examplecomponent
  // constructor(private breadcrumbService: BreadcrumbService) {}

  // ngOnInit(): void {
  //   this.breadcrumbService.setBreadcrumbs([
  //     { label: 'Home', url: '/' },
  //     { label: 'Section', url: '/section' },
  //     { label: 'Subsection' }
  //   ]);
  // }
}
