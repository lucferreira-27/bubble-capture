# **BubbleCapture**

BubbleCapture is a desktop application that allows users to select speech bubbles and panels in manga pages and extract the text for transcription. The app is built using Electron and Node.js, and uses a combination of image processing and natural language processing techniques to accurately identify speech bubbles and extract their content.

## **Features**

- Select speech bubbles and panels in manga pages with a simple click-and-drag interface
- Automatically extract text from selected speech bubbles, organized by character and dialogue
- Export transcription results to a JSON file for easy use in other applications
- Simple and intuitive user interface, designed with manga readers and transcriptionists in mind
- Uses advanced image processing techniques to accurately identify speech bubbles and ignore background noise
- Uses natural language processing techniques to detect and separate dialogue from sound effects and other non-dialogue text

## **Getting Started**

To get started with BubbleCapture, follow these simple steps:

1. Clone the repository to your local machine
2. Install the required dependencies using **`npm install`**
3. Start the app using **`npm start`**

Once the app is running, you can open a manga page and use the click-and-drag interface to select speech bubbles and panels. The app will automatically extract the text and organize it by character and dialogue. You can then export the results to a JSON file for easy use in other applications.

## **Contributing**

We welcome contributions from anyone who is interested in helping to improve BubbleCapture! To get started, fork the repository and submit a pull request with your changes. We also encourage you to open issues for any bugs, feature requests, or other feedback you have.

## **License**

BubbleCapture is released under the MIT License. See LICENSE.txt for more information.

## **Credits**

BubbleCapture was created by [Your Name Here] as a project for [Course/Program Name]. The app uses several third-party libraries and tools, including:

- **[Electron](https://www.electronjs.org/)**
- **[Node.js](https://nodejs.org/)**
- **[Tesseract.js](https://tesseract.projectnaptha.com/)**
- **[OpenCV](https://opencv.org/)**
- **[Natural Language Toolkit (NLTK)](https://www.nltk.org/)**
- **[React](https://reactjs.org/)**
- **[React Bootstrap](https://react-bootstrap.github.io/)**

We thank the creators of these libraries and tools for their contributions to the open source community!


## App Explain to AI
BubbleCapture

BubbleCapture is a desktop application designed to simplify the process of transcribing speech bubbles and panels from manga pages. The app allows users to select the areas of interest on a manga page, extract the text, and customize the transcript with information about the character and dialog. Additionally, users can also register manga and characters for future use. BubbleCapture is built using React and Material UI.

Folder Structure

- Folder | BubbleCapture
    - Folder | Components
        - Folder | MangaPage
            - File | MangaPage.jsx
            - File | MangaPage.css
        - Folder | Transcript
            - File | Transcript.jsx
            - File | Transcript.css
            - Folder | CharacterSelect
                - File | CharacterSelect.jsx
                - File | CharacterSelect.css
            - Folder | DialogTypeSelect
                - File | DialogTypeSelect.jsx
                - File | DialogTypeSelect.css
    - Folder | FormCapturePage
        - File | MangaRegistration.jsx
        - File | MangaRegistration.css
        - Folder | Form
            - File | MangaForm.jsx
            - File | MangaForm.css
            - File | CharacterForm.jsx
            - File | CharacterForm.css
    - Folder | HomePage
        - File | HomePage.jsx
        - File | HomePage.jsx
    - File | App.jsx
    - File | App.css
    - File | index.js
    - File | constants.js
    - File | utils.js

UI Framework

BubbleCapture is built using React, a popular JavaScript library for building user interfaces. For the user interface design, Material UI is used as the chosen UI framework. Material UI is a set of pre-built, customizable React components based on Google's Material Design guidelines. Material UI provides a clean and modern design aesthetic with a focus on usability and accessibility. It also offers good support for customization and theming, which could be useful for BubbleCapture.

Functionality

The BubbleCapture app offers the following functionality:

Launch: The user launches the BubbleCapture desktop application.

Manga Page Display: The app displays a MangaPage component on the right side of the screen, which shows the manga page the user wants to transcribe.

Area Selection: The user selects the speech bubbles and panels they want to transcribe by clicking and dragging the mouse over the areas of interest.

Text Extraction: As the user selects the bubbles and panels, the app extracts the text from those areas and displays it in a Transcript component on the left side of the screen.

Transcript Customization: The Transcript component allows the user to select the name of the character that said the text and choose a picture of the character, as well as select the type of dialog.

Saving and Copying: Once the user is finished transcribing the selected areas, they can save the transcript to a file or copy it to the clipboard.

Manga Registration: Users can register manga by filling out a MangaRegistrationForm. This form allows users to enter basic information about the manga they are registering, such as the title, author, and publisher.

Character Registration: Users can register characters by filling out a CharacterRegistrationForm. This form allows users to enter information about the character, such as their name, picture, and a brief description. Users can also associate the character with a manga and chapter, allowing for easy reference later on.


New Manga Capture Registration:
The app now includes a feature for registering new manga captures. This feature allows users to register information about a new manga they want to transcribe, including the title, author, and publisher of the manga. Users can also register information about the characters in the manga, such as their name, image, and description.

The MangaRegistration component is responsible for displaying the registration form. The MangaForm component is used for registering basic information about the manga, and the CharacterForm component is used for registering information about the characters in the manga.

Users can also choose to load data from a JSON file to pre-populate the registration form. This can save users time and effort by automatically filling in information about the manga and its characters.

Conclusion

BubbleCapture is a powerful tool for transcribing speech bubbles and panels from manga pages, designed to make the process easier and more efficient. Built using React and Material UI, it provides a modern and customizable user interface, along with a set of powerful features for extracting, customizing, and saving transcribed text. Additionally, the app offers the ability to register manga and characters, allowing for even greater efficiency and organization in the manga transcription process.