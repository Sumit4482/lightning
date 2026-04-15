// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'home_lesson_providers.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

String _$homeResolvedLessonHash() =>
    r'725a6cb6fe2cf8271cfd1203c7cd8c5deeac0b1d';

/// See also [homeResolvedLesson].
@ProviderFor(homeResolvedLesson)
final homeResolvedLessonProvider =
    AutoDisposeFutureProvider<ResolvedLesson>.internal(
  homeResolvedLesson,
  name: r'homeResolvedLessonProvider',
  debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
      ? null
      : _$homeResolvedLessonHash,
  dependencies: null,
  allTransitiveDependencies: null,
);

@Deprecated('Will be removed in 3.0. Use Ref instead')
// ignore: unused_element
typedef HomeResolvedLessonRef = AutoDisposeFutureProviderRef<ResolvedLesson>;
String _$warmHomeLessonAudioHash() =>
    r'da7cf8a4fea2cd0962ae35a9293873c804b23362';

/// See also [warmHomeLessonAudio].
@ProviderFor(warmHomeLessonAudio)
final warmHomeLessonAudioProvider = AutoDisposeFutureProvider<void>.internal(
  warmHomeLessonAudio,
  name: r'warmHomeLessonAudioProvider',
  debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
      ? null
      : _$warmHomeLessonAudioHash,
  dependencies: null,
  allTransitiveDependencies: null,
);

@Deprecated('Will be removed in 3.0. Use Ref instead')
// ignore: unused_element
typedef WarmHomeLessonAudioRef = AutoDisposeFutureProviderRef<void>;
String _$lessonForDateHash() => r'1468b11a01219a3d9012ec9f267bbfe0d492ffbe';

/// Copied from Dart SDK
class _SystemHash {
  _SystemHash._();

  static int combine(int hash, int value) {
    // ignore: parameter_assignments
    hash = 0x1fffffff & (hash + value);
    // ignore: parameter_assignments
    hash = 0x1fffffff & (hash + ((0x0007ffff & hash) << 10));
    return hash ^ (hash >> 6);
  }

  static int finish(int hash) {
    // ignore: parameter_assignments
    hash = 0x1fffffff & (hash + ((0x03ffffff & hash) << 3));
    // ignore: parameter_assignments
    hash = hash ^ (hash >> 11);
    return 0x1fffffff & (hash + ((0x00003fff & hash) << 15));
  }
}

/// See also [lessonForDate].
@ProviderFor(lessonForDate)
const lessonForDateProvider = LessonForDateFamily();

/// See also [lessonForDate].
class LessonForDateFamily extends Family<AsyncValue<DailyContent>> {
  /// See also [lessonForDate].
  const LessonForDateFamily();

  /// See also [lessonForDate].
  LessonForDateProvider call(
    String dateKey,
  ) {
    return LessonForDateProvider(
      dateKey,
    );
  }

  @override
  LessonForDateProvider getProviderOverride(
    covariant LessonForDateProvider provider,
  ) {
    return call(
      provider.dateKey,
    );
  }

  static const Iterable<ProviderOrFamily>? _dependencies = null;

  @override
  Iterable<ProviderOrFamily>? get dependencies => _dependencies;

  static const Iterable<ProviderOrFamily>? _allTransitiveDependencies = null;

  @override
  Iterable<ProviderOrFamily>? get allTransitiveDependencies =>
      _allTransitiveDependencies;

  @override
  String? get name => r'lessonForDateProvider';
}

/// See also [lessonForDate].
class LessonForDateProvider extends AutoDisposeFutureProvider<DailyContent> {
  /// See also [lessonForDate].
  LessonForDateProvider(
    String dateKey,
  ) : this._internal(
          (ref) => lessonForDate(
            ref as LessonForDateRef,
            dateKey,
          ),
          from: lessonForDateProvider,
          name: r'lessonForDateProvider',
          debugGetCreateSourceHash:
              const bool.fromEnvironment('dart.vm.product')
                  ? null
                  : _$lessonForDateHash,
          dependencies: LessonForDateFamily._dependencies,
          allTransitiveDependencies:
              LessonForDateFamily._allTransitiveDependencies,
          dateKey: dateKey,
        );

  LessonForDateProvider._internal(
    super._createNotifier, {
    required super.name,
    required super.dependencies,
    required super.allTransitiveDependencies,
    required super.debugGetCreateSourceHash,
    required super.from,
    required this.dateKey,
  }) : super.internal();

  final String dateKey;

  @override
  Override overrideWith(
    FutureOr<DailyContent> Function(LessonForDateRef provider) create,
  ) {
    return ProviderOverride(
      origin: this,
      override: LessonForDateProvider._internal(
        (ref) => create(ref as LessonForDateRef),
        from: from,
        name: null,
        dependencies: null,
        allTransitiveDependencies: null,
        debugGetCreateSourceHash: null,
        dateKey: dateKey,
      ),
    );
  }

