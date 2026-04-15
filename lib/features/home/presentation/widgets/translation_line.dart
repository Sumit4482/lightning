import 'package:flutter/material.dart';

import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_text_styles.dart';
import '../../../../core/theme/spacing.dart';
import '../models/translation_row_vm.dart';

class TranslationLine extends StatelessWidget {
  const TranslationLine({super.key, required this.row});

  final TranslationRowVm row;

  @override
  Widget build(BuildContext context) {
    if (row.value.trim().isEmpty) {
      return const SizedBox.shrink();
    }
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
          decoration: BoxDecoration(
            color: AppColors.chipBg,
            borderRadius: BorderRadius.circular(999),
          ),
          child: Text(row.label, style: AppTextStyles.translationLabel),
        ),
        const SizedBox(width: Spacing.sm),
        Expanded(child: Text(row.value, style: AppTextStyles.translationBody)),
      ],
    );
  }
}
