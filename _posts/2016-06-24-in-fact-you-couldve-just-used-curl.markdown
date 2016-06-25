---
title: In fact you could've just used curl
date: 2016-06-24T14:21:58-04:00
layout: post
tags:
 - python
 - bash
---



I wanted to get some text data from the discussion forums on [Project Euler](http://www.projecteuler.net) about the problems I had solved (context: Once you solve a problem on Project Euler, you get access to a discussion forum where people share how they solved the problem. I wanted to see what other people had done on the same problems).

So that makes about 100 different problems, each of which had a discussion forum spread across at least 8 separate web pages -- so 800 separate urls... I wasn't too keen on doing this by hand.

The problem was that in order to have access to these forums, you needed to be authenticated by logging in to the website with your username and password. This even included a (!gasp) Captcha. 

What was a robot to do?!

Well, I'm writing this because I learned both how TO do it and how NOT to. 

## curl -O 'http://www.oh-what-fun.com' (how to do it)

Unfortunately [`curl`](https://curl.haxx.se) wasn't my first solution, but it is the right one -- at least in terms of ease.

I just couldn't figure out how to get around the dang authentication. And then there is the CAPTCHA...

Well as a matter of fact, you CAN still be considered authenticated with `curl`, without doing the authentication with it directly.

Enter Google Chrome...

![image of developer tools](/assets/copy_as_curl.png)

That's right. Chrome provides the awesome capability to see the actual GET request it makes when fetching a particular web page. 

Here's the GET request it made fetching one of the forum pages (I've broken up the flags into separate lines for visibility)

```bash
curl -O 'https://projecteuler.net/thread=1;page=2' 
-H 'Accept-Encoding: gzip, deflate, sdch, br' 
-H 'Accept-Language: en-US,en;q=0.8' 
-H 'Upgrade-Insecure-Requests: 1' 
-H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/<MYIP> Safari/537.36' 
-H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' 
-H 'Cache-Control: max-age=0' 
-H 'Cookie: mjx.menu=renderer%3AHTML-CSS%26%3Bsemantics%3Atrue; DYNSRV=<SOME_VALUE>; PHPSESSID=<SOME_HASH>' 
-H 'Connection: keep-alive' --compressed
```

Here's the equivalent request had it been made with Python's requests library (using [this curl-to-requests converter](http://curl.trillworks.com/))

```python
cookies = {
    'mjx.menu': 'renderer%3AHTML-CSS%26%3Bsemantics%3Atrue',
    'DYNSRV': '<SOME_VALUE>',
    'PHPSESSID': '<SOME_HASH>',
}

headers = {
    'Accept-Encoding': 'gzip, deflate, sdch, br',
    'Accept-Language': 'en-US,en;q=0.8',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/<MY_IP>Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
}

requests.get('https://projecteuler.net/thread=1;page=2', headers=headers, cookies=cookies)
```

The funny thing is, __the request was the same whether or not I had logged in already to my account__. So what's going on here then? How does Project Euler know whether to return me the the default "you're-not-logged-in-yet" page or the one I requested? 

Notice the cookies included in the request (a bit easier to see in the python version above). There is a `PHPSESSID`, which basically is [keeping track of your session](http://stackoverflow.com/questions/1370951/what-is-phpsessid). So if I already logged in with Chrome, then I can have access to the pages via `curl` from within that same session.

The final magic comes from the fact all the pages were easily parameterized with `curl`'s syntax, e.g.

```bash
curl -O 'https://projecteuler.net/thread=[1-100];page=[1-8]'
```

So combining this parameterized version of the url with the above headers, you can get all the pages (_after_ you already logged into the website via your browser).


## yes, yes there's always Selenium (how not to do it)

After struggling with `curl` (before figuring out the neat trick with Chrome developer tools), I resided to figure out what's this [Selenium](http://www.seleniumhq.org/) thing all my web friends mention. 

Yes, it automates your web browser. Yes, it's a bit tedious.

Basically, imagine openning up your web browser and by clicking on links and putting text in input forms manually, navigating your way through the website whose content you'd like. That's essentially what my first solution came down to: [a python script](https://gist.github.com/domspad/2aa14c3686589bbf5ea2e3c156afa8d6) (using a [library for Selenium bindings](http://selenium-python.readthedocs.io/)) that manually clicks through the pages and downloading the content. 

It's actually sort of meditative once you get into the flow. The only trouble is figuring out the time delays you should wait for the succession of pages to load before you interact with their html elements. 

One tip: use [xpaths](http://www.w3schools.com/xsl/xpath_intro.asp) to navigate the html and find buttons, text input fields, etc. You can use your browser's developer tools to find the correct xpath for a given element once you've found it:

![xpath](/assets/copy_xpath.png)

