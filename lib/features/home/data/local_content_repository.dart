import 'dart:convert';

import 'package:flutter/services.dart';

import '../../../core/config/app_config.dart';
import '../domain/daily_content.dart';
import '../domain/learning_sentence.dart';
import '../domain/learning_word.dart';
import '../domain/sentence_breakdown_item.dart';
import 'content_repository.dart';

class LocalContentRepository implements ContentRepository {
  LocalContentRepository(this._config);

  final AppConfig _config;

  @override
  Future<Map<String, DailyContent>> loadCatalog() async {
    final raw = await rootBundle.loadString(_config.contentAssetPath);
    final decoded = json.decode(raw) as Map<String, dynamic>;

    final out = <String, DailyContent>{};
    for (final entry in decoded.entries) {
      final key = entry.key;
      final value = entry.value;
      if (value is! Map<String, dynamic>) {
        continue;
      }
      out[key] = _parseDay(key, value);
    }
    return out;
  }

  DailyContent _parseDay(String dateKey, Map<String, dynamic> json) {
    final sentenceJson = json['sentence'] as Map<String, dynamic>;
    final wordsJson = (json['words'] as List<dynamic>).cast<Map<String, dynamic>>();
    final breakdownJson =
        (json['sentenceBreakdown'] as List<dynamic>? ?? const [])
            .cast<Map<String, dynamic>>();

    return DailyContent(
      dateKey: dateKey,
      sentence: LearningSentence.fromJson(sentenceJson),
      sentenceBreakdown: breakdownJson.map(SentenceBreakdownItem.fromJson).toList(),
      words: wordsJson.map(LearningWord.fromJson).toList(),
    );
  }
}
