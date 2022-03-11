# Pipe-Game
A puzzle game that revolves around putting pieces of pipes together. Fluid will run through the pipes nd must make it from the start to the finish in order to complete the level. Each level will only provide the player with a certain number and certain types of peices with whcich to build their system.

My purpose for this project was the following:
* improve my ability to use the basic tools of Javascript in more interesting and advanced ways
* employ knowledge I've gained about data structures
* build a project using a rendering technology (HTML5 Canvas) besides CSS and HTML elements

## How it Works
In your browser, go to https://zanecosmo.com/pipe-game/. From there you can click the play button, and the game will start you off on the first level. The only controls for the game are **LMB** to pick up and subsequently place pieces, and the **SPACEBAR** to rotate pieces 90 degrees at a time if they are being held. There are several menu buttons in the gameplay menu, including restart, level selection, exit, and as long as the current level has been completed, next level.

#### Possible Features:
* ability to save level states and progress with password (this would entail creating a DB and wiring up some async HTTP-request functionality)

## About
I the game uses [Heroku](https://www.heroku.com/about) as a hosting service, and the code is written with an Express/Node.js back-end. It uses almost entirely Javascript and utilizes HTML5's Canvas element for rendering.
