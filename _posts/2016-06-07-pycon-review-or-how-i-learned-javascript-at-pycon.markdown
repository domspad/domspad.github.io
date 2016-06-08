---
layout: post
title: Painless live data visualizations
date: 2016-06-07T12:26:38-05:00
tags:
 - python
---

Behold, a live visualization of the active content on the various [StackExchange communites](http://stackexchange.com/sites). 

{% include so_graph.html %}

I have dreamt about live data stream visualizations for a long time -- but as a (mainly) Python programmer, the web scared me. That is why I usually rely on the old, lovable Matplotlib [for my plots]({% post_url 2016-05-18-facebook-friendship-paradox-with-how-to-guide %}).

Such dynamic web content probably involves [javascript](https://www.google.com/search?tbm=isch&q=cthulhu&cad=h), and a bit of knowledge about computer networks, which I've never dove into, and an understanding of [how a browser works](http://www.html5rocks.com/en/tutorials/internals/howbrowserswork/), right?

Well, have no fear my fellow Pythonistas -- you can get your live data visualization all with just one file and no messing around with Heroku or Flask or whatnot.

## The How

Wanna do it yourself? [Here's the only file you need](https://gist.github.com/domspad/628ae058a3ebcd01703b56963537f5e8). I'll explain a high level view of it below. But first, try saving it and opening it with your favorite webbrowser. Voila, your own personal live data visualization. Hell, throw it up on a free [GitHub Pages](https://pages.github.com/) repo, and now it's on the web!  

## The Moral
 
Okay but what's going on here, and what's this dark magic. I don't see any Flask/Django, I didn't have to struggle with Heroku. There's gotta be a catch.

Yes, well, you had to sign a deal with [Javascript](https://www.google.com/search?tbm=isch&q=cthulhu&cad=h), but there's a larger lesson to be had here:

_Maybe Python can solve all your problems, but it doesn't mean it is the solution of minimal effort. Especially when it comes to the web._

## A High-Level View

<img src="/assets/serv_cli.png" width="800">

Here is the flow:

- Our server (in my case, Github Pages) sends the client the static html page [`live_graph.html`](https://gist.github.com/domspad/628ae058a3ebcd01703b56963537f5e8). That's the only time the client ever needs to talk to our server. 
- When the client's browser is rendering the HTML and running the javascript code, it sets up a websocket connection (think of it as a persistent connection between two places) between the client's computer and [StackExchange](http://stackexchange.com/) and tells StackExchange the kind of data we'd like to see. 
- Whenever StackExchange publishs a new active question, it sends it to the client via the websocket in the form of a JSON object. 
- In the client's browser, whenever a new data JSON object arrives, it triggers some javascript code to parse the object for the data, appends it to its growing data collection and sends the updated collection to [Plotly](https://plot.ly/). 
- Plotly responds with a new plot, which the client's browser then renders in the current html page.

### Shoutouts

This solution came from a widely distributed knowledge-base. key players where [Lucas Kushner](https://github.com/lphk92), [Alexandre Chabot-Leclerc](https://github.com/achabotl), and [Matt Makai's talk](https://www.youtube.com/watch?v=L5YQbNrFfyw).
