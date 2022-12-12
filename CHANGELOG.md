# CHANGELOG

## Release Candidate

### Features

- Implement a new option `dateTimeFormat` to change the time format for DateTime component (INDIGO Sprint 221125, [!376](https://github.com/TeskaLabs/asab-webui/pull/376))

## v22.48

### Breaking changes

- Access to tenants must be requested in authorization scope. This is related to tenant session implementation in ASAB WebUI [here](https://github.com/TeskaLabs/asab-webui/pull/370) (PLUM Sprint 221118, [!92](https://github.com/TeskaLabs/seacat-auth/pull/92))

### Features

- Implement tenant sessions, implement access denied handling, implement access denied card, remove tenant selector card (INDIGO Sprint 221125, [!370](https://github.com/TeskaLabs/asab-webui/pull/370))

### Refactoring

- Refactor Configuration module scroll styling (INDIGO Sprint 221111, [!378](https://github.com/TeskaLabs/asab-webui/pull/378))

### Bugfixes

- Fix styles for so long title in CardHeader (INDIGO Sprint 221125, [!377](https://github.com/TeskaLabs/asab-webui/pull/377))

## v22.46

### Features

- Refactor Microservices container to Services and implement websocket connection (INDIGO Sprint 221111, [!363](https://github.com/TeskaLabs/asab-webui/pull/363))

### Bugfixes

- Change const variable customCellStyle to let variable in DataTable (INDIGO Sprint 221031, [!374](https://github.com/TeskaLabs/asab-webui/pull/374))


## v22.42

### Refactoring

- Fix markdown and word mistakes in DataTable docs (INDIGO Sprint 220916, [!361](https://github.com/TeskaLabs/asab-webui/pull/361))

- Refactor logout in TenantSelection card (INDIGO Sprint 220916, [!366](https://github.com/TeskaLabs/asab-webui/pull/366))

- Refactor SplashScreen styles, change Spinner to SplashScreen (INDIGO Sprint 220930, [!369](https://github.com/TeskaLabs/asab-webui/pull/369))

- Add advanced mode to AccessControlScreen (INDIGO Sprint 220930, [!368](https://github.com/TeskaLabs/asab-webui/pull/368))

- Resize input's padding in dropdown header and moves pagination's buttons box shadow inside of the button. (INDIGO Sprint 220930, [!362](https://github.com/TeskaLabs/asab-webui/pull/362))

- Add condition to the DataTable if data is not undefined (INDIGO Sprint 221014, [!371](https://github.com/TeskaLabs/asab-webui/pull/371))

### Bugfixes

- Add styles which turn off spinner (INDIGO Sprint 220916, [!367](https://github.com/TeskaLabs/asab-webui/pull/367))

## v22.38

### Breaking changes

- From release `v22.38`, only same (`v22.38`) or newer release tags of SeaCat Auth service is compatible with ASAB WebUI due to changes in `userinfo` response

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

- Add new prop noItemsComponent for displaying custom message when there are no items in DataTable (INDIGO Sprint 210528, [!120](https://github.com/TeskaLabs/asab-webui/pull/120))

- Implement softcheck on resource access and thus eventually remove an item from Sidebar navigation (INDIGO Sprint 210611, [!117](https://github.com/TeskaLabs/asab-webui/pull/117))

- Implement function to remove item from Navigation (INDIGO Sprint 210611, [!117](https://github.com/TeskaLabs/asab-webui/pull/117))

- Add versioning to the `styles.css` file on application build to avoid caching when redeploying the app to the production (INDIGO Sprint 210611, [!125](https://github.com/TeskaLabs/asab-webui/pull/125))

- Logout after expired session in auth module (INDIGO Sprint 210528, [!119](https://github.com/TeskaLabs/asab-webui/pull/119))

- Notify user about expiring session in auth module (INDIGO Sprint 210528, [!119](https://github.com/TeskaLabs/asab-webui/pull/119))

- Add support of translations for code outside of react function components (INDIGO Sprint 210611, [!123](https://github.com/TeskaLabs/asab-webui/pull/123))

- Implemented About screen to the dropdown in auth header (INDIGO Sprint 210611, [!130](https://github.com/TeskaLabs/asab-webui/pull/130))

- Add MicroservicesDetailScreen (INDIGO Sprint 210709, [!132](https://github.com/TeskaLabs/asab-webui/pull/132))

- Add customButton and customDropdownButton to DataTable header (INDIGO Sprint 210723, [!145](https://github.com/TeskaLabs/asab-webui/pull/145))

- Add documentation to dynamic config url (INDIGO Sprint 210723, [!149](https://github.com/TeskaLabs/asab-webui/pull/149))

- Refactor MicroservicesContainer, add style with condition to DataTable, add attention required flag to MicroservicesContainer (INDIGO Sprint 210809, [!155](https://github.com/TeskaLabs/asab-webui/pull/155))

- Add customComponent to DataTable header (replace customDropdownButton) (INDIGO Sprint 210809, [!154](https://github.com/TeskaLabs/asab-webui/pull/154))

- Add documentation for Microservices (INDIGO Sprint 210820, [!159](https://github.com/TeskaLabs/asab-webui/pull/159))

- Add option to hide sidebar children based on resource (INDIGO Sprint 210809, [!150](https://github.com/TeskaLabs/asab-webui/pull/150))

- Add minimize button to Sidebar (INDIGO Sprint 210820, [!160](https://github.com/TeskaLabs/asab-webui/pull/160))

- Add AttentionCard to MicroserviceDetailContainer (INDIGO Sprint 210903, [!169](https://github.com/TeskaLabs/asab-webui/pull/169))

- Add serialization of modules and services on app initialization (INDIGO Sprint 210903, [!170](https://github.com/TeskaLabs/asab-webui/pull/170))

- Add reusable `KnowledgeBase` component (INDIGO Sprint 210917, [!176](https://github.com/TeskaLabs/asab-webui/pull/176))

- Move About sidebar item to bottom of the sidebar (INDIGO Sprint 211001, [!183](https://github.com/TeskaLabs/asab-webui/pull/183))

- Add tenant selector in SplashScreen mode when user is not authorized by tenant (INDIGO Sprint 211001, [!182](https://github.com/TeskaLabs/asab-webui/pull/182))

- Add ErrorHandler (ErrorBoundaries component) (INDIGO Sprint 211015, [!186](https://github.com/TeskaLabs/asab-webui/pull/186))

- Uncollapse sidebar items when in sidebar there 2 or less items + Uncollapse active sidebar item + New ordering of sidebar items (INDIGO Sprint 211029, [!201](https://github.com/TeskaLabs/asab-webui/pull/201))

- Translate alert messages within the AlertsComponent  (INDIGO Sprint 211029, [!197](https://github.com/TeskaLabs/asab-webui/pull/197))

- Add possibility to disable breadcrumbs in specific containers (INDIGO Sprint 211029, [!193](https://github.com/TeskaLabs/asab-webui/pull/193))

- Create ControlledSwitch & UncontrolledSwitch component (INDIGO Sprint 211112, [!207](https://github.com/TeskaLabs/asab-webui/pull/207))

- Update Tools module with option to define Tools configuration dynamically (INDIGO Sprint 211112, [!212](https://github.com/TeskaLabs/asab-webui/pull/212))

- Creates separate component to translate user IDs into usernames (INDIGO Sprint 211126, [!218](https://github.com/TeskaLabs/asab-webui/pull/218))

- Sidebar autoclose on small screens  (INDIGO Sprint 220107, [!225](https://github.com/TeskaLabs/asab-webui/pull/225))

- Add possibility to configure items count limit in MicroservicesContainer (INDIGO Sprint 220107, [!223](https://github.com/TeskaLabs/asab-webui/pull/223))

- Automatic closing of the sidebar on sidebar items click for small screens (INDIGO Sprint 220121, [!228](https://github.com/TeskaLabs/asab-webui/pull/228))

- Fix networking indicator progress bar position on the screen (INDIGO Sprint 220204, [!234](https://github.com/TeskaLabs/asab-webui/pull/234))

- Move Library module from lmio-webui to asab-webui (INDIGO Sprint 220204, [!231](https://github.com/TeskaLabs/asab-webui/pull/231))

- Update ASAB-Config module with option to add/remove configuration. Add option to set a new section for pattern properties (INDIGO Sprint 220204, [!229](https://github.com/TeskaLabs/asab-webui/pull/229))

- Add `customCardBodyComponent` to DataTable (INDIGO Sprint 220204, [!237](https://github.com/TeskaLabs/asab-webui/pull/237))

- Add download all library content feature (INDIGO Sprint 220204, [!233](https://github.com/TeskaLabs/asab-webui/pull/233))

- Replace `moment` with `date-fns` library and implement lazy-loading for dates' locales (bugfixed) + split bundled js file into few (INDIGO Sprint 220204, [!239](https://github.com/TeskaLabs/asab-webui/pull/239))

- Created datatable content loader (INDIGO Sprint 220121, [!230](https://github.com/TeskaLabs/asab-webui/pull/230))

- Add option to dynamically hide sidebar items via ASAB-Config service (INDIGO Sprint 220218, [!245](https://github.com/TeskaLabs/asab-webui/pull/245))

- Add option to remove section from config in ASAB-Config module (INDIGO Sprint 220304, [!248](https://github.com/TeskaLabs/asab-webui/pull/248))

- Add an option to construct a link in DataTable's cell using a function (INDIGO Sprint 220318, [!255](https://github.com/TeskaLabs/asab-webui/pull/255))

- Add feature to import library (INDIGO Sprint 220318, [!250](https://github.com/TeskaLabs/asab-webui/pull/250))

- Add global validateConfiguration function, which validate configuration based on current tenant (INDIGO Sprint 220401, [!257](https://github.com/TeskaLabs/asab-webui/pull/257))

- Make monaco loader part of the application (INDIGO Sprint 220401, [!258](https://github.com/TeskaLabs/asab-webui/pull/258))

- Implement DataTable Sublist (INDIGO Sprint 220429, [!264](https://github.com/TeskaLabs/asab-webui/pull/264))

- Make webpack configuration extandable (INDIGO Sprint 220419, [!271](https://github.com/TeskaLabs/asab-webui/pull/271))

- Add version field to MicroservicesDetail and MicroservicesList (INDIGO Sprint 220401, [!261](https://github.com/TeskaLabs/asab-webui/pull/261))

- Add docs for customRowStyle and customRowClassName (INDIGO Sprint 220527, [!280](https://github.com/TeskaLabs/asab-webui/pull/280))

- Implement Switches with Authz (INDIGO Sprint 220527, [!283](https://github.com/TeskaLabs/asab-webui/pull/283))

- New design implementation (INDIGO Sprint 210712, [!286](https://github.com/TeskaLabs/asab-webui/pull/286))

- Implement a dynamic height-dependent display of table item when the web page first loads (INDIGO Sprint 220902, [!356](https://github.com/TeskaLabs/asab-webui/pull/356))


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

- Return padding to DataTable because it looks better with it, refactor obtaining headers for DataTable from Configs because it should obtain them from inside applications, fix mistake in DataTable localization docs (INDIGO Sprint 210528, [!121](https://github.com/TeskaLabs/asab-webui/pull/121))

- Replace questionmark in hash URL in initialization of the application when query string is empty (e.g. in provisioning mode, when in the starting point, there is no tenant) (INDIGO Sprint 210611, [!124](https://github.com/TeskaLabs/asab-webui/pull/124))

- Set the DEV mode alert timeout to 3 seconds (INDIGO Sprint 210611, [!124](https://github.com/TeskaLabs/asab-webui/pull/124))

- Refactor obtaining formats for format items in ASAB-Config module. It seek for `$defs` key to generate appropriate input type. (INDIGO Sprint 210528, [!103](https://github.com/TeskaLabs/asab-webui/pull/103))

- Refactor capitalization of authorization configuration in the config file. (INDIGO Sprint 210611, [!128](https://github.com/TeskaLabs/asab-webui/pull/128))

- Refactor the ASAB-Config configuration with better look - the content of the config is now available to display and change in JSON form, the whole displayed config is wrapped in a Card. (INDIGO Sprint 210625, [!129](https://github.com/TeskaLabs/asab-webui/pull/129))

- Refactor Access control screen of `auth` module - Back to previous screen option has been removed, bullet points for multiple Roles and Resources has been removed, tenant name has been changed. (INDIGO Sprint 210625, [!134](https://github.com/TeskaLabs/asab-webui/pull/134))

- Move the link to About page from "My account" dropdown to sidebar. (INDIGO Sprint 210709, [!138](https://github.com/TeskaLabs/asab-webui/pull/138))

- Refactor About module with missing condition on undefined release date. (INDIGO Sprint 210709, [!139](https://github.com/TeskaLabs/asab-webui/pull/139))

- Refactor About module, add User interface card. (INDIGO Sprint 210723, [!142](https://github.com/TeskaLabs/asab-webui/pull/142))

- Refactor Config Service in order to obtain dynamic config url from meta (INDIGO Sprint 210723, [!148](https://github.com/TeskaLabs/asab-webui/pull/148))

- Refactor sidebar (INDIGO Sprint 210723, [!141](https://github.com/TeskaLabs/asab-webui/pull/141))

- Refactor borders of tool widget (INDIGO Sprint 210809, [!152](https://github.com/TeskaLabs/asab-webui/pull/152))

- Add support to external links on click to logo (INDIGO Sprint 210820, [!156](https://github.com/TeskaLabs/asab-webui/pull/156))

- Move Pagination from DataTable to separate component (INDIGO Sprint 210820, [!157](https://github.com/TeskaLabs/asab-webui/pull/157))

- Refactor `attention_required` warning in MicroservicesContainer (INDIGO Sprint 210820, [!162](https://github.com/TeskaLabs/asab-webui/pull/162))

- Refactor attention_required conditions to be objects (INDIGO Sprint 210820, [!165](https://github.com/TeskaLabs/asab-webui/pull/165))

- Add maxWidth and textOverflow to DataTable text and link cells (INDIGO Sprint 210820, [!161](https://github.com/TeskaLabs/asab-webui/pull/161))

- Update tenant service's `get_current_tenant()` method with obtaining tenant from URL params if tenant is not set in the redux store (INDIGO Sprint 210903, [!168](https://github.com/TeskaLabs/asab-webui/pull/168))

- Update ButtonWithAuthz with option to hide the button completelly on unauthorized access (INDIGO Sprint 210903, [!166](https://github.com/TeskaLabs/asab-webui/pull/166))

- Update default path for SeaCat Auth WebUI in the Auth header dropdown (INDIGO Sprint 210903, [!174](https://github.com/TeskaLabs/asab-webui/pull/174))

- Add a possibility to add icons to items of ActionButton component of DataTable (INDIGO Sprint 210903, [!173](https://github.com/TeskaLabs/asab-webui/pull/173))

- Hide rows with version in UserInterfaceCard and with website in AboutCard of about module, when they are not provided (INDIGO Sprint 210903, [!171](https://github.com/TeskaLabs/asab-webui/pull/171))

- Update enabling ButtonWithAuthz component when user has superuser rights (INDIGO Sprint 210917, [!177](https://github.com/TeskaLabs/asab-webui/pull/177))

- Remove RBAC endpoints completely from ASAB WebUI Auth module (INDIGO Sprint 210917, [!178](https://github.com/TeskaLabs/asab-webui/pull/178))

- Refactor Authorization softcheck on tenant and nav items (sidebar). It does not use RBAC endpoint for checking tenants/resources of the user (INDIGO Sprint 210917, [!178](https://github.com/TeskaLabs/asab-webui/pull/178))

- Increase expiration alert duration to 1000 hours (INDIGO Sprint 210917, [!179](https://github.com/TeskaLabs/asab-webui/pull/179))

- Add order ASAB-Config and Tools modules for sidebar navigation (INDIGO Sprint 211001, [!181](https://github.com/TeskaLabs/asab-webui/pull/181))

- Refactor coreui components (Header, Footer, Sidebar, Breadcrumbs and Main), create our own and use them (INDIGO Sprint 211001, [!180](https://github.com/TeskaLabs/asab-webui/pull/180))

- Refactor updateUserInfo method of auth module - split it into two functions notifyOnExpiredSession() and updateUserInfo() (INDIGO Sprint 211015, [!187](https://github.com/TeskaLabs/asab-webui/pull/187))

- Change color of second alert message about expired session (INDIGO Sprint 211029, [!190](https://github.com/TeskaLabs/asab-webui/pull/190))

- Refactor ErrorHandler (remove react-ace from the component) and add time when error occurred (INDIGO Sprint 211029, [!192](https://github.com/TeskaLabs/asab-webui/pull/192))

- Move About sidebar nav item alongside collapse button (INDIGO Sprint 211029, [!194](https://github.com/TeskaLabs/asab-webui/pull/194))

- Refactor alert messages position (INDIGO Sprint 211029, [!200](https://github.com/TeskaLabs/asab-webui/pull/200))

- Update page reloads in tenant module with location.pathname to correct redirect on subpaths (INDIGO Sprint 211029, [!202](https://github.com/TeskaLabs/asab-webui/pull/202))

- Adds i18n translations to alert messages (INDIGO Sprint 211029, [!203](https://github.com/TeskaLabs/asab-webui/pull/203))

- Refactoring ToolsModule.js class component into a functional component (INDIGO Sprint 211112, [!204](https://github.com/TeskaLabs/asab-webui/pull/204))

- Adds missing email title to AboutCard module (INDIGO Spring 211112, [!205](https://github.com/TeskaLabs/asab-webui/pull/205))

- SidebarItem's name is revealed upon hover (INDIGO Sprint 211112, [!208](https://github.com/TeskaLabs/asab-webui/pull/208))

- Method addAlert() now automaticaly determines whether arg1 and arg2 are the expiration time or shouldBeTranslated boolean. (INDIGO Sprint 211112, [!211](https://github.com/TeskaLabs/asab-webui/pull/211))

- Collapsable 'userbar' on screensize below 800px, NavbarBrand position adjustment (INDIGO 211126, [!214](https://github.com/TeskaLabs/asab-webui/pull/214))

- Make init method of tenant service syncronous and make `_extract_tenant_from_url()` a private method (INDIGO Sprint 211126, [!217](https://github.com/TeskaLabs/asab-webui/pull/217))

- Dates display as per user's browser's location standard. (INDIGO Sprint 211210, [!220](https://github.com/TeskaLabs/asab-webui/pull/220))

- Custom switch components noc accept size as a property (INDIGO Sprint 211210, [!221](https://github.com/TeskaLabs/asab-webui/pull/221))

- Refactor `asab-config` module with pattern properties schema handling, update documentation, move Configuration out of the Maintenance sidebar item (INDIGO Sprint 211210, [!219](https://github.com/TeskaLabs/asab-webui/pull/219))

- Refactor `Tools` module with different Tools configuration processing based on ASAB-Config service changes (INDIGO Sprint 220107, [!222](https://github.com/TeskaLabs/asab-webui/pull/222))

- Update responses in ASAB-Config Configuration by changes in asab-config service (INDIGO Sprint 220218, [!240](https://github.com/TeskaLabs/asab-webui/pull/240))

- Refactor Microservices API calls (INDIGO Sprint 220218, [!241](https://github.com/TeskaLabs/asab-webui/pull/241))

- Replace AceEditor with Monaco Editor in Library  (INDIGO Sprint 220218, [!244](https://github.com/TeskaLabs/asab-webui/pull/244))

- Replace Spinner with ContentLoader in DataTable's index.js (INDIGO Sprint 220218, [!249](https://github.com/TeskaLabs/asab-webui/pull/249))

- Restructure src folder (INDIGO Sprint 220218, [!232](https://github.com/TeskaLabs/asab-webui/pull/232))

- Completely remove moment - replace moment with date-fns in DataTable  (INDIGO Sprint 220218, [!243](https://github.com/TeskaLabs/asab-webui/pull/243))

- Obsolete console.log removal (INDIGO Sprint 220304, [!251](https://github.com/TeskaLabs/asab-webui/pull/251))

- DataTable accepts showContentLoader prop to add the possibility to postpone loaders appearance in order to avoid quick flickering of data/contentloader/new data (INDIGO Sprint 220304, [!252](https://github.com/TeskaLabs/asab-webui/pull/252))

- ASAB-Config - refactorisation of Add dropdown button that it displays the title of the section taken from the Schema, add ASAB-Config locales to demo app (INDIGO Sprint 220318, [!254](https://github.com/TeskaLabs/asab-webui/pull/254))

- Rename Library import and export endpoints (INDIGO Sprint 220419, [!266](https://github.com/TeskaLabs/asab-webui/pull/266))

- Remove all classes in div in index.html file (INDIGO Sprint 220419, [!272](https://github.com/TeskaLabs/asab-webui/pull/272)

- Refactor validateConfiguration function to be able to handle "Authorization" section name of configuration (INDIGO Sprint 220419, [!268](https://github.com/TeskaLabs/asab-webui/pull/268))

- Replace 0.0.0.0 to localhost (INDIGO Sprint 220419, [!270](http://gitlab.teskalabs.int/bitswan/bitswan-webui/-/merge_requests/270))

- Apply ellipsis to shorten long titles is DataTable (INDIGO Sprint 220419, [!275](https://github.com/TeskaLabs/asab-webui/pull/275))

- Update of locales in modules/asab-config/MicroservicesContainers (INDIGO Sprint 220429, [!276](https://github.com/TeskaLabs/asab-webui/pull/276))

- DataTable decomposition (INDIGO Sprint 220513, [!279](https://github.com/TeskaLabs/asab-webui/pull/279))

- MicroserviceDetailContainer Fallbacks and Container Info Update (INDIGO Sprint 220527, [!281](https://github.com/TeskaLabs/asab-webui/pull/281))

- Delete Remove button from ASAB Config editor, add resource for config actions (INDIGO Sprint 220527, [!284](https://github.com/TeskaLabs/asab-webui/pull/284))

- Add .json extension to a API call for obtaining Sidebar configuration via asab-config service - this change has been done because of asab-config service refactorisation. Add default .json filetype extension for creating new configuration without specified filetype extension in ASAB-Config module. (INDIGO Sprint 220610, [!287](https://github.com/TeskaLabs/asab-webui/pull/287))

- Update DataTable render TableCell info for parent row (INDIGO Sprint 220610, [!289](https://github.com/TeskaLabs/asab-webui/pull/289))

- Add download/upload and search functionality in Configuration  (INDIGO Sprint 220610, [!278](https://github.com/TeskaLabs/asab-webui/pull/278))

- Fix color for Content Loader in DataTable, it works in light and dark mode  (INDIGO Sprint 220712, [!328](https://github.com/TeskaLabs/asab-webui/pull/328))

- Implement search, filter and sort by to Microservices component (INDIGO Sprint 220712, [!330](https://github.com/TeskaLabs/asab-webui/pull/330))

- Refactor Sidebar for mobile screen (INDIGO Sprint 220722, [!327](https://github.com/TeskaLabs/asab-webui/pull/327))

- Refactor ASABConfig and ASABMicroservices module that they can be imported separately and those modules will appear only under the Maintenance sidebar navigation item as a subitems (INDIGO Sprint 220712, [!331](https://github.com/TeskaLabs/asab-webui/pull/331))

- Fixed Version display and added repository name to UserInternterfaceCard (INDIGO Sprint 220712, [!332](https://github.com/TeskaLabs/asab-webui/pull/332))

- Add a commit abbreviation to Version in UserInterfaceCard (INDIGO Sprint 220722, [!334](https://github.com/TeskaLabs/asab-webui/pull/334))

- Add monospace styling to treemenu toggle icons (INDIGO Sprint 220722, [!335](https://github.com/TeskaLabs/asab-webui/pull/335))

- DataTable update - adding customHeaderStyle property to headers (INDIGO Sprint 220722, [!337](https://github.com/TeskaLabs/asab-webui/pull/337))

- Modularize Knowledge base component (INDIGO Sprint 220722, [!336](https://github.com/TeskaLabs/asab-webui/pull/336))

- Logo and menu in sidebar allignment. Sidebar's submenu items position fix. (INDIGO Sprint 220722, [!340](https://github.com/TeskaLabs/asab-webui/pull/340))

- Branding docs update. (INDIGO Sprint 220722, [!341](https://github.com/TeskaLabs/asab-webui/pull/341))

- Add form group style for messages and errors in input validation (INDIGO Sprint 220722, [!338](https://github.com/TeskaLabs/asab-webui/pull/338))

- Refactor Credentials component. Implement option to add className, title, id for Link element. Update dropdown styles for more opportunities in DropdownItem  (INDIGO Sprint 220722, [!342](https://github.com/TeskaLabs/asab-webui/pull/342))

- Implement Breadcrumbs for small screen (INDIGO Sprint 220722, [!339](https://github.com/TeskaLabs/asab-webui/pull/339)

- Move language icon beside toggle icon (INDIGO Sprint 220805, [!346](https://github.com/TeskaLabs/asab-webui/pull/346)

- Do not show the toggle button in Login screen (INDIGO Sprint 220819, [!349](https://github.com/TeskaLabs/asab-webui/pull/349)

- Removal of footer's legacy. (Became obsolete with new design) (INDIGO Sprint 220805, [!347](https://github.com/TeskaLabs/asab-webui/pull/347)

- Update styling Error screen (INDIGO Sprint 220819, [!348](https://github.com/TeskaLabs/asab-webui/pull/348)

- Corrected grammatical errors in translations (INDIGO Sprint 220819, [!353](https://github.com/TeskaLabs/asab-webui/pull/353)

- Input's padding adjustment inside droprdowns header (INDIGO 220819, [!354](https://github.com/TeskaLabs/asab-webui/pull/354))

- Refactor dynamic branding (INDIGO Sprint 220902, [!355](https://github.com/TeskaLabs/asab-webui/pull/355)

- Refactor UserInfo calls based on changes in SeaCat Auth service (INDIGO Sprint 220902, [!344](https://github.com/TeskaLabs/asab-webui/pull/344)

- Replace class form-text (INDIGO Sprint 220916, [!358](https://github.com/TeskaLabs/asab-webui/pull/358)

- Add special loaded class for correct styling body background-color and background-image when the page is loaded (INDIGO Sprint 220916, [!359](https://github.com/TeskaLabs/asab-webui/pull/359)

- Refactor overflow style in pagination dropdown (INDIGO Sprint 220916, [!365](https://github.com/TeskaLabs/asab-webui/pull/365)


### Bugfixes

- Update auth header dropdown and `Access control screen` to prevent app from crashing when tenant module is not enabled (INDIGO Sprint 210430, [!105](https://github.com/TeskaLabs/asab-webui/pull/105))

- Assure, that BASE_URL is always an absolute URL. Assure, that API_PATH can be set as an absolute URL. (INDIGO Sprint 210514, [!111](https://github.com/TeskaLabs/asab-webui/pull/111))

- Fix public path issue when apps are build on subpaths (INDIGO Sprint 210528, [!118](https://github.com/TeskaLabs/asab-webui/pull/118))

- Fix paths to language locales when app is build on subpath (INDIGO Sprint 210611, [!126](https://github.com/TeskaLabs/asab-webui/pull/126))

- Fix URL of Access control screen and SeaCat Auth WebUI when app is build on subpath (INDIGO Sprint 210611, [!126](https://github.com/TeskaLabs/asab-webui/pull/126))

- Fix AccessControlScreen behaviour if userinfo is null (INDIGO Sprint 210625, [!136](https://github.com/TeskaLabs/asab-webui/pull/136))

- Remove unused packages and update packages with vulnerabilities (INDIGO Sprint 210625, [!135](https://github.com/TeskaLabs/asab-webui/pull/135))

- Fix microservices containers indentation in order to keep clean code style (INDIGO Sprint 210723 ,[!143](https://github.com/TeskaLabs/asab-webui/pull/143))

- Update `getVersion` function in `webpack/common.js` to prevent app from crashing when there is no repository for the project (INDIGO Sprint 210723, [!146](https://github.com/TeskaLabs/asab-webui/pull/146))

- Fix redirect to homepage on click to logo (INDIGO Sprint 210809, [!151](https://github.com/TeskaLabs/asab-webui/pull/151))

- Fix invalid prop in header's logo appeared after fixing redirect to homepage (INDIGO Sprint 210809, [!153](https://github.com/TeskaLabs/asab-webui/pull/153))

- Fix export of Pagination (INDIGO Sprint 210820, [!163](https://github.com/TeskaLabs/asab-webui/pull/163))

- Fix sidebar styling (scroll on vertical axis) and minor drawbacks in NavChildren component (INDIGO Sprint 210820, [!164](https://github.com/TeskaLabs/asab-webui/pull/164))

- Fix sidebar styles (scroll on large screens) (INDIGO Sprint 210903, [!167](https://github.com/TeskaLabs/asab-webui/pull/167))

- Fix  error on awaiting the app reload in auth module (INDIGO Sprint 210903, [!175](https://github.com/TeskaLabs/asab-webui/pull/175))

- Fix DataTable pagination (INDIGO Sprint 211015, [!185](https://github.com/TeskaLabs/asab-webui/pull/185))

- Remove comments about coreui, edit readme (INDIGO Sprint 211015, [!188](https://github.com/TeskaLabs/asab-webui/pull/188))

- Throw error for undefined response in MicroservicesListContainer (INDIGO Sprint 211029, [!189](https://github.com/TeskaLabs/asab-webui/pull/189))

- Fix mock userinfo in dev locale (INDIGO Sprint 211029, [!191](https://github.com/TeskaLabs/asab-webui/pull/191))

- Fix breadcrumbs for dynamic routes or crumbs which doesn't have name (INDIGO Sprint 211029, [!196](https://github.com/TeskaLabs/asab-webui/pull/196))

- Fix sidebar items order for minimized sidebar (INDIGO Sprint 211112, [!210](https://github.com/TeskaLabs/asab-webui/pull/210))

- Fix sidebar auto open (INDIGO Sprint 211126, [!215](https://github.com/TeskaLabs/asab-webui/pull/215))

- Fix sidebar items filter condition (INDIGO Sprint 211126, [!216](https://github.com/TeskaLabs/asab-webui/pull/216))

- Fix issue on failed response for ASAB-Config's module TreeMenu. It broke the application when there was some issue (wrong file type) e.g. in schema or config file (INDIGO Sprint 211126, [!216](https://github.com/TeskaLabs/asab-webui/pull/226))

- Fix broken language reducer, move i18n related components to particular i18n module (INDIGO Sprint 220204, [!235](https://github.com/TeskaLabs/asab-webui/pull/235))

- Return no wrap css rule to DataTable cells (INDIGO Sprint 220218, [!242](https://github.com/TeskaLabs/asab-webui/pull/242))

- Fix DateTime issue when component is unmounted before async locale request finished (INDIGO Sprint 220218, [!246](https://github.com/TeskaLabs/asab-webui/pull/246))

- Fix double splashscreen when loading apps. (INDIGO Spring 220218, [!247](https://github.com/TeskaLabs/asab-webui/pull/247))

- Sidebar service - update condition in Sidebar service to avoid triggering call to asab-config service to check Sidebar configuration, when ASAB-Config module is not part of the Application (INDIGO Sprint 220318, [!254](https://github.com/TeskaLabs/asab-webui/pull/254))

- Microservices Detail - Bug with data render (INDIGO Sprint 220318, [!256](https://github.com/TeskaLabs/asab-webui/pull/256))

- Add monaco loader plugin to webpack.build.js (INDIGO Sprint 220401, [!260](https://github.com/TeskaLabs/asab-webui/pull/260))

- Fix library global styles (INDIGO Sprint 220401, [!262](https://github.com/TeskaLabs/asab-webui/pull/262))

- Fix missing authorization bearer token in the header of Sidebar request on ASAB-Config service (INDIGO Sprint 220419, [!265](https://github.com/TeskaLabs/asab-webui/pull/265))

- Fix global vars (INDIGO Sprint 220429, [!272](https://github.com/TeskaLabs/asab-webui/pull/272))

- Fix pagination' diappearance issue upon last item removal in DataTable (INDIGO Sprint 220429, [!274](https://github.com/TeskaLabs/asab-webui/pull/274))

- Fix pagination's position after decomposing of DataTable, vertical allignment in DataTable's card footer and disappearance of pagination when no data is preset (INDIGO Sprint 220527, [!285](https://github.com/TeskaLabs/asab-webui/pull/285))

- Fix overwriting values in input in Configuration due to useForm (INDIGO Sprint 220712, [!333](https://github.com/TeskaLabs/asab-webui/pull/333))

- Removing bug causing limitation to scroll in the sidebar if it's items contain more than 100vh (INDIGO Sprint 220805, [!343](https://github.com/TeskaLabs/asab-webui/pull/343))

- Fix Safari issues with loading of the application (INDIGO Sprint 220819, [!350](https://github.com/TeskaLabs/asab-webui/pull/350))

- Fix Safari issue - TenantSelectionCard action triggered upon change of tenant (INDIGO Sprint 220819, [!352](https://github.com/TeskaLabs/asab-webui/pull/352))

- Button styles update. Underline removal for link button, text color update when active, updated box shadow to inset when clicked (INDIGO Sprint 220902, [!357](https://github.com/TeskaLabs/asab-webui/pull/357))

- Fix button link color when state active or focus (INDIGO Sprint 220916, [!360](https://github.com/TeskaLabs/asab-webui/pull/360))
