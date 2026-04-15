import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/config/app_config.dart';
import '../../../../core/providers/bootstrap_providers.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_text_styles.dart';
import '../../../../core/theme/spacing.dart';
import '../../../audio/presentation/audio_button.dart';
import '../../domain/learning_sentence.dart';
import '../../domain/sentence_breakdown_item.dart';
import '../mappers/card_rows_mapper.dart';
import 'translation_line.dart';
import 'word_breakdown_section.dart';

class SentenceCard extends ConsumerWidget {
  const SentenceCard({
    super.key,
    required this.sentence,
    required this.breakdown,
  });

  final LearningSentence sentence;
  final List<SentenceBreakdownItem> breakdown;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final configAsync = ref.watch(appConfigProvider);

    return configAsync.when(
      loading: () => const SizedBox.shrink(),
      error: (_, __) => const SizedBox.shrink(),
      data: (AppConfig config) {
        final rows = CardRowsMapper.fromFields(
          config: config,
          fieldValue: sentence.fieldByKey,
        );

        return Container(
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
                      sentence.telugu,
                      style: AppTextStyles.teluguSentence,
                    ),
                  ),
                  const SizedBox(width: Spacing.xs),
                  AudioButton(audioId: sentence.audio),
                ],
              ),
              const SizedBox(height: Spacing.sm),
              Text(
                sentence.pronunciation,
                style: AppTextStyles.pronunciationMono,
              ),
              const SizedBox(height: Spacing.md),
              for (var i = 0; i < rows.length; i++) ...[
                TranslationLine(row: rows[i]),
                if (i != rows.length - 1) const SizedBox(height: Spacing.sm),
              ],
              if (breakdown.isNotEmpty) ...[
                const SizedBox(height: Spacing.md),
                WordBreakdownSection(items: breakdown),
              ],
            ],
          ),
        );
      },
    );
  }
}
