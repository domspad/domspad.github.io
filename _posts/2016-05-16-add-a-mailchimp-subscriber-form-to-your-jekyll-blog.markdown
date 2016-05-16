---
title: Add a Mailchimp subscribe form to your Jekyll blog
date: 2016-05-16T14:59:25-05:00
layout: post
---

Basic Outline
-------------

You will create a Mailchimp account, in which you will generate the html code for you new sign-up form. Then you will paste that code into your blog!


# Mailchimp steps

**1) Get a [Mailchimp Account](http://mailchimp.com/) (they're free)**

Up to 2,000 subscribers and 12,000 emails per month -- I think that will fit most of our purposes :)

**2) Create a list to keep track of your subscribers**

Once you've logged in, you should see a `Lists` menu option across the top of your screen. Like in the menu bar below:

![Create a List!](/assets/create_list.png)

This will let you create a list to keep track of all the people (hopefully not bots, but we'll get into how you don't have to worry about that below) that sign up. For this demo I named mine 'Subscribers'.

**3) Create an html-embeddable sign-up form to put on your blog**

If you now navigate to your new list, there will be a menu option under its name called 'Signup forms'. Here is an image of what that should look like:

![Create a Signup!](/assets/create_signup.png)

Navigate there, and then select "Embedded forms" to create your new signup form! There will be a few options for different styles you can choose from. I selected "Horizontal" because it fills the width of the page so I don't have to worry about centering. Also it lets you select how much information to ask of the user. I think minimal is best, considering people already don't want to give out their email these days. 

Under the "Preview" of your new signup form you should see a section "Copy/paste onto your site" -- with some html code below it. Here is an image:

![Create the code!](/assets/create_code.png)

Copy this board into your clipboard and proceed on to the Jekyll steps below! You are done with Mailchimp for now!

# Jekyll steps

**4) Create a file to hold your new embeddable sign-up form**

Instead of pasting the code from mailchimp into all sorts of spots on our blog, we will just create a file in our `_includes` folder called `newsletter.html` and paste the code there. This is nice because then we only have to update the mailchimp code in one place if we ever have to touch it again.

**5) "Include" the file in any page you want it to be seen**

I want the form to be on all of my pages, so we can just add the line `include newsletter.html` using `Liquid`'s curly brace syntax to any page we want to have the signup form! See below for an example.

![Create the includes!](/assets/create_includes.png)

Now make a git commit and push the changes to your blog and you should see a newsletter like the one I have here!

### Question: Do we have to worry about bots signing up on our site?

If you pick around in the html code for the signup form we got from Mailchimp, you'll see this line most likely

![Create hidden!](/assets/create_hidden.png)

This actually creates a "hidden" textbox that a normal user won't be able to find, but a bot reading the code of your webpage will incorrectly think is something it must fill out. So we can filter out any (silly) bots that sign up for our newsletter.
