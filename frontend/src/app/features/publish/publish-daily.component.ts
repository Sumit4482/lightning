import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DailyService } from '../../core/services/daily.service';

const SECRET_STORAGE_KEY = 'lightning_admin_secret';

@Component({
  selector: 'app-publish-daily',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './publish-daily.component.html',
  styleUrls: ['./publish-daily.component.scss'],
})
export class PublishDailyComponent {
  adminSecret = sessionStorage.getItem(SECRET_STORAGE_KEY) ?? '';
  date = new Date().toISOString().slice(0, 10);
  leetcodeText = '';
  frontendSkills = '';
  backendSkills = '';
  devopsSkills = '';
  aiSkills = '';
  saving = false;
  message = '';
  error = '';

  constructor(private dailyService: DailyService) {}

  onSecretChange(): void {
    sessionStorage.setItem(SECRET_STORAGE_KEY, this.adminSecret);
  }

  async submit(): Promise<void> {
    if (!this.adminSecret.trim()) {
      this.error = 'Admin secret is required.';
      return;
    }

    this.saving = true;
    this.error = '';
    this.message = '';

    try {
      const result = await this.dailyService.publish(
        {
          date: this.date,
          leetcode: { problemsText: this.leetcodeText },
          skills: {
            frontend: this.frontendSkills,
            backend: this.backendSkills,
            devops: this.devopsSkills,
            ai: this.aiSkills,
          },
        },
        this.adminSecret.trim()
      );
      this.message = result.message;
    } catch (err: unknown) {
      const e = err as { error?: { error?: string }; status?: number };
      this.error =
        e.error?.error ||
        (e.status === 401 ? 'Invalid admin secret.' : 'Failed to publish.');
    } finally {
      this.saving = false;
    }
  }
}
