import 'package:flutter/material.dart';

import 'app_colors.dart';

abstract final class AppFontFamilies {
  static const ui = 'Plus Jakarta Sans';
  static const telugu = 'Noto Sans Telugu';
  static const mono = 'Space Mono';
}

abstract final class AppTextStyles {
  static const TextStyle teluguSentence = TextStyle(
    fontFamily: AppFontFamilies.telugu,
    fontSize: 32,
    height: 1.25,
    fontWeight: FontWeight.w600,
    color: AppColors.teluguColor,
  );

  static const TextStyle teluguWord = TextStyle(
    fontFamily: AppFontFamilies.telugu,
    fontSize: 26,
    height: 1.25,
    fontWeight: FontWeight.w600,
    color: AppColors.teluguColor,
  );

  static const TextStyle teluguBreakdownWord = TextStyle(
    fontFamily: AppFontFamilies.telugu,
    fontSize: 15,
    height: 1.3,
    fontWeight: FontWeight.w700,
    color: AppColors.teluguColor,
  );

  static const TextStyle pronunciationMono = TextStyle(
    fontFamily: AppFontFamilies.mono,
    fontSize: 13,
    height: 1.4,
    fontWeight: FontWeight.w400,
    fontStyle: FontStyle.italic,
    color: AppColors.textSecondary,
  );

  static const TextStyle translationBody = TextStyle(
    fontFamily: AppFontFamilies.ui,
    fontSize: 15,
    height: 1.4,
    fontWeight: FontWeight.w500,
    color: AppColors.textPrimary,
  );

  static const TextStyle translationLabel = TextStyle(
    fontFamily: AppFontFamilies.ui,
    fontSize: 11,
    height: 1.1,
    fontWeight: FontWeight.w600,
    letterSpacing: 0.6,
    color: AppColors.textSecondary,
  );

  static const TextStyle titleLarge = TextStyle(
    fontFamily: AppFontFamilies.ui,
    fontSize: 22,
    height: 1.2,
    fontWeight: FontWeight.w700,
    color: AppColors.textPrimary,
  );

  static const TextStyle banner = TextStyle(
    fontFamily: AppFontFamilies.ui,
    fontSize: 13,
    height: 1.25,
    fontWeight: FontWeight.w600,
    color: AppColors.textSecondary,
  );

  static const TextStyle sectionHeader = TextStyle(
    fontFamily: AppFontFamilies.ui,
    fontSize: 11,
    height: 1.2,
    fontWeight: FontWeight.w600,
    letterSpacing: 2,
    color: AppColors.textSecondary,
  );

  static const TextStyle homeBrand = TextStyle(
    fontFamily: AppFontFamilies.ui,
    fontSize: 20,
    fontWeight: FontWeight.w700,
    color: AppColors.textPrimary,
    letterSpacing: -0.3,
  );

  static const TextStyle homeDateLine = TextStyle(
    fontFamily: AppFontFamilies.ui,
    fontSize: 13,
    fontWeight: FontWeight.w500,
    color: AppColors.textSecondary,
  );

  static const TextStyle splashTitle = TextStyle(
    fontFamily: AppFontFamilies.ui,
    fontSize: 40,
    fontWeight: FontWeight.w700,
    color: AppColors.textPrimary,
    letterSpacing: -0.5,
  );

  static const TextStyle splashSubtitle = TextStyle(
    fontFamily: AppFontFamilies.ui,
    fontSize: 16,
    fontWeight: FontWeight.w500,
    color: AppColors.textSecondary,
  );
}
