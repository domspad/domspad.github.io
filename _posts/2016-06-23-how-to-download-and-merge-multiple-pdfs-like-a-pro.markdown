---
title: how to download and merge multiple pdfs like a pro
date: 2016-06-23T17:45:02-04:00
layout: post
---

For some reason, [an open course](http://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-02-introduction-to-eecs-ii-digital-communication-systems-fall-2012/readings/) at MIT decided to post only the chapters of their textbook without also posting the entire textbook itself. 

No problem, a few shell commands and BAM! full textbook pdf...

_*NOTE: this only works if the urls for the pdfs are indexed by numbers._

In this case, the url pattern for the pdfs are `..._chap<NUMBER>.pdf`, where `<NUMBER>` is `01`, `02`, ...,`19`.


### 1 - Download

First, we download all the pdfs as `chapter_<NUMBER>.pdf`:

```bash
curl -o chapter_#1.pdf 'http://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-02-introduction-to-eecs-ii-digital-communication-systems-fall-2012/readings/MIT6_02F12_chap[01-20].pdf'
```

### 2 - Merge

Next, we merge using [pdfunite](https://github.com/mtgrosser/pdfunite):

```bash
pdfunite chapter_* mit_6.02.pdf
```

### 3 - Clean up

And, delete the originals:

```bash
rm chapter_*
```




