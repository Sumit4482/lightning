# Eevee

Premium offline-first Flutter app for **daily micro-learning**: Telugu from English, with **Hindi** and **Hinglish** support.

## Tech

- Flutter (stable channel recommended)
- Riverpod + `riverpod_annotation` / `riverpod_generator`
- `go_router` navigation
- `just_audio` + `audio_session` for bundled lesson audio
- Local JSON catalog (`assets/data/content.json`) behind `ContentRepository`

## Setup

```bash
flutter pub get
dart run build_runner build --delete-conflicting-outputs
flutter run
```

If you change `@riverpod` / `@Riverpod` providers, re-run `build_runner`.

## Fonts

Bundled fonts live in `assets/fonts/`:

- `DMSans-Variable.ttf` (UI)
- `NotoSansTelugu-*.ttf` (Telugu)

## Content model (`assets/data/content.json`)

Top-level keys are ISO dates (`yyyy-MM-dd`). Each day contains:

- `sentence`: `{ id, telugu, pronunciation, hindi, english, hinglish, audio }`
- `words`: array of the same shape (the UI shows **two** words)

The `audio` field is the **basename** (no extension). Files are stored as:

`assets/audio/<audio>.mp3`

## App config (`assets/data/app_config.json`)

This file controls:

- Where the catalog JSON is loaded from
- How audio paths are assembled
- UI feature flags (e.g. history)
- Which **translation** rows appear under the headline (English / Hindi / Hinglish by default). The UI is **pronunciation-first**: Romanization is large; Telugu script is shown smaller as reference.

Label keys resolve through `lib/core/strings/app_strings.dart` (swap for generated l10n later).

## Adding a new day

1. Add a new top-level date entry to `assets/data/content.json`.
2. Add matching MP3s to `assets/audio/` using the IDs referenced by `sentence.audio` / `word.*.audio`.
3. Register each new MP3 path under `flutter: assets:` in `pubspec.yaml` (Flutter requires explicit asset declarations).
4. Re-run the app.

## Swapping in remote content later

Implement `RemoteContentRepository` (`lib/features/home/data/remote_content_repository.dart`) and replace the `ContentRepository` binding in `lib/core/providers/bootstrap_providers.dart`.

## Audio placeholders

The bundled MP3s are short generic samples duplicated per clip id so playback wiring is real and offline-safe. Replace them with studio recordings without changing Dart code (keep filenames stable).
