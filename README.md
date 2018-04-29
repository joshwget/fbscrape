# socialnetwork.js

A simple library that allows for programmatic interactions with your Facebook feed. For now only a small subset of post features are supported.

To try it out copy and paste into your developer console and call `getPosts()`. You'll see an array of items that looks something like the following.

```
{
  "key": "u_ps_0_0_g",
  "poster": {
    "name": "...",
    "pictureUrl": "..."
  },
  "time": "1 hr",
  "recipient": {
    "type": "group",
    "name": "Hackathon Hackers",
    "url": "..."
  },
  "rawText": "...",
  "reactions": {
    "types": [
      "Like"
    ],
    "count": 7
  },
  "commentCount": 1,
  "like": {
    "id": "u_ps_0_0_2g"
  },
  "comment": {
    "id": null
  }
}
```
