# Backend Server Technical Specs

## Business Goal: 

A language learning school wants to build a prototype of learning portal which will act as three things:
- Inventory of possible vocabulary that can be learned
- Act as a  Learning record store (LRS), providing correct and wrong score on practice vocabulary
- A unified launchpad to launch different learning apps

## Technical Requirements 

- the backend will be built using Go
- the database will be SQLlite3
- the API will be built using Gin
- The API will always return JSON
- there will be no authentication and authorization
- Everything will be treated as a single user

## Database Schema

Our database will be a single sqllite database called `words.db` that will be in the root of the project folder of `backend_go`

We have follwong tables:
- words - stored vocabulary words 
    - id integer
    - bengali string 
    - english string 
    - parts json
- word_groups - join table for words and groups many-to-many 
    - id integer
    - word_id integer 
    - group_id integer 
- groups - thematic groups for words 
    - id integer
    - name string
- study_sessions - records of study sessions grouping word_review_items
    - id integer
    - group_id integer
    - created_at datetime
    - study_activity_id integer
- study activities - a specific study activity, linking a study session to a group
    - id integer
    - study_session_id integer
    - group_id integer
    - created_at datetime
- word-review-items - a ceocrd of word pracitce, determining if the word was correct or not
    - word_id integer
    - study_session_id integer 
    - correct boolean
    - created_at datetime

## API Endpoints 

### GET /api/dashboard/last_study_session
Returns details about the most recent study session.
#### JSON response 
```
{
  "id": 12,
  "group_id": 3,
  "created_at": "2024-03-01T15:30:00Z",
  "study_activity_id": 20,
  "group_name": "Basic Greetings"
}
```

### GET /api/dashboard/study_progress
- Returns user’s study progress
- Please note that the front end will determin progress bar based on total words studied and total available words.
#### JSON response 
```
{
  "total_words_studied": 500,
  "total_available_words": 1000
}
```

### GET /api/dashboard/quick-stats 
Provides a high-level overview of study engagement
#### json response
```
{
  "total_study_sessions": 25,
  "total_words_reviewed": 500,
  "accuracy_percentage": 70.0,
  "last_session_date": "2024-03-01T15:30:00Z"
}
```

### GET /api/study_activities/:id
Fetches details about a specific study activity
#### jason response
```
{
  "id": 20,
  "activity_name": "Vocubulary Quiz",
  "thumbnail_url": "https://example.com/thumbnail.jpg",
  "description": "Practice your vocabulary with flashcards",
}
```

### GET /api/study_activities/:id/study_sessions
Fetches study sessions associated with a specific study activity
#### json response
```
{
  "items": [
    {
      "id": 12,
      "activity_name": "Vocabulary Quiz",
      "group_name": "Basic Greetings",
      "start_time": "2024-03-01T15:20:00",
      "end_time": "2024-03-01T15:30:00",
      "review_items_count": 20
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_page": 5,
    "total_items": 100,
    "items_per_page": 20
  }
}

```

### POST /api/study_activities

#### Request params: 
- group_id
- study_activity_id 

#### json response
```
{
  "id": 21,
  "group_id": 15
}
```

### GET /api/words
 - pagination with 100 items per page
#### json response
```
{
  "items": [
    {
      "id": 1,
      "bengali": "স্বাগতম",
      "english": "Welcome",
      "correct_count": 5,
      "wrong_count": 2
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_page": 10,
    "total_items": 200,
    "items_per_page": 100
  }
}
```

### GET /api/words/:id 
#### json response
```
{
  "bengali": "স্বাগতম",
  "english": "Welcome",
  "stats":{
    "correct_count": 5,
    "wrong_count": 2,
  },
  "groups": [
    {
      "id": 1,
      "name": "Basic Greetings"
    }
  ]
}
```


### GET /api/groups
- pagination with 100 items per page
#### json response
```
{
  "id": 15,
  "name": "Basic Greetings",
  "stats":{
    "total_word_count": 20,
  }
}
```

### GET /api/groups/:id
#### json response
```
{
  "id": 15,
  "name": "Basic Greetings",
  "stats": {
    "total_word_count": 20
  }
}
```

### GET /api/groups/:id/words
### json response
```
{
  "items": [
    {
      "bengali": "স্বাগতম",
      "english": "Welcome",
      "correct_count": 5,
      "wrong_count": 2
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_page": 5,
    "total_items": 20,
    "items_per_page": 100
  }
}
```

### GET /api/groups/:id/study_sessions
#### json response
```
{
  "items": [
    {
      "id": 12,
      "activity_name": "Vocabulary Quiz",
      "group_name": "Basic Greetings",
      "start_time": "2024-03-01T15:20:00",
      "end_time": "2024-03-01T15:30:00",
      "review_items_count": 20
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_page": 5,
    "total_items": 20,
    "items_per_page": 100
  }
}

```
### GET /api/study_sessions
    - pagination with 100 items per page
#### json response
```
{
  "items": [
    {
      "id": 12,
      "activity_name": "Vocabulary Quiz",
      "group_name": "Basic Greetings",
      "start_time": "2024-03-01T15:20:00",
      "end_time": "2024-03-01T15:30:00",
      "review_items_count": 20
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_page": 5,
    "total_items": 100,
    "items_per_page": 100
  }
}

```
### GET /api/study_sessions/:id
#### json response
```
{
  "id": 12,
  "activity_name": "Vocabulary Quiz",
  "group_name": "Basic Greetings",
  "start_time": "2024-03-01T15:20:00",
  "end_time": "2024-03-01T15:30:00",
  "review_items_count": 20
}
```
### GET /api/study_sessions/:id/words
#### json response
```
{
  "items": [
    {
      "bengali": "স্বাগতম",
      "english": "Welcome",
      "correct_count": 5,
      "wrong_count": 2
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_page": 5,
    "total_items": 20,
    "items_per_page": 100
  }
}
```

### POST /api/reset_history
#### json response
```
{
  "success": true,
  "message": "Study history has been successfully reset."
}

```

### POST /api/full_reset
#### json response
```
{
  "success": true,
  "message": "System has been successfully reset."
}

```
### Post /api/study_sessions/:id/words/:words_id/review 
#### Request params: 
- id (study_session_id) integer
- word_id integer
- correct boolean

#### Request payload
```
{
  "success": true,
  "message": "Review for the word has been successfully recorded."
}
```

#### JSON respnse
{"success": true,
"word_id: 1,
"study_session_id: 123,
"correct": true,
"created_at": 2025-02-08T17:33:07-05:00"
}

## Mage Tasks
Mage is a task runner for Go.
Lets list out possible tasks we need for the language school

### Initialize Database
Thsi task will run a series of migrations sql files on the database

### Seed data
This task will import json files and transform them into target data for the database.
