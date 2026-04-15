import 'package:flutter/foundation.dart';

@immutable
class LearningWord {
  const LearningWord({
    required this.id,
    required this.telugu,
    required this.pronunciation,
    required this.hindi,
    required this.english,
    required this.hinglish,
    required this.audio,
  });

  final String id;
  final String telugu;
  final String pronunciation;
  final String hindi;
  final String english;
  final String hinglish;
  final String audio;

  factory LearningWord.fromJson(Map<String, dynamic> json) {
    return LearningWord(
      id: json['id'] as String,
      telugu: json['telugu'] as String,
      pronunciation: json['pronunciation'] as String,
      hindi: json['hindi'] as String,
      english: json['english'] as String,
      hinglish: json['hinglish'] as String,
      audio: json['audio'] as String,
    );
  }

  String fieldByKey(String key) {
    switch (key) {
      case 'pronunciation':
        return pronunciation;
      case 'english':
        return english;
      case 'hindi':
        return hindi;
      case 'hinglish':
        return hinglish;
      default:
        return '';
    }
  }
}
