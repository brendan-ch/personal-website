---
title: "Self Publishing Co."
description: "The ultimate knowledge base for all things self publishing."
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

[View the full prototype on Figma](https://www.figma.com/proto/hXBdp2rYttv89aCxt665sf/Exercise%3A-Design-a-product-for-self-publishing-a-book-on-Amazon.?page-id=0%3A1&node-id=2%3A2&viewport=297%2C435%2C0.16&scaling=contain&starting-point-node-id=2%3A2)

# Understanding the Goal

The end goal of this exercise is to decrease the entry barrier for self-publishing books. One way to achieve this is to increase confidence in new authors, by guiding them and providing valuable knowledge and a set of useful tools. More specifically, I need to address the common pain points of publishing a new book, such as budgeting costs and formatting files correctly.

With this in mind, I created a wireframe of Self Publishing Co, a website that aims to provide comprehensive knowledge on self publishing, in addition to tools that address common pain points.

![Hero image in landing page](/static/work/self-publishing-co/landing-hero.png)

# Who Is This For?

According to the prompt, 81% of Americans want to write a book. Some audience groups include, but are not limited to, working adults, businesspeople, creatives, and bloggers.

It's fair to assume that for most audience groups, they have a main profession outside of becoming an author. This also means that many of these people don't have the means or time to go through an agent for a traditional publisher. Self-publishing is often the best solution for these people; however, self-publishing presents its own set of challenges.

# Common Pain Points with Self-Publishing

One common pain point for self-publishers is evaluating their budget and what they plan to do with it. This stems from inexperience with the self publishing process, and presents an opportunity to guide the user and provide tools to help them. After the publishing process, there is an opportunity to guide the user on knowing how their books are doing financially.

> "As a potential self-publisher, I want to know the total costs of publishing my book, so that I can budget accordingly."

> "As an existing self-publisher, I want to know how my books are doing financially, so I can make decisions on what to do next."

Since this product is targeting people who are already working a job, they may not have much time to read a blog or stay up to date on what's happening in the self publishing world. This presents an opportunity to deliver updates to these people through a newsletter, or through social media.

> "As a busy person, I want to have the latest updates on self publishing delivered to my inbox, so I can check it when I have time."

Finally, one part of self-publishing a book is about connecting with readers, a skill that parts of the audience may or may not have. This presents opportunities to teach this valuable skill.

> "As an existing self-publisher, I want to learn how to connect with my readers, so I can build my audience and get their perspective."

# Feature Considerations

To solve these problems, I decided to design a website that offers educational content on self publishing, along with tools that help address pain points like budgeting and formatting. Similar products for self publishing include [Self Publishing School](https://selfpublishing.com), and similar products in other fields include [UX Tools](https://uxtools.co/) and [UX Collective](https://uxdesign.cc/).

This website will primarily target the audience interested in self-publishing a book, and it will also have some use by existing self-publishers. It will also have a group of sponsors covering a comprehensive range of services related to self publishing, so the site can enjoy revenue without relying on large advertising networks.

I decided not to go as far as to create a dashboard for managing self-publishing, as doing so would conflict with existing solutions (e.g. Kindle Direct Publishing) and have a higher implementation effort (e.g. interacting with an API).

---
# The Final Wireframe

[View the full prototype on Figma](https://www.figma.com/proto/hXBdp2rYttv89aCxt665sf/Exercise%3A-Design-a-product-for-self-publishing-a-book-on-Amazon.?page-id=0%3A1&node-id=2%3A2&viewport=297%2C435%2C0.16&scaling=contain&starting-point-node-id=2%3A2)

## Guides and Blog

I knew from the beginning that I wanted to split the site's content into two separate pages, a "Guides" page and a "Blog" page. Content on the "Guides" page stays the same with only occasional changes over time. Meanwhile, content on the "Blog" page is always evolving, as it's how users stay up to date on the world of self publishing.

I had some pretty wacky ideas for how to create the "Guides" page. My first sketch involved an interactive graph where users would complete each lesson to earn points, similar to a video game.

![Initial sketch of graph view](/static/work/self-publishing-co/graph-sketch.jpeg)

Eventually, I scrapped this idea and went with a more traditional layout, in order to better serve the target audience the site is for. I still think this can be combined with a "points" system along with a short quiz at the end of each guide, to keep the user engaged with the content. No account setup is required; simply track the user's points locally using browser cookies.

![Guides page](/static/work/self-publishing-co/guides.png)

Unlike the Guides page, the Blog page is for evolving content. It's intended to keep users up to date on the latest news in self publishing, and to serve as a space to share additional industry-grade knowledge (e.g. through interviews). 

![Blog page](/static/work/self-publishing-co/blog-1.png)
![Blog page](/static/work/self-publishing-co/blog-2.png)

The feature article is usually, but not always, the most recent article published. It's meant to keep existing users interested in the site's content, as well as provide an entry point for new users. This page is also where I put the newsletter sign-up form; it was the most ideal place to put it along with the footer, since the newsletter is primarily for evolving content.

## Services

![Screenshot of the services page](/static/work/self-publishing-co/services.png)

The Services page includes tools to help users with issues like budgeting or formatting. I decided not to wireframe the tools themselves, since the main user flows are more focused on the content of the site.

I also included an ad space on this page, along with various other places in the prototype. The target audience of this site has a variety of different budgets to work with; those with a higher budget may be able to afford these services and find them useful, while those with a lower budget will still be able to enjoy the site's content for free.

# Success Criteria

To measure the retention and conversion rate of the site, I can measure the percentage of users clicking one of the buttons on the landing page. I can then track engagement by measuring how they browse the different guides or articles (e.g. whether they use the previous/up next buttons).

Task success rate and completion time are especially important for the services section on the site, and can be measured by the number of tries and the time a user must take before getting a desired result. 

I do intend for the site to maintain a social media presence. This can be used as a means to promote site content along with tracking user engagement. To measure net promoter score, occasional surveys may be presented to users on the website as well as social media.

Last but not least, the site needs to track the number of clicks on advertisements, in order to satisfy the needs of sponsors and to bring in revenue.