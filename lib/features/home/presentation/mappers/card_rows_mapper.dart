import '../../../../core/config/app_config.dart';
import '../../../../core/strings/app_strings.dart';
import '../models/translation_row_vm.dart';

abstract final class CardRowsMapper {
  static List<TranslationRowVm> fromFields({
    required AppConfig config,
    required String Function(String fieldKey) fieldValue,
  }) {
    return [
      for (final row in config.cardContentRows)
        TranslationRowVm(
          label: AppStrings.of(row.labelStringKey),
          value: fieldValue(row.fieldKey),
        ),
    ];
  }
}
