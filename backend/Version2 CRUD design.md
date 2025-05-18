Here's the detailed CRUD design for the requested endpoints:

---

### **1. Company Advertisements**

#### **Create Ad Campaign**
- **Endpoint**: `POST /advertisements`
- **Request**:
  ```json
  {
    "company_id": "comp_123",
    "title": "Summer Sale",
    "description": "Limited-time discounts!",
    "target_audience": ["students", "developers"],
    "budget": 5000,
    "start_date": "2024-07-01",
    "end_date": "2024-07-31",
    "status": "active"
  }
  ```
- **Response** (`201 Created`):
  ```json
  {
    "ad_id": "ad_xyz789",
    "status": "active",
    "created_at": "2024-06-25T10:00:00Z"
  }
  ```

#### **Get Ad Campaign**
- **Endpoint**: `GET /advertisements/{ad_id}`
- **Response** (`200 OK`):
  ```json
  {
    "ad_id": "ad_xyz789",
    "title": "Summer Sale",
    "status": "active",
    "budget": 5000,
    "remaining_budget": 4200
  }
  ```

#### **Update Ad Campaign**
- **Endpoint**: `PUT /advertisements/{ad_id}`
- **Request**:
  ```json
  {
    "status": "paused",
    "budget": 5500
  }
  ```

#### **Delete Ad Campaign**
- **Endpoint**: `DELETE /advertisements/{ad_id}`
- **Response**: `204 No Content`

#### **List Active Ads**
- **Endpoint**: `GET /advertisements/active?company_id=comp_123`
- **Response**:
  ```json
  {
    "active_ads": [
      {
        "ad_id": "ad_xyz789",
        "title": "Summer Sale",
        "status": "active"
      }
    ]
  }
  ```

---

### **2. Mentorship**

#### **Match Mentee/Mentor**
- **Endpoint**: `POST /mentorship/match`
- **Request**:
  ```json
  {
    "mentee_id": "user_123",
    "mentor_id": "user_456",
    "topics": ["career", "tech"]
  }
  ```
- **Response** (`201 Created`):
  ```json
  {
    "match_id": "match_abc123",
    "status": "active"
  }
  ```

#### **List Active Matches**
- **Endpoint**: `GET /mentorship/matches?user_id=user_123`
- **Response**:
  ```json
  {
    "matches": [
      {
        "match_id": "match_abc123",
        "mentor": "John Doe",
        "mentee": "Jane Smith",
        "start_date": "2024-06-25"
      }
    ]
  }
  ```

#### **End Mentorship**
- **Endpoint**: `DELETE /mentorship/matches/{match_id}`
- **Response**: `200 OK`
  ```json
  { "message": "Mentorship ended successfully" }
  ```

---

### **3. Subscriptions**

#### **Create Subscription Plan**
- **Endpoint**: `POST /subscriptions`
- **Request**:
  ```json
  {
    "name": "Pro Plan",
    "price": 29.99,
    "duration_days": 30,
    "features": ["unlimited_courses", "certificates"]
  }
  ```
- **Response** (`201 Created`):
  ```json
  {
    "subscription_id": "sub_789",
    "status": "active"
  }
  ```

#### **Get User Subscriptions**
- **Endpoint**: `GET /subscriptions/{user_id}`
- **Response**:
  ```json
  {
    "subscriptions": [
      {
        "subscription_id": "sub_789",
        "plan": "Pro Plan",
        "renewal_date": "2024-07-25"
      }
    ]
  }
  ```

#### **Cancel Subscription**
- **Endpoint**: `DELETE /subscriptions/{subscription_id}`
- **Response**:
  ```json
  { "message": "Subscription cancelled. Valid until 2024-07-25" }
  ```

---

### **4. Event Suggestions**

#### **Get Personalized Suggestions**
- **Endpoint**: `GET /events/suggestions?user_id=user_123`
- **Response**:
  ```json
  {
    "suggestions": [
      {
        "event_id": "event_321",
        "name": "AI Conference 2024",
        "date": "2024-09-15",
        "relevance_score": 0.92
      }
    ]
  }
  ```

---

### **Notes**
1. **Authentication**: All endpoints require authentication (JWT token in header).
2. **Filtering**: Use query params like `?status=active&company_id=comp_123` where applicable.
3. **Pagination**: Add `?page=1&limit=10` for list endpoints if needed later.
4. **Error Handling**: Standard HTTP codes (404 for missing resources, 400 for invalid data).

Need adjustments? Let me know! 🛠️