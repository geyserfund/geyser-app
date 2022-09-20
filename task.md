# Task: debugging a UI component

In this task you are given a UI bug and asked to fix it. Document your process and reasoning in the section [`My solution`](#my-solution) below. 

## Description

In the project view on mobile devices, the dynamic menu at the bottom of the screen does not behave as expected. The menu bar is expected to:

1. be pinned to the bottom of the screen
2. hide away when the user scrolls up such that they can more easily read the text
3. re-appear when the user scrolls down 

Instead the menu bar act unreliably and the  following unwanted behaviour can be seen: 

1. menu bar detaches from the bottom of the screen and moves up (see image below)
2. animation is slow 

![image](floating-menu-bug.png)

Some of the relevant components are the following: 

1. [`Menu molecule file`](./src/components/molecules/ProjectMobileMenu.tsx)
2. [`Info page file`](./src/pages/project/Activity/InfoPage.tsx)

### Additional information

The bug cannot be reproduced on a simulated environment such as the one provided on the Google Chrome Dev Tools. Debugging will require making use of a real device.

> **Hint:** look into localhost tunneling and, possibly, remote debugging

## My solution

*Describe your solution below. Document your process and your progress in as much detail as you deem useful.*