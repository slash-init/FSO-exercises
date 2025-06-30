```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: User writes a note and clicks "Save"

    Note right of browser: JavaScript captures the input and creates a note object

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa (JSON data)
    activate server
    server-->>browser: 201 Created response (or no content)
    deactivate server

    Note right of browser: JavaScript updates the UI with the new note
    Note right of browser: No full page reload happens
