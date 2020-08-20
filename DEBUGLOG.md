# Issues fixed

##### 1. App is not building on iOS.

Error : Unable to run on iOS - We ran "xcodebuild" command but it exited with error code 65. 
[!] Unable to find a target named `MMRNInterview-tvOS` in project `MMRNInterview.xcodeproj`, did find `MMRNInterview` and `MMRNInterviewTests`.
* disabled MMRNInterview-tvOS in podfile 
* pod deintegrate 
* delete podfile.lock 
* pod install

* build succeeded in XCode
