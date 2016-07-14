---
title: The popularity of numbers
date: 2015-05-19T18:28:25-04:00
layout: post
---



Here's a curious image

<div>
    <a href="https://plot.ly/~domspad/37/" target="_blank" title="How Many Results for Googling Numbers" style="display: block; text-align: center;"><img src="https://plot.ly/~domspad/37.png" alt="How Many Results for Googling Numbers" style="max-width: 100%;"  onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
    <script data-plotly="domspad:37" src="https://plot.ly/embed.js" async></script>
</div>

What this plot shows is how many 'results' Google returned when querying the number
on the horizontal axis. So if you google '1' you'll probably get 25,270,000,000 results, and if you google '101412043' maybe you'll get 668 results. 

I came across the data by accident when I was in haste of writing a threaded program that crawls websites (the other thing I learned coming out of that is that Google doesn't like to talk to bots). 

But back to the pretty picture.

The weird thing is that there's actually a relationship here. The plot above is a "loglog" plot so with normally-scaled axes it would actually look like this.

<div>
    <a href="https://plot.ly/~domspad/38/" target="_blank" title="How Many Results for Googling Numbers" style="display: block; text-align: center;"><img src="https://plot.ly/~domspad/38.png" alt="How Many Results for Googling Numbers" style="max-width: 100%;"  onerror="this.onerror=null;this.src='https://plot.ly/404.png';" /></a>
    <script data-plotly="domspad:38" src="https://plot.ly/embed.js" async></script>
</div>

Not as vivid. But the relationship is there, and it looks like this :

<!-- linking to tex code -->
<div style="text-align:center">
<a href="http://www.codecogs.com/eqnedit.php?latex=f(n)&space;=&space;\frac{10^{11.5}}{n}&space;=\frac{300\text{&space;Billion}}{n}" target="_blank"><img src="http://latex.codecogs.com/gif.latex?f(n)&space;=&space;\frac{10^{11.5}}{n}&space;\approx\frac{300\text{&space;Billion}}{n}" title="f(n) = \frac{10^{11.5}}{n} =\frac{300\text{ Billion}}{n}" /></a>
</div>

<!-- put in an image straight with html -->
<!-- <div style="text-align:center"><img src ="{filename}/images/google_eqn.gif" /></div> -->

<!-- one way to put in an image with markdown (but not centered) -->
<!-- ![The Equation]({filename}/images/google_eqn.gif) -->

Oh another weird phenomenon to try while your laundry is drying -- if you start googling a number, then you google the number that appears as its amount of search results, and you do the same for its number of results, etc. you'll converge to around 500,000. 

