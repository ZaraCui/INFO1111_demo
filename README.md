# INFO1111 Assignment 1
## Strata Management Portal
A sample Next.js project with TailwindCSS for strata management.

## Vercel Configuration (`vercel.json`)
This project uses a customized `vercel.json` file to demonstrate advanced Vercel deployment configurations, including scheduled tasks, redirect rules, and regional deployment optimization.

### Key Configuration Options:

| Property       | Description |
|----------------|-------------|
| `version`      | Specifies the Vercel configuration version (always set to `2`). |
| `builds`       | Defines how to build the project. Here, Next.js is used as the framework. |
| `redirects`    | Automatically redirects users after form submission (e.g., `/form-submitted` → `/thanks` with status `302`). |
| `crons`        | Defines serverless cron jobs. This project uses a scheduled API function (`/api/weekly-report`) that runs every Monday at 10:00 AM. |
| `regions`      | Specifies the deployment region for optimal performance. `syd1` is used to suit the Oceanview Heights strata scenario (Sydney-based). |

### Notes:
- `routes` have been intentionally **removed** to avoid conflicts with `redirects`, as Vercel does not allow mixing them in the same configuration file.
- All API routes are handled automatically by Next.js under `pages/api/`, so manual routing is not required.

## Serverless API Functions
The following serverless functions are implemented to simulate real-world use cases in strata building management:

- `submit-issue.js`: Accepts POST form submissions and redirects to a confirmation page.
- `form-data.js`: Returns example data using a GET request.
- `weekly-report.js`: Generates a weekly summary report for the committee (used in cron jobs).

## Frontend Features
The site includes multiple HTML, CSS, and JavaScript demonstrations to fulfill STRONG rating requirements:

- A **maintenance request form** built using HTML and POST submission.
- Multiple functional pages (e.g., Dashboard, Finance, Meetings, Residents).
- Redirect and HTTP response handling demonstration.
- Explanation of HTTP methods (GET vs POST) and status codes.

### Toast Notification:
- A **Toast notification** is shown upon successful form submission, providing instant feedback to the user (e.g., "Your message has been sent!").
- The Toast notification will automatically disappear after 3 seconds.

## Some Features
This project includes advanced features to meet the STRONG rating requirements:

- Developed three serverless functions under `/pages/api/`, and evaluated the difference with edge functions. Edge functions run on Vercel's edge network for low latency but have limited access to Node.js APIs, so serverless functions were more appropriate for this use case.
- Created five additional web pages demonstrating HTML, CSS, and JavaScript features, including form handling, DOM interaction, and layout styling using Tailwind CSS.
- Implemented a maintenance request form using GET/POST methods and a 302 redirect to a thank-you page.
- Integrated a **Toast notification** feature that appears after submitting a maintenance request form. The notification will auto-hide after 3 seconds.

## Additional Notes
- This project demonstrates full integration between frontend and backend features using Vercel serverless capabilities.
- It highlights deployment automation, user interaction via forms, and data exchange through API routes.
