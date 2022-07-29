---
title: "Self Publishing Co."
description: ""
# The name of the file is used to generate the pretty link

# Relative path inside "public" folder
previewImage: "/static/work/preview/self-publishing-preview.png"
coverImage: ""

tags:
- Featured
- UI/UX Design

order: 2
---

*In my free time, I work on exercises like this one to build my design thinking and UX skills, push myself out of my comfort zone, and explore new topics. These exercises have a set prompt and a limited amount of time.*

**Prompt**: 81% of Americans want to write a book. In fact, 31% of all e-book sales in the Kindle store are of self-published e-books. Design a product for self-publishing a book on Amazon, decreasing the entry barrier to self-publishing.

**Length**: 5 hours

# Understanding the Goal

The end goal of this exercise is to decrease the entry barrier for self-publishing books. One way to achieve this is to increase confidence in new authors, by guiding them and providing valuable knowledge and a set of useful tools. More specifically, I need to address the common pain points of publishing a new book, such as budgeting costs and formatting files correctly.

With this in mind, I created a wireframe of Self Publishing Co, a website that aims to provide comprehensive knowledge on self publishing, in addition to tools that address common pain points.

![Hero image in landing page](/static/work/self-publishing-co/landing-hero.png)

# Who Is This For?

According to the prompt, 81% of Americans want to write a book. Some audience groups include, but are not limited to, working adults, businesspeople, creatives, and bloggers.

It's fair to assume that for most audience groups, being an author is not their main profession. This also means that many of these people don't have the means or time to go through an agent for a traditional publisher. Self-publishing is often the solution for these people; having said that, self-publishing presents its own set of challenges.

# Common Pain Points with Self-Publishing

One common pain point for self-publishers is evaluating their budget and what they plan to do with it. This stems from not having an idea of how much self-publishing a book costs.

> "As a potential self-publisher, I want to know the total costs of publishing my book, so that I can budget accordingly."

> "As an existing self-publisher, I want to know how my books are doing financially, so I can make decisions on what to do next."

# Feature Considerations

To solve these problems, I decided to design a website that offers educational content on self publishing, along with tools that help address pain points like budgeting and formatting. Similar products for self publishing include [Self Publishing School](https://selfpublishing.com), and similar products in other fields include [UX Tools](https://uxtools.co/) and [UX Collective](https://uxdesign.cc/).

This website will primarily target the audience interested in self-publishing a book, although it will also have some use by existing self-publishers.

I decided not to go as far as to create a dashboard for managing self-publishing, as doing so would conflict with existing solutions (e.g. Kindle Direct Publishing) and have a higher implementation effort.

# Success Criteria

To measure the retention and conversion rate of the site, I can measure the percentage of users clicking one of the buttons on the landing page. I can then track engagement by measuring how they browse the different guides or articles (e.g. whether they use the previous/up next buttons).

Task success rate and completion time are especially important for the tools offered by the site, and can be measured by the number of tries and the time a user must take before getting a desired result. 

Finally, the site needs to track the number of clicks on advertisements, in order to satisfy the needs of sponsors and to bring in revenue.

---
# The Final Wireframe

## Guides and Blog

I knew from the beginning that I wanted to split the site's content into two separate pages, a "Guides" page and a "Blog" page. Content on the "Guides" page stays the same with only occasional changes over time. Meanwhile, content on the "Blog" page is always evolving, as it's how users stay up to date on the world of self publishing.

That being said, I had some pretty wacky ideas for how to create the "Guides" page. My first sketch involved an interactive graph where users would complete each lesson to earn points, similar to a video game.

![Initial sketch of graph view](/static/work/self-publishing-co/graph-sketch.jpeg)

Eventually, I scrapped this idea and went with a more traditional layout, in order to better serve the target audience the site is for. I still think this can be combined with a "points" system along with a short quiz at the end of each guide, to keep the user engaged with the content. No account setup is required; simply track the user's points locally using browser cookies.

(For an example implementation of these ideas in a professional setting, see the [Next.js docs](https://nextjs.org/learn/basics/create-nextjs-app/setup))

![Guides page](/static/work/self-publishing-co/guides.png)

Unlike the Guides page, the Blog page is for evolving content. It's intended to keep users up to date on the latest news in self publishing, and to serve as a space to share additional industry-grade knowledge (e.g. through interviews). 

![Blog page](/static/work/self-publishing-co/blog-1.png)
![Blog page](/static/work/self-publishing-co/blog-2.png)

The feature article is usually, but not always, the most recent article published. It's meant to keep existing users interested in the site's content, as well as provide an entry point for new users. This page is also where I put the newsletter sign-up form. It seemed like the most ideal place to put it along with the footer, since the newsletter is primarily for evolving content.

## Services

The Services page includes tools to help users with issues like budgeting or formatting. I decided not to wireframe the tools themselves, since the main user flows are more focused on the content of the site.

### Advertising Philosophy

As you may have noticed, I took the opportunity include an advertisement space here. I don't intend for this site to rely on more traditional advertising services like Google/Meta Ads, since I believe ads coming from those services will be more disruptive to the user's experience. Instead, the site will have a group of sponsors covering a comprehensive range of services related to self publishing (e.g. hiring an editor or a cover designer). The target audience of this site has a variety of different budgets to work with; those with a higher budget may be able to afford these services and find them useful, while those with a lower budget will still be able to enjoy the site's content for free.

## Landing Page

I then moved on to the landing page is intended to introduce users to the best of the site's features, as well as provoking a sense of excitement and intrigue in users looking to self publish.
![Full landing page](/static/work/self-publishing-co/landing-full.png)

I dedicated the first two sections to showcasing articles and the guide. This is important because the expanding catalog of articles will be more likely to retain users than the tools offered on the site, which I decided to showcase later.

I also made the decision to put a "Get Started" button instead of a newsletter sign-up form. Having this button will be more likely to provoke action from the user, and leads to a more natural user flow especially if they're still deciding on self publishing.

![Animation showing navigation from landing to introduction page](/static/work/self-publishing-co/landing-to-introduction.gif)

Clicking the "Get Started" button brings the user to the first page of the guide. This is a fairly traditional article layout. I decided to create an advertisement space within the article, following the philosophy described above.

I also made the decision to include navigation buttons ("Previous/Up Next") at the bottom of the page, to lead to a more natural user flow when browsing guides sequentially.