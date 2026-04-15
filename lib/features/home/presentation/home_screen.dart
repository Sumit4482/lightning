import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/providers/engagement_providers.dart';
import '../../../core/strings/app_string_keys.dart';
import '../../../core/strings/app_strings.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_text_styles.dart';
import '../../../core/theme/spacing.dart';
import 'providers/home_lesson_providers.dart';
import 'widgets/daily_lesson_view.dart';
import 'widgets/home_header.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(streakProvider.notifier).recordVisit();
    });
  }

  @override
  Widget build(BuildContext context) {
    ref.watch(warmHomeLessonAudioProvider);
    final lessonAsync = ref.watch(homeResolvedLessonProvider);
    final doneAsync = ref.watch(lessonDoneProvider);

    return Scaffold(
      backgroundColor: AppColors.background,
      body: lessonAsync.when(
        loading: () => const ColoredBox(
          color: AppColors.background,
          child: SizedBox.expand(),
        ),
        error: (_, __) => Center(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Text(
              AppStrings.of(AppStringKeys.unexpectedError),
              textAlign: TextAlign.center,
              style: AppTextStyles.translationBody,
            ),
          ),
        ),
        data: (lesson) {
          final doneKey = doneAsync.valueOrNull;
          final isDone = doneKey == lesson.content.dateKey;

          return CustomScrollView(
            physics: const BouncingScrollPhysics(),
            slivers: [
              SliverToBoxAdapter(
                child: HomeHeader(lessonDateKey: lesson.content.dateKey),
              ),
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: Spacing.lg),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      if (isDone)
                        Padding(
                          padding: const EdgeInsets.only(right: Spacing.xs),
                          child: Text(
                            AppStrings.of(AppStringKeys.doneForToday),
                            style: AppTextStyles.banner.copyWith(color: AppColors.primary),
                          ),
                        ),
                      IconButton(
                        tooltip: AppStrings.of(AppStringKeys.markDone),
                        onPressed: () async {
                          HapticFeedback.mediumImpact();
                          await ref
                              .read(lessonDoneProvider.notifier)
                              .markDone(lesson.content.dateKey);
                        },
                        icon: Icon(
                          isDone ? Icons.check_circle_rounded : Icons.check_circle_outline_rounded,
                          color: isDone ? AppColors.primary : AppColors.textSecondary,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: Spacing.lg),
                  child: AnimatedOpacity(
                    duration: const Duration(milliseconds: 280),
                    opacity: isDone ? 0.55 : 1,
                    child: DailyLessonView(
                      content: lesson.content,
                      showFallbackBanner: lesson.isFallback,
                    ),
                  ),
                ),
              ),
              const SliverToBoxAdapter(child: SizedBox(height: 48)),
            ],
          );
        },
      ),
    );
  }
}
