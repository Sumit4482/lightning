import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../../../core/strings/app_string_keys.dart';
import '../../../../core/strings/app_strings.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_text_styles.dart';
import '../../../../core/theme/spacing.dart';
import '../../domain/sentence_breakdown_item.dart';
import 'breakdown_detail_sheet.dart';

class WordBreakdownSection extends StatefulWidget {
  const WordBreakdownSection({super.key, required this.items});

  final List<SentenceBreakdownItem> items;

  @override
  State<WordBreakdownSection> createState() => _WordBreakdownSectionState();
}

class _WordBreakdownSectionState extends State<WordBreakdownSection> {
  int? _flashIndex;

  @override
  Widget build(BuildContext context) {
    if (widget.items.isEmpty) {
      return const SizedBox.shrink();
    }

    return Theme(
      data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
      child: ExpansionTile(
        initiallyExpanded: true,
        tilePadding: EdgeInsets.zero,
        childrenPadding: const EdgeInsets.only(top: Spacing.sm),
        title: Text(
          AppStrings.of(AppStringKeys.wordBreakdownTitle),
          style: AppTextStyles.sectionHeader,
        ),
        children: [
          for (var i = 0; i < widget.items.length; i++)
            _BreakdownLine(
              item: widget.items[i],
              highlighted: _flashIndex == i,
              onTap: () async {
                HapticFeedback.lightImpact();
                setState(() => _flashIndex = i);
                await showBreakdownDetailSheet(context, widget.items[i]);
                if (mounted) {
                  setState(() => _flashIndex = null);
                }
              },
            ),
        ],
      ),
    );
  }
}

class _BreakdownLine extends StatelessWidget {
  const _BreakdownLine({
    required this.item,
    required this.highlighted,
    required this.onTap,
  });

  final SentenceBreakdownItem item;
  final bool highlighted;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final sep = TextStyle(
      color: AppColors.textSecondary.withValues(alpha: 0.5),
      fontSize: 13,
    );

    return Padding(
      padding: const EdgeInsets.only(bottom: Spacing.xs),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(12),
          onTap: onTap,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 180),
            curve: Curves.easeOut,
            padding: const EdgeInsets.symmetric(
              vertical: Spacing.sm,
              horizontal: Spacing.xs,
            ),
            decoration: BoxDecoration(
              color: highlighted
                  ? AppColors.primary.withValues(alpha: 0.12)
                  : Colors.transparent,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Text.rich(
              TextSpan(
                style: AppTextStyles.translationBody.copyWith(
                  color: AppColors.textPrimary,
                ),
                children: [
                  TextSpan(
                    text: item.telugu,
                    style: AppTextStyles.teluguBreakdownWord,
                  ),
                  TextSpan(text: '  ·  ', style: sep),
                  TextSpan(
                    text: item.pronunciation,
                    style: AppTextStyles.pronunciationMono,
                  ),
                  TextSpan(text: '  ·  ', style: sep),
                  TextSpan(text: item.english),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
