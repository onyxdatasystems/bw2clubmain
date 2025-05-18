## User Profile & Skills

    GET /skills

        Retrieve all skills of the user.

    PUT /skills

        Update user’s skills.
    json

    { "skills": ["Python", "Project Management"] }

    CRUD Education

        POST /education, GET /education/{id}, PUT /education/{id}, DELETE /education/{id}

    CRUD Work Experience

        POST /work, GET /work/{id}, PUT /work/{id}, DELETE /work/{id}

## Competitions & Initiatives

    GET /competitions/ongoing

        List ongoing competitions.

    GET /competitions/past

        List past competitions.

    GET /competitions/upcoming

        List upcoming competitions.

##    Initiatives

        POST /initiatives/{id}/cheer (Support an initiative)

        POST /initiatives/{id}/feedback (Submit feedback)

        POST /initiatives/{id}/spread (Share initiative)

## Advertisements

    CRUD Ad Campaigns

        POST /advertisements, GET /advertisements/{id}, PUT /advertisements/{id}, DELETE /advertisements/{id}

    GET /advertisements/active

        List active ads.

## Mentorship

    POST /mentorship/match

        Match mentees with mentors.

    GET /mentorship/matches

        List active mentorship matches.

    DELETE /mentorship/matches/{id}

        End a mentorship.

## Subscriptions

    POST /subscriptions

        Create a subscription plan.

    GET /subscriptions/{user_id}

        Get user’s active subscriptions.

    DELETE /subscriptions/{id}

        Cancel a subscription.

## Event Suggestions

    GET /events/suggestions

        Get personalized event recommendations.

## Learning Features

    POST /learning/track

        Track learning progress.

    GET /learning/suggestions

        Get suggested resources.

## Companies

### CRUD Companies

    POST /companies, GET /companies/{id}, PUT /companies/{id}, DELETE /companies/{id}

### Company Staff

    POST /companies/{id}/staff, DELETE /companies/{id}/staff/{user_id}

### Company Groups

    POST /companies/{id}/groups, PUT /companies/{id}/groups/{group_id}

    GET /companies/search

    Search companies with filters (e.g., ?industry=tech).


## Courses

### CRUD Courses

    POST /courses, GET /courses/{id}, PUT /courses/{id}, DELETE /courses/{id}

### Content Management

    POST /courses/{id}/content (Upload videos/PDFs/SCORM)

### Modules/Chapters

    POST /courses/{id}/modules, PUT /courses/{id}/modules/{module_id}

### Enrollment

    POST /courses/{id}/enroll

### Progress Tracking

    GET /courses/{id}/progress

### Assessments

    POST /courses/{id}/quizzes, POST /courses/{id}/exams

### Certificates

    POST /courses/{id}/certificates (Generate)

### Live Classes

    POST /courses/{id}/live-sessions

### Discussion Forums

    POST /courses/{id}/discussions

## Assessments

    POST /assessments

        Create assessments (MCQs, essays).

    POST /assessments/{id}/submit

        Submit answers.

    GET /assessments/{id}/results

        View results.

## Certificates

    POST /certificates/generate

        Generate certificate.

    GET /certificates/{id}/verify

        Verify certificate.

    POST /certificates/{id}/share

        Share certificate (e.g., email/LinkedIn).

## Zoom Integration

    POST /zoom/meetings

        Create/update Zoom meetings.

    GET /zoom/meetings/{id}/registrants

        List registrants.

    POST /zoom/webhooks

        Handle Zoom webhook events.

## Notifications

    GET /notifications

        List notifications.

    PUT /notifications/{id}/read

        Mark as read.

    PUT /notifications/preferences

        Update notification settings.

## Analytics

    GET /analytics/user-progress

        Track user progress.

    GET /analytics/course-engagement

        Course engagement metrics.

    GET /analytics/revenue

        Generate revenue reports.

## Payment

    POST /payment/process

        Process one-time payments.

    POST /payment/subscriptions

        Manage subscriptions.

    POST /payment/coupons

        Apply coupons.

## System Endpoints

    GET /health

        Health check.

    GET /config

        Retrieve system configuration.

    GET /logs

        View system logs (admin-only).

## Documentation(How it was Created)
    
    composer update knuckleswtf/scribe --with-all-dependencies

    php artisan scribe:generate -v