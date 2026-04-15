import 'package:flutter/material.dart';
import '../../../../core/strings/app_string_keys.dart';
import '../../../../core/strings/app_strings.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_text_styles.dart';
import '../../../../core/theme/spacing.dart';
import '../../../audio/presentation/audio_button.dart';
import '../../domain/sentence_breakdown_item.dart';

Future<void> showBreakdownDetailSheet(
  BuildContext context,
  SentenceBreakdownItem item,
) {
  return showModalBottomSheet<void>(
    context: context,
    backgroundColor: AppColors.surface,
    barrierColor: Colors.black54,
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
    ),
    builder: (ctx) {
      return SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(Spacing.lg),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: Text(item.telugu, style: AppTextStyles.teluguWord),
                  ),
                  if (item.audioId != null) AudioButton(audioId: item.audioId!),
                ],
              ),
              const SizedBox(height: Spacing.sm),
              Text(item.pronunciation, style: AppTextStyles.pronunciationMono),
              const SizedBox(height: Spacing.md),
              _sheetRow(
                AppStrings.of(AppStringKeys.translationLabelEnglish),
                item.english,
              ),
              if (item.hindi != null && item.hindi!.isNotEmpty)
                _sheetRow(
                  AppStrings.of(AppStringKeys.translationLabelHindi),
                  item.hindi!,
                ),
              if (item.hinglish != null && item.hinglish!.isNotEmpty)
                _sheetRow(
                  AppStrings.of(AppStringKeys.translationLabelHinglish),
                  item.hinglish!,
                ),
              const SizedBox(height: Spacing.sm),
            ],
          ),
        ),
      );
    },
  );
}

Widget _sheetRow(String label, String value) {
  return Padding(
    padding: const EdgeInsets.only(bottom: Spacing.sm),
    child: Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
          decoration: BoxDecoration(
            color: AppColors.chipBg,
            borderRadius: BorderRadius.circular(999),
          ),
          child: Text(label, style: AppTextStyles.translationLabel),
        ),
        const SizedBox(width: Spacing.sm),
        Expanded(child: Text(value, style: AppTextStyles.translationBody)),
      ],
    ),
  );
}
