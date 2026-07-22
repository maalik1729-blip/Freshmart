# Change Record: Admin Enquiries Management & Metrics

This document details the iterations on the enquiries management section of the Admin Dashboard.

## Enquiries Grid Refactoring

### 1. Enquiry Status & Interaction
*   Introduced an status-tracking dropdown containing `New`, `Interested`, and `Not Interested` options to let admins categorize leads.
*   Added custom Mongo database updates to sync selected dropdown values instantly on change.
*   Replaced basic icons with distinct action toggles (green tick checkmark and red delete triggers).
*   Cleaned up the grid spacing by removing the redundant "Actions" column.
*   Fixed a text contrast issue in the enquiry badges to improve accessibility.

### 2. Dashboard Metrics
*   Designed three rounded summary widgets positioned above the main data grid:
    *   **Pending Enquiries**
    *   **Interested Leads**
    *   **Not Interested Leads**
*   Integrated clean vector status symbols on the cards to replace legacy user avatar layouts.
