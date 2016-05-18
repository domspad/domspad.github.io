---
title: facebook friendship paradox (with how-to guide)
date: 2016-05-18T15:47:48-05:00
layout: post
---

Ever heard of the [Friendship Paradox](https://en.wikipedia.org/wiki/Friendship_paradox)? Here's the first line from the wikipedia article: 

>The friendship paradox is the phenomenon first observed by the sociologist Scott L. Feld in 1991 that most people have fewer friends than their friends have, on average.

I've been playing around with some techniques on webscraping lately, and realized we can test this paradox with facebook friend counts. Turns out it's true for me as well

	my friend count: 					781   friends
	average of my friends' friend counts:			788.9 friends

Here's a histogram of friend counts of (almost) all of my facebook friends. 

![The Chart](/assets/friend_hist.png)
*The vertical lines: -- black, blue, red -- represent the mean, the median, and my own personal friend count, respectively.*

It appears the paradox holds true for me as well! (I have 781 facebook friends, but on average, my friends have 788 facebook friends) Here's a description of the underlying pandas dataframe:


```python
In [6]: data.describe()
Out[6]: 
count     664.000000
mean      788.921687			# average: 788.9 facebook friends, I have 781 facebook friends
std       421.760485
min        10.000000
25%       485.750000
50%       731.500000			# median: 731.5 facebook friends, much less!
75%      1017.250000
max      2833.000000
dtype: float64
```

So let's get into how you can do this too without any intense webscraping knowledge!

## How-To guide

You may be thinking this requires some sort of webscraping package or use of the `Requests` package. Actually the data gathering was mostly copy paste. Check it out.

#### 1) Getting the data

Navigate to your facebook profile page and click on 'friends'. If its 2016, and facebook hasn't made another redesign you should see something like this (I've blurred it for my friends' privacy):

![The Fuzz](/assets/fuzzy_fb.png)

If you begin scrolling down the page, you'll see that you can actually get all of your friends on the page because Facebook dynamically loads content as you scroll. For webscraping this would be a real pain to deal with, but luckily we won't go that route.

Once you've scrolled down enough so all of your friends are on the page, you can just hit "Select All" from the 'Edit' menu (or `cmd+a` for mac's), copy it, and paste it into any text editor with [regex](https://en.wikipedia.org/wiki/Regular_expression) support like [Sublime Text](https://www.sublimetext.com/).

#### 2) Clean the data

You'll see a lot of extra text we don't want so what we'll do is use a regular expression to grab our friends' names and number of friends they have, and then we'll paste it into another text file.

Copy the following regular expression into your search box `[,\d]+ friends`, then select "Find All". You should see it grabs all instances of text like `356 friends`.

_note -- you won't get ALL of your friends via this method, because for some reason the "friends" page on facebook sometimes lists friends with 'mutual' friend counts. You will still get most of them though._

Hit copy, and paste those into another document. 

To finish, delete any and all commas and all the ' friends' text (again, using `ctrl+f` <--- _hey that's the name of this blog!_ ---> and deleting all instances)

Save this file as 'data.csv' so we can load it into pandas to plot it. 

#### 3) Plot the data

Open up a python prompt and just try out the code below. You should see an image like the plot above.

```python
import pandas as pd
import matplotlib.pyplot as plt

ser = pd.read_table('data.csv')
average = ser.mean()
median = ser.median()
me = # YOUR FRIEND COUNT HERE

ser.hist(bins=20)
plt.suptitle("Histogram of Friend Counts", fontsize=16)

for (x,c) in zip([average, median, me],['k','b','r']):
	plt.vlines(x,0,120,colors=c)
plt.show()
```


