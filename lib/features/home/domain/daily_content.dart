import 'package:flutter/foundation.dart';

import 'learning_sentence.dart';
import 'learning_word.dart';
import 'sentence_breakdown_item.dart';

@immutable
class DailyContent {
  const DailyContent({
    required this.dateKey,
    required this.sentence,
    required this.sentenceBreakdown,
    required this.words,
  });

  final String dateKey;
  final LearningSentence sentence;
  final List<SentenceBreakdownItem> sentenceBreakdown;
  final List<LearningWord> words;

  List<String> audioIds() {
    return [
      sentence.audio,
      ...sentenceBreakdown.map((b) => b.audioId).whereType<String>(),
      ...words.map((w) => w.audio),
    ];
  }

  List<LearningWord> displayWords({int maxCount = 2}) {
    if (words.length <= maxCount) {
      return List<LearningWord>.unmodifiable(words);
    }
    return List<LearningWord>.unmodifiable(words.take(maxCount));
  }
}
