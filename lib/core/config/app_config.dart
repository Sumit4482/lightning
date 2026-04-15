import 'package:flutter/foundation.dart';

@immutable
class CardContentRowConfig {
  const CardContentRowConfig({
    required this.fieldKey,
    required this.labelStringKey,
  });

  final String fieldKey;
  final String labelStringKey;

  factory CardContentRowConfig.fromJson(Map<String, dynamic> json) {
    return CardContentRowConfig(
      fieldKey: json['fieldKey'] as String,
      labelStringKey: json['labelStringKey'] as String,
    );
  }
}

@immutable
class UiFeatureFlags {
  const UiFeatureFlags({required this.historyEnabled});

  final bool historyEnabled;

  factory UiFeatureFlags.fromJson(Map<String, dynamic>? json) {
    final map = json ?? const <String, dynamic>{};
    return UiFeatureFlags(
      historyEnabled: (map['historyEnabled'] as bool?) ?? true,
    );
  }
}

@immutable
class AppConfig {
  const AppConfig({
    required this.contentAssetPath,
    required this.audioAssetDirectory,
    required this.audioFilenameExtension,
    required this.uiFeatureFlags,
    required this.cardContentRows,
  });

  final String contentAssetPath;
  final String audioAssetDirectory;
  final String audioFilenameExtension;
  final UiFeatureFlags uiFeatureFlags;
  final List<CardContentRowConfig> cardContentRows;

  factory AppConfig.fromJson(Map<String, dynamic> json) {
    final rowsJson = (json['cardContentRows'] as List<dynamic>? ?? const [])
        .cast<Map<String, dynamic>>();
    return AppConfig(
      contentAssetPath: json['contentAssetPath'] as String,
      audioAssetDirectory: json['audioAssetDirectory'] as String,
      audioFilenameExtension: json['audioFilenameExtension'] as String,
      uiFeatureFlags: UiFeatureFlags.fromJson(
        json['uiFeatureFlags'] as Map<String, dynamic>?,
      ),
      cardContentRows: rowsJson.map(CardContentRowConfig.fromJson).toList(),
    );
  }

  String audioAssetPath(String audioId) {
    final ext = audioFilenameExtension.startsWith('.')
        ? audioFilenameExtension
        : '.$audioFilenameExtension';
    return '$audioAssetDirectory/$audioId$ext';
  }
}
