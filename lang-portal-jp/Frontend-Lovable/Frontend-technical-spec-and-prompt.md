# Frontend — Lang Portal


##Business Goal: 

A language learning school wants to build a prototype of learning portal which will act as three things:
Inventory of possible vocabulary that can be learned
Act as a record store, providing correct and wrong score on practice vocabulary
A unified launchpad to launch different learning apps

- You have been tasked with creating the frontend API of the application.
- The fractional CTO has made strong recommendation that you settle on a frontend stack that is being commonly adopted and optimized for AI prototyping services.
- The frontend application should powered by your backend API.


## Technical Restrictions:

###The technical stack should be the following:
- Typescript (statically typed javascript)
- Tailwind CSS (css framework)
- Vite.js (frontend tool)
- ShadCN (UI components)

### Leverage an AI prototyping service to write your frontend code:
- Lovable.dev
- Bolt.new
- v0.dev

### Leverage AI-coding assistants as a secondary AI service to write your frontend code:
- Cursor
- Windsurf Codeium
- Github Copilot
- Amazon Q Developer
- Google Code Assist



# Frontend Prompting:

## Project brief or description

## Target
We would like to build a Japanese language learning web app which serve following purposes:
- A portal to launch study activities
- To store, group and explore Japanese vocabulary
- To review Study progress.
- The webapp is intended for desktop only. We dont need to develop mobile layouts. 

## Technical requirements:
- React.js as the frontend library
- Tailwind CSS as the css framework 
- Vite.js as the local development server
- Typescript for the programming language 
- ShadCN for components

## Frontend Routes
- This is a list of routes for our web-app we are building
- Each of these routes are a page and we will describe them in more detail under the pages handling. 

    /dahsboard 
    /study-activities 
    /study-activities/:id 
    /words
    /words/:id 
    /groups
    /groups/:id 
    /sessions
    /settings

- The default route / should forward to /dashboard

- Global components
- Navigation

- There will be a horizontal navigation bar with the following links:
    - Dashboard
    - Study Activities 
    - Words
    - Word groups
    - Sessions
    - Settings

Breadcrumbs: Beneath the navigator there will be breadcrumbs so user can easily see where they are. 
- Examples of Breadcrumbs:
    - Dashboard
    - Study Activities > Adventure MUD
    - Study Activiries > Typing Tutor 
    - Words > (japanese word)
    - Word Groups > Core Verbs  
 
- Pages
- Dashboard 

- This page provides a summary of the students progression
-   Last sessions 

- Study Activities Index

- The route for this page /study-activities 

A card has a:
    - Thumbnail
    - Title
    - ‘Launch’ button
    - ‘View’ button

The launch button will open a new address in a new tab.
Study activities are their own apps, but in order for them to launch they need to be provided a group_id

Eg. localhost:8081/group_id=4

The route for this page /study-activities/:id 

This page will have a information section which will contain:
Thumbnail
Title
Description
Launch Button 

There will be a list of sessions fir this study activity 
A session item will contain
Group name: so you know what group name was used for he sessions 
This will be a link to the group show page 
Start Time: When the session was created in YYYY-MM-DD HH:MM format (12 hours)
End time: when the last word_review_item was created 
Review items: The number of reviews items 

27 mins
Word Index
The route for this page/words

This is a table of words with following cells:
Japanese: The Japanese word with Kanji
This will also contain a small button to play the sound of the word
The Japanese word will be a link to the words Show page
Romaji: The Romaji version of the word
English: the English version of the word
Correct: Number of correct word review items 
Wrong: Number of the wrong word review items

There should only be 50 words displayed at a time

There needs to be pagination
Previous button: Grey out if you cannot go further back 
Page 1 of 3: WIth the current page bolded.
- Next button: Greyed out if you cannot go any further forwarded

All table heading should be sortable, if you click it will toggle between ASC and DESC.
An ASCII arrow should indicate direction anf the column being aorted with ASC pointing down and DRSC pointing up.


## Words Show

The route for this page /words/:id 

## Word Groups Index

The route for this page /word-groups

