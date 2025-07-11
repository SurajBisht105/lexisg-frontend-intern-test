# Legal Assistant Chat App

A web-based legal assistant chat application.

## How to Run the Project

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Start the development server:**
   ```sh
   npm start
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) by default.

## Screenshot

![Screenshot](public/Screenshot%202025-07-11%20193000.png)
![Screenshot](public/Screenshot%202025-07-11%20192943.png)
![Screenshot](public/Screenshot%202025-07-11%20192924.png)
![Screenshot](public/Screenshot%202025-07-11%20192737.png)


## Citation Linking

Citation linking is handled by parsing the assistant's responses for citation markers (e.g., `[1]`, `[2]`). When a citation is detected, it is rendered as a clickable link in the chat message. Clicking the link opens a modal (see [`PDFModal`](src/components/PDFModal.tsx)) displaying the referenced document or section. The logic for extracting and rendering citations is implemented
