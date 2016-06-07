---
title: How are python packages installed and distributed?
date: 2016-04-28T18:37:04-05:00
layout: post
tags:
 - python
---

How does your code go from a git repository to being installed on your system so that you can `import` it? I recently realized I didn't really understand the process. I knew it involved `setup.py` stuff, something called an `egg`, maybe `pip` if you're lucky.

Well, this post will give the minimal ingredients to experiment yourself with what goes on under the covers of python package installation and distribution

Credit for the example goes to Alexandre Chabot-Leclerc. He's a real python wizard.

## Ingredients

#### 1) An example python code repo that you can get from [this link](https://github.com/domspad/gobble)

Here are what it's contents look like 
	
	[gobble]$ tree
	.
	|____gobble
	| |______init__.py
	| |____di.py
	| |____gook.py
	|____README.txt
	|____setup.py

You can get the repo via `git clone https://github.com/domspad/gobble`

#### 2) Some basic bash commands

	which   			# tells you where the program lives in your file system
	tree 				# a nice visual representation of a directory
	rm -rf <dir>    		# a sure-fire way of removing a directory

Be careful with that last one


## Setup

After cloneing `gobble` to your computer, get two terminals opened to different directors. One will be opened to `gobble/` and the other will be opened to the `site-packages/` directory where python keeps (almost) all the python packages you've installed. You can find it by looking at where your `python` is running from:

	$which python 
	/usr/local/bin/python  # I am using the default python distribution from OSX

Then, take that path, cut off `bin/python` and instead type `lib/python2.7/site-packages/`. So mine would be

	/usr/local/lib/python2.7/site-packages/

Now you can try the many different ways of installing `gobble` into your python environment! Below are a list of bash commands you can run in your terminal that is located in your `gobble/` directory. Each will do something with the source code and put something in your `site-packages/` directory. Then you can confirm that by entering the python prompt and trying `import gobble` you will find the code!

After trying each command, you can "clean up" your `site-packages/` and `gobble/` simply by removing the added directories. 

The list of installation methods to try

	python setup.py install
	
	pip install .

	python setup.py develop
		
	pytohn setup.py bdist_egg -d <path-to-your-site-packages-directory>

## An Example

in the `gobble/` terminal

	$tree
	.
	|____gobble
	| |______init__.py
	| |____di.py
	| |____gook.py
	|____README.txt
	|____setup.py
	
	$python setup.py install
	...
	(lots of output...)
	...

in the `site-packages/` terminal

	$ls | grep 'gobble'
	gobble-2.0.0-py2.7.egg 		# we've found the installed 'egg'!
	$cd gobble-2.0.0-py2.7.egg
	$tree
	.
	|____EGG-INFO
	| |____dependency_links.txt
	| |____not-zip-safe
	| |____PKG-INFO
	| |____SOURCES.txt
	| |____top_level.txt
	|____gobble
	| |______init__.py
	| |______init__.pyc
	| |____di.py
	| |____di.pyc
	| |____gook.py
	| |____gook.pyc

If you inspect the files and try `import gobble` in a python prompt, you will see what `python setup.py install` did. It zipped up our code in `gobble/`, including the compiled byte-code versions along with some metadata about the repo, like what packages it depends on and what the file structure looks like. 

To get back to where we started so you can try of the other ways of installing `gobble` do the following:

in the `gobble/` terminal
	
	$rm -rf build/ dist/ gobble.egg-info/

in the `site-packages/` terminal

	$rm -rf gobble-2.0.0-py2.7.egg

Have fun with the other ways!





