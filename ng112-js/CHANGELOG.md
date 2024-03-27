# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased - [2.0.0]
### Changed
- **BREAKING**: `JsSIP` is no longer a direct dependency, because SIP handling is now handled via SIP adapters. \
You can choose now which SIP library to use in combination with ng112-js. For this reason a new property `sipAdapterFactory` has been introduced on `Agent`. \
You need to pass a factory function that returns an appropriate SIP adapter. \
Examples and pre-existing adapter packages can be found in `README.md` or at `./example/snippets/`.
- **BREAKING**: Messages are instances of class `Message`. This allows for more performant parsing of data. Setting and getting of properties has changed, so have a look at the docs to notice all changes. \
Some of the new features:
  * Resending of local messages that have run into an error
  * Support for `html` data
  * Lazy evalutation of `text`, `html`, `location`, `vcard` ...
- **BREAKING**: New object for message send errors: `MessageError` instead of former object `MessageFailedEvent` \
Object has different properties and also includes the raw SIP error generated by the sip stack.
- **BREAKING**: `DEC112Specifics` constructor uses object `DEC112Config` instead of individual parameters for initialization.
- **BREAKING**: Updating `Agent`'s heartbeat interval with invalid values will not result in an exception, but will rather log an error message.
- **BREAKING**: `Agent`'s `debug` is now an object. This way, separate log-levels and handlers for in-library log messages and log messages created by the SIP adapter can be specified.
- **BREAKING**: `NamespacedConversation` has been renamed to `Mapper`. Instance method `getName` has been renamed to `getNamespace` and now returns `enum` `Namespace` instead of a `string`. This in combination with the agent's new function `getMapper` lets you identify the used mapper of a conversation and opens the ability to resume conversations (e.g. after a PSAP breakdown) with the correct mapper.
- **BREAKING**: Agent disposal can be configured by disposal object instead of grace period alone. Also open conversations will not be closed automatically on dispose. Property `stopOpenConversations` needs to be set to `true` to stop all open conversations.
- **BREAKING**: `ConversationState` (`enum` value) now uses `string` instead of `integer` values. If you've already used the `enum` values for distinguishing states you don't need to change your implementation. Only if you've used `integer` values e.g. for comparison, you'll have to change your implementation.
- **BREAKING**: Outgoing messages are rejected immediately once the conversation has stopped.
- Internal states are now handled by state machine `@xstate/fsm` which is now a dependency of ng112-js. This gives us more reliable and testable state management.
- Improved build process, enabling better tree shaking for dependency `pidf-lo`.
- Conversations in DEC112 environments are only started after an initial message sent by the PSAP.
- A second parameter is passed to conversation listeners that contains the raw SIP event.
- Conversations can be set from the agent. This allows PSAP environments to easily restore conversations that have not ended yet.
- Target URI for conversations can now be set from the outside even after the conversation was started.
- `debug` will now also accept a callback function that is called for all log messages. \
This allows for the connection of any other logging facility.
### Added
- Agent mode that can be used to indicate an app is running in the background.
- Support for sending `Message` specific VCards and locations instead of being tied to the global `Agent`'s VCard and location.
- Support for DIDs.
- Support for parsing extra multiparts.
- Support for History-Info header.
- Support platforms without support for `globalThis`.
- Support for accessing raw SIP events. This enables accepting or rejecting the SIP message and allows for direct access of SIP headers. \
Rejecting the initial message of a conversation leads to the conversation being set closed automatically.
- Support for sending custom SIP headers.
- Support for tagging messages.
- Support for starting a conversation with a custom message id.
- Support for customizing domains in SIP headers via `EmergencySpecifics`.
- Support for gender identity in VCards.
- Support for retreiving last sent message id from conversation. This allows for easier conversation restore.
- Ability to remove listeners (conversation, state, message).
- Ability to specify endpoint type for agent and each individual conversation.
- Ability to specify custom user agent headers.
- Ability to override agent's default display name at `Conversation` level.
- Interfaces for easily fetching SIP information like TO, FROM and ROUTE headers.
- *Experimental support* for binaries.
- *Experimental support* for dequeue registration on top of SIP subscribe/notify.
### Fixed
- Conversation state only changes if the state value itself changes. If origin is different but state is the same, it won't trigger a state change.
- Message start logic in PSAP environments.
- VCard firstname and lastname. They were switched without being noticed by anyone, oops :-)
- Fixed typo for language property in DEC112 Mapper.
- START message can now only be sent once.
- Correct parsing of SIP Reply-To header (especially if they contain a NameAddressHeader)

---

## [1.9.2] - 2023-04-25
### Fixed
- Sending duplicate start messages if endpoint type is CLIENT

## [1.9.1] - 2022-03-12
### Fixed
- User agent string representation

## [1.9.0] - 2022-03-12
### Added
- Ability to customize SIP user agent

## [1.8.2] - 2022-03-05
### Fixed
- VCard firstname and lastname. They were switched without being noticed by anyone, oops :-)

## [1.8.1] - 2022-02-15
### Fixed
- Missing export for `Header`

## [1.8.0] - 2022-02-14
### Added
- Support for custom SIP headers

## [1.7.0] - 2022-01-24
### Added
- Possibility to further configure JsSIP user agent

## [1.6.0] - 2022-01-19
### Added
- BACKPORT [2.0.0]: Support for gender identity element in VCards

## [1.5.2] - 2021-11-29
### Changed
- Updated dependencies (pidf-lo, typedoc ...)
- Package `xmldom` was outdated. Changed it to `@xmldom/xmldom`.

