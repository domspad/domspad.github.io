---
title: Python math errors with decimals (Part II)
date: 2016-07-19T14:25:34-04:00
layout: post
tags:
 - python
---

Part 1 of this series on using floats in python can be found [here](/2016/07/05/using-floats-in-python.html)

This is a short story of a problem where using floats was just a bad idea in the first place.

# The Motivation

I was asked to check whether the points of a triangle determined a right triangle or not. The points of the triangles all lied at nonnegative integer coordinates, with one of them being located at the origin, (0,0).

![triangle](/assets/triangle.png){: .center-image}

My solution boiled down to calculating the slopes of each side of the triangle and determining if any pair of them were perpendicular.

```python
>>> p1, p2 = (0,0), (1,1) # first line segment
>>> q1, q2 = (1,1), (1,2) # second line segment
>>> slope1, slope2 = slope(p1,p2), slope(q1,q2)
>>> are_perp(slope1, slope2)
False
```

My first attempt tried using floats as an intermediary representation of the slope of these segments...

```python
def slope(a,b):
	"""
	return slope from a = (x1,y1) to b = (x2,y2) as a decimal
	a,b assumed to be distinct points
	"""
	x1,y1 = a
	x2,y2 = b
	if x1 == x2:
		return float('inf')
	else:
		return 1.*(y2-y1)/(x2-x1)

def are_perp(m1,m2):
	"""
	return whether m1,m2 as slopes are perpendicular (inputs are decimals)
	"""
	if m2 == 0:
		return m1 == float('inf') or m1 == -float('inf')
	else:
		return -1./m2 == m1
```

Which passes some sanity checks...

```python
>>> origin, p,q = (0,0), (9,10), (-10,9)
>>> m1, m2 = slope(origin,p), slope(origin,q)
>>> are_perp(m1, m2)
True
```

However, there were some triangles with segments that were _almost_ perpendicular, which didn't bode well with this use of floats...

# The Problem

```python
>>> m1 = slope((3,11),(0,0))
>>> m2 = slope((3,11),(14,8))
>>> are_perp(m1, m2)
False
```

Yet, these segments _are_ perpendicular because the ratios are negative reciprocals `m1 == 11/3.` and `m2 == -3/11.`. 

# A Solution

In [part 1](/2016/07/05/using-floats-in-python.html) I made use of an arbitrary precision library, `decimal` to solve a problem caused by imprecise floating-point arithmetic in python. Unfortunately, even using arbirtrary precision here will not solve this problem. The [standard answer](https://www.python.org/dev/peps/pep-0485/) (at least in Python) for checking equality of floats is actuall to check if they are _close enough_, which is time-consuming to define properly...

This is a good case where it would be nice to avoid dealing with decimals in the first place, and in fact this problem lends it self easily to another representation: __fractions__ (as tuples of integers). 

That is, we represent our slopes not as decimals but as tuples of integers so `m1 = 11/3.` becomes `m1 == (11, 3)` (numerator, denomenator). And then I could confirm perpendicularity without ever entering the world of decimals...

```python
def slope(a,b):
	"""
	return the slope from point a to b as a tuple (numerator, denominator)
	a,b assumed to be distinct points
	"""
	x1,y1 = a
	x2,y2 = b
	return (y2-y1, x2-x1)

def are_perp(m1,m2):
	"""
	check whether m1, m2 as slopes are perpendicular (inputs as tuples)
	"""
	n1,d1 = m1
	n2,d2 = m2
	return (n1 * n2) + (d1 * d2) == 0

```

This required refactoring other functions to correspond to this representation, but complexity avoided in dealing with floats is well worth the extra work with tuples...


