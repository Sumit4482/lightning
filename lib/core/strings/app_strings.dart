import 'app_string_keys.dart';

/// Resolves UI strings by key. Swap for generated l10n later without touching widgets.
abstract final class AppStrings {
  static const _map = <String, String>{
    AppStringKeys.appTitle: 'Eevee',
    AppStringKeys.homeTitle: 'Today’s lesson',
    AppStringKeys.historyTitle: 'History',
    AppStringKeys.historyNav: 'History',
    AppStringKeys.historyEmpty: 'No lessons yet.',
    AppStringKeys.lessonLoadError: 'Couldn’t load that lesson.',
    AppStringKeys.unexpectedError: 'Something went wrong.',
    AppStringKeys.showingLatestLesson: 'Showing latest lesson',
    AppStringKeys.sectionWordsOfDay: 'WORDS OF THE DAY',
    AppStringKeys.wordBreakdownTitle: 'WORD BREAKDOWN',
    AppStringKeys.doneForToday: '✓ Done for today',
    AppStringKeys.markDone: 'Mark lesson complete',
    AppStringKeys.streakSheetTitle: 'Your streak',
    AppStringKeys.streakSheetBody:
        'Open Eevee on consecutive days to grow your streak. Miss a day and it resets to 1.',
    AppStringKeys.todayLabel: 'TODAY',
    AppStringKeys.splashTagline: 'Learn Telugu, daily.',
    AppStringKeys.translationLabelEnglish: 'EN',
    AppStringKeys.translationLabelHindi: 'HI',
    AppStringKeys.translationLabelHinglish: 'Hin',
    AppStringKeys.audioIdleHint: 'Play audio',
    AppStringKeys.audioLoadingHint: 'Loading audio',
    AppStringKeys.audioPlayingHint: 'Playing audio',
    AppStringKeys.audioErrorHint: 'Audio unavailable',
  };

  static String of(String key) => _map[key] ?? key;
}