This is table of word groups with the following cells:
Group Name: The name of the group
THis will be a link to Word Group
Words: The number of words associated with this group

This page contains the same sorting and pagination logic as the Words Index page

## Word Groups Show

The route for this page /sessions

This page contains a list of of sessions similar to Studies/Activities Show

This page contains same sorting and pagination logic as the Words Index page


## Settings Page

The route for this page /settings

Reset History Button: This has a button that allows us to reset the entire database.
We need to confirm this action in a dialogue and type the word reset me to confirm.

Dark Mode Toggle: This is a toggle that changes from light to dark theme.


>>>>>>>>>>>>>>
Directory structure generated by Lovable:

Based on the code provided, here is the current directory structure of your project:


/
├── index.html
├── public/
│   ├── favicon.ico
│   ├── og-image.png
│   └── placeholder.svg
└── src/
    ├── App.css
    ├── App.tsx
    ├── components/
    │   ├── dashboard/
    │   │   └── DashboardCard.tsx
    │   ├── layout/
    │   │   ├── Breadcrumbs.tsx
    │   │   ├── MainNavigation.tsx
    │   │   ├── Navbar.tsx
    │   │   └── PageContainer.tsx
    │   └── ui/
    │       ├── accordion.tsx
    │       ├── alert-dialog.tsx
    │       ├── alert.tsx
    │       ├── aspect-ratio.tsx
    │       ├── avatar.tsx
    │       ├── badge.tsx
    │       ├── breadcrumb.tsx
    │       ├── button.tsx
    │       ├── calendar.tsx
    │       ├── card.tsx
    │       ├── carousel.tsx
    │       ├── chart.tsx
    │       ├── checkbox.tsx
    │       ├── collapsible.tsx
    │       ├── command.tsx
    │       ├── context-menu.tsx
    │       ├── CustomButton.tsx
    │       ├── dialog.tsx
    │       ├── drawer.tsx
    │       ├── dropdown-menu.tsx
    │       ├── form.tsx
    │       ├── hover-card.tsx
    │       ├── input-otp.tsx
    │       ├── input.tsx
    │       ├── label.tsx
    │       ├── menubar.tsx
    │       ├── navigation-menu.tsx
    │       ├── pagination.tsx
    │       ├── PaginationControls.tsx
    │       ├── popover.tsx
    │       ├── progress.tsx
    │       ├── radio-group.tsx
    │       ├── resizable.tsx
    │       ├── scroll-area.tsx
    │       ├── select.tsx
    │       ├── separator.tsx
    │       ├── sheet.tsx
    │       ├── sidebar.tsx
    │       ├── skeleton.tsx
    │       ├── slider.tsx
    │       ├── sonner.tsx
    │       ├── switch.tsx
    │       ├── table.tsx
    │       ├── tabs.tsx
    │       ├── textarea.tsx
    │       ├── toast.tsx
    │       ├── toaster.tsx
    │       ├── toggle-group.tsx
    │       ├── toggle.tsx
    │       ├── tooltip.tsx
    │       └── use-toast.ts
    ├── hooks/
    │   ├── use-mobile.tsx
    │   ├── use-toast.ts
    │   └── useTransitionNavigation.tsx
    ├── index.css
    ├── lib/
    │   └── utils.ts
    ├── main.tsx
    ├── pages/
    │   ├── Dashboard.tsx
    │   ├── GroupDetail.tsx
    │   ├── Groups.tsx
    │   ├── Index.tsx
    │   ├── NotFound.tsx
    │   ├── Sessions.tsx
    │   ├── Settings.tsx
    │   ├── StudyActivities.tsx
    │   ├── StudyActivityDetail.tsx
    │   ├── WordDetail.tsx
    │   └── Words.tsx
    ├── types/
    │   └── index.ts
    └── vite-env.d.ts

This structure shows a well-organized React application with:

Component directories split by function (dashboard, layout, ui)
Dedicated pages folder for route components
Custom hooks in a hooks folder
Utility functions in lib
Type definitions in a types folder
The UI components are primarily from the shadcn/ui library, with some custom components like CustomButton and PaginationControls.
