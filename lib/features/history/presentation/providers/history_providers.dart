import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../../../../core/providers/bootstrap_providers.dart';

part 'history_providers.g.dart';

@riverpod
Future<List<String>> historyDates(HistoryDatesRef ref) async {
  final catalog = await ref.watch(contentCatalogProvider.future);
  final keys = catalog.keys.toList()..sort((a, b) => b.compareTo(a));
  return keys;
}
