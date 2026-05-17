import { Injectable } from '@angular/core';

export interface RuntimeConfig {
  apiUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiConfigService {
  private config: RuntimeConfig = { apiUrl: '' };

  async load(): Promise<void> {
    const response = await fetch('/config.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Failed to load config.json (${response.status})`);
    }
    this.config = (await response.json()) as RuntimeConfig;
    this.config.apiUrl = (this.config.apiUrl || '').replace(/\/$/, '');
  }

  get apiUrl(): string {
    return this.config.apiUrl;
  }

  resolveUrl(path: string): string {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return this.config.apiUrl
      ? `${this.config.apiUrl}${normalizedPath}`
      : normalizedPath;
  }
}
