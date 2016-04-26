---
layout: post
title: Python GUI Programming
date: 2016-04-26T06:55:04-05:00
---
This one has to end on a cliff-hanger -- as most efforts do when trying to implement GUI programs it seems.

## The Goal

The program we are building opens an error pop-up message when you try to open a file type it was not built for.

*My mission: change the size of the pop-up window.*

Sounds innocuous doesn't it? I mean, surely, window resizing was one of the first features the designers of a GUI programming langauge would account for, right? Well, then there's GUI programming in Python...

## The setup

We do all of our GUI programming here in Python. While sometimes it's a little confusing working from so high up the programming language stack (especially when things go wrong with one of the low-level libraries it depends on, say one written in C) in general, it allows my team to get features implemented quick. Say, 10x faster than doing it all from Qt itself...

Many of our GUI apps are built around a Python library called Pyface -- which lets you create a file browser dialog in a couple of lines of python code, not worrying about the underlying [widget toolkit](https://en.wikipedia.org/wiki/List_of_widget_toolkits#Cross-platform) being used (Qt, wxWidgets,...).

It's not a [binding](https://en.wikipedia.org/wiki/Language_binding) for widget toolkit libraries (like Qt, which is written in C++). It CALLS the binding libraries depending on the toolkit it was assigned to used for that platform. For Python, these are [PySide](https://pyside.github.io/docs/pyside/) and [Pyqt](https://riverbankcomputing.com/software/pyqt/intro) for Qt and [wxPython](http://www.wxpython.org/) for wxWidgets.

The problem: How to resize the 'MessageDialog' popup window


### Documentation

Ok, there should be somewhere in the [pyface documentation](http://docs.enthought.com/pyface/) hopefully about how to change the size of a MessageDialog...


![Message Dialog](/assets/message_dialog_module.png)

Well, that essentially tells me nothing... It looks like I'm going have to look at the classes from which it inherits from...

{% highlight python %}
In [1]: from pyface.api import MessageDialog

In [2]: from inspect import getmro

In [3]: getmro(MessageDialog)    # This returns the "method resolution order" of a class (the classes from which it inherits)
Out[3]:
(pyface.ui.qt4.message_dialog.MessageDialog,
 pyface.i_message_dialog.MMessageDialog,
 pyface.ui.qt4.dialog.Dialog,
 pyface.i_dialog.MDialog,
 pyface.ui.qt4.window.Window,
 pyface.i_window.MWindow,
 pyface.ui.qt4.widget.Widget,
 pyface.i_widget.MWidget,
 traits.has_traits.HasTraits,
 traits.ctraits.CHasTraits,
 object)
{% endhighlight %}



Whoa that's a lot of subclassing!

Widget toolkits in general have a natural OO structure, which you can see here in the pyface code as well: Widgets > Window > Dialog > MessageDialog. Because of this general pattern in most toolkits, pyface has chosen to mimic this structure.

It turns out the `M...` classes stand for 'Mixin' classes that are meant to provide toolkit INDEPENDENT code to each of these levels, and then the `qt4` layers you see are providing the Qt-specific code (our langauge binding is PySide, since its free).

After digging around these classes, we find the ones responsible for 'size':

![IWindow Class](/assets/i_window_image.png)

well, not really, since its actually in the 'interface' side of the code (another practice from the Gang of Four):

![IWindow Class](/assets/qt_window_image.png)

Great! So we can just set the size=(int, int) and we should be good!

### Attempt

To experiment, we create a *minimal example* to do fast iterations in case of something doesn't work (which is often the case with GUI programs)


{% highlight python %}
...
from pyface.api import MessageDialog
parent = self.application.active_window.control
dialog = MessageDialog(
    parent=parent,
    message=u'An unhandled exception has occurred.',
    title='Error',
    severity='error',
    informative=exception_info,
    detail=details,
)
dialog.open()

...
{% endhighlight %}

MINIMIZE!

{% highlight python %}
from pyface.api import MessageDialog
dialog = MessageDialog(size=(200,300))
dialog.open()
{% endhighlight %}

Yet, it seems no matter what we set for `size=`, the window appears unchanged.

And so we are left to ponder... what is going on here and why is my window not resizing!?

Let's see if we can debug it next time!


