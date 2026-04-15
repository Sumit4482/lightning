import 'package:flutter/material.dart';

import '../../../../core/strings/app_string_keys.dart';
import '../../../../core/strings/app_strings.dart';
import '../../../../core/theme/app_text_styles.dart';
import '../../../../core/theme/spacing.dart';
import '../../domain/daily_content.dart';
import 'sentence_card.dart';
import 'stagger_scale_in.dart';
import 'word_card.dart';

class DailyLessonView extends StatelessWidget {
  const DailyLessonView({
    super.key,
    required this.content,
    required this.showFallbackBanner,
  });

  final DailyContent content;
  final bool showFallbackBanner;

  @override
  Widget build(BuildContext context) {
    final words = content.displayWords(maxCount: 2);

    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        if (showFallbackBanner) ...[
          Text(
            AppStrings.of(AppStringKeys.showingLatestLesson),
            textAlign: TextAlign.center,
            style: AppTextStyles.banner,
          ),
          const SizedBox(height: Spacing.sm),
        ],
        StaggerScaleIn(
          delay: Duration.zero,
          child: SentenceCard(
            sentence: content.sentence,
            breakdown: content.sentenceBreakdown,
          ),
        ),
        SizedBox(height: Spacing.cardGap),
        StaggerScaleIn(
          delay: const Duration(milliseconds: 100),
          child: Align(
            alignment: Alignment.centerLeft,
            child: Padding(
              padding: const EdgeInsets.only(left: 4, bottom: Spacing.sm),
              child: Text(
                AppStrings.of(AppStringKeys.sectionWordsOfDay),
                style: AppTextStyles.sectionHeader,
              ),
            ),
          ),
        ),
        for (var i = 0; i < words.length; i++) ...[
          StaggerScaleIn(
            delay: Duration(milliseconds: 200 + 100 * i),
            child: WordCard(word: words[i]),
          ),
          if (i != words.length - 1) SizedBox(height: Spacing.cardGap),
        ],
      ],
    );
  }
}
