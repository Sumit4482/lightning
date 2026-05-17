import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
  DailyHistoryResponse,
  DailyPublishPayload,
  DailyTodayResponse,
} from '../models/daily.model';
import { ApiConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root',
})
export class DailyService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) {}

  getToday(): Promise<DailyTodayResponse> {
    return firstValueFrom(
      this.http.get<DailyTodayResponse>(
        this.apiConfig.resolveUrl('/api/daily/today')
      )
    );
  }

  getHistory(from?: string, to?: string): Promise<DailyHistoryResponse> {
    const params: Record<string, string> = {};
    if (from) params['from'] = from;
    if (to) params['to'] = to;
    return firstValueFrom(
      this.http.get<DailyHistoryResponse>(
        this.apiConfig.resolveUrl('/api/daily/history'),
        { params }
      )
    );
  }

  publish(
    payload: DailyPublishPayload,
    adminSecret: string
  ): Promise<{ success: boolean; message: string }> {
    const headers = new HttpHeaders({
      'X-Admin-Secret': adminSecret,
    });
    const body = {
      date: payload.date,
      leetcode: { problemsText: payload.leetcode.problemsText },
      skills: {
        frontend: payload.skills.frontend,
        backend: payload.skills.backend,
        devops: payload.skills.devops,
        ai: payload.skills.ai,
      },
    };
    return firstValueFrom(
      this.http.post<{ success: boolean; message: string }>(
        this.apiConfig.resolveUrl('/api/admin/daily'),
        body,
        { headers }
      )
    );
  }
}
