# Issues fixed

##### 1. App is not building on iOS.

Error : Unable to run on iOS - We ran "xcodebuild" command but it exited with error code 65. 
[!] Unable to find a target named `MMRNInterview-tvOS` in project `MMRNInterview.xcodeproj`, did find `MMRNInterview` and `MMRNInterviewTests`.
* disabled MMRNInterview-tvOS in podfile 
* pod deintegrate 
* delete podfile.lock 
* pod install

* build succeeded in XCode


##### 2. Yellow box Warning : Each child in a list should have a unique key prop - Check the render method of Start

* renamed generate.js to generate.ts
* added   const uniqueKey = movie?.id ?? movie.name; in Start.tsx


#### 3. RENDER MOVIE undefined
* 20 movies for 25 rendering -> 5 are undefined in the movies array
* This can be fixed by changing  const movies: Array<Movie> = generateMovies(20, 5);
in SplashScreen.tsx
* However, I implemented a guard check and safe length logic in the generate function

#### 4. Slow loading of images 

#### 5. Left console logs in code 
* cleaned

