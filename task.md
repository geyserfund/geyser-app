# Task: debugging a UI component

In this task you are given a UI bug and asked to fix it. Document your process and reasoning in the section [`My Solution`](#my-solution) below.

## Description

In the project view on mobile devices, the dynamic menu at the bottom of the screen (the bottom bar that has the "Fund this project" and "Activity" buttons) does not behave as expected. The menu bar is expected to:

1. be pinned to the bottom of the screen
2. hide away when the user scrolls up such that they can more easily read the text
3. re-appear when the user scrolls down

Instead the menu bar act unreliably and the following unwanted behaviour can be seen:

1. menu bar detaches from the bottom of the screen and moves up (see image below)
2. animation is slow

![image](floating-menu-bug.png)

Some of the relevant components are the following:

1. [`Menu molecule file`](./src/components/molecules/ProjectMobileMenu.tsx)
2. [`Info page file`](./src/pages/project/Activity/InfoPage.tsx)

### Additional information

The bug cannot be reproduced on a simulated environment such as the one provided on the Google Chrome Dev Tools. Debugging will require making use of a real device.

> **Hint:** look into localhost tunneling and, possibly, remote debugging

## My Solution

_Describe your solution below. Document your process and your progress in as much detail as you deem useful._

### Getting Setup

My first priority was making sure I could build and run the app and then interactively debug it on a native mobile device -- given the fact that this is where the bug was occurring.

I ran into some initial issues with running the app against the correct endpoints due to some typos in the docs -- which led to the app not being able to load at `https://staging.geyser.fund/`.

Fortunately, @steliosrammos was patient and helpful in guiding me to sort this out.

Unfortunately, I also encountered some indecipherable CORS issues while running the app locally that prevented data from being fetched from the backend's GraphQL endpoints. In order to not block other folks too much with my onboarding woes, I was able to improvise a functioning app by driving the components that were the focus of the bug with some [sample data]() (aka "Preview Data" -- a common practice, as it happens, in SwiftUI development 😎).

#### Debugging on a Mobile Device

Following the great guides [here](chrome://inspect#devices) and [here](https://developer.chrome.com/docs/devtools/remote-debugging/local-server/) allowed me to get an inspectable app running on a native Android device.

#### Tracing the data flow to understand the document and page structure

While the `ProjectMobileMenu` component is used in several places, following the rendering flow down from `Home` > `Project` > `Details` allowed me to focus in on a single place and truly start digging into the way it was being styled/displayed.

### Reproducing, Diagnosing & Debugging the Error

Initially, I wasn't able to reproduce the error because it apparently doesn't occur when users scroll on the page directly -- it's only apparent when they scroll by dragging from the top navigation bar.

One thing that was suspicious was the fact that the undesired offset seemed to match the height of the navigation bar -- which lead me to speculate that some kind of scroll position or window element was being incorrectly measured and used as the basis for defining the `ProjectMobileMenu`'s position.

Indeed, `ProjectMobileMenu` was attempting to set a `top` offset based upon the `window.innerHeight` property.

That led to a key idea 🔑: Attempting to estimate a `top` offset in the process of pinning an element to the bottom seems far too unreliable. Ideally, the such a component should be just be positioned `fixed` with a `bottom` of `0` — and then offset by either `0` or its height if we want to be concerned with animating it up and down to show/hide.

#### One Problem Solved... Another Appears

This worked great for the component that was being used on ..... insofar as I also [tweaked its positioning within the DOM hierarchy]().

That led to another key insight 🔑: `ProjectMobileMenu` is taking on far too many concerns -- all kinds of intricate logic related to reading a `viewName` and trying to configure styles for `position`, `top`, `bottom`, `padding`, etc based upon it (Not to mention the fact that `viewName` seemed to confusingly refer to the view that one of the buttons will switch back to 🤔).

As such, I felt like it would be much cleaner to split it into two separate components: `ProjectDetailsMobileMenu` for the bottom footer on the project details view, and `ProjectActivityActionsToolbar` foe the toolbar on the project activity `InfoPage`.

Each contains its own logic around where and how it should be positioned (and potentially animated).

As it stands, there's a small amount of duplication in the padding, coloring, and button labeling for these two components -- but I feel like it's _highly_ worth the benefit of removing the complex and often conflicting logic mentioned above.

(Furthermore, a future implementation could certainly improve upon this duplication, too. And quite frankly, I think this entire challenge highlights the potential for a better decoupling in general of the views being used across the “Description” page and the “Activity” panel 💪)
