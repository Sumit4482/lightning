import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/config/app_config.dart';
import '../../../../core/providers/bootstrap_providers.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_text_styles.dart';
import '../../../../core/theme/spacing.dart';
import '../../../audio/presentation/audio_button.dart';
import '../../domain/learning_word.dart';
import '../mappers/card_rows_mapper.dart';
import 'translation_line.dart';

class WordCard extends ConsumerWidget {
  const WordCard({super.key, required this.word});

  final LearningWord word;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final configAsync = ref.watch(appConfigProvider);

    return configAsync.when(
      loading: () => const SizedBox.shrink(),
      error: (_, __) => const SizedBox.shrink(),
      data: (AppConfig config) {
        final rows = CardRowsMapper.fromFields(
          config: config,
          fieldValue: word.fieldByKey,
        );

        return Material(
          color: Colors.transparent,
          child: InkWell(
            borderRadius: BorderRadius.circular(Spacing.cardRadius),
            onTap: () => HapticFeedback.lightImpact(),
            child: Container(
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(Spacing.cardRadius),
                border: Border.all(color: AppColors.borderGlass),
                boxShadow: const [
                  BoxShadow(
                    color: AppColors.shadowCard,
                    blurRadius: 16,
                    offset: Offset(0, 2),
                  ),
                ],
              ),
              padding: const EdgeInsets.all(Spacing.cardPadding),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        child: Text(
                          word.telugu,
                          style: AppTextStyles.teluguWord,
                        ),
                      ),
                      const SizedBox(width: Spacing.xs),
                      AudioButton(audioId: word.audio),
                    ],
                  ),
                  const SizedBox(height: Spacing.sm),
                  Text(
                    word.pronunciation,
                    style: AppTextStyles.pronunciationMono,
                  ),
                  const SizedBox(height: Spacing.md),
                  for (var i = 0; i < rows.length; i++) ...[
                    TranslationLine(row: rows[i]),
                    if (i != rows.length - 1) const SizedBox(height: Spacing.sm),
                  ],
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
