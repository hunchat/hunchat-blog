---
title: Migrating from React Native to Swift
author: ernesto
date: "2021-04-13T23:00:00.000Z"
description: Moving from a React Native cross-platform mobile app to a Swift iOS native mobile app
---

Two months ago, when we first started building Hunchat, we decided to build the app in React Native.

[React Native](https://reactnative.dev/) is an open-source mobile application framework that allows you to build cross-platform applications in React's framework along with native platforms capabilities.

Going for React Native seemed as the best approach at the time because of my previous experience with React and the ability to reach a bigger audience by building for both iOS and Android.

Now, since Hunchat is a video-only platform, the app consumes a lot of memory with images and videos. We definitely had our headaches trying to optimize a [`FlatList`](https://reactnative.dev/docs/flatlist) of videos, but the fact that we were depending on React Native to do all the heavy lifting was constraining us, we could only go so far.

After a few days I was already telling myself "React Native is only temporary" and trying to convince myself this was the way to go. After all, in the beginning it's OK to compromise scalability for the ability to ship faster and hit scale.

So we shipped code fast and launched the app. We released it to 10 users from our waiting list. The idea was to get early feedback, discover major bugs and start to have some real fun having conversations on Hunchat. From those 10 users, only 3 later came back to the app. We had two huge problems
- posts took too long to submit
- videos took too long to load.

Now, the first problem is kind of a must-have if you're working with heavy media files (videos have no time limit in Hunchat) but could easily be fixed by streaming the video while recording and allowing the user to use the rest of the app while a progress bar marks the uploading process, the real bummer comes with the second problem. We couldn't compress videos before being uploaded because of the limitations of Expo managed workflow so that wasn't an option, and we were using every optimization recommended for `FlatList` so going native was mandatory. We could go "native" by building a native module and using it in React Native, but we would have to get a Mac first to be able to develop these modules.

In the meantime, we joined the Hook Summer '21  program and one of the first advice they gave us was to focus on one platform. The obvious choice is iOS. We heard this from multiple people, so we took it seriously.

So we decided to rebuild the app in Swift. We're 7 days into coding and hoping to re-launch by the end of the week to 20 users this time -- the previous 10 plus another 10 from the waiting list. Coding in Swift has proven to be really fun, very different from any other programming languages I've ever used. SwiftUI is very straightforward, UIKit is the one giving me the creeps but I'll manage.

We'll see in the next few days the result of this big switch. Stay tuned.
