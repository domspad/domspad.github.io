---
layout: post
title:  "Choosing a static site generator"
date:   2016-04-17 22:04:46 -0500
---

![Static Site Generators](/assets/static_site_gens.png)
*A quick glance at the most popular [static site generators](https://staticsitegenerators.net/)*

First, be glad that you at least recognize when you *need* to use 3rd party software. Of almost any endeavor, programming is one field where by using the work of programmers decades ago (sometimes literally the exact same code they have written) you can build something in days that would have taken you years. 

Now... just what tool should we go with for a static site blog?

## Choose a community not software

Until recently I used to feel drunk on power that Python was the only language I would ever need to do anything, from data analysis to GUI programming. Well, maybe that could be the case, but if we are opening ourselves up to using 3rd party Python packages, with API's that we have to get used to, why not go one step further and use something from another language? Especially when that langauge appears to have a stronger following in that domain? 

My main decision came to between Jekyll (in Ruby) and Pelican (in Python). Both are pretty easy to install and set up (even if you don't know Ruby), Jekyll happens to interface with Github a bit easier if you are hosting your blog there, both have pretty simple command line tools to publish posts with a few commands, Jekyll has 5X the following as Pelican (could that be due to the size of the Ruby community?), and most importantly Jekyll seems to be much more [actively developed](https://github.com/jekyll/jekyll/graphs/contributors) still compared to [Pelican](https://github.com/getpelican/pelican/graphs/contributors).

## Some tips when developing a Jekyll blog

- The [Jekyll docs](https://jekyllrb.com/) are pretty well done. Take a look.
- This short [article](http://jekyllbootstrap.com/lessons/jekyll-introduction.html) on how jekyll works will prevent some longterm frustrations potentially.
- Look at how other people use it! Many people make public the source code behind their Jekyll blogs.
