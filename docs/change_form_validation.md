# Change Record: Enquiry Form Validation & Constraints

This document covers validation updates applied to the customer enquiry forms to maintain data quality.

## Validation Features

### 1. Phone Input Rules
*   Restricted the phone input field to accept **only digits**.
*   Configured validation checking to require **exactly 10 digits** (matching standard phone formatting rules).
*   Cleaned up input placeholder styles on the enquiry form page.

### 2. Input Constraints & Validation
*   Integrated HTML pattern attributes to restrict character entries (e.g. validating email formats, name fields, and quantities).
*   Enforced validation on keydown/input events to instantly block users from entering non-pattern characters.
