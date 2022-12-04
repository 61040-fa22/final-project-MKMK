How this folder is organized:

- `common`: Layout-ish components used across all pages of site
- `Home`: Components for the main page
- `Item`: Everything to do with items and item diaries
- `User`: Everything to do with authentication, signing up, and profiles
- `util`: Reusable UI utilities like forms, an icon wrapper, a modal, a gallery, 3-dots menu component, etc.



Request:
    Model:
        itemId: Types.ObjectId;
        ownerId: Types.ObjectId;
        borrowerId: Types.ObjectId;
        startDate: Date;
        endDate: Date;
        accepted: boolean; (not required)
    Collection:
        addOne(itemId, borrowerId, startDate, endDate) create a borrow request
        findOneById(requestID) get the request with the given ID
        findAll() get all requests in the DB
        findAllByItem(itemID) get all requests made for the item with the given ID
        findAllByUser(userID, ownerStatus) get all requests to the user (owner) with the given ID if ownerStatus is true, or from the user ----(borrower) if ownerStatus is false
        acceptOne(requestID, accepted) accept or reject the request
        deleteOne(requestID) delete the given request
        deleteMany(userID) delete all requests associated with a given userId
    Middleware:
        isRequestExists -- does the request with the given ID in req.params exist
        isValidTimeRange -- do the dates in req.params occur after today, and does the end date occur after the start date

        todo: 
            isDatesAvailable -- check that item is available for the requested dates. todo later because logic with dates will be easier to ----implement when MVP is running
            isValidRequestModifier
    Router:
        GET /api/requests?name=username?owner=ownerStatus get the requests associated with the user as owner if ownerStatus == 'true' or ----borrower otherwise
        POST /api/requests create a request with req.body including itemId, startDate, and endDate
        DELETE /api/requests/:id delete the request with given id if current user made the request
        PATCH /api/requests/:id accept or reject the request with given id if current user is the owner of the item in the request. the ----body of the request should include a boolean called 'accepted'

