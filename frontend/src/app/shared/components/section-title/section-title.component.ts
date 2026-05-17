import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2 class="section-title" [class]="size">
      <ng-content></ng-content>
    </h2>
  `,
  styleUrls: ['./section-title.component.scss'],
})
export class SectionTitleComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'large';
}
