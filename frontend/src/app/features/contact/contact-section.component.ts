import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../core/services/navigation.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.scss'],
})
export class ContactSectionComponent implements OnInit {
  isActive = false;
  personalInfo: any;
  socialLinks: any;
  contactInfo: any;

  constructor(
    private navigationService: NavigationService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.navigationService.currentSection$.subscribe((section) => {
      this.isActive = section === 3;
    });

    this.personalInfo = this.dataService.personalInfo;
    this.socialLinks = this.dataService.socialLinks;
    this.contactInfo = this.dataService.contactInfo;
  }
}
