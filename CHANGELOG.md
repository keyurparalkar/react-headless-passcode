# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.0.0](https://github.com/keyurparalkar/react-headless-passcode/compare/v0.1.5...v1.0.0) (2023-10-07)


### Bug Fixes

* added paste event listener to the current focused input rather than document, to resolve pasting issues ([c125243](https://github.com/keyurparalkar/react-headless-passcode/commits/c12524395c8e504c8bd7a99b42db119cd201882e))
* array update logic while pasting value from index other than 0 ([d176ac1](https://github.com/keyurparalkar/react-headless-passcode/commits/d176ac1660be7b950934eb0f3ab42df34d0e4f36))
* moved the pasting logic from useEffect to onPaste event ([ee1bf89](https://github.com/keyurparalkar/react-headless-passcode/commits/ee1bf89dcd2bd44b3f26c4982d31dc85ebae22f7))
* pass no. of inputs to the hook instead of an array ([173de5e](https://github.com/keyurparalkar/react-headless-passcode/commits/173de5e556cdcf5520a388f8af368081acfc064f))
* remove depricated usage of which keyboard property and replaced with key property ([ed4d231](https://github.com/keyurparalkar/react-headless-passcode/commits/ed4d231b272467dda1cf665448ab08b3ec4a7752))
* remove event listner from the document instead of window object ([24b56ea](https://github.com/keyurparalkar/react-headless-passcode/commits/24b56ea791341844379b66837ba045d7638e4319))
* renamed currentFocusedIndex ([8b628f2](https://github.com/keyurparalkar/react-headless-passcode/commits/8b628f27f426b6b82fc7e028dc58ca97e4adc518))
* updated noOfInputs prop name to count ([b1bb825](https://github.com/keyurparalkar/react-headless-passcode/commits/b1bb825324e6444231ee4558f1b66b2251db9bbd))
