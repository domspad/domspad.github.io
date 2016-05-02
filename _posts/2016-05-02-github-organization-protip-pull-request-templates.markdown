---
title: Github Organization Protip - Pull Request Templates
date: 2016-05-01T11:41:43-05:00
layout: post
---

Spending too much time getting up to speed on someone else's PR? Try enforcing uniform organization and structure in your software development via [pull request tempaltes](https://help.github.com/articles/creating-a-pull-request-template-for-your-repository/).

## What is it

Here is what one may look like (using markdown)

![PR Template](/assets/pr_template.png)

## Setup

In short: its just a simple markdown file `PULL_REQUEST_TEMPLATE.md` that lives in your repository under a hidden folder `.github/`.

```
[Briefly describe the problem this PR is attempting to address. Please use @mentions or reference issue numbers if that will help. Provide a list of top-level changes if possible.]

- [ ] Add the necessary labels and assign this PR to a milestone.
- [ ] Add unit test or regression test if appropriate.
- [ ] Run test suite.
- [ ] Assign the PR to a reviewer.

Fixes #[issue-number-here].
```

If this seemed helpful to you, try out [issue templates]() as well!