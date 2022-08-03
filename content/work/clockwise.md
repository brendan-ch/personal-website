---
title: "Clockwise"
description: "A Pomodoro timer designed to help you focus."

# Relative paths within "attachments" folder
previewImage: "/static/work/preview/clockwise-preview.png"

tags:
- Featured
- UI/UX Design
- App Development

order: 0
imageAspectRatio: "2 / 1"
---

![Screenshot of the app.](/static/work/clockwise/clockwise-0.png)

A Pomodoro timer designed to help you focus.

**Try it out**:

[Web →](https://clockwise.sh)

[App Store →](https://apps.apple.com/us/app/clockwise-pomodoro-timer/id1610821428)

[Google Play →](https://play.google.com/store/apps/details?id=co.birb.session)

---

**Additional links**:

[GitHub →](https://github.com/brendan-ch/clockwise)

[What’s New →](http://bchen.dev/doc/clockwise-whats-new)

---

**Designed using**: Figma

**Coding stack**: TypeScript, React Native, Expo

# Design Philosophy
The [Pomodoro technique](https://en.wikipedia.org/wiki/Pomodoro_Technique) is a time-management technique with the goal of helping people extract the most out of their time, by reducing the number of interruptions and promoting a sense of flow. With Clockwise, my goal was to build a timer that helped maximize this sense of flow (hence the tagline “an app designed to help you focus”).

Some of my guidelines/feature requirements:

## **Minimal distractions in the interface, especially when the timer is running**

To help users achieve a maximum sense of flow, there needs to be a minimal amount of distractions coming from the interface itself. This is why, for example, the page header and footer fade out while the timer is running.

## **No assumptions about the user’s current workflow**

Clockwise is designed to fit into a person’s existing workflow, rather than acting as the centerpiece. This meant eliminating extra features such as a productivity report screen. While these features work great in other apps, it’s not part of the philosophy that I have with Clockwise.

## **Full support for keyboard shortcuts on web**

Admittedly, this feature targets a niche audience group, but keyboard shortcuts fit in with helping to establish the “maximum sense of flow” that Clockwise tries to help users accomplish.