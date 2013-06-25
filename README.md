# Toil
An eisenhower matrix based to-do list.

![Toil Screenshot](https://raw.github.com/anthonyryan1/toil/master/img/screenshot.jpg)

I used to have a text file that was a todo list, and it worked well, until it grew far beyond control.
Then I tried out Wunderlist and while an elegant presentation, I quickly lost track of what was important.
Then I spent a weekend trying out angularjs to build a todo list just for myself, and this is it.

# Productivity design decisions

* The Eisenhower matrix is the most effective I know for prioritizing, it was integrated in the design level
* A big list of tasks, similar to Wunderlist is a great way to view them
* Most big tasks have a lot of little pieces, so every task can have any number of subtasks
* A little note pad to jot random notes.

# Technical design decisions

* I was designing for my own use, so flexbox was an elegant approach to modern layouts.
* I was curious about testing AngularJS in a real but simple scenario, so I did.
* I like Compass & SCSS, so I used that.
* I didn't want to setup a database for something so trivial, so I googled for free nosql databases in the cloud, MongoLab arbitrarily chosen.


# Installation

Create a mongolab account, plug in the credentials & rename the .example files, then load index.html.