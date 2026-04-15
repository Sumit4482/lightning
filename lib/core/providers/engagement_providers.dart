import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../utils/date_key.dart';

part 'engagement_providers.g.dart';

const _kLastVisitDay = 'eevee_last_visit_day';
const _kStreakCount = 'eevee_streak_count';
const _kDoneLessonDateKey = 'eevee_done_lesson_date_key';

@Riverpod(keepAlive: true)
class Streak extends _$Streak {
  @override
  Future<int> build() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getInt(_kStreakCount) ?? 0;
  }

  Future<void> recordVisit() async {
    final prefs = await SharedPreferences.getInstance();
    final today = DateKey.fromDateTime(DateTime.now());
    final last = prefs.getString(_kLastVisitDay);
    if (last == today) {
      return;
    }
    final yesterday = DateKey.fromDateTime(
      DateTime.now().subtract(const Duration(days: 1)),
    );
    var streak = prefs.getInt(_kStreakCount) ?? 0;
    if (last == null) {
      streak = 1;
    } else if (last == yesterday) {
      streak += 1;
    } else {
      streak = 1;
    }
    await prefs.setString(_kLastVisitDay, today);
    await prefs.setInt(_kStreakCount, streak);
    state = AsyncData(streak);
  }
}

@Riverpod(keepAlive: true)
class LessonDone extends _$LessonDone {
  @override
  Future<String?> build() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_kDoneLessonDateKey);
  }

  Future<void> markDone(String lessonDateKey) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_kDoneLessonDateKey, lessonDateKey);
    state = AsyncData(lessonDateKey);
  }

  Future<void> clear() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_kDoneLessonDateKey);
    state = const AsyncData(null);
  }
}
