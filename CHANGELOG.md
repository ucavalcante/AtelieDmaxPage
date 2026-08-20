# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog][Keep a Changelog] and this project adheres to [Semantic Versioning][Semantic Versioning].

## [Unreleased]

## [0.9.0] - 2026-08-20

### Added
- **TypeScript Development Environment**: Complete TypeScript setup with tsconfig.json and automatic compilation to JavaScript
- **Vue.js 3 Migration**: Complete migration from Vue 2 to Vue 3 Composition API (`createApp`, `reactive`, `computed`)
- **Automated Image Manifest Generator**: Build-time Node.js script (`scripts/generate-manifest.js`) automatically discovering images across categories and generating `data/products.json`
- **Playwright E2E Testing Suite**: 108 end-to-end tests written in TypeScript (`@playwright/test`) covering:
  - SPA navigation, hamburger menu, and social links (`01-navigation.spec.ts`)
  - Vue 3 card rendering, dynamic cover rotation, and indicator dots (`02-product-gallery.spec.ts`)
  - Multi-image interactive carousels, thumbnails, keyboard navigation (Arrow keys), and back button across all 6 detail pages (`03-product-detail.spec.ts`)
  - Zero-defect network health audit with 0 HTTP 404/403 errors and 0 console exceptions across all 9 site routes (`04-network-health.spec.ts`)
- **CI/CD Pipeline with Test Gate**: GitHub Actions (`.github/workflows/deploy.yml`) running Playwright tests and blocking GitHub Pages deployment upon test failure
- **Hybrid Licensing Model**: Canonical MIT License for source code + All Rights Reserved for photography (`img/products/`), embroidery designs, MDF crafts, and Ateliê Dmax trademarks
- **FontAwesome 6 Assets**: Versioned FontAwesome 6.5.1 Free core webfonts and CSS
- **Subfolder Pathing Support**: Dynamic `/develop` path prefixing for homologation and staging environments

### Changed
- **Site Architecture**: Modernized to TypeScript/Vue 3 Composition API architecture
- **Manifest Architecture**: Replaced runtime brute-force image probes with build-time manifest generation
- **Documentation**: Updated README.md and `/docs/` guides with test execution commands, architecture diagrams, and licensing details

### Fixed
- **Image Preservation**: Preserved category image arrays in `auto-image-detector.ts`
- **Subpath Navigation**: Fixed cross-origin and root redirects in `product-gallery.ts` and `product-detail.ts`
- **Network Errors**: Eliminated all 404 image and asset requests

---

## [0.8.0] - 2021-10-30

### Changed
- change url and icon from store to products

## [0.7.0] - 2021-01-29
- add clarity tracking

## [0.6.0] - 2020-05-09

### Added
- add cloudinary service for image transformation

### Changed
- change file format for images to webp

## [0.5.0] - 2020-05-09

### Added
- favicon
- shadow in irPraLoja button

### Fixed
- css and js load order

## [0.4.1] - 2020-04-28

### Fixed
- add description in metatag
- all images alternative text 

## [0.4.0] - 2020-04-28

### Added
- robots.txt file for SEO

### Removed
- vuejs router reference

## [0.3.0] - 2020-04-28

### Added
- create sitemap.xml file for SEO

## [0.2.0] - 2020-04-28

### Added
- add compre agora button
- card hover on mouse over

### Removed
- disable facebook link
- remove vue router

## [0.1.0] - 2020-04-09

### Changed
- content layou now is resposive

### Removed
- foundation layout

## [0.0.5] - 2020-03-25

### Added
- new categories

### Fixed
- phone mode

### Changed
- image card layout

## [0.0.4] - 2020-03-24

### Removed
- remove foundation css

## [0.0.3] - 2020-03-20

### Added
- content description

### Changed
- product categories layout

## [0.0.2] - 2020-03-18

### Added
- add basic content

## [0.0.1] - 2020-03-18

### Added
- add template page
---

<!-- Links -->
[Keep a Changelog]: https://keepachangelog.com/
[Semantic Versioning]: https://semver.org/

<!-- Versions -->
[Unreleased]: https://github.com/ucavalcante/AtelieDmaxPage/compare/0.9.0...HEAD
[0.9.0]: https://github.com/ucavalcante/AtelieDmaxPage/compare/0.8.0...v0.9.0
[0.8.0]: https://github.com/ucavalcante/AtelieDmaxPage/compare/0.7.0...0.8.0
[0.7.0]: https://github.com/ucavalcante/AtelieDmaxPage/compare/0.6.0..0.7.0
[0.6.0]: https://github.com/ucavalcante/AtelieDmaxPage/compare/0.5.0..0.6.0
[0.5.0]: https://github.com/ucavalcante/AtelieDmaxPage/compare/0.4.1..0.5.0
[0.4.1]: https://github.com/ucavalcante/AtelieDmaxPage/compare/0.4.0..0.4.1
[0.4.0]: https://github.com/ucavalcante/AtelieDmaxPage/compare/0.3.0..0.4.0
[0.3.0]: https://github.com/ucavalcante/AtelieDmaxPage/compare/0.2.0..0.3.0
[0.2.0]: https://github.com/ucavalcante/AtelieDmaxPage/compare/0.1.0..0.2.0
[0.1.0]: https://github.com/ucavalcante/AtelieDmaxPage/compare/0.0.5..0.1.0
[0.0.5]: https://github.com/ucavalcante/AtelieDmaxPage/compare/0.0.4..0.0.5
[0.0.4]: https://github.com/ucavalcante/AtelieDmaxPage/compare/0.0.3..0.0.4
[0.0.3]: https://github.com/ucavalcante/AtelieDmaxPage/compare/0.0.2..0.0.3
[0.0.2]: https://github.com/ucavalcante/AtelieDmaxPage/compare/0.0.1..0.0.2
[0.0.1]: https://github.com/ucavalcante/AtelieDmaxPage/releases/0.0.1