  @override
  AutoDisposeFutureProviderElement<DailyContent> createElement() {
    return _LessonForDateProviderElement(this);
  }

  @override
  bool operator ==(Object other) {
    return other is LessonForDateProvider && other.dateKey == dateKey;
  }

  @override
  int get hashCode {
    var hash = _SystemHash.combine(0, runtimeType.hashCode);
    hash = _SystemHash.combine(hash, dateKey.hashCode);

    return _SystemHash.finish(hash);
  }
}

@Deprecated('Will be removed in 3.0. Use Ref instead')
// ignore: unused_element
mixin LessonForDateRef on AutoDisposeFutureProviderRef<DailyContent> {
  /// The parameter `dateKey` of this provider.
  String get dateKey;
}

class _LessonForDateProviderElement
    extends AutoDisposeFutureProviderElement<DailyContent>
    with LessonForDateRef {
  _LessonForDateProviderElement(super.provider);

  @override
  String get dateKey => (origin as LessonForDateProvider).dateKey;
}

String _$warmLessonAudioHash() => r'b82d854be9d7fa6c85e21e636df6e9897bac3842';

/// See also [warmLessonAudio].
@ProviderFor(warmLessonAudio)
const warmLessonAudioProvider = WarmLessonAudioFamily();

/// See also [warmLessonAudio].
class WarmLessonAudioFamily extends Family<AsyncValue<void>> {
  /// See also [warmLessonAudio].
  const WarmLessonAudioFamily();

  /// See also [warmLessonAudio].
  WarmLessonAudioProvider call(
    String dateKey,
  ) {
    return WarmLessonAudioProvider(
      dateKey,
    );
  }

  @override
  WarmLessonAudioProvider getProviderOverride(
    covariant WarmLessonAudioProvider provider,
  ) {
    return call(
      provider.dateKey,
    );
  }

  static const Iterable<ProviderOrFamily>? _dependencies = null;

  @override
  Iterable<ProviderOrFamily>? get dependencies => _dependencies;

  static const Iterable<ProviderOrFamily>? _allTransitiveDependencies = null;

  @override
  Iterable<ProviderOrFamily>? get allTransitiveDependencies =>
      _allTransitiveDependencies;

  @override
  String? get name => r'warmLessonAudioProvider';
}

/// See also [warmLessonAudio].
class WarmLessonAudioProvider extends AutoDisposeFutureProvider<void> {
  /// See also [warmLessonAudio].
  WarmLessonAudioProvider(
    String dateKey,
  ) : this._internal(
          (ref) => warmLessonAudio(
            ref as WarmLessonAudioRef,
            dateKey,
          ),
          from: warmLessonAudioProvider,
          name: r'warmLessonAudioProvider',
          debugGetCreateSourceHash:
              const bool.fromEnvironment('dart.vm.product')
                  ? null
                  : _$warmLessonAudioHash,
          dependencies: WarmLessonAudioFamily._dependencies,
          allTransitiveDependencies:
              WarmLessonAudioFamily._allTransitiveDependencies,
          dateKey: dateKey,
        );

  WarmLessonAudioProvider._internal(
    super._createNotifier, {
    required super.name,
    required super.dependencies,
    required super.allTransitiveDependencies,
    required super.debugGetCreateSourceHash,
    required super.from,
    required this.dateKey,
  }) : super.internal();

  final String dateKey;

  @override
  Override overrideWith(
    FutureOr<void> Function(WarmLessonAudioRef provider) create,
  ) {
    return ProviderOverride(
      origin: this,
      override: WarmLessonAudioProvider._internal(
        (ref) => create(ref as WarmLessonAudioRef),
        from: from,
        name: null,
        dependencies: null,
        allTransitiveDependencies: null,
        debugGetCreateSourceHash: null,
        dateKey: dateKey,
      ),
    );
  }

  @override
  AutoDisposeFutureProviderElement<void> createElement() {
    return _WarmLessonAudioProviderElement(this);
  }

  @override
  bool operator ==(Object other) {
    return other is WarmLessonAudioProvider && other.dateKey == dateKey;
  }

  @override
  int get hashCode {
    var hash = _SystemHash.combine(0, runtimeType.hashCode);
    hash = _SystemHash.combine(hash, dateKey.hashCode);

    return _SystemHash.finish(hash);
  }
}

@Deprecated('Will be removed in 3.0. Use Ref instead')
// ignore: unused_element
mixin WarmLessonAudioRef on AutoDisposeFutureProviderRef<void> {
  /// The parameter `dateKey` of this provider.
  String get dateKey;
}

class _WarmLessonAudioProviderElement
    extends AutoDisposeFutureProviderElement<void> with WarmLessonAudioRef {
  _WarmLessonAudioProviderElement(super.provider);

  @override
  String get dateKey => (origin as WarmLessonAudioProvider).dateKey;
}
// ignore_for_file: type=lint
// ignore_for_file: subtype_of_sealed_class, invalid_use_of_internal_member, invalid_use_of_visible_for_testing_member, deprecated_member_use_from_same_package
