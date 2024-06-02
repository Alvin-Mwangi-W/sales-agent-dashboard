### Sales Agent Dashboard

This project is a responsive sales agent dashboard aimed at facilitating the management of school accounts, invoicing, collections, and data visualization for targets and sign-ups. It is part of an internal system designed to streamline operations for sales agents at Zeraki, with a focus on improving efficiency in managing relationships with schools.

### Features Implemented

1. **Side Navigation**
   - **Dashboard Module**: Displays dynamic counters for Collections, Sign-ups, Total Revenue, and Bounced Cheques.
   - **Schools Module**: Lists schools with options to view detailed information (Invoices and Collections).

2. **Dashboard Overview**
   - **Top Card Metrics**: Provides key performance indicators such as Collections, Sign-ups (broken down by product), Total Revenue (per product), and Bounced Cheques.
   - **Targets Visualization**: Pie charts represent progress towards signup targets for Zeraki's products, with interactive tooltips for detailed insights.
   - **Signups Overview**: Bar graphs depict the distribution of sign-ups across different school types (Primary, Secondary, IGCSE) for each product.

3. **School Management**
   - **Schools**: Displays a list of schools and detailed information including type, product usage, county, registration date, contact details, and school balance.
   - **Invoices**: Manages invoices per school with filtering and CRUD operations, including details like invoice number, item, dates, amounts, and status.
   - **Collections**: Manages collections per school, allowing updates to invoice statuses based on collection outcomes.

### Technical Details

- **Framework**: Developed using Vite, React, and TypeScript for a robust and scalable frontend application.
- **Data Handling**: Mock data is utilized for simulating real-time updates and interactions. JSON Server is recommended for creating a mock REST API using JSON files.

### Setup Instructions

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd sales-agent-dashboard
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Mock API Server**
   - Start JSON Server for mock data:
     ```bash
     npm run server
     ```

5. **Access Application**
   - Open your browser and go to `http://localhost:3000` to view the dashboard.

### Project Structure

- **`/src`**: Contains all frontend source code.
- **`/public`**: Static assets and index.html.
- **`/mock-server`**: JSON files and JSON Server configuration for mock APIs.

### Deployment

- Deploy the application to platforms like Netlify or Vercel for easy access and testing.

### Evaluation

- **Functionality**: Ensure all features are fully functional and handle user inputs gracefully.
- **Code Quality**: Emphasize clean, modular code following best practices.
- **Design Implementation**: Focus on original, custom design with responsiveness and a modern aesthetic.
- **Extra Polish**: Enhancements improving user experience, performance, or functionality are encouraged.

### Additional Notes

- This dashboard aims to provide a comprehensive tool for sales agents, enhancing their efficiency in managing school accounts and improving operational visibility.

### Author

- Developed by Alvin Mwangi
- GitHub: https://github.com/Alvin-Mwangi-W/sales-agent-dashboard

