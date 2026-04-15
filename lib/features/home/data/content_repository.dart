import '../domain/daily_content.dart';

/// Content source abstraction. Swap [LocalContentRepository] for a remote impl later.
abstract class ContentRepository {
  Future<Map<String, DailyContent>> loadCatalog();
}
