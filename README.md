# URL Shortener API

## Overview
The URL Shortener API provides a robust and feature-rich solution for creating, managing, and analyzing shortened URLs. It supports secure user authentication, custom aliases, and comprehensive analytics to track URL performance.

---

## Key Features
- **Authentication**: Secure Google OAuth for user login.
- **URL Shortening**: Generate shortened URLs with or without custom aliases and organize them by topics.
- **Redirection**: Resolve shortened aliases to their original URLs.
- **Analytics**: Gain insights into clicks, unique users, OS, device types, and topic-based metrics.
- **Secure Access**: JWT-based authentication for enhanced security.

---

## Tech Stack
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Authentication**: Google OAuth, JWT  
- **Hosting**: Vercel  

---

## Setup

### Prerequisites
1. **Node.js** (v16 or later): Install from [Node.js](https://nodejs.org/).
2. **MongoDB**: Install and run a local MongoDB instance or use a cloud MongoDB service like [MongoDB Atlas](https://www.mongodb.com/atlas).
3. **Google OAuth Credentials**: Set up a project in the [Google Cloud Console](https://console.cloud.google.com/) and obtain a Client ID and Client Secret.

---

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/url-shortener-api.git
   cd url-shortener-api
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Server**:
   Start the development server:
   ```bash
   npm start
   ```

---

### Scripts
- **Start the server**:
  ```bash
  npm start
  ```
- **Run in development mode** (with hot reloading):
  ```bash
  npm run dev
  ```
- **Lint the code**:
  ```bash
  npm run lint
  ```
---

---

## Authentication

### 1. **Google OAuth**
**Endpoint**: `GET /auth/google`  
- **Description**: Initiates Google OAuth login.  

**Response Codes**:  
- `302`: Redirect to Google login.  
- `500`: Internal Server Error.  

---

## URL Shortening

### 1. **Shorten URL**
**Endpoint**: `POST /api/shorten`  
- **Description**: Shorten a URL with an optional custom alias and topic.  

**Request Body**:  
```json
{
  "longUrl": "https://example.com",
  "customAlias": "myalias",
  "topic": "example"
}
```

**Response**:  
```json
{
  "status": "success",
  "shortUrl": "https://url-shortener-backend-api.vercel.app/myalias",
  "createdAt": "2025-01-12T12:00:00Z"
}
```

---

### 2. **Get Long URL**
**Endpoint**: `GET /api/shorten/{alias}`  
- **Description**: Retrieve the original URL for a shortened alias.  

**Response**:  
```json
{
  "status": 200,
  "longUrl": "https://example.com"
}
```

---

## Analytics

### 1. **Get Analytics for Alias**
**Endpoint**: `GET /api/analytics/{alias}`  
- **Description**: Retrieve detailed analytics for a shortened URL.  

**Response**:  
```json
{
  "totalClicks": 150,
  "uniqueUsers": 100,
  "clicksByDate": [
    {
      "date": "2025-01-11",
      "clickCount": 50
    }
  ],
  "osType": [
    {
      "osName": "Windows",
      "uniqueClicks": 80
    }
  ],
  "deviceType": [
    {
      "deviceName": "Desktop",
      "uniqueClicks": 100
    }
  ]
}
```

---

### 2. **Get Analytics by Topic**
**Endpoint**: `GET /api/analytics/topic/{topic}`  
- **Description**: Retrieve analytics data grouped by a specific topic.  

**Request Parameters**:  
- `topic`: The name of the topic for which analytics are requested.  

**Response**:  
```json
{
  "topic": "example",
  "totalUrls": 10,
  "totalClicks": 500,
  "uniqueUsers": 350,
  "clicksByDate": [
    {
      "date": "2025-01-11",
      "clickCount": 100
    }
  ],
  "osType": [
    {
      "osName": "Windows",
      "uniqueClicks": 200
    },
    {
      "osName": "MacOS",
      "uniqueClicks": 150
    }
  ],
  "deviceType": [
    {
      "deviceName": "Desktop",
      "uniqueClicks": 300
    },
    {
      "deviceName": "Mobile",
      "uniqueClicks": 200
    }
  ]
}
```

---

### 3. **Get Overall Analytics**
**Endpoint**: `GET /api/analytics/overall`  
- **Description**: Retrieve performance metrics for all shortened URLs.  

**Response**:  
```json
{
  "totalUrls": 500,
  "totalClicks": 15000,
  "uniqueUsers": 12000,
  "topTopics": [
    {
      "topic": "marketing",
      "totalClicks": 5000
    },
    {
      "topic": "education",
      "totalClicks": 3000
    }
  ],
  "clicksByDate": [
    {
      "date": "2025-01-11",
      "clickCount": 1000
    }
  ],
  "osType": [
    {
      "osName": "Windows",
      "uniqueClicks": 7000
    },
    {
      "osName": "MacOS",
      "uniqueClicks": 3000
    }
  ],
  "deviceType": [
    {
      "deviceName": "Desktop",
      "uniqueClicks": 8000
    },
    {
      "deviceName": "Mobile",
      "uniqueClicks": 4000
    }
  ]
}
```
```