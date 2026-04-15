import 'package:flutter/foundation.dart';

@immutable
class TranslationRowVm {
  const TranslationRowVm({required this.label, required this.value});

  final String label;
  final String value;
}
