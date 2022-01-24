---
title: Engineering: week of 16th-22nd January 2022
author: ernesto
date: "2022-01-24T04:00:00.000Z"
description: Need for Speed.
---

This week we set out to improve performance in the home feed, explore feed and notifications inbox. I was looking to reduce latency on these API endpoints by ~80%. We not only hit that mark but we crushed it, reducing it by ~95% for the biggest feeds on Hunchat.
We also intended to improve analytics so we could better understand our users. I didn't hit the goal to extend it to all relevant user activity throughout the app, only onboarding has been fully completed.

## Talking points

- Cool, but what have you done the whole week?
- Main learnings
- To do next week

## Cool, but what have you done the whole week?

This week's focus was performance. I have been wanting to improve performance in the feeds for a few weeks now, it really bugged me having to wait seconds for the home feed to load every time I opened the app. I had attempted to reduce latency a couple of months ago by normalizing the response data, avoiding duplicate data to be serialized.

The idea is to normalize object data to avoid having duplicate data in the response.

Currently, the home feed endpoint returns something like

```
{
  "results": [
    {
      "id": "dl2k6y2",
      "author": {
        "id": "gisiy3h",
        "username": "ernesto"
      },
      "description": "Writing the week recap"
      "video": "https://example.com"
    },
    {
      "id": "lwi6h2h",
      "author": {
        "id": "alflh63",
        "username": "jose"
      },
      "description": "I like your beanie, @ernesto"
      "video": "https://example.com"
    },
    {
      "id": "akf2858g",
      "author": {
        "id": "gisiy3h",
        "username": "ernesto"
      },
      "description": "Bought a new beanie"
      "video": "https://example.com"
    }
  ]
}

```

This means that for each post authored by `ernesto`, the `ernesto` user instance will be serialized. No matter if it was already serialized.

For a normalized response you'd get

```
{
  "results": [
    {
      "id": "dl2k6y2",
      "author": "gisiy3h",
      "description": "Writing the week recap"
      "video": "https://example.com"
    },
    {
      "id": "akf2858g",
      "author": "gisiy3h",
      "description": "Bought a new bennie"
      "video": "https://example.com"
    }
  ],
  "authors": {
    "gisiy3h": {
      "id": "gisiy3h",
      "username": "ernesto"
    },
    "alflh63": {
      "id": "alflh63",
      "username": "jose"
    }
  }
}

```

This way each author's user instance is only serialized once. For a small feed there is little difference in latency, but for 50 post feeds you could get a 20% latency reduction if an author is repeated multiple times.

This proved to be a hard task, because we depended on a lot of nested serializers and hashid conversion, meaning getting from our current nested response to a normalized response would require a lot of refactoring on our serializers. There had to be another way. I kept looking.

Now, if there were a way to reduce the number of posts per feed, serialization wouldn't be a burden. I remembered applying pagination was quite easy in Django Rest Framework from a previous project, so I gave that a try. I applied cursor pagination for 10-posts pages to my development environment and managed to reduce latency by 98% in a feed with 40k posts — I wanted to exaggerate the size to see the effects clearly.

![Home feed before pagination](./before-pagination.mp4)
_Home feed before pagination_

![Home feed after pagination](./after-pagination.mp4)
_Home feed after pagination_

Once I did this for the home feed it was a matter of replicating it for the explore feed and notifications inbox.

Throughout the week a few bugs emerged:

- Submitting a post during the same session as sign in or sign up would result in a "Hunch failed" message.
- Blocking users was not working
- Submitting name during onboarding flow showed "No internet connection" message.

The last two were fixed under couple of hours of discovery. The bug with post submission was easy to determine the cause, but it took me a few hours to fix.

We also had to change some aspects of the app to comply with the Apple submission process, so I was busy with that.

For the end of the week, I intended to increase analytics reach to the whole app and all relevant user actions. I failed to achieve this goal, since only onboarding was completed. Will finish the rest on Monday.

## Main learnings

This week we learned that _performance improvements are not about technical challenges_. I started to look at serialization to improve performance on the feeds, but it the solution ended up being a much simpler and obvious one: pagination. I'll make sure to remember this one.

## To do next week

Next week, we're going to start by finishing the analytics task on Monday. The rest of the week will be for app making the app _feel_ better. By this I mean fixing layouts on all device sizes to follow our designers guidelines to the letter, reducing video buffer by prefetching media, reduce frame drops during scrolling on multiple screens and, of course, apply pagination to the profile feed.

That's it for this week's recap. See you next week.
