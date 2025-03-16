# Frontend Technical Specs

## Pages

### Dashboard /dashboard

#### Purpose
The purpose of this page to provide a summary of learning and act as the default page when a user visits the webapp

#### Components
This page contains the following components
- Last Study Session 
    shows last activities used
    shows when last activities used
    summarizes wrong vs correct from last activity
    has a ling to the group

- Study Progess 
    - total words study eg. 3/124
        - accross all study sessions show the total words studied out of all possible words in our database
    - display a mastery progress   
- Quick Stats 
    - success rate eg. 80%
    - total study session eg. 4
    - total active group eg. 3
    - study streak eg. 4days 
- Start Studying Button
    - goes to study activities page 

#### Needed Endpoints

we will need following API endpoints to power this page
- GET /dashboard/last_study_session
- GET /dashboard/study_progress
- GET /dashboard/quick-stats 


### Study Activities

#### Purpose
The purpose of this page to show a collection of study activities with a thumbnail and its items, to either launch or view the study activity.

#### Components

- Study Activity Card
    - Show a thumbnail of the study activity 
    - the name of the study activity
    - a launch button to take us to the launch page 
    - the view ppage to view more information about past study sessions for this study activity

#### Needed Endpoints 

- GET /study_activities

### Study Activity (study-activities.png) `/study_activities/:id`

#### Purpose
The purpose of this page is to show the details of a study activity and its past study sessions.

#### Components
- Name of study activity
- Thumbnail of study actitivity
- Description of study activity
- Launch button
- Study Activities Paginated List
    - id
    - activity name
    - group name
    - start time
    - end time (inferred by the last word_review_item submitted)
    - number of the review items

#### Needed Endpoints 

- GET /api/study_activities/:id
- GET /api/study_activities/:id/study_sessions

### Study Activities Launch (study_activities_launch.png) `/study_activities/id:/launch`

#### Purpose
The purpose of this page is to launch a study activity

#### Components
- Name of the study activity
- Launch form
    - select field for group
    - launch now button

#### Behavior
After the form is submitted, a new tab opens with the study activity based on its URL provided in the database.

Also, after form is submitted, the page will redirect to the study session show page 

#### Needed Endpoints
- POST /api/study_activities

### Words (words.png) `/words`

#### Purpose
The purpose of this page is to show a list of words in our database.

#### Components
- paginated word list
    - Columns
        - Bengali
        - Engish
        - Correct Count
        - Wrong Count  
    - Pagination with 100 items per page
    - Clicking the Bengali word witll take us to the word show page

#### Needed Endpoints   
- GET /api/words 

### Word (word.png) `/words/:id`

#### Purpose
The purpose of this page is to show information about a specific word.

#### Components
- Bengali
- English
- Study Statistics 
    - Correct count
    - Worng counts
- Word Groups
    - Show a series of pills eg. tags
    - When group name is clicked it will take us to the group show page 

#### Needed Endpoints 
- GET /api/words/:id

### Word Groups (word_groups.png) `/groups`

#### Purpose
The purpose of this page to show a list of groups in our database 

#### Components
- Pagination Group List
    - Columns
        - Group name 
        -  Word Count
    - Clicking the group name will take us to the group show page 

#### Needed Endpoints 
- GET /api/groups

### Group (word_group.png) `/group/:id`

#### Purpose
The Purpose of this page is to show information about a specific group.

#### Components
- Group name
- Group Statistics 
    - Total word count
- WOrds in group (Paginated list of words)
    - should use the same column and same componennt at the word index page
- study sessions (Pagingated list of study sessions)
    - should use the same component as the study sessions 

#### Needed Endpoints 
- GET /api/groups/:id (the name and groups stats)
- GET /api/groups/:id/words
- GET /api/groups/:id/study_sessions

### Study Sessions Index (study_sessions.png) `/study_sessions`

### Purpose
The purpose of this page is to show a list of study sessions in our database. 

#### Components
- Pagination study session list
    - columns
        - Id
        - Activity Name 
        - Group Name 
        - Start Time
        - End Time 
        - Number of Review Items
- Clicking the study session id will take us to the study session show page 
#### Needed Endpoints 
- GET /api/study_sessions

### Study Session Show (study_session.png) `/study_session/:id`

### Purpose
The purpose of this page is to show information about a specific study session.

#### Components
- Study session details
    - Activity name
    - Group Name
    - Start Time
    - End Time
    - Number of Review Items
- Words Review Items (Paginated list of words)
    - Should use the same components as the words index page

#### Needed Endpoints
- GET /api/study_sessions/:id 
- GET /api/study_sessions/:id/words 

### Settings Page (setting.png) `/settings`

#### Purpose
The purpose of this page make configuration to the study portal.

#### Components
- Theme selection eg. Light, Dark, System Default
- Language selection - (English for now) 
- Reset history Button 
    - this will delete all study sessions and word review items
- Full Reset Button
    - this will drop all tables and recreate the seed data 

#### Needed Endpoints
- POST /api/reset_history
- POST /api/full_reset 