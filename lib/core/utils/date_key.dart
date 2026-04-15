/// ISO `yyyy-MM-dd` helpers used for content keys.
abstract final class DateKey {
  static String fromDateTime(DateTime dt) {
    final local = dt.toLocal();
    final y = local.year.toString().padLeft(4, '0');
    final m = local.month.toString().padLeft(2, '0');
    final d = local.day.toString().padLeft(2, '0');
    return '$y-$m-$d';
  }

  static DateTime? tryParse(String key) {
    return DateTime.tryParse(key);
  }

  static String displayLabel(String key) {
    final parsed = tryParse(key);
    if (parsed == null) {
      return key;
    }
    const weekdays = <String>[
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sun',
    ];
    final wd = weekdays[(parsed.weekday - 1).clamp(0, 6)];
    final month = parsed.month.toString().padLeft(2, '0');
    final day = parsed.day.toString().padLeft(2, '0');
    return '$wd, ${parsed.year}-$month-$day';
  }
}
