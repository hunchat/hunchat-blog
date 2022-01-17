---
title: Engineering: week of 9th-15th January 2022
author: ernesto
date: "2022-01-17T02:00:00.000Z"
description: Must. Kill. Bugs.
---

Paraphrasing React Native celeb William Candillon: hello from beautiful Lisbon, Portugal. I'm starting this week recap with one word: wow! We started the week with 16 detected bugs and ended it with zero. This may look normal to most folks, but the severity and complexity of this bugs would have required at least 10 days to tackle them before the modularization.

## Talking points

- Cool, but what have you done the whole week?
- Main learnings
- To do next week

## Cool, but what have you done the whole week?

As I said, we started the week with 16 detected bugs:

1. Videos on hunch screen don't play on first visit
2. Profile links are unresponsive
3. Share button in thread is unresponsive
4. Share button in profile is unresponsive
5. Can't navigate to profile posts
6. Hunch submit is unresponsive and videos don't upload
7. Layout in thread actions is broken
8. Video preview in submit screen is showing previously recorded hunch
9. Finishing recording on hunch back does not trigger navigation to submit screen
10. App crashes on click on profile link without protocol
11. Videos in thread keep playing after navigating to next screen
12. Crash in signup
13. Like on post screen is not registered
14. Multiple videos playing simultaneously in explore posts feed
15. Author data not displayed in post replies screen
16. Incorrect layout for posts in home feed

The vast majority of these bugs were fixed by Tuesday. Now, 6., 8., 9. and 16. were only fixed between Thursday and Friday. 6., 8. and 9. were all related to video submission and required careful attention because they involved uploading the videos to the storage bucket, resuming interrupted transfers when the app had previously been suspended or force-closed. It's quite fun to tackle these situations. 16. was only fixed later because the my attention was on post submission, but it was a quite simple fix. Took some experimentation, but simple nonetheless.

I haven't looked on how to get percentage of crashes on sessions, but I can say that we've decreased them by A LOT.

Anyways, I fixed the bugs so quickly that I got half of Friday and the whole weekend to work on some performance improvements on post submission and notifications screen.

## Main learnings

This week we learned _you can't improve what you don't measure_. I've gotten way more disciplined on exposing our products flaws. I'm talking performance, crashes, UX/UI bugs. Sentry and GitHub issues are now my place to be. Hungry for bugs! Finding bugs becomes inevitable and I can even see where we should invest to improve performance. For weeks I've been wanting to improve performance and now I know what to do.

## To do next week

I'll title next week's recap _Need for Speed_. I'm going to be focusing on performance in the home feed, explore feed and notifications inbox. This means I'll have to go al the way on the API and bring API latency down by 80% on the respective endpoints. I'll include a technical report on the results, want to go all nerdy on this one. This will take probably up to Friday, so during the weekend I'll improve our analytics. Up until now we gather basic info like screen visits and posts submitted, last session, etc. But you now, as we roll out Hunchat to more and more schools we want to make sure we have enough data to understand what's up. Numbers help you understand users on a different dimension. Plus it'll be a chance to go back to my Physics days and get those pandas working.

That's it for this blog entry. Let me know if you want to know more. You know [where to find me](https://app.hunchat.com/u/ernesto)
