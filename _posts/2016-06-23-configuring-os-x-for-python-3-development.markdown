---
title: configuring OS X for Python 3 development
date: 2016-06-23T14:08:36-04:00
layout: post
published: false
tags:
 - python
---

I was a [little] [disapointed] [with] [the] [many] [resources] online for setting up your laptop to develop in python 3 so I've decided to do the wrong thing and write another.


# A good package manager for OS X
homebrew

`ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`


	
in your `.bash_profile`...
```
# Ensure user-installed binaries take precedence (for brew)
export PATH=/usr/local/bin:$PATH

# Set architecture flags
export ARCHFLAGS="-arch x86_64"
```



# Infrastructure for python environment management

```
# Then run the following command to ensure that there aren’t any potential problems with your environment. 
brew doctor 
# The following command will update to the latest version of Homebrew and its formulae
brew update
brew install python3
```


just pip (python3's), virtualenv, virtualenvwrapper
```
pip install --upgrade pip

ls -l /usr/local/bin/pip
    # lrwxr-xr-x  1 dominicspadacene  admin  31 Feb  2 10:03 /usr/local/bin/pip -> ../Cellar/python/2.7.11/bin/pip

which pip 
	# /usr/local/bin/pip
pip --version
	# pip 8.1.2 from /usr/local/lib/python3.5/site-packages (python 3.5)
pip freeze
pip install 

pip install virtualenv

#https://virtualenvwrapper.readthedocs.io/en/latest/
pip install virtualenvwrapper
mkdir -p $WORKON_HOME

```

```
export WORKON_HOME=~/Envs
source /usr/local/bin/virtualenvwrapper.sh
```

```
mkvirtualenv -p /usr/local/bin/<python2/3> newenvname
```
When installing via Homebrew Python’s pip, packages will be installed to /usr/local/lib/python2.7/site-packages, with binaries placed in /usr/local/bin

#autoenv!
```
http://docs.python-guide.org/en/latest/dev/virtualenvs/
autoenv
When you cd into a directory containing a .env, autoenv automagically activates the environment.

Install it on Mac OS X using brew:

$ brew install autoenv
And on Linux:

$ git clone git://github.com/kennethreitz/autoenv.git ~/.autoenv
$ echo 'source ~/.autoenv/activate.sh' >> ~/.bashrc
```

sources
http://docs.python-guide.org/en/latest/starting/install/osx/
https://hackercodex.com/guide/mac-osx-mavericks-10.9-configuration/
https://hackercodex.com/guide/python-development-environment-on-mac-osx/
https://virtualenvwrapper.readthedocs.io/en/latest/
https://pip.pypa.io/en/stable/user_guide/
http://docs.python-guide.org/en/latest/dev/virtualenvs/