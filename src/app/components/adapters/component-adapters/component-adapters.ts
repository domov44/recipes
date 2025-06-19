import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionImageTextComponent } from '../../blocks/section-image-text';
import { ListPostypesComponent } from '../../lists/list-postypes/list-postypes';
import { ListFeaturesComponent } from '../../lists/list-features/list-features';
import { SectionTextComponent } from '../../blocks/section-text/section-text';
import { AccordionComponent } from '../../blocks/accordion/accordion';


@Component({
  selector: 'app-component-adapter',
  standalone: true,
  imports: [
    CommonModule,
    SectionImageTextComponent,
    ListPostypesComponent,
    ListFeaturesComponent,
    SectionTextComponent,
    AccordionComponent
  ],
  templateUrl: './component-adapters.html',
})
export class ComponentAdaptersComponent {
  @Input() data: any;
  @Input() typename!: string;
}
