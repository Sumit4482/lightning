import 'package:flutter/foundation.dart';

@immutable
class SentenceBreakdownItem {
  const SentenceBreakdownItem({
    required this.telugu,
    required this.pronunciation,
    required this.english,
    this.hindi,
    this.hinglish,
    this.audioId,
  });

  final String telugu;
  final String pronunciation;
  final String english;
  final String? hindi;
  final String? hinglish;
  final String? audioId;

  factory SentenceBreakdownItem.fromJson(Map<String, dynamic> json) {
    return SentenceBreakdownItem(
      telugu: json['telugu'] as String,
      pronunciation: json['pronunciation'] as String,
      english: json['english'] as String,
      hindi: json['hindi'] as String?,
      hinglish: json['hinglish'] as String?,
      audioId: json['audio'] as String?,
    );
  }
}
