---

title: Python math errors with decimals
date: 2016-07-19T18:44:49-04:00
layout: post
tags:
 - python
---

This is a short story of one of my first encounters in Python when doing some arithmetic with decimal numbers gave me wrong answers. In the end, I was able to solve my problem using Python's `decimal` module and learn a bit about the computer does this arithmetic.

<!-- set up: I wanted a fast fib -->

<!-- # The setup

Coming to programming from a [math](weird pic?) background, I've enjoyed me plenty a [Project Euler](problem) problem in my day. I wanted to share some common issues that have come up in attempting these problems.

The most confusing, aggravating, surprising one that has bitten numerous times is the realization that my computer can't do some basic math I thought it was capable of. That is arithmetic with decimal numbers ("floats" as they're called in Python)
 -->


## The problem

I was doing a math exercise where I needed a fast way of computing the the `N`th fibonacci number. This is a famous sequence of integers that most people learn about when they are learning how to write a recursive function. This is one way you can compute these numbers in Python.

```python
def fib(n):
    if n < 2:
        return n
    else:
        return fib(n - 1) + fib(n - 2)
```

And you will get the numbers

```python
>>> fib(1)  # the first fibonacci number
1
>>> fib(2)  # the second fibonacci number
1
>>> fib(3)
2
```

However, it is slow and I don't have the time to wait for it to compute `fib(10000)` (not to mention in Python this gives a `RuntimeError: maximum recursion depth exceeded` because you can only recurse so far into functions). 


Luckily there is an explicit formula that computes the these numbers without needing the previous fibonacci numbers. This was the function I was using.

<!--  \text{fib}(n)=\Bigl\lfloor\frac{(\frac{1-\sqrt{5}}{2})^n}{\sqrt{5}}+\frac{1}{2}\Bigr\rfloor -->
![fib](/assets/fib_formula.png){: .center-image}

And here it is in Python: 

```python
from math import sqrt

# some constants we'll use
SQ5 = sqrt(5)  
PHI = (1 + SQ5)/2

def fib(n):
	return int(((PHI ** n) / SQ5) + 0.5) 
```

The problem was, it started to give the wrong answer when I asked for bigger fibonacci numbers

```python
>>> fib(78)
8944394323791488   # not actually the 78th fibonacci number!
```

The 78th fibonacci number should actually be [8944394323791464](http://www.miniwebtool.com/list-of-fibonacci-numbers/?number=100). 

<!-- 1 - my computer can't add (the error) -->

## The underlying problem

The problem comes from using that square root of 5. It's an infinite decimal number (that doesn't even repeat!). It's roughly `2.23606797749978969640917366873127623...`

But, this is how Python sees it. 

```python
>>> sqrt(5)
2.23606797749979
```

<!-- FIX REF -->
That's the short version of the underlying problem [^1], but I was just concerned about getting the right answer.

