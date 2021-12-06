# Tracking_System
Order Tracking

### Example user:

**Sender:**

    `{
        "id": 1,
        "name": "user1",
        "password": "user1",
        "content": "Lorem Ipsum",
        "email": "user1@email.com",
        "userType": "sender",
        "createdAt": "Mon Dec 01 2021 15:16:17 GMT+0530 (India Standard Time)",
        "updatedAt": "Mon Dec 03 2021 15:16:17 GMT+0530 (India Standard Time)"
    }`

**Biker:**
    `{
        "id": 6,
        "name": "user6",
        "password": "user6",
        "content": "Lorem Ipsum again",
        "email": "user6@email.com",
        "userType": "bikers",
        "createdAt": "Mon Dec 01 2021 16:17:18 GMT+0530 (India Standard Time)",
        "updatedAt": "Mon Dec 03 2021 16:17:18 GMT+0530 (India Standard Time)"
    }`


### Example Order:

**Order:**

    `{
        "orderId": 100,
        "createdAt": "Mon Dec 01 2021 15:16:17 GMT+0530 (India Standard Time)",
        "updatedAt": "Mon Dec 06 2021 19:14:32 GMT+0530 (India Standard Time)",
        "placedBy": "user1",
        "status": "pending"
    }`



Make sure you have Node and NPM installed both with `node -v && npm -v`.  
Install packages with `npm install`.  
Run server with `npm run start` for using **Nodemon**.