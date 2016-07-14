---
title: My computer can't add (floats in Python)
date: 2016-07-05T18:44:49-04:00
layout: post
tags:
 - python
---

<!-- set up: I wanted a fast fib -->

Coming to programming from a [math](weird pic?) background, I've enjoyed me plenty a [Project Euler](problem) problem in my day. I wanted to share some common issues that have come up in attempting these problems.

The most confusing, aggravating, surprising one that has bitten numerous times is the realization that my computer can't do some basic math I thought it was capable of. That is arithmetic with decimal numbers ("floats" as they're called in Python)

## the problem

For one of the problems, I needed a fast function for giving me the `N`th fibonacci number. E.g.

```python
>>> fib(78834)
457438485 # the 78834th fibonacci number
```

No, recursion won't be fast enough for our purposes -- we need a formula, and luckily [one exists]().

```
from math import sqrt,floor

# some constants we'll use
SQ5 = sqrt(5)  
PHI = (1 + SQ5)/2

def fib(n):
	return int( ((PHI ** n)/ SQ5) + 0.5 ) 
```

Problem is, it doesn't work!

```python
>>> fib(78)
# not actually the 78th fibonacci number!
```

<!-- 1 - my computer can't add (the error) -->

## your computer can't add either

Whawhahwahwha

Turns out, there are some decimal numbers that computers have trouble understanding. 

Just like when we say `1/3` oh thats `0.3333333....`, well unfortunately computers don't have a concept of `...`, so that have to cut it off somewhere. That's where errors can come into play.

The famous example is

```python
>>> 0.1 + 0.2
0.30000000000000004
```

A better introduction can be found [here](vid) and supposedly EVERY PROGRAMMER EVER is supposed to [read this](). But on with the story


<!-- 2 - arbitrary precision is tricky (resolution with graph) -->
## arbitrary precision in Python

Well, to get the precision we need, we have to get our hands dirty with the [`decimal`]() module. The one stop shop for all your decimal needs.

Problem is, [any] [answer] [you] [see] [on] [SO] that uses decimal, has this one curious line in it...

```python
import decimal
...
decimal.getcontext().prec = 1000
...
...
```
That means, YOU have to tell your computer how far to take the decimal. I know, like how the heck am I supposed to know right?

For example, let's say we want 100 digits, then our previous faulty answer for the 78th fibonacci number is now correct...

But more decimals, more time, so let's find out REALLY how many we'll need.

Let's start out with some KNOWN [fibonnacci numbers](http://planetmath.org/listoffibonaccinumbers)

```
1, 1, 2, ...
```

And we'll find the minimum value for `decimal.getcontext().prec` we need to get the right answer for each of them:

```python 
CORRECT = [ fib_dec(n) for n in range(10000) ] 

# first number precision correct for each
MIN_PREC = []
min_prec = 1
for e,correct_fib in enumerate(CORRECT):
	# find first min prec for that number
	decimal.getcontext().prec = min_prec
	SQ5_d = Decimal.sqrt(Decimal(5))
	PHI_d = (Decimal(1) + SQ5_d) / Decimal(2)
	guess = fib_dec(e)
	while guess != correct_fib:
		min_prec += 1
		decimal.getcontext().prec = min_prec
		SQ5_d = Decimal.sqrt(Decimal(5))
		PHI_d = (Decimal(1) + SQ5_d) / Decimal(2)
		guess = fib_dec(e)
	print(e, min_prec)
	MIN_PREC.append(min_prec)



import matplotlib.pyplot as plt
import pandas as pd 

ser = pd.Series(MIN_PREC)
ser.plot()
plt.show()
``` 
![image](...)

Nice, looks like a linear-ish relationship. Looks like for every more digit of precision we put in our `Decimal`s, we get ~5~ more correction fibonnacci numbers. 

For my purposes, I only need up to the first 1,000,000 fibonnacci numbers, which means ~200,000 digits of precision.

And voila!

## summary

For me, the main takeaways here are

 1 - Be wary of arithmetic with floats, __ALWAYS__
 2 - When you need to do it, try some library with arbitary precision in your language (for Python, that's usually `decimal`, though there are others)
 3 - When using arbitary precision decimals, get a feel for how MUCH precision you really need.

 In my next post, I'll go over a similar situation with floating point arithmetic that has an entirely different takeaway: Avoid floating point arithmetic. 

