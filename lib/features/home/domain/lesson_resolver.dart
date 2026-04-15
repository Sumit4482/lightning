import 'daily_content.dart';
import 'resolved_lesson.dart';

/// Pure selection rules for which lesson date to show.
abstract final class LessonResolver {
  static ResolvedLesson resolveForHome({
    required String todayKey,
    required Map<String, DailyContent> catalog,
  }) {
    if (catalog.isEmpty) {
      throw StateError('Catalog is empty');
    }

    final sortedNewestFirst = catalog.keys.toList()
      ..sort((a, b) => b.compareTo(a));

    if (catalog.containsKey(todayKey)) {
      return ResolvedLesson(
        requestedDateKey: todayKey,
        resolvedDateKey: todayKey,
        content: catalog[todayKey]!,
        isFallback: false,
      );
    }

    final atOrBeforeToday = sortedNewestFirst
        .where((k) => k.compareTo(todayKey) <= 0)
        .toList();

    final chosenKey =
        atOrBeforeToday.isNotEmpty ? atOrBeforeToday.first : sortedNewestFirst.first;

    return ResolvedLesson(
      requestedDateKey: todayKey,
      resolvedDateKey: chosenKey,
      content: catalog[chosenKey]!,
      isFallback: true,
    );
  }

  static DailyContent resolvePinnedDate({
    required String dateKey,
    required Map<String, DailyContent> catalog,
  }) {
    final hit = catalog[dateKey];
    if (hit != null) {
      return hit;
    }
    throw StateError('Missing content for $dateKey');
  }
}
