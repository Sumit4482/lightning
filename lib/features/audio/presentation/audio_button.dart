import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/providers/bootstrap_providers.dart';
import '../../../core/strings/app_string_keys.dart';
import '../../../core/strings/app_strings.dart';
import '../../../core/theme/app_colors.dart';
import 'audio_playback_notifier.dart';

class AudioButton extends ConsumerStatefulWidget {
  const AudioButton({super.key, required this.audioId});

  final String audioId;

  @override
  ConsumerState<AudioButton> createState() => _AudioButtonState();
}

class _AudioButtonState extends ConsumerState<AudioButton>
    with TickerProviderStateMixin {
  late final AnimationController _wave = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 420),
  );

  @override
  void dispose() {
    _wave.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final ui = ref.watch(audioPlaybackNotifierProvider);
    final isThis = ui.activeId == widget.audioId;
    final phase = isThis ? ui.phase : AudioPhase.idle;

    final playing = phase == AudioPhase.playing;
    if (playing) {
      if (!_wave.isAnimating) {
        _wave.repeat();
      }
    } else {
      if (_wave.isAnimating) {
        _wave.stop();
        _wave.reset();
      }
    }

    final iconColor = switch (phase) {
      AudioPhase.error => AppColors.textSecondary.withValues(alpha: 0.45),
      _ => AppColors.primary,
    };

    final semanticsLabel = switch (phase) {
      AudioPhase.loading => AppStrings.of(AppStringKeys.audioLoadingHint),
      AudioPhase.playing => AppStrings.of(AppStringKeys.audioPlayingHint),
      AudioPhase.error => AppStrings.of(AppStringKeys.audioErrorHint),
      _ => AppStrings.of(AppStringKeys.audioIdleHint),
    };

    return Semantics(
      button: true,
      label: semanticsLabel,
      child: IconButton(
        padding: EdgeInsets.zero,
        constraints: const BoxConstraints(minWidth: 44, minHeight: 44),
        visualDensity: VisualDensity.compact,
        onPressed: () async {
          HapticFeedback.lightImpact();
          final config = await ref.read(appConfigProvider.future);
          await ref.read(audioPlaybackNotifierProvider.notifier).play(
                audioId: widget.audioId,
                assetPath: config.audioAssetPath,
              );
        },
        icon: playing
            ? AnimatedBuilder(
                animation: _wave,
                builder: (context, _) {
                  return Row(
                    mainAxisSize: MainAxisSize.min,
                    children: List.generate(3, (i) {
                      final t = _wave.value * 2 * math.pi;
                      final h = 4.0 + 11.0 * (0.5 + 0.5 * math.sin(t + i * 0.9));
                      return Container(
                        width: 3.5,
                        height: h,
                        margin: const EdgeInsets.symmetric(horizontal: 1.5),
                        decoration: BoxDecoration(
                          color: AppColors.primary,
                          borderRadius: BorderRadius.circular(2),
                        ),
                      );
                    }),
                  );
                },
              )
            : Icon(
                switch (phase) {
                  AudioPhase.loading => Icons.hourglass_top_rounded,
                  AudioPhase.error => Icons.volume_off_rounded,
                  _ => Icons.volume_up_rounded,
                },
                color: iconColor,
                size: 24,
              ),
      ),
    );
  }
}
