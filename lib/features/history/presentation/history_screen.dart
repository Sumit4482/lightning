import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/providers/bootstrap_providers.dart';
import '../../../core/strings/app_string_keys.dart';
import '../../../core/strings/app_strings.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_text_styles.dart';
import '../../../core/theme/spacing.dart';
import '../../../core/utils/date_key.dart';
import '../../../core/utils/telugu_preview.dart';
import 'providers/history_providers.dart';

class HistoryScreen extends ConsumerWidget {
  const HistoryScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final datesAsync = ref.watch(historyDatesProvider);
    final catalogAsync = ref.watch(contentCatalogProvider);

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: AppColors.background,
        foregroundColor: AppColors.textPrimary,
        elevation: 0,
        title: Text(
          AppStrings.of(AppStringKeys.historyTitle),
          style: AppTextStyles.titleLarge,
        ),
      ),
      body: datesAsync.when(
        loading: () => const Center(child: CircularProgressIndicator.adaptive()),
        error: (_, __) =>
            Center(child: Text(AppStrings.of(AppStringKeys.unexpectedError))),
        data: (dates) {
          if (dates.isEmpty) {
            return Center(
              child: Text(
                AppStrings.of(AppStringKeys.historyEmpty),
                style: AppTextStyles.translationBody,
              ),
            );
          }
          return catalogAsync.when(
            loading: () => const Center(child: CircularProgressIndicator.adaptive()),
            error: (_, __) =>
                Center(child: Text(AppStrings.of(AppStringKeys.unexpectedError))),
            data: (catalog) {
              return ListView.separated(
                padding: const EdgeInsets.all(Spacing.lg),
                physics: const BouncingScrollPhysics(),
                itemCount: dates.length,
                separatorBuilder: (_, __) => const SizedBox(height: Spacing.md),
                itemBuilder: (context, index) {
                  final key = dates[index];
                  final telugu = catalog[key]?.sentence.telugu ?? '';
                  final previewLine = TeluguPreview.firstToken(telugu);
                  return Container(
                    decoration: BoxDecoration(
                      color: AppColors.surface,
                      borderRadius: BorderRadius.circular(Spacing.cardRadius),
                      border: Border.all(color: AppColors.borderGlass),
                    ),
                    child: Material(
                      color: Colors.transparent,
                      child: ListTile(
                      title: Text(
                        DateKey.displayLabel(key),
                        style: AppTextStyles.translationBody.copyWith(
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      subtitle: Text(
                        previewLine,
                        style: AppTextStyles.teluguBreakdownWord,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                      onTap: () => context.push('/lesson/$key'),
                    ),
                    ),
                  );
                },
              );
            },
          );
        },
      ),
    );
  }
}
