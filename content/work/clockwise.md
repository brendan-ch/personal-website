---
title: "Clockwise"
description: "A Pomodoro timer designed to help you focus."

# Relative paths within "attachments" folder
previewImage: "/static/work/preview/clockwise-preview.png"

tags:
- Featured
- UI/UX Design
- App Development

order: 1

logo: "/static/work/clockwise/Logo.png"

links:
- name: Web app
  url: https://clockwise.bchen.dev
- name: GitHub
  url: https://github.com/brendan-ch/clockwise
# - name: App Store
#   url: https://apps.apple.com/us/app/clockwise-pomodoro-timer/id1610821428
# - name: Google Play
#   url: https://play.google.com/store/apps/details?id=co.birb.session

date: October 2021 - January 2023
---

Clockwise is a Pomodoro timer designed to help you focus.

# UI Design

<div class="collapseOnMobile" style="
  width: 100%; display: flex; flex-direction: row; align-items: flex-start; gap: 16px
">
  <img alt="Frame containing the focus view." src="/static/work/clockwise/ui-design-1.png">
  <img alt="Frame containing a selected task in the focus view." src="/static/work/clockwise/ui-design-2.png">
</div>

<div class="collapseOnMobile" style="
  width: 100%; display: flex; flex-direction: row; align-items: flex-start; gap: 16px
">
  <img alt="Frame showing a paused view." src="/static/work/clockwise/ui-design-3.png">
  <img alt="Frame showing the break view." src="/static/work/clockwise/ui-design-4.png">
</div>

I started with some low-fidelity sketches of the timer, and turned them into a high-fidelity prototype in Figma.

*The typeface used is Anonymous Pro.*

![Frame #1 showing the UI fading when the timer is running.](/static/work/clockwise/fade-1.png)
![Frame #2 showing the UI fading when the timer is running.](/static/work/clockwise/fade-2.png)

As part of adding a minimal amount of distraction to the user's workflow, the rest of the app fades out when the timer is running.

# Mobile App Development

![Minimal Interface banner](/static/work/clockwise/minimal-interface.png)

![Timer customization banner](/static/work/clockwise/timer-customization.png)

The mobile app was developed using [React Native with Expo](https://expo.dev). Features of the app include a minimal interface, timer customization, dark mode, and automatic switching between focus and break modes.

Unfortunately, in late January 2023 I made the difficult decision to stop supporting the mobile app, and it is currently not available for download from app stores. Due to college, I didn't have the time needed to work on the app and ensure that it was the best experience for users. I thank everyone who has downloaded the app for supporting the project, and the project will remain up on [GitHub](https://github.com/brendan-ch/clockwise) for others to fork.

# Web App Development

![Screenshot showcasing the web app.](/static/work/clockwise/web-app-1.png)
![Screenshot showcasing the web app.](/static/work/clockwise/web-app-2.png)

The web app was developed using React Native Web, starting from the same codebase as the mobile app. Additionally, the web app supports keyboard shortcuts for every possible action, and displays background images retrieved from Unsplash.

Both the web and mobile apps were developed over a 3-month period, with a stream of new features and improvements added post-launch.