import 'dart:convert';

import 'package:flutter/services.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../config/app_config.dart';
import '../../features/home/data/local_content_repository.dart';
import '../../features/home/domain/daily_content.dart';

part 'bootstrap_providers.g.dart';

@Riverpod(keepAlive: true)
Future<AppConfig> appConfig(AppConfigRef ref) async {
  final raw = await rootBundle.loadString('assets/data/app_config.json');
  final jsonMap = json.decode(raw) as Map<String, dynamic>;
  return AppConfig.fromJson(jsonMap);
}

@Riverpod(keepAlive: true)
Future<Map<String, DailyContent>> contentCatalog(ContentCatalogRef ref) async {
  final config = await ref.watch(appConfigProvider.future);
  final repo = LocalContentRepository(config);
  return repo.loadCatalog();
}
