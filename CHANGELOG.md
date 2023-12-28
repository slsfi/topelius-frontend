# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## [1.1.0-granska.1] – 2023-12-28

### Changed

- Merge upstream, original repository `v1.1.0` into `granska` branch. ([35e314e](https://github.com/slsfi/topelius-frontend/commit/35e314e807f96ea2a1fe4606e57e0878c75e9938))
- Config options `config.collections.addTEIClassNames` and `config.collections.replaceImageAssetsPaths` set to `false`.

## [1.1.0] – 2023-12-28

### Added

- Config option to show or hide the toggle for switching between the normalized and non-normalized version of manuscripts: `config.component.manuscripts.showNormalizedToggle`. The new config option defaults to `true`, which corresponds to the old behaviour. ([930eec2](https://github.com/slsfi/digital-edition-frontend-ng/commit/930eec227765d662726e2f9124d9763766fe73e2))
- Config option to add mandatory TEI class names to collection text HTML loaded from the backend: `config.collections.addTEIClassNames`. The new config option defaults to `true`, which corresponds to the old behaviour. If set to `false`, the class attributes of all HTML elements in reading texts, manuscripts and variants fetched from the backend, must contain the value `tei`. In addition, elements in comments must contain the class name `teiComment`, elements in manuscripts the class name `teiManuscript`, and elements in variants `teiVariant`. Otherwise, some inherent functionality and styles won’t work anymore for these texts. Setting the new config option to `false` improves app performance. ([df6554d](https://github.com/slsfi/digital-edition-frontend-ng/commit/df6554d6a7105b64dd109b308dc9c7ed82c274e5), [b8984f8](https://github.com/slsfi/digital-edition-frontend-ng/commit/b8984f8b7abf85f0c05438c4d2232776464538db))
- Config option to fix paths to the `assets/images/` folder in collection texts: `config.collections.replaceImageAssetsPaths`. The new config option defaults to `true`, which corresponds to the old behaviour. When this option is `true`, `src` attribute values starting with `images/` in the HTML of collection texts are replaced with `assets/images/`, which is the correct path to the image assets folder. Setting the new config option to `false` improves app performance. ([1f9d7ed](https://github.com/slsfi/digital-edition-frontend-ng/commit/1f9d7ed89135001dfececdea586f567d5c1388af))

### Changed

- Update Angular to 17.0.8. ([e936d0b](https://github.com/slsfi/digital-edition-frontend-ng/commit/e936d0b097877cca2d61ff93ddee53b14583672b))
- Update ng-extract-i18n-merge to 2.9.1. ([98e567b](https://github.com/slsfi/digital-edition-frontend-ng/commit/98e567b691d0e7c2550e2bbe5bc6015859e4798f))
- Eagerly load home page banner image in portrait mode. ([5d11e3c](https://github.com/slsfi/digital-edition-frontend-ng/commit/5d11e3cce6b57335e8c6ae8816f5bd38aefa414f))

### Fixed

- Show placeholder image for collections in the content grid on the content and home page if unable to retrieve collection cover image URL from the backend. Previously a missing cover image URL disrupted loading of all collections in the grid. ([3f3b256](https://github.com/slsfi/digital-edition-frontend-ng/commit/3f3b256d1926a982ff81fd704f1e36cd445182e4))

### Removed

- Trimming of collection texts fetched from backend. ([990a08c](https://github.com/slsfi/digital-edition-frontend-ng/commit/990a08c54b1207bcd3e290c3307d2d480901b8fe))

## [1.0.3-granska.1] – 2023-12-14

### Added

- Background color under banner on home page. ([a811a3c](https://github.com/slsfi/topelius-frontend/commit/a811a3c9d4c689113716f077c8575c0f0e31373a))

### Changed

- Merge upstream, original repository `v1.0.3` into `granska` branch. ([527880b](https://github.com/slsfi/topelius-frontend/commit/527880b0daac5f3bc45fa18e19c309e8fa9b03bf))

## [1.0.3] – 2023-12-14

### Added

- GitHub Actions workflow definition for triggering builds on commit push to `main` branch or new release/tag. ([aa32c39](https://github.com/slsfi/digital-edition-frontend-ng/commit/aa32c3941b335219f5e1d68ebbcb9ba6ece21312), [a5b22e7](https://github.com/slsfi/digital-edition-frontend-ng/commit/a5b22e7ca599b27fcf98e2996a8e40b9de801557), [a7be6c3](https://github.com/slsfi/digital-edition-frontend-ng/commit/a7be6c3b71e059af6192d03303064e6c2d219cf2), [00b19e4](https://github.com/slsfi/digital-edition-frontend-ng/commit/00b19e43a3270d83744f84e700e898df51b81c08))

### Changed

- Update Angular to 17.0.7. ([90028cf](https://github.com/slsfi/digital-edition-frontend-ng/commit/90028cfae667383603fd8852412ec7448ec6da5a))
- Update base app Docker image repository and tag in `compose.yml`. ([8bdfc5a](https://github.com/slsfi/digital-edition-frontend-ng/commit/8bdfc5a04b5e138ce12fafb69c7e90730dad73f9))
- Update README, CHANGELOG and build workflow code comments. ([35d373d](https://github.com/slsfi/digital-edition-frontend-ng/commit/35d373d67254638574483eae01f7a8a6415bba68))

### Fixed

- Remove incomplete regex sanitization of script tags in search query results. The regex sanitization is unnecessary because the query results are anyway parsed as HTML, only text nodes are retained and any `<`, `>` characters are converted to their corresponding HTML entities. ([ce54078](https://github.com/slsfi/digital-edition-frontend-ng/commit/ce540787c76c28554b241f140138531cb08ba6d2))

## [1.0.2-granska.3] – 2023-12-13

### Fixed

- Use correct container registry in metadata-action.

## [1.0.2-granska.2] – 2023-12-13

### Fixed

- Added push to build workflow.

## [1.0.2-granska.1] – 2023-12-13

### Added

- Project frontend images and files.

### Changed

- Project config, custom CSS and translations.
- README with project specific details and information on updating, releasing, building and deploying the app.

## [1.0.2] – 2023-12-11

### Changed

- Doodle illustrations must be placed in a media collection in the backend rather than in the hard coded `src/assets/images/verk/` folder in the frontend. Use `collections.mediaCollectionMappings` in `config.ts` to map the id of the collection with doodles to the id of the media collection that holds the images in the backend. ([9fd9d0e](https://github.com/slsfi/digital-edition-frontend-ng/commit/9fd9d0e7ab003e2d0dc3fd18c6e8c0edba88d7f5), [02d3d21](https://github.com/slsfi/digital-edition-frontend-ng/commit/02d3d21fbdc24f785e29db6a80acbe8409e91d0d))
- Illustration image path mapping to media collections is performed solely based on the presence of the CSS class name `est_figure_graphic` on `img` elements – not as previously based on the image `src` containing `assets/images/verk/` in it. Thus, illustration images that are to be mapped to media collections must have just the image file names in the `src` attributes, rather than `images/verk/<filename>` as previously. Images with absolute URLs in `src` are never mapped regardless of class names. ([2b4f4e6](https://github.com/slsfi/digital-edition-frontend-ng/commit/2b4f4e6fed6020562e0927c8a72969662a80e536))
- Fixing image paths in collection pages from `images/` to `assets/images/` is done specifically at the start of `src` attribute values – not for any occurrence of the string `images/`. ([111f902](https://github.com/slsfi/digital-edition-frontend-ng/commit/111f9022c4771f271cb812fc9c887c0faa93ece3))

### Removed

- Legacy settings from Angular configuration file. ([fbfc51c](https://github.com/slsfi/digital-edition-frontend-ng/commit/fbfc51c52b3681e265a28db0132b247fb3b136df))

## [1.0.1] – 2023-12-07

### Added

- Matching text color to page break toggle labels in the view options popover. ([514f999](https://github.com/slsfi/digital-edition-frontend-ng/commit/514f999d2fb4965a29a7253552c67f505f2394ee))

### Changed

- Update Ionic to 7.6.0. ([9c66917](https://github.com/slsfi/digital-edition-frontend-ng/commit/9c66917e8df33e96c5ac115aae618c6bce453c4a))
- Update Angular to 17.0.6. ([bf878ae](https://github.com/slsfi/digital-edition-frontend-ng/commit/bf878aeeeb7a6100b81f4e1e808e7913806ec5b8))
- Apply background colors to toggle labels only instead of the entire toggles in the view options popover. ([fc2fc38](https://github.com/slsfi/digital-edition-frontend-ng/commit/fc2fc38c64d3c4d66c2838769f9cac74f0a72a08))
- Adjust padding of facsimile page number input elements to accommodate changed spec in Ionic 7.6.0. ([34d1ab0](https://github.com/slsfi/digital-edition-frontend-ng/commit/34d1ab074e03d386f01e6fe00e1fe5e0409dcfb5))
- Move inline styles for checkbox labels on the elastic-search page to the component SCSS-file. ([8d0a766](https://github.com/slsfi/digital-edition-frontend-ng/commit/8d0a76692396c77715fa570ac32e8f19bfd6b41a))

## [1.0.0] – 2023-12-05

- Initial release.

[unreleased]: https://github.com/slsfi/digital-edition-frontend-ng/compare/1.1.0...HEAD
[1.1.0]: https://github.com/slsfi/digital-edition-frontend-ng/compare/1.0.3...1.1.0
[1.0.3]: https://github.com/slsfi/digital-edition-frontend-ng/compare/v1.0.2...1.0.3
[1.0.2]: https://github.com/slsfi/digital-edition-frontend-ng/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/slsfi/digital-edition-frontend-ng/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/slsfi/digital-edition-frontend-ng/releases/tag/v1.0.0

[1.1.0-granska.1]: https://github.com/slsfi/topelius-frontend/compare/1.0.3-granska.1...1.1.0-granska.1
[1.0.3-granska.1]: https://github.com/slsfi/topelius-frontend/compare/1.0.2-granska.3...1.0.3-granska.1
[1.0.2-granska.3]: https://github.com/slsfi/topelius-frontend/compare/1.0.2-granska.2...1.0.2-granska.3
[1.0.2-granska.2]: https://github.com/slsfi/topelius-frontend/compare/1.0.2-granska.1...1.0.2-granska.2
[1.0.2-granska.1]: https://github.com/slsfi/topelius-frontend/releases/tag/1.0.2-granska.1
