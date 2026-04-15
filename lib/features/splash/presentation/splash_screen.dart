import 'dart:async';

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../core/strings/app_string_keys.dart';
import '../../../core/strings/app_strings.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_text_styles.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with SingleTickerProviderStateMixin {
  late final AnimationController _fadeOut = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 420),
  );

  @override
  void initState() {
    super.initState();
    Timer(const Duration(milliseconds: 1500), () {
      if (!mounted) {
        return;
      }
      _fadeOut.forward();
      Future<void>.delayed(const Duration(milliseconds: 380), () {
        if (mounted) {
          context.go('/');
        }
      });
    });
  }

  @override
  void dispose() {
    _fadeOut.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.splashBackground,
      body: FadeTransition(
        opacity: Tween<double>(begin: 1, end: 0).animate(
          CurvedAnimation(parent: _fadeOut, curve: Curves.easeOut),
        ),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CustomPaint(
                size: const Size(72, 72),
                painter: _EeveeMarkPainter(),
              ),
              const SizedBox(height: 28),
              Text(AppStrings.of(AppStringKeys.appTitle), style: AppTextStyles.splashTitle),
              const SizedBox(height: 12),
              Text(
                AppStrings.of(AppStringKeys.splashTagline),
                style: AppTextStyles.splashSubtitle,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Stylized “E” mark — geometric leaf / letter hybrid.
class _EeveeMarkPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final accent = Paint()..color = AppColors.primary;
    final w = size.width;
    final h = size.height;
    final path = Path()
      ..moveTo(w * 0.15, h * 0.92)
      ..lineTo(w * 0.15, h * 0.08)
      ..lineTo(w * 0.82, h * 0.08)
      ..lineTo(w * 0.82, h * 0.28)
      ..lineTo(w * 0.38, h * 0.28)
      ..lineTo(w * 0.38, h * 0.42)
      ..lineTo(w * 0.72, h * 0.42)
      ..lineTo(w * 0.72, h * 0.58)
      ..lineTo(w * 0.38, h * 0.58)
      ..lineTo(w * 0.38, h * 0.72)
      ..lineTo(w * 0.85, h * 0.72)
      ..lineTo(w * 0.85, h * 0.92)
      ..close();
    canvas.drawPath(path, accent);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
