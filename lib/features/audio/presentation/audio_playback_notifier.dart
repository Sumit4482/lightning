import 'dart:async';

import 'package:just_audio/just_audio.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../data/audio_service.dart';

part 'audio_playback_notifier.g.dart';

enum AudioPhase { idle, loading, playing, error }

class AudioUiSnapshot {
  const AudioUiSnapshot({this.activeId, this.phase = AudioPhase.idle});

  final String? activeId;
  final AudioPhase phase;

  AudioUiSnapshot copyWith({String? activeId, AudioPhase? phase}) {
    return AudioUiSnapshot(
      activeId: activeId ?? this.activeId,
      phase: phase ?? this.phase,
    );
  }
}

@Riverpod(keepAlive: true)
class AudioPlaybackNotifier extends _$AudioPlaybackNotifier {
  final AudioService _audio = AudioService();
  final Map<String, StreamSubscription<PlayerState>> _subscriptions = {};
  var _alive = true;

  @override
  AudioUiSnapshot build() {
    ref.onDispose(() async {
      _alive = false;
      for (final sub in _subscriptions.values) {
        await sub.cancel();
      }
      _subscriptions.clear();
      await _audio.dispose();
    });
    return const AudioUiSnapshot();
  }

  Future<void> preload({
    required List<String> audioIds,
    required String Function(String audioId) assetPath,
  }) async {
    await _audio.warmup(audioIds: audioIds, assetPath: assetPath);
  }

  Future<void> play({
    required String audioId,
    required String Function(String audioId) assetPath,
  }) async {
    for (final sub in _subscriptions.values) {
      await sub.cancel();
    }
    _subscriptions.clear();

    state = AudioUiSnapshot(activeId: audioId, phase: AudioPhase.loading);
    try {
      await _audio.play(audioId: audioId, assetPath: assetPath);
      state = AudioUiSnapshot(activeId: audioId, phase: AudioPhase.playing);

      final player = _audio.playerFor(audioId);
      if (player == null) {
        state = const AudioUiSnapshot(phase: AudioPhase.idle);
        return;
      }

      _subscriptions[audioId] = player.playerStateStream.listen((ps) async {
        final done =
            ps.processingState == ProcessingState.completed ||
            (ps.processingState == ProcessingState.idle && !ps.playing);
        if (!done || !_alive) {
          return;
        }
        if (state.activeId != audioId) {
          return;
        }
        await _subscriptions[audioId]?.cancel();
        _subscriptions.remove(audioId);
        state = const AudioUiSnapshot(phase: AudioPhase.idle);
      });
    } catch (_) {
      state = AudioUiSnapshot(activeId: audioId, phase: AudioPhase.error);
    }
  }
}
