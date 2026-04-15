import 'package:just_audio/just_audio.dart';

/// `just_audio` wrapper: small in-memory pool for instant switching between clips.
final class AudioService {
  final Map<String, AudioPlayer> _players = {};

  AudioPlayer? playerFor(String audioId) => _players[audioId];

  Future<void> retainOnly(Set<String> keepIds) async {
    final toRemove = _players.keys.where((k) => !keepIds.contains(k)).toList();
    for (final k in toRemove) {
      await _players[k]?.dispose();
      _players.remove(k);
    }
  }

  Future<void> warmup({
    required List<String> audioIds,
    required String Function(String audioId) assetPath,
  }) async {
    await retainOnly(audioIds.toSet());
    for (final id in audioIds) {
      if (_players.containsKey(id)) {
        continue;
      }
      final player = AudioPlayer();
      try {
        await player.setAsset(assetPath(id));
        _players[id] = player;
      } catch (_) {
        await player.dispose();
      }
    }
  }

  Future<void> play({
    required String audioId,
    required String Function(String audioId) assetPath,
  }) async {
    for (final entry in _players.entries) {
      if (entry.key != audioId) {
        await entry.value.stop();
      }
    }

    var player = _players[audioId];
    if (player == null) {
      player = AudioPlayer();
      await player.setAsset(assetPath(audioId));
      _players[audioId] = player;
    }

    await player.seek(Duration.zero);
    await player.play();
  }

  Future<void> dispose() async {
    for (final p in _players.values) {
      await p.dispose();
    }
    _players.clear();
  }
}
