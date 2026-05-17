import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ColorSchemeService,
  ColorScheme,
} from '../../../core/services/color-scheme.service';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnInit {
  showColorPicker = false;
  colorSchemes: ColorScheme[] = [];
  currentColorScheme: ColorScheme;

  constructor(private colorSchemeService: ColorSchemeService) {
    this.currentColorScheme = this.colorSchemeService.currentColorScheme;
  }

  ngOnInit(): void {
    this.colorSchemes = this.colorSchemeService.colorSchemes;
    this.colorSchemeService.currentColorScheme$.subscribe((scheme) => {
      this.currentColorScheme = scheme;
    });
  }

  toggleColorPicker(): void {
    this.showColorPicker = !this.showColorPicker;
  }

  selectColorScheme(scheme: ColorScheme): void {
    this.colorSchemeService.selectColorScheme(scheme);
    this.showColorPicker = false;
  }

  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.color-picker-container')) {
      this.showColorPicker = false;
    }
  }
}
