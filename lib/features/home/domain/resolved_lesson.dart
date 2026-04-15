import 'package:flutter/foundation.dart';

import 'daily_content.dart';

@immutable
class ResolvedLesson {
  const ResolvedLesson({
    required this.requestedDateKey,
    required this.resolvedDateKey,
    required this.content,
    required this.isFallback,
  });

  final String requestedDateKey;
  final String resolvedDateKey;
  final DailyContent content;
  final bool isFallback;
}
