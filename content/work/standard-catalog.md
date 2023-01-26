---
title: "Standard Catalog"
description: "A complete redesign of the college registration experience."
# The name of the file is used to generate the pretty link

# Relative path inside "public" folder
previewImage: "/static/work/preview/standard-catalog-preview.png"
coverImage: "/static/work/standard-catalog/title.png"

tags:
- Featured
- UI/UX Design

order: 0

date: September 25, 2022
---

Standard Catalog is a redesign of the college registration experience.

# Issue #1: Providing Context

![Screenshots of the system used by the college I go to. Left side is the registration page, right side contains the course catalog.](/static/work/standard-catalog/old-design.png)

In the current system used by my university, class information is separated from the registration page. This adds friction to the registration flow if users want to see information about a class.

Students also tend to go to outside sources, such as Rate My Professors, to get a better sense of their instructor. In some cases, this data can be misleading or inaccurate; however, no better data source exists for the student.

![Sketch of the class page, including registration info, description, and buttons.](/static/work/standard-catalog/class-page-sketches-1.png)
![Sketch #2 of the class page, including the number of credits and the prerequisites.](/static/work/standard-catalog/class-page-sketches-2.png)

<div class="collapseOnMobile" style="
  width: 100%; display: flex; flex-direction: row; align-items: flex-start; gap: 16px
">
  <img alt="CS 361: Student study the foundations of humancomputer interaction and user experience design. This class covers topics such as designing for usability, multi-model interfaces, and the UX design process. Theory will be put into practice with several projects throughout the semester, which involve the design and development of user interfaces on mobile devices." src="/static/work/standard-catalog/class-page-1.png">
  <img alt="CS 361: Credits - 3, Prerequisites - CS 102 (completed)" src="/static/work/standard-catalog/class-page-prerequisites.png">
</div>

<div class="collapseOnMobile" style="
  width: 100%; display: flex; flex-direction: row; align-items: flex-start; gap: 16px
">
  <img alt="PHIL 101: An introduction to approaches and issues in fundamental areas of philosophy such as ethics, political philosophy, philosophy of religion, and metaphysics. As part of the course, students explore how philosophy can help to shape and to justify personal values." src="/static/work/standard-catalog/class-page-3.png">
  <img alt="GD 313: Introduces the major epochs in the history of graphic design. Explores how visual communication was designed to fit the needs of pre-modern societies and how it responded to shifting contexts and new technological inventions at three critical moments: the invention of the printing press, the industrial revolution, and the digital revolution." src="/static/work/standard-catalog/class-page-4.png">
</div>

Initial sketches indicated some of the page requirements, such as the ability to view credits, class description, and prerequisites. Also indicated is the ability to view registration information from the same page, such as time, location and instructor.

On this page, users can preview the class before they register, as well as view the completion status of prerequisites. This provides better context to the user and makes them do less work to find this information.

<div class="collapseOnMobile" style="
  width: 100%; display: flex; flex-direction: row; align-items: flex-start; gap: 16px
">
  <img alt="Screen showing registration options for a class." src="/static/work/standard-catalog/class-page-registration-flow-1.png">
  <img alt="Screen showing the app in a loading state when registering for a class." src="/static/work/standard-catalog/class-page-registration-flow-2.png">
  <img alt="Screen showing a notification for a class registration." src="/static/work/standard-catalog/class-page-registration-flow-3.png">
</div>

<div class="collapseOnMobile" style="
  width: 100%; display: flex; flex-direction: row; align-items: flex-start; gap: 16px
">
  <img alt="Screen showing registration information for a class." src="/static/work/standard-catalog/class-page-professor-1.png">
  <img alt="Overlay showing information about a professor." src="/static/work/standard-catalog/class-page-professor-2.png">
</div>

![Web page showing class information.](/static/work/standard-catalog/class-information-web-2.png)
![Web page showing registration times.](/static/work/standard-catalog/class-information-web-1.png)

![Wireframe of the user feedback flow.](/static/work/standard-catalog/user-feedback-flow-1.png)
![Flowchart of the user feedback flow.](/static/work/standard-catalog/user-feedback-flow-2.png)

After registering for a class, section-specific information like location, time, and instructor are displayed on the same page as before.

Users can view more information about a professor, including a short biography, contact information links, and a consensus of other students’ feedback on the professor.

To generate overall professor consensus, a feedback form like this is presented to each user after each term. This ensures that only those who took a professor’s class can rate the professor, and reduces potential bias by limiting the amount of information collected and displayed.

# Issue #2: Planning the Long Term

![Two screenshots stitched together, showing the Program Evaluation page for my school.](/static/work/standard-catalog/old-design-program-eval.png)

![Condensed view of all the sections, with my annotations.](/static/work/standard-catalog/IMG_C7FDFAAEDC83-1.jpeg)

The current system presents too much information at once, and doesn’t clearly distinguish between different types of information. The single point size of the text, and the added spacing between related elements, makes it difficult for a student to understand important information.

There are an excessive number of sections, including similarly named ones that can cause confusion for the user. For example, the last two sections both contain requirements related to Computer Science, so how am I supposed to know which requirements are under which section?

In my design, I aimed to limit the information presented to the user, and improved the spacing so related elements are closer to each other. I also cut down on the number of sections, so the user is guaranteed to find the information they need.

![Graduation requirement sketches.png](/static/work/standard-catalog/graduation-requirement-sketches.png)

<div class="collapseOnMobile" style="
  width: 100%; display: flex; flex-direction: row; align-items: flex-start; gap: 16px
">
  <img alt="Frame #1 showing the graduation page." src="/static/work/standard-catalog/graduation-1.png">
  <img alt="Frame #2 showing the graduation page." src="/static/work/standard-catalog/graduation-2.png">
</div>

<div class="collapseOnMobile" style="
  width: 100%; display: flex; flex-direction: row; align-items: flex-start; gap: 16px
">
  <img alt="Frame #3 showing the graduation page." src="/static/work/standard-catalog/graduation-3.png">
  <img alt="Frame #4 showing the graduation page." src="/static/work/standard-catalog/graduation-4.png">
</div>

In my initial sketches, graduation requirements were integrated with the class bookmarks page. I soon moved the content to its own page because of the amount of content displayed.

With my design, I improved the grouping of related information, and used visual elements like the progress bar to better visualize information. I also removed the toggling of information, so no information is hidden from the user.

# Issue #3: Schedule Viewing

After class registration, there’s an opportunity for the app to become a hub of information students can refer to. The app can be used to check class times and locations, find their professor’s contact information, or look up graduation requirements.

Keeping this in mind, I designed a schedule page, to accommodate the user’s need to see class times for all of their classes.

<div class="collapseOnMobile" style="
  width: 100%; display: flex; flex-direction: row; align-items: flex-start; gap: 16px
">
	<img alt="Screen showing a person's class schedule." src="/static/work/standard-catalog/schedule-page-flow-1.png">
	<img alt="Screen showing different semester options in the schedule." src="/static/work/standard-catalog/schedule-page-flow-2.png">
</div>

<div class="collapseOnMobile" style="
  width: 100%; display: flex; flex-direction: row; align-items: flex-start; gap: 16px
">
	<img alt="Screen showing the editing mode for the class schedule." src="/static/work/standard-catalog/schedule-page-flow-3.png">
	<img alt="Screen showing a person's saved classes." src="/static/work/standard-catalog/schedule-page-flow-4.png">
</div>

# Issue #4: Existing Technology Stack

To better accommodate existing systems, I designed the sign-in flow around a school’s single-sign-on (SSO) platform. This eliminates the need to design traditional account management flows, such as a sign-up form.

<div class="collapseOnMobile" style="
  width: 100%; display: flex; flex-direction: row; align-items: flex-start; gap: 16px
">
	<img alt="Screen showing the sign-in page, with a button to search for schools." src="/static/work/standard-catalog/login-flow-mobile-1.png">
	<img alt="Screen showing the selected school on the sign-in page." src="/static/work/standard-catalog/login-flow-mobile-3.png">
</div>

<div class="collapseOnMobile" style="
  width: 100%; display: flex; flex-direction: row; align-items: flex-start; gap: 16px
">
	<img alt="Overlay showing different school options and a search bar." src="/static/work/standard-catalog/login-flow-mobile-2.png">
	<img alt="Placeholder overlay for a webview." src="/static/work/standard-catalog/login-flow-mobile-4.png">
</div>

![Sign-in screen on the web.](/static/work/standard-catalog/authentication-web-1.png)
!["Redirecting" message and loading state for the sign-in screen.](/static/work/standard-catalog/authentication-web-2.png)

# Custom Icons

![Custom icons used for the project.](/static/work/standard-catalog/custom-icons.png)

For this project, I created a custom icon set designed to match the final prototype.

# Attributions

*All digital sketches were created using Excalidraw. The final prototype was designed using Figma, and the typeface used is Greycliff CF. All icons were designed using Figma.*

Image credits, in order presented:
- [UX Indonesia on Unsplash](https://unsplash.com/photos/qC2n6RQU4Vw)
- [Florian Olivo on Unsplash](https://unsplash.com/photos/4hbJ-eymZ1o)
- [Rey Seven on Unsplash](https://unsplash.com/photos/_nm_mZ4Cs2I)
- [Kelly Sikkema on Unsplash](https://unsplash.com/photos/IkHwu5xLXxs)