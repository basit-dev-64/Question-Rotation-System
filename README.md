# Dynamic Question Assignment System

---

## Strategy

### Design

The core components include:

1. Data Models: Utilizing Mongoose schemas to define the structure of Regions and Questions.
   - Region Schema: Contains information about each region, such as the current question assigned and the cycle duration.
   - Question Schema: Stores the questions, associated region, and assignment status.

2. Question Assignment Logic:
   - A dedicated function checks the current date against each region's next cycle date and assigns a random question to the region if the conditions are met.

3. Cron Job Scheduling: The system employs `node-cron` to automate question assignments weekly at a specific time (7 AM SGT).

4. APIs : There are two APIs added to the system  :-
         - An API that gets the current question for the user based on the provided region.
         - An API to update the current cycle duration for the current region.
---

### Implementation

The implementation follows these steps:

1. Database Setup: MongoDB Atlas is used for data storage. Collections for Regions and Questions are created with appropriate indices for efficient querying.
  
2. Cron Job Configuration: A cron job is scheduled to run every Monday at 7 AM SGT, invoking the assignment function.
  
3. Question Assignment Logic:
   - The function `assignQuestionsToAllRegions` retrieves all regions and checks their `nextCycleStartDate`.
   - If a region's cycle date matches the current date, a random unassigned question is selected and marked as assigned.
   - The `nextCycleStartDate` is updated based on the cycle duration.
   - All the questions are marked unassigned once all the questions are used for previous cycles incase if repetition is required.

---

## Pros and Cons

### Pros

- Scalability: The architecture supports growth, enabling the system to handle 100k daily active users and scale to millions.
  
- Flexibility: The system allows for configurable cycle durations.
  
- Asynchronous Processing: Utilizing asynchronous programming helps improve performance and responsiveness during database operations.

### Cons

- Complexity of Time Management .

- Potential Overhead with Large Data Sets: As the number of regions and questions increases, the queries may slow down if not properly indexed or optimized.
  