## [1.5.1] - 2021-11-29
### Fixed
- BACKPORT [2.0.0]: Handling of missing remote message ids.
- BACKPORT [2.0.0]: Conversation state on immediate stop.
- BACKPORT [2.0.0]: Conversation start handling in DEC112 environments.

## [1.5.0] - 2021-11-26
### Added
- BACKPORT [2.0.0]: Support for removal of message listeners.
- BACKPORT [2.0.0]: Support for integration tests.
### Fixed
- BACKPORT [2.0.0]: State handling for conversations.

## [1.4.1] - 2021-11-26
### Fixed
- Handling of conversations that are in error state

## [1.4.0] - 2021-11-23
### Fixed
- Restore of conversations. A proper restore now also contains the previously used message id.
- Better example snippet for converation restore.

## [1.3.0] - 2021-11-22
### Fixed
- Removed @types/jssip and fixed JsSIP type errors.

## [1.2.1] - 2021-06-03
### Added:
- Logging for heartbeat messages.
 
## [1.2.0] - 2021-05-29
### Added:
- BACKPORT [2.0.0]: Support for History-Info header.

## [1.1.0] - 2021-05-07
### Changed
- Fixed behaviour for incoming conversations, if no conversation listeners are registered. \
These incoming SIP messages will be dropped as they could lead to unexpected agent states, where a conversation is opened that was not expected.
### Added
- Missing export for `LogLevel`
- Boolean as possible value for `Agent`'s `debug` property for specifying verbose logging

## [1.0.0] - 2021-05-05
### Changed
- **BREAKING**: Renamed property `debugMode` to `debug` in `Agent` constructor. \
`debug` will now also accept a callback function that is called for all log messages. \
This allows for the connection of any other logging facility.
- **BREAKING**: Unified `Conversation`'s `start`, `stop` and `sendMessage` function. \
All of these functions now use the same arguments as `sendMessage` already did. \
This allows for the use of `extraParts`, `uris` and other properties for `start` and `stop` function calls.
- **BREAKING**: The agent's `conversation` property contains only calls that are not in state `STOPPED`. \
Once calls are stopped they are removed from this list. \
This should limit memory consumption if ng112-js is used in long running applications with heavy load.

### Added
- Property `uniqueId` in messages that is unique across all messages and conversations within ng112-js
- Auto-close of open calls on agent disposal
- Configurable grace period for agent disposal
- More detailled logging on message errors.
- More extensive VCard tests

---

## [0.11.21] - 2021-04-24
### Added
- Missing export for `AgentState`

## [0.11.19] - 2021-04-19
### Added
- JsSIP version in UserAgent string
- Expose package version

## [0.11.18] - 2021-04-18
### Fixed
- Fixed heartbeat for continued conversations

## [0.11.17] - 2021-04-18
### Fixed
- Unfixed version for JsSIP. Bug with Expo was fixed in version 3.7.3

## [0.11.16] - 2021-04-17
### Fixed
- DEC112 language header

## [0.11.15] - 2021-04-16
### Added
- TypeDoc for VCard helper methods
- TypeDoc for DEC112Specifics
- Handling of unknown VCard elements
- Updated README

## [0.11.14] - 2021-04-02
### Added
- Ability to send custom MIME parts

## [0.11.13] - 2021-04-02
### Fixed
- VCard's XML implementation. DOM standard (used by `xmldom`) uses only supports `childNodes` not `children`

## [0.11.12] - 2021-04-01
### Added
- Note in VCards

## [0.11.11] - 2021-03-30
### Fixed
- Typo in agent's `setHeartbeatInterval`

## [0.11.10] - 2021-03-29
### Fixed
- Heartbeat can also be enabled/disabled/updated while a conversation is already ongoing

## [0.11.9] - 2021-03-29
### Changed
- Less restrictive heartbeat interval settings
### Added
- Ability to call `setHeartbeatInterval` without parameter, thus resetting it to the default value

## [0.11.8] - 2021-03-18
### Fixed
- Fixed jssip version to 3.5.11. This is due to an incompatibility of JsSIP 3.7.3 with Expo.

## [0.11.7] - 2021-03-17
### Changed
- Only send location updates if they are really updated on DEC112 environments
### Fixed
- Correct multipart message if no multiparts are available

## [0.11.6] - 2021-03-17
### Fixed
- More resilient handling of invalid SimpleLocations

## [0.11.5] - 2021-03-16
### Changed
- Always send location updates on DEC112 environments
### Added
- Optionally load jssip-node-websocket, if available, on node environments
### Fixed
- Send empty multipart body if no changes to location or VCard happened and if text and URIs are empty

## [0.11.4] - 2021-03-16
### Added
- Export for `MessageState`

## [0.11.3] - 2021-03-16
### Fixed
- Included `jssip-node-websocket` as peer dependency and re-enabled differentiation for websocket implementation (node vs. browser)

## [0.11.2] - 2021-03-15
### Fixed
- Unhandled promise error while messages with invalid location or VCard

## [0.11.1] - 2021-03-15
### Fixed
- JsSIP version in user agent 

## [0.11.0] - 2021-03-15
### Removed
- Legacy PIDF-LO support for DEC112 environments
### Changed
- BREAKING CHANGE: MessageOrigin renamed to Origin
- BREAKING CHANGE: Conversation state is reflected by a new object rather than `ConversationState` alone (introduces new interface `StateObject`)
- Empty text message is sent in Multipart MIME body if no other part is specified
### Added
- Agent states and listener for agent states
- Message states
- Origin to conversation states
- Support for remote display name
- Support for only sending updated location or VCard information
- Custom ng112-js user agent
### Fixed
- Agent disposal
- Heartbeats stopping a conversation