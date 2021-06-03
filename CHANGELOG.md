# CHANGELOG

## Release Candidate

### Features

- Add Spinner component (INDIGO Sprint 210406, [!95](https://github.com/TeskaLabs/asab-webui/pull/95))

- Implement lazy-loading (INDIGO Sprint 210416, [!93](https://github.com/TeskaLabs/asab-webui/pull/93))

- Export SplashScreen (INDIGO Sprint 210416, [!100](https://github.com/TeskaLabs/asab-webui/pull/100))

- Add configurable moment locales (INDIGO Sprint 210416, [!98](https://github.com/TeskaLabs/asab-webui/pull/98))

- Add configurable and dynamic help button (INDIGO Sprint 210430, [!90](https://github.com/TeskaLabs/asab-webui/pull/90))

- Add check if tenant module is enabled before proceeding with authorization (`_isUserAuthorized module`) (INDIGO Sprint 210430, [!105](https://github.com/TeskaLabs/asab-webui/pull/105))

- Remove tenant parameter from URL when no tenant list is passed from userinfo (INDIGO Sprint 210430, [!105](https://github.com/TeskaLabs/asab-webui/pull/105))

- Create app descriptor on build (INDIGO Sprint 210430, [!108](https://github.com/TeskaLabs/asab-webui/pull/108))

- Return DateTime multiplier for timestamp in seconds (by 1000) and add support of timestamp in milliseconds (INDIGO Sprint 210514, [!109](https://github.com/TeskaLabs/asab-webui/pull/109))

- Add new features to datatable (buttonWithAuthz, action buttons, localization, sorting, spinner, ReactJSON adv mode below each row, fix zero in Footer, add classnames for DataTable components) (INDIGO Sprint 210430, [!107](https://github.com/TeskaLabs/asab-webui/pull/107))

### Refactoring

- Renaming configuration option FAKE_USERINFO to MOCK_USERINFO and refactoring code accordingly (INDIGO Sprint 210406, [!91](https://github.com/TeskaLabs/asab-webui/pull/91))

- Moving ASAB-Config module navigation under the `Maintenance` tab in the sidebar (INDIGO Sprint 210406, [!92](https://github.com/TeskaLabs/asab-webui/pull/92))

- Refactor userinfo API call to obtain Roles and Resources for active tenant (INDIGO Sprint 210416, [!94](https://github.com/TeskaLabs/asab-webui/pull/94))

- Refactor microservices list in order to have more human readable header titles and change column with date to proper datetime type (INDIGO Sprint 210430, [!99](https://github.com/TeskaLabs/asab-webui/pull/99))

- Refactor microservices endpoint in order to have it updated with BE changes (INDIGO Sprint 210430, [!106](https://github.com/TeskaLabs/asab-webui/pull/106))

- Make tenant an optional argument for `verify_access` method (INDIGO Sprint 210430, [!105](https://github.com/TeskaLabs/asab-webui/pull/105))

- Delete multiplier in DateTime component in order to use proper timestamp (milliseconds) (INDIGO Sprint 210430, [a0c35f5](https://github.com/TeskaLabs/asab-webui/commit/a0c35f567ff5b111f8be031195de4e70fa6e8e22))

- Update change password link of the Auth header dropdown based on creation of the new container with different route (`/change-password`) in SeaCat Auth WebUI (INDIGO Sprint 210528, [!115](https://github.com/TeskaLabs/asab-webui/pull/115))

- Rename `oidc` service name to `openidconnect` to align it with SeaCat Auth (INDIGO Sprint 210528, [!116](https://github.com/TeskaLabs/asab-webui/pull/116))


### Bugfixes

- Update auth header dropdown and `Access control screen` to prevent app from crashing when tenant module is not enabled (INDIGO Sprint 210430, [!105](https://github.com/TeskaLabs/asab-webui/pull/105))

- Assure, that BASE_URL is always an absolute URL. Assure, that API_PATH can be set as an absolute URL. (INDIGO Sprint 210514, [!111](https://github.com/TeskaLabs/asab-webui/pull/111))