[^1]: A better introduction into what a computer does with decimal numbers can be found [here](https://www.youtube.com/watch?v=PZRI1IfStY0) and for a more detailed document, [read this](http://floating-point-gui.de/basic/). 


<!-- 2 - arbitrary precision is tricky (resolution with graph) -->


## A solution

`decimal` is the standard module to use when you want Python to write out more of the digits of your number. For example,

with floats...

```python
>>> from math import sqrt
>>> sqrt(5)
2.23606797749979
```

with the `decimal` library

```python
>>> from decimal import Decimal
>>> decimal.getcontext().prec = 100  # this is how many digits we want to see
>>> five = Decimal(5)
>>> five
Decimal('5')
>>> Decimal.sqrt(five)
Decimal('2.236067977499789696409173668731276235440618359611525724270897245410520925637804899414414408378782275')
```

Back to the function `fib`, we have to now rewrite it so it does computations with the `Decimal` object rather than Python's builtin `float` object.

Here is the rewrite:

```python
import decimal
from decimal import Decimal
decimal.getcontext().prec = 100

def fib(n):
	SQ5_d = Decimal.sqrt(Decimal(5))
	PHI_d = (Decimal(1) + SQ5_d) / Decimal(2)
	return int( ((PHI_d**n)/SQ5_d) + Decimal(0.5) )  
```

The tricky part is setting the "precision", which is the line `decimal.getcontext().prec = 100`. 

However, I didn't know how many digits I _needed_. But because I already knew some of the fibonacci numbers, I could test different settings for `decimal.getcontext().prec` to see what I precision I would at least need for them. Then I could extrapolate for bigger fibonacci numbers.

So, starting with the correct fibonacci numbers up to the first 50, I find the first precision that gives the right answer. Then by plotting the results, I can determine the relationship of how much precision I need for bigger numbers.

```python
# first set the precision really high to get the first 50 correct values
decimal.getcontext().prec = 100

CORRECT = [ fib(n) for n in range(100) ] 

# first number precision correct for each
MIN_PREC = []
min_prec = 1
for e,correct_fib in enumerate(CORRECT):
	# find first min prec for that number
	decimal.getcontext().prec = min_prec
	guess = fib(e)
	while guess != correct_fib:
		min_prec += 1
		decimal.getcontext().prec = min_prec
		guess = fib(e)
	MIN_PREC.append(min_prec)

import matplotlib.pyplot as plt
import pandas as pd 

ser = pd.Series(MIN_PREC)
ax = ser.plot(title='decimal precision needed for Nth fibonacci number')
ax.axes.set_xlabel('Nth fibonacci number')
ax.axes.set_ylabel('minimum precision required')
plt.show()
```
![fib precision](/assets/fib_precision.png){: .center-image }

It looks like it is roughly a ratio of 4:1 for number of fibonacci numbers for each new decimal of precision. I did a quick sanity check on the fibonacci number I got wrong with my `float`-based `fib` function:

```python
>>> decimal.getcontext().prec = 20
>>> fib(78) 
8944394323791464 # Correct!!!
```

For my purposes, I needed to get to roughly the 10,000th fibonacci number, so to be safe I used a precision of `2500`.

```python
>>> decimal.getcontext().prec = 2500
>>> fib(10000)
33644764876431783266621612005107543310302148460680063906564769974680081442166662368155595513633734025582065332680836159373734790483865268263040892463056431887354544369559827491606602099884183933864652731300088830269235673613135117579297437854413752130520504347701602264758318906527890855154366159582987279682987510631200575428783453215515103870818298969791613127856265033195487140214287532698187962046936097879900350962302291026368131493195275630227837628441540360584402572114334961180023091208287046088923962328835461505776583271252546093591128203925285393434620904245248929403901706233888991085841065183173360437470737908552631764325733993712871937587746897479926305837065742830161637408969178426378624212835258112820516370298089332099905707920064367426202389783111470054074998459250360633560933883831923386783056136435351892133279732908133732642652633989763922723407882928177953580570993691049175470808931841056146322338217465637321248226383092103297701648054726243842374862411453093812206564914032751086643394517512161526545361333111314042436854805106765843493523836959653428071768775328348234345557366719731392746273629108210679280784718035329131176778924659089938635459327894523777674406192240337638674004021330343297496902028328145933418826817683893072003634795623117103101291953169794607632737589253530772552375943788434504067715555779056450443016640119462580972216729758615026968443146952034614932291105970676243268515992834709891284706740862008587135016260312071903172086094081298321581077282076353186624611278245537208532365305775956430072517744315051539600905168603220349163222640885248852433158051534849622434848299380905070483482449327453732624567755879089187190803662058009594743150052402532709746995318770724376825907419939632265984147498193609285223945039707165443156421328157688908058783183404917434556270520223564846495196112460268313970975069382648706613264507665074611512677522748621598642530711298441182622661057163515069260029861704945425047491378115154139941550671256271197133252763631939606902895650288268608362241082050562430701794976171121233066073310059947366875L    #... I think ;)
```


## Summary

For me, the main takeaways here are

1. Be wary of arithmetic with `float`s, __ALWAYS__
2. When you need to do it, try some library with arbitary precision in your language (for Python, that's usually `decimal`, though there are others)
3. When using arbitary precision decimals, get a feel for how MUCH precision you really need.

 In my next post, I'll go over a similar situation with floating point arithmetic that has an entirely different takeaway: Avoid floating point arithmetic. 

<br>
<hr>
<br>

#### Footnotes

