import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:eevee/app.dart';
import 'package:eevee/core/strings/app_string_keys.dart';
import 'package:eevee/core/strings/app_strings.dart';

void main() {
  testWidgets('Splash then home content', (WidgetTester tester) async {
    await tester.pumpWidget(const ProviderScope(child: EeveeApp()));
    expect(find.text(AppStrings.of(AppStringKeys.appTitle)), findsOneWidget);

    await tester.pump(const Duration(milliseconds: 1600));
    await tester.pumpAndSettle();

    expect(find.textContaining(AppStrings.of(AppStringKeys.todayLabel)), findsWidgets);
  });
}
