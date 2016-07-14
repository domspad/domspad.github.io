---
title: An analysis of beer pong
date: 2015-06-06T17:26:32-04:00
layout: post
---

What's the probability you will make a shot in beer pong, with all cups still on the table? <b>Probably less than 40%!</b>

<div style="text-align:center"><img src ="/assets/beer_pong_game.jpg" width="300" /></div>

This post is a dedication to all those beer pong matches I never won. I had the opportunity to play the game recently, and it sparked some thought after I had read about a famous problem in probability [Buffon's Needle](http://en.wikipedia.org/wiki/Buffon%27s_needle) : 

>		Imagine dropping a needle onto a hardwood floor, made of panels of equal
>		width. What is the probability that the needle will come to rest lying
>		across a crack between two boards?

<!-- ```
Imagine dropping a needle onto a hardwood floor, made of panels of equal
width. What is the probability that the needle will come to rest lying
across a crack between two boards?
```

> <b>Imagine dropping a needle onto a hardwood floor, made of panels of equal width. What is the probability that the needle will come to rest lying across a crack between two boards?</b> -->

<!-- Even crazier about this, is that you can use this experiment to estimate the value of \pi to a scary degree of precision. -->

In solving the problem, we consider the possible arrangements of the needle and the floorboards. We can do the same with beer pong! 

To get a rough estimate of likelihood of sinking a beer pong shot we consider where the ball may land within the entire triangle, and calculate the sum of the areas where, if the ball lands, it will go in a cup. 

The percentage of the total area will give a fair approximation of your ability to make a shot, assuming the ball is equally likely to land anywhere within the triangle (a dubious assumption when playing with the well-practiced frat guy).

<div style="text-align:center">
	<img src ="/assets/single_cup.jpg" width="400" />
<!-- 	<div style='width: 130px; text-align: center;'>I just love to visit this most beautiful place in all the world.</div> -->
	<figcaption> Here, the shaded area represents where center of ping pong ball must land for the ball to land into the cup without touching the sides of the cup.</figcaption>
</div>

Surprisingly, despite the fact that roughly 80% of the triangle outlining the cups is covered by the openings of the cups, less than 40% of that area is good for sinking the ball.

<div style="text-align:center">
	<img src ="/assets/beer_pong_all.jpg" width="600" />
	<figcaption> figure not drawn to scale, or good</figcaption>

</div>

The sum of the shaded areas depends on what we allow to be plausible for the ball to enter the cup. Can the ball nick the side and go in still? By how much? I take a range between just nicking the side and striking the edge of the cup at a 45 degree angle. 

<div style="text-align:center"><img src ="/assets/r_cup.gif"/></div>

<div style="text-align:center"><img src ="/assets/r_shaded.gif"/></div>

Using these values will yeild the above table when combined with the formulas below. (note that 'n' represents the number of cups in the last row of the triangle, here n == 4)

The area covered by the solo cups : 
<div style="text-align:center"><img src ="/assets/n_cup_area.gif"/></div>

The area of the surrounding triangle : 
<div style="text-align:center"><img src ="/assets/tri_area.gif"/></div>

which is derived from the side length : 
<div style="text-align:center"><img src ="/assets/tri_side_length.gif"/></div>

and the formula for the area of an equilateral triagle :
<div style="text-align:center"><img src ="/assets/tri_area_form.gif"/></div>

### What if the ENTIRE Earth were covered in ping pong balls, and we dropped the ball from space?

Or, in other words, what happens to the probability as we add more and more rows of cups? Here's a graphical depiction of the upper and lower bounds of the total area of the triangle covered by shaded area as n grows.

Note that, since the beer pong layout is growing large, we require the ball to go into a cup on the first hit (i.e. we don't count it if it bounces from one cup into another).



<div style="text-align:center"><img src ="/assets/beer_pong_limit.png" width="900"/></div>


As it turns out, this relates to the famous problem of [Circle Packing](http://en.wikipedia.org/wiki/Circle_packing), where we try to achieve the densest possible packing of circles into a given area. As luck would have it, the solo cups are arranged in the densest possible layout for beer pong.
&nbsp;
<div style="text-align:center"><img src ="/assets/limit_solo_cup.gif"/></div>
&nbsp;
But it, doesn't look like our luck as much improved even with a larger layout. Our probability just creeps up to <b>about 45%</b> on the upper end.
&nbsp;

<div style="text-align:center"><img src ="/assets/limit_shaded.gif"/></div>

	

<!-- Using the measurements

R := \text{radius of solo cup} 
\newline
r := \text{radius of ping pong ball}
\newline
\text{Area of solo cups} = \pi R^2 \frac{n(n+1)}{2}
\newline
\text{Area of make shot} = \pi r^2 \frac{n(n+1)}{2}
\newline
\text{Side length of triangle} = 2(R+R\sqrt{3})+2R(n-2)
\newline
\text{Area of triangle} = \frac{\sqrt{3}}{4}({\text{side length}})^2
\newline
= \frac{\sqrt{3}}{4}\left[2(R+R\sqrt{3})+2R(n-2)\right]^2
\newline
= 2\sqrt{3}\left[2R(n-1+\sqrt{3})\right]^2

r^2\sqrt{3}\left( n - 1 + \sqrt{3} \right )^2

2.7625 \text{ cm}\leq r_{\text{shaded}} \leq 3.35 \text{ cm}

0.3051\sim\left( \frac{2.7625}{4.7625}\right)^2 \frac{\pi}{2\sqrt{3}} \leq\text{limit of shaded area} \leq \left( \frac{3.35}{4.7625}\right)^2 \frac{\pi}{2\sqrt{3}} \sim 0.4483
\text{limit of solo cups' area}=  \frac{\pi}{2\sqrt{3}} \sim 0.9069 -->


