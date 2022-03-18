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
