```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: User types a note into the text field
    Note right of browser: User clicks the "Save" button

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note (with form data)
    activate server
    server-->>browser: HTTP redirect response (302) to /notes
    deactivate server

    Note right of browser: The browser makes a new GET request to the redirected page

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: JavaScript fetches the latest note data

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: updated JSON data with the new note
    deactivate server

    Note right of browser: Browser renders the updated notes on the page
