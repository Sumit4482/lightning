import { ApiConfigService } from '../services/api-config.service';
import { DataService } from '../services/data.service';

export function initializeApp(
  apiConfig: ApiConfigService,
  dataService: DataService
) {
  return async () => {
    await apiConfig.load();
    await dataService.loadPortfolio();
  };
}
