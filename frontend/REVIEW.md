# Frontend Code Review

## Overview

I reviewed the frontend before making changes and tried to keep the parts that were already structured well.

The Tasks module was mostly in good shape, so I did not want to rewrite it just for the sake of changing things. The Activity page was the main area that needed work. It had duplicated filtering/formatting logic, extra state, and a timer that was forcing rerenders for no useful reason.

I also added the required Reports page and made the navigation/UI a little more consistent across the app.

---

## 1. Activity Page Was Rerendering on a Timer

**Category:** Performance

The biggest issue I found was in `app/activity/page.tsx`.

The page had a `tick` state that was updated using a timer every 1.4 seconds. That value then caused other Activity logic to run again even though the underlying activity data had not changed.

This meant the page was continuously doing work in the background without getting any new data.

I removed the timer and the `tick` state completely.

Activity now rerenders when something that actually matters changes, such as:

- new activity data being loaded
- the search query changing

---

## 2. Duplicate Activity Filtering

**Category:** Maintainability / Code quality

The original Activity page had both:

- `applyFilterA`
- `applyFilterB`

They were effectively solving the same filtering problem.

There was also a separate `shownActivity` state even though that list could be calculated from the original activity data and the current search query.

I removed the duplicated filtering functions and calculate the filtered result with `useMemo` instead.

The flow is now much simpler:

Activity data + search query → filtered activity

There is no need to keep another copy of the filtered list in state.

---

## 3. Unnecessary Activity List Cloning

**Category:** Performance / Code quality

The Activity page also had `forcedList`, with logic that would sometimes clone the activity array or clone each item.

That did not add any real functionality, but it created new object references and contributed to unnecessary rerenders.

I removed `forcedList` completely.

The Activity list is now rendered directly from the filtered result.

---

## 4. Duplicate Date Formatting

**Category:** Code quality

The page had two date formatting functions:

- `formatTimeA`
- `formatTimeB`

They were doing the same job.

I removed both and moved the display of an activity item into:

`components/activity/ActivityItem.tsx`

The timestamp is now formatted once using:

`new Date(item.when).toLocaleString()`

This also keeps the date formatting close to the component that actually displays it.

---

## 5. Activity Page Was Doing Too Much

**Category:** Maintainability

`app/activity/page.tsx` was responsible for fetching data, filtering, timer logic, formatting, error behavior, and rendering the full activity list.

I split that responsibility into:

- `hooks/useActivity.ts`
- `components/activity/ActivityFeed.tsx`
- `components/activity/ActivityItem.tsx`

The page itself is now mostly responsible for rendering the Activity feature.

This made the logic easier to follow and also made the loading/error/search behavior easier to test separately.

---

## 6. Activity Error Handling

**Category:** UX / Bugs

The original Activity implementation treated an API failure almost the same as an empty list.

That is confusing from a user point of view because there is a big difference between:

- there being no activity
- the application failing to load activity

I added separate states for:

- loading
- API error
- empty search result
- successful data

If the request fails, the page now shows:

`Could not load activity.`

with a `Retry` button.

I also tested this by stopping the backend, refreshing the page, restarting the backend, and retrying the request.

---

## 7. Generic Request Logic Inside `useTasks`

**Category:** Maintainability

`hooks/useTasks.ts` contained generic helpers:

- `getErrorMessage`
- `requestJson`

Those functions were not really specific to Tasks, and Reports/Activity also needed similar request handling.

I moved the shared request logic into:

`lib/apiClient.ts`

The hooks can now reuse the same request/error handling instead of each feature creating another version.

---

## 8. Task Dashboard Improvements

**Category:** UX

The existing Task components were already reasonably separated, so I left that structure in place.

I added some summary information to make the dashboard more useful:

- Total Tasks
- Completed
- Pending

The values are derived from the existing `tasks` state inside `useTasks`.

They update automatically when a task's completion status changes.

I kept the existing:

- All
- Completed
- Pending

filters and task status update flow.

---

## 9. Reports Feature

This was a required addition rather than an issue with the original code.

I added a new Reports page at:

`/reports`

The backend already provides:

`GET /reports/tasks-summary`

I kept the existing frontend architecture where Next.js API routes sit between the UI and the backend.

I added:

`app/api/reports/tasks-summary/route.ts`

which proxies the request through the existing backend API layer.

I also added:

- `hooks/useReports.ts`
- `components/reports/ReportsDashboard.tsx`
- `components/reports/StatCard.tsx`
- `components/reports/StatusSummary.tsx`

The Reports page displays:

- Total Tasks
- Recent Activity
- Todo
- In Progress
- Done

It also has loading, error, retry, and no-data handling rather than assuming the request will always succeed.

---

## 10. Navigation

**Category:** UX

The pages were not fully consistent in how a user moved around the application. Tasks had a Back button, while the other pages did not have the same navigation.

I added:

`components/shared/AppHeader.tsx`

with links to:

- Home
- Tasks
- Activity
- Reports

The same navigation is now used across the main feature pages.

I also updated the home page to include the new Reports feature alongside Tasks and Activity.

---

## 11. Styling and Responsive Layout

**Category:** UX / Code quality

There were several inline styles and the Activity page initially had very little structure visually.

I kept the existing CSS setup rather than introducing another UI library.

I added styles for:

- task summary cards
- Activity cards
- Activity search
- Reports cards
- status rows
- navigation
- home page feature cards
- loading/error states
- responsive layouts

The existing color variables and general visual direction were kept.

On smaller screens, the summary cards stack instead of forcing a three-column layout.

---

## Testing

I manually checked the main frontend flows in the browser.

Activity was tested for:

- loading the full activity list
- searching by `action`
- searching by `info`
- clearing the search
- no-results state
- backend/API failure state
- retry after the backend becomes available again

I also checked:

- Tasks loading correctly
- Task summary counts
- task status filters
- task completion state updates
- Reports loading from the provided backend
- navigation between Home, Tasks, Activity, and Reports

Finally, I ran:

`npm run build`

The production build completed successfully, including TypeScript validation and linting.

The final build generated the expected routes for:

- `/`
- `/tasks`
- `/activity`
- `/reports`
- `/api/tasks`
- `/api/tasks/[id]`
- `/api/activity`
- `/api/reports/tasks-summary`
