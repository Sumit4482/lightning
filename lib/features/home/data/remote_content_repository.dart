import '../domain/daily_content.dart';
import 'content_repository.dart';

/// Placeholder for a future remote-backed catalog (Firebase/Supabase/etc.).
///
/// Swap this in via DI instead of [LocalContentRepository] when networking lands.
final class RemoteContentRepository implements ContentRepository {
  @override
  Future<Map<String, DailyContent>> loadCatalog() {
    throw UnimplementedError('RemoteContentRepository is not wired yet.');
  }
}
