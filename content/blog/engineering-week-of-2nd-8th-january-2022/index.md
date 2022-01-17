---
title: Engineering: week of 2nd-8th January 2022
author: ernesto
date: "2022-01-11T05:00:00.000Z"
description: Modularization for the win.
---

It's 5 am in Lisbon and I just released the first build with fully [modularized architecture](https://www.pointfree.co/collections/composable-architecture/modularity) of the Hunchat iOS app to TestFlight. I had initially expected it to take me around two weeks – it took me 40 days.

## Talking points

- Cool, but what have you done the whole week?
- Main learnings
- To do next week

## Cool, but what have you done the whole week?

This week has been one of the most intense weeks at Hunchat since we started coding the first lines in JavaScript still in February 2020. Over a month ago we submitted our app to the App Store once again only to have it rejected for:

1. the user blocking/muting feature was not working
2. the camera, contacts and notifications permissions should be optional.

The first point had been a consequence of the bad programming habits I had been accumulating for weeks: code was becoming rigid, hard to unit test and even debug. This meant that bugs were hard to detect in development and harder to fix after discovered.

We decided to modularize the whole codebase into individual independent modules that could be easily unit tested and debugged. **This week we've finished this modularization process**. Just to give you an idea, just 30 min before writing this post I was finishing the notifications feature and found three huge bugs that would've taken us between 3 and 7 hours to fix a month ago. We fixed them all in 20 min.

More specifically, this week we

- rebuilt post feature
- rebuilt profile feature
- rebuilt notifications feature
- integrated all individual feature modules into the app module and finally submitted to TestFlight

## Main learnings

The main lesson learned this week is: _pick your battles_. Hunchat engineering is still a team of one ([we're hiring](https://hunchat-hiring.notion.site/hunchat-hiring/Jobs-Hunchat-0bb61115af344fbea132332546807f79)), so you can imagine that rebuilding the whole app was not an easy task. It was the right decision because we can now finally guarantee fast af reaction times on detected bugs and performance improvements to make Hunchat go vroom vroom. We looked at what was our biggest weakness — slow reaction times and product iterations — and did what it took to make it disappear.

## To do next week

We're faster, but hell... we want even faster! This new release is certainly coming with bugs, you can't avoid it. 92% of the code base has changed in the past few weeks. We want to find them as quick as possible and have them all fixed by the end of the week, and push a new release to external users with the new architecture and no detected bugs.
