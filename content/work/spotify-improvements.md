---
title: "Improving the Spotify Mobile Experience"
description: "My ideas for a redesign of Spotify's Listen Together feature."
# The name of the file is used to generate the pretty link

# Relative path inside "public" folder
previewImage: "/static/work/preview/spotify-improvements-preview.png"

tags:
- UI/UX Design

order: 5
---

*In my free time, I work on exercises like this one to build my design thinking and UX skills, push myself out of my comfort zone, and explore new topics. These exercises all have a set prompt and a limited amount of time.*

**Prompt**: Improve the Spotify mobile experience.

**Length**: 4 hours

[View the Wireframe](https://www.figma.com/proto/GKnGZ7kLJsbToPEzIipyUL/Exercise%3A-Improve-the-Spotify-mobile-experience?page-id=0%3A1&node-id=3%3A2&starting-point-node-id=3%3A2) (created with Figma)

# Understanding the Goal

The [goal of Spotify](https://www.spotify.com/us/about-us/contact/) is to make it easy for people to listen to music and podcasts wherever they want to, however they want to.

Spotify has always had an heavy emphasis on social features. This includes the ability to follow other accounts, “like” playlists, and create a “Duo” mix which combines the music tastes of two people. Their yearly “Rewind” feature is highly popular, with users posting their top songs and artists on social media. They even had a [messaging feature](https://routenote.com/blog/spotify-are-getting-rid-of-their-inbox-and-messaging-features/) at one point!

With this in mind, I decided to re-design Spotify’s “Listen Together” feature with the goal of making it more discoverable, more intuitive, and with fewer limitations.

![Screenshot of 2 pages in the wireframe.](/static/work/spotify-improvements/screenshot-1.png)

# Target Audience

It’s fair to assume that an increasing number of teenagers and young adults are spending more time online than previous generations. New forms of entertainment like video games and streaming services have gained traction and facilitate the creation of online communities.

> “As someone who spends a lot of time online, I want an improved experience listening to music with friends online, so that the experience is more enjoyable and I can share my music taste.”

# Impact/Effort Evaluation

Having the “Listen Together” feature will increase the value of Spotify to the user. Many people already use Spotify for the simple reason that their friends use it, and the app’s social features play a big role in ensuring this. Having a “Listen Together” feature would simply be another feature to add to this list.

Like the existing implementation, hosting and joining a room will be a Premium-exclusive feature. For these reasons, implementing the feature will cause an overall increase in revenue. 

# Solution

[View the Wireframe](https://www.figma.com/proto/GKnGZ7kLJsbToPEzIipyUL/Exercise%3A-Improve-the-Spotify-mobile-experience?page-id=0%3A1&node-id=3%3A2&starting-point-node-id=3%3A2) (created with Figma)

For the wireframe, I decided to only focus on the necessary user flows for creating a new session, and joining from a link.

The current Spotify interface starts with a recommendations screen, along with some buttons on the top right. This (being the left-most button) is where I put the button to activate this feature, which I feel makes it discoverable and easy to access. Most users who start a listening session are going to open the app with the intention of doing it right away.

![Screenshot of the recommendations screen, and the listening together overlay.](/static/work/spotify-improvements/screenshot-2.png)

Users should be briefly introduced to the feature, and this overlay also does the job as a "Confirm" pop-up. Having this overlay will increase the user's confidence in the app and motivate them to explore more features of the service. That being said, having to read text sucks, so there should be a muted animation here that plays when the overlay is opened.

![Screenshot of the loading and main pages.](/static/work/spotify-improvements/screenshot-3.png)

There is a brief loading state, during which the app communicates with the servers to start a live session. An animation or loading icon is appropriate here to convey action. Tapping the “Cancel” button brings the user back to the home screen.

Like the current feature implementation, the Listening Session page is a complete replacement for the normal audio player page. The primary reason for putting this page here was to keep consistent with what users were familiar with. Users can control playback, queue new music, manage listeners, and edit session details/options from this page.

This is not included in the wireframe, but there should also be a “Share” button so the host can copy a join link to the session. The other important user flow is the “Join” flow, where users can tap a link to join a current session:

![](/static/work/spotify-improvements/screenshot-4.png)

Like with the modal above, having a confirmation screen like this one will increase the user's confidence and encourage them to take more actions inside the app. Once they’re in the session, they’re then able to control playback and queue songs.

# Success Criteria

With this feature, there are several indicators of success I want to discuss.

To measure reach and retention, Spotify should track how many users try out this feature, and how many users start to actively use it. Desirable actions include creating a session, clicking a link to join a session, inviting friends, and queueing songs.

Task success rate and completion time are two important indicators that the feature is designed correctly. Since this is a redesign of an existing feature, an A/B test would be appropriate to compare these two variables and evaluate which design is better.

One indicator of user acquisition is the number of Premium sign-ups driven by this feature. While not included in the wireframe, there should be a screen or modal blocking the user from accessing the feature if they're not a Premium member. This is an opportunity to present users with a a sign-up page for Premium, and the app can track how many sign-ups came from this feature. Of course, this opportunity will need to rely on Apple's and Google's in-app purchasing systems, as the ability to use third-party systems is currently limited to a few countries.