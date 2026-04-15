/// First token of a string for compact list subtitles (e.g. pronunciation preview).
abstract final class TeluguPreview {
  static String firstToken(String text) {
    final trimmed = text.trim();
    if (trimmed.isEmpty) {
      return '';
    }
    final parts = trimmed.split(RegExp(r'\s+'));
    return parts.first;
  }
}
