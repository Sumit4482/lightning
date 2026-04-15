import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../../../../core/providers/bootstrap_providers.dart';
import '../../../../core/utils/date_key.dart';
import '../../domain/daily_content.dart';
import '../../domain/lesson_resolver.dart';
import '../../domain/resolved_lesson.dart';
import '../../../audio/presentation/audio_playback_notifier.dart';

part 'home_lesson_providers.g.dart';

@riverpod
Future<ResolvedLesson> homeResolvedLesson(HomeResolvedLessonRef ref) async {
  final catalog = await ref.watch(contentCatalogProvider.future);
  final todayKey = DateKey.fromDateTime(DateTime.now());
  return LessonResolver.resolveForHome(todayKey: todayKey, catalog: catalog);
}

@riverpod
Future<void> warmHomeLessonAudio(WarmHomeLessonAudioRef ref) async {
  try {
    final config = await ref.watch(appConfigProvider.future);
    final lesson = await ref.watch(homeResolvedLessonProvider.future);
    await ref.read(audioPlaybackNotifierProvider.notifier).preload(
          audioIds: lesson.content.audioIds(),
          assetPath: config.audioAssetPath,
        );
  } catch (_) {
    // Warmup must never break navigation; audio buttons degrade visually on failure.
  }
}

@riverpod
Future<DailyContent> lessonForDate(LessonForDateRef ref, String dateKey) async {
  final catalog = await ref.watch(contentCatalogProvider.future);
  return LessonResolver.resolvePinnedDate(dateKey: dateKey, catalog: catalog);
}

@riverpod
Future<void> warmLessonAudio(WarmLessonAudioRef ref, String dateKey) async {
  try {
    final config = await ref.watch(appConfigProvider.future);
    final lesson = await ref.watch(lessonForDateProvider(dateKey).future);
    await ref.read(audioPlaybackNotifierProvider.notifier).preload(
          audioIds: lesson.audioIds(),
          assetPath: config.audioAssetPath,
        );
  } catch (_) {
    // Same rationale as home warmup.
  }
}
