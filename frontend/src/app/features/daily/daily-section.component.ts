import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../core/services/navigation.service';
import { DailyService } from '../../core/services/daily.service';
import {
  CalendarDay,
  DailyEntry,
  DailyHistoryResponse,
} from '../../core/models/daily.model';

@Component({
  selector: 'app-daily-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily-section.component.html',
  styleUrls: ['./daily-section.component.scss'],
})
export class DailySectionComponent implements OnInit {
  isActive = false;
  todayDate = '';
  todayEntry: DailyEntry | null = null;
  history: DailyHistoryResponse | null = null;
  loading = true;
  error = '';
  showMissedDetails = false;
  selectedDate: string | null = null;

  readonly weekdayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  constructor(
    private navigationService: NavigationService,
    private dailyService: DailyService
  ) {}

  ngOnInit(): void {
    this.navigationService.currentSection$.subscribe((section) => {
      this.isActive = section === 1;
    });
    this.loadData();
  }

  async loadData(): Promise<void> {
    this.loading = true;
    this.error = '';
    this.selectedDate = null;
    try {
      const [today, history] = await Promise.all([
        this.dailyService.getToday(),
        this.dailyService.getHistory(),
      ]);
      this.todayDate = today.date;
      this.todayEntry = today.entry;
      this.history = history;
    } catch {
      this.error = 'Could not load daily progress.';
    } finally {
      this.loading = false;
    }
  }

  get displayDate(): string {
    return this.selectedDate ?? this.todayDate;
  }

  get isViewingToday(): boolean {
    return this.displayDate === this.todayDate;
  }

  get displayEntry(): DailyEntry | null {
    if (this.isViewingToday) {
      return this.todayEntry;
    }
    return this.history?.entries.find((e) => e.date === this.displayDate) ?? null;
  }

  get skillGroups(): { key: string; label: string; icon: string; items: string[] }[] {
    const skills = this.displayEntry?.skills;
    if (!skills) {
      return [];
    }
    return [
      { key: 'frontend', label: 'Frontend', icon: 'fa-code', items: skills.frontend },
      { key: 'backend', label: 'Backend', icon: 'fa-server', items: skills.backend },
      { key: 'devops', label: 'DevOps', icon: 'fa-gears', items: skills.devops },
      { key: 'ai', label: 'AI', icon: 'fa-brain', items: skills.ai },
    ];
  }

  get visibleSkillGroups() {
    return this.skillGroups.filter((g) => g.items.length > 0);
  }

  get lcCount(): number {
    return this.displayEntry?.leetcode?.problems?.length ?? 0;
  }

  get skillsCount(): number {
    const s = this.displayEntry?.skills;
    if (!s) return 0;
    return s.frontend.length + s.backend.length + s.devops.length + s.ai.length;
  }

  get loggedDaysCount(): number {
    return (
      this.history?.calendar.filter((d) =>
        ['logged', 'skills', 'empty'].includes(d.status)
      ).length ?? 0
    );
  }

  get missedDaysCount(): number {
    return this.history?.missedDates.length ?? 0;
  }

  get calendarWeeks(): CalendarDay[][] {
    if (!this.history?.calendar.length) {
      return [];
    }
    const weeks: CalendarDay[][] = [];
    let week: CalendarDay[] = [];
    for (const day of this.history.calendar) {
      week.push(day);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }
    if (week.length) {
      weeks.push(week);
    }
    return weeks;
  }

  get recentEntries(): DailyEntry[] {
    return this.history?.entries ?? [];
  }

  selectDay(day: CalendarDay): void {
    if (day.status === 'future') {
      return;
    }
    if (day.date === this.todayDate) {
      this.selectedDate = null;
      return;
    }
    this.selectedDate = day.date;
  }

  selectEntry(entry: DailyEntry): void {
    if (entry.date === this.todayDate) {
      this.selectedDate = null;
    } else {
      this.selectedDate = entry.date;
    }
  }

  backToToday(): void {
    this.selectedDate = null;
  }

  calendarNgClass(day: CalendarDay): Record<string, boolean> {
    return {
      [`cal-${day.status}`]: true,
      'cal-selected': day.date === this.displayDate,
      'cal-clickable': day.status !== 'future',
    };
  }

  difficultyClass(difficulty?: string): string {
    if (!difficulty) return '';
    return `diff-${difficulty.toLowerCase()}`;
  }

  formatDate(date: string): string {
    const d = new Date(`${date}T12:00:00`);
    return d.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }

  formatShortDate(date: string): string {
    const d = new Date(`${date}T12:00:00`);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }

  entrySkillCount(entry: DailyEntry): number {
    const s = entry.skills;
    return s.frontend.length + s.backend.length + s.devops.length + s.ai.length;
  }

  toggleMissedDetails(): void {
    this.showMissedDetails = !this.showMissedDetails;
  }
}
