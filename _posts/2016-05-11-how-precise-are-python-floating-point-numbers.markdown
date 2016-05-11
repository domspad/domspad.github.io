---
title: How precise are Python floating point numbers?
date: 2016-05-11T08:15:06-05:00
layout: post
---

A recent [project euler problem](http://projecteuler.net/problem=163) made me realize when precision matters with floating point numbers. Consider

{% highlight python %}
In [1]: 0.1 == 0.10000000000000001
Out[1]: True

In [2]: 0.1 == 0.1000000000000001
Out[2]: False
{% endhighlight %}

It's important to understand when the precision matters in your program. Almost all platforms map Python floats to [IEEE-754 “double precision”](http://steve.hollasch.net/cgindex/coding/ieeefloat.html), which contain *53 bits* of _binary_ precision (think a number like `10011010010100010010010101011101111111111011101110101`). In base-10 or decimal number system, this is roughly 17 digits (think since 10 is roughly `2**3`, so each decimal digit is roughly the same as 3 binary digits, so 53 binary digits is roughly 17 decimal digits).

As proof, we can check a given number `x` by adding a very small number `epsilon`, to see how big `epsilon` can be before `x` and `x + epsilon` are "different". I've included some code below and its output(requires the python library [humanize](https://pypi.python.org/pypi/humanize)).


INPUT
{% highlight python %}
def tolerence(x):
    for e in xrange(40,0,-1):
        epsilon = eval('0.' + '0'*e + '1')
        if x != x-epsilon:
           	return epsilon
nums = [eval('1e{}'.format(x)) for x in range(-10,11)]
print '{:<30}{:<30}'.format('Number', 'Tolerance')
print '\n'.join(map(lambda x: '{:<30}{:<30}'.format(x[0],x[1]),zip(map(humanize.number.intcomma,nums),map(str,map(tolerence,nums)))))
{% endhighlight %} 

OUTPUT
{% highlight python %}
Number                        Tolerance
1e-10                         1e-26                         
1e-09                         1e-24                         
1e-08                         1e-24                         
1e-07                         1e-23                         
1e-06                         1e-21                         
1e-05                         1e-21                         
0.0001                        1e-20                         
0.001                         1e-18                         
0.01                          1e-18                         
0.1                           1e-17                         
1.0                           1e-16                         
10.0                          1e-15                         
100.0                         1e-14                         
1,000.0                       1e-13                         
10,000.0                      1e-12                         
100,000.0                     1e-11                         
1,000,000.0                   1e-10                         
10,000,000.0                  1e-09                         
100,000,000.0                 1e-08                         
1,000,000,000.0               1e-07                         
10,000,000,000.0              1e-06 
{% endhighlight %} 