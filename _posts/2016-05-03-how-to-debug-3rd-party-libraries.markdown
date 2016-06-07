---
title: How to debug 3rd party libraries
date: 2016-05-03T08:41:32-05:00
layout: post
tags:
 - python
---

# Problem

Let's say you are using some 3rd party library in your code, and all of the sudden it throws an error.
For the sake of an example, I'll be using the python `requests` library (see [here](http://docs.python-requests.org/en/master/)).

![bug-3rd-party](/assets/bug_3rd_party.png)

What do you do? Do you go through the installed code in your `site-packages`, laying debug statements around until you find the bug? What if you forget to clean them out afterward and try using the package again?

Thankfully, there is another way around, that won't risk any of your installed packages

# The Fix

In short, to avoid touching any of your installed 3rd party libraries, you will actually `git clone` the library down again, and play with it there. Then you can uninstall and delete that whenever you want!

Here are the steps:

```bash
# Here we see inside a Python interpreter where the current version of requests lives
In [1]: import requests

In [2]: requests.__path__
Out[2]: ['/Users/domspad/example/lib/python2.7/site-packages/requests']

# 1 - clone the repo
$ git clone https://github.com/kennethreitz/requests.git
... #lots of output
...

# 2 - `cd` into the repo, and install it in 'develop' mode
$ python setup.py develop
...
...
Creating /Users/domspad/example/lib/python2.7/site-packages/requests.egg-link (link to .)
Adding requests 2.10.0 to easy-install.pth file
```

What `python setup.py develop` does is tell your Python interpreter "Ok, if someone `import`s `requests`, I want you to look in this new place first before looking in `site-packages/` for it." (where all of your clean 3rd-party libraries live).

```bash
# Here we see inside a Python interpreter, we are now using our new version of requests
In [1]: import requests

In [2]: requests.__path__
Out[2]: ['/Users/domspad/Desktop/requests/requests']
```

The nice thing is that you can edit this code now and without running any more commands, your library will update to reflect it.

![Modify 3rd party code](/assets/requests_modify.png)


```bash
# Here we see the change we made to the code!
In [3]: from requests.api import a_change

In [4]: a_change()
I DID THIS!
```

After you are done messing around, and want to get back to your original version of `requests` you just need to run one simple command

```bash
# 3 - uninstall your develop version of the 3rd party library once you are done
$ python setup.py develop --uninstall
running develop
Removing /Users/domspad/example/lib/python2.7/site-packages/requests.egg-link (link to .)
Removing requests 2.10.0 from easy-install.pth file

# Here we see that importing `requests` again gives us back our old version of it
In [1]: import requests

In [2]: requests.__path__
Out[2]: ['/Users/domspad/example/lib/python2.7/site-packages/requests']
```