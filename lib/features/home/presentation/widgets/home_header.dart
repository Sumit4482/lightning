import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../../../../core/providers/bootstrap_providers.dart';
import '../../../../core/providers/engagement_providers.dart';
import '../../../../core/strings/app_string_keys.dart';
import '../../../../core/strings/app_strings.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_text_styles.dart';
import '../../../../core/theme/spacing.dart';

class HomeHeader extends ConsumerWidget {
  const HomeHeader({super.key, required this.lessonDateKey});

  final String lessonDateKey;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final flagsAsync = ref.watch(appConfigProvider);
    final streakAsync = ref.watch(streakProvider);
    final dateLabel = DateFormat('EEEE, MMM d').format(DateTime.parse(lessonDateKey));

    return Padding(
      padding: const EdgeInsets.fromLTRB(Spacing.lg, Spacing.sm, Spacing.lg, Spacing.md),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(AppStrings.of(AppStringKeys.appTitle), style: AppTextStyles.homeBrand),
              const Spacer(),
              flagsAsync.maybeWhen(
                data: (c) {
                  if (!c.uiFeatureFlags.historyEnabled) {
                    return const SizedBox.shrink();
                  }
                  return IconButton(
                    tooltip: AppStrings.of(AppStringKeys.historyNav),
                    onPressed: () {
                      HapticFeedback.lightImpact();
                      context.push('/history');
                    },
                    icon: const Icon(Icons.history_rounded, color: AppColors.textSecondary),
                  );
                },
                orElse: () => const SizedBox.shrink(),
              ),
              streakAsync.when(
                data: (n) => GestureDetector(
                  onTap: () {
                    HapticFeedback.lightImpact();
                    showModalBottomSheet<void>(
                      context: context,
                      backgroundColor: AppColors.surface,
                      shape: const RoundedRectangleBorder(
                        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
                      ),
                      builder: (ctx) => Padding(
                        padding: const EdgeInsets.all(Spacing.lg),
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              AppStrings.of(AppStringKeys.streakSheetTitle),
                              style: AppTextStyles.titleLarge,
                            ),
                            const SizedBox(height: Spacing.sm),
                            Text(
                              AppStrings.of(AppStringKeys.streakSheetBody),
                              style: AppTextStyles.translationBody,
                            ),
                            const SizedBox(height: Spacing.md),
                          ],
                        ),
                      ),
                    );
                  },
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: Spacing.sm, vertical: Spacing.xs),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Text('🔥', style: TextStyle(fontSize: 18)),
                        const SizedBox(width: 4),
                        Text('$n', style: AppTextStyles.homeDateLine.copyWith(
                          color: AppColors.primary,
                          fontWeight: FontWeight.w700,
                        )),
                      ],
                    ),
                  ),
                ),
                loading: () => const SizedBox(width: 40, height: 24),
                error: (_, __) => const SizedBox.shrink(),
              ),
            ],
          ),
          const SizedBox(height: Spacing.sm),
          Text.rich(
            TextSpan(
              style: AppTextStyles.homeDateLine,
              children: [
                TextSpan(
                  text: '${AppStrings.of(AppStringKeys.todayLabel)} · ',
                  style: AppTextStyles.homeDateLine.copyWith(
                    letterSpacing: 1.2,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                TextSpan(text: dateLabel),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
