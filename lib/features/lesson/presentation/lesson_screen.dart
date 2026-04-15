import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/strings/app_string_keys.dart';
import '../../../core/strings/app_strings.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_text_styles.dart';
import '../../../core/theme/spacing.dart';
import '../../../core/utils/date_key.dart';
import '../../home/presentation/providers/home_lesson_providers.dart';
import '../../home/presentation/widgets/daily_lesson_view.dart';

class LessonScreen extends ConsumerWidget {
  const LessonScreen({super.key, required this.dateKey});

  final String dateKey;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    ref.watch(warmLessonAudioProvider(dateKey));
    final lessonAsync = ref.watch(lessonForDateProvider(dateKey));

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
              AppStrings.of(AppStringKeys.lessonLoadError),
              textAlign: TextAlign.center,
              style: AppTextStyles.translationBody,
            ),
          ),
        ),
        data: (content) {
          return SafeArea(
            child: CustomScrollView(
              physics: const BouncingScrollPhysics(),
              slivers: [
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(Spacing.xs, Spacing.sm, Spacing.lg, Spacing.md),
                    child: Row(
                      children: [
                        IconButton(
                          onPressed: () {
                            HapticFeedback.lightImpact();
                            context.pop();
                          },
                          icon: const Icon(
                            Icons.arrow_back_ios_new_rounded,
                            color: AppColors.textSecondary,
                            size: 20,
                          ),
                        ),
                        Expanded(
                          child: Text(
                            DateKey.displayLabel(dateKey),
                            style: AppTextStyles.titleLarge,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                SliverPadding(
                  padding: const EdgeInsets.symmetric(horizontal: Spacing.lg),
                  sliver: SliverToBoxAdapter(
                    child: DailyLessonView(
                      content: content,
                      showFallbackBanner: false,
                    ),
                  ),
                ),
                const SliverToBoxAdapter(child: SizedBox(height: 48)),
              ],
            ),
          );
        },
      ),
    );
  }
}
