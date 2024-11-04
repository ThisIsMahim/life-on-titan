
# Life on Titan 🌌

An educational, interactive web app exploring the potential for life on Titan, Saturn's largest moon. This project introduces users to unique concepts like chemosynthesis, subsurface oceans, and Titan’s extreme environment through engaging visuals, 3D models, and the guidance of our AI character, **Chiko**.

**Live Link**: [life-on-titan.vercel.app](https://life-on-titan.vercel.app)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

The **Life on Titan** project is designed to educate and inspire curiosity about life beyond Earth, specifically on Titan, where sunlight is scarce, and chemosynthesis may power life instead of photosynthesis. The application blends scientific education with visual storytelling, guiding users through Titan’s atmosphere, surface, and possible subsurface ocean using dynamic dialogues, interactive elements, and 3D models.

## Features

- **Interactive Journey**: Navigate through different pages that simulate Titan’s surface, atmosphere, and subsurface ocean.
- **Guided Experience with Chiko**: Engage with our interactive robot character, Chiko, who narrates and provides context at each stage.
- **Real-time 3D Models**: Zoom in, rotate, and explore Titan’s geographical features, including simulated volcanic regions and hydrothermal vents.
- **Simulation Page**: Adjust environmental variables (temperature, pressure, chemical sources) to simulate life forms that could potentially survive on Titan.
- **Quiz and Learning Checkpoints**: Interactive quizzes reinforce understanding and engage users in active learning.
- **Photocards for Visual Learning**: Key concepts are illustrated with AI-generated images and real NASA data.

## Tech Stack

- **Frontend**: React.js, HTML, CSS, Tailwind CSS
- **3D Rendering**: Three.js, React Three Fiber
- **Animations**: GSAP (GreenSock Animation Platform)
- **Deployment**: Vercel
- **AI Tools**:
  - ChatGPT for dialogue scripting
  - Adobe Firefly for graphics and backgrounds
  - Window.speechsynth AI voice for Chiko's narration

## Setup and Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ThisIsMahim/life-on-titan.git
   ```
   
2. **Navigate to the Project Directory**:
   ```bash
   cd life-on-titan
   ```

3. **Install Dependencies**:
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## Usage

Once the development server is running:
- **Navigate** through each page to explore Titan’s environment and learn about its unique features.
- **Interact with Chiko** by clicking on dialogue boxes to progress the story.
- **Explore 3D models** by zooming, rotating, and viewing key regions on Titan.
- **Run Simulations** on the page where you can test hypothetical life under Titan-like conditions.
- **Take the Quiz** after the journey to test your understanding!

## Contributing

We welcome contributions! Please follow these steps to get involved:
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add a new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---
