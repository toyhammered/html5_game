#---------------------------
# <Name of Game> version 1.0
# Just the boilerplate
# Daniel Rassiner 10.2014
#---------------------------

Chapter 1 Examples of new HTML 5 Features

	Listing 1-1 - Starts Page 9
		- created sample_1.1.html
		- created simple "smiley" drawing
		- used JavaScript
	end

	Listing 1-2 - Starts Page 11
		- created sample_1.2.html
		- created a simple music player with HTML5 audio
		- used HTML5 audio (audio files dont exist though)
	end

	Listing 1-3 - Starts Page 12
		- created sample_1.3.html
		- Interacted with the server with WebSockets
		- Basic template for how websockets work.
	end

	Listing 1-4 - Starts Page 13
		- created sample_1.4.html
		- Saving local data with Web Storage
		- Basic example of how local storage works
	end

end of Chapter 1 Examples of new HTML 5 Features


#-----------------------------------------------------#
#-------------- Global File Locations ----------------#

CSS Styles Location:
	- Main CSS: 		public/css/main.css
	- Fontface: 		public/css/fontfaces.css
	- Mobile: 			public/css/mobile.css	

JS file Location:
	- Jewel:			public/script/jewel.js
	- Dom: 				public/script/dom.js
	- Install:			public/script/screen.install.js
	- Main-Menu:		public/script/screen.main-menu.js
	- Splash-Screen:	public/script/screen.splash.js
	- Board:			public/script/board.js
	- Game: 			public/script/game.js

Img file Location:
	- Icons-Folder		public/img/icons
	- iOS-startup		public/img/ios_startup	









#-----------------------------------------------------#

#-----------------------------------------------------#
#------------ Customizations to be Added -------------#

Inside div (#game) - index.html
	- Need to add my own game name

Inside main.css - index.html game customization
	- customize fonts
	- logo
	- everything related to the home screen

Inside main.css - main menu styles
	- customize the main menu

	


#-----------------------------------------------------#


Chapter 2 Starting the Creation of the Game
	
	Listing 2-2 - Page 26
		- Adding screen elements to the game container
	end

	Listing 2-3 - Page 26
		- Adding the main style sheet
		- *located in public/css/main.css
	end

	Listing 2-4 - Page 27
		- The initial content of the main style sheet
		- added to main.css
	end

	Listing 2-5 - Page 28
		- Adding file jewel.js
		-*located in public/script/jewel.js
	end

	Listing 2-6 - Page 28
		- Initial contents of jewel.js (boilerplate-like)
	end

	Listing 2-7 - Page 29
		- Created the jewel.load() function
		- How this works:
			- load function adds script to scriptQueue array
			- stores name + callback of file, and a Boolean flag to see if loading is complete
			- file is loaded as an image (not script) so that it is not executed
			- this will now load the script without execution
			- once file is loaded, onerror/onload handlers change the loaded flags
				- this will call the executeSCriptQueue() function then
	end

	Listing 2-8 - Page 30/31
		- Executing scripts in the queue
		- until everything is executed executeRunning will remain false
	end

	Listing 2-9 - Page 31/32
		- Creating a DOM helper module
		- will be loaded as a module in the index.html
	end

	Listing 2-10 - Page 33
		- loading the jewel.dom module in the index.html
		- also added a console.log to the setup function in jewel.js to make sure everything has loaded correctly (no errors)
		- minor debugging done
	end

	Listing 2-11 - Page 34
		- Switching screens test
		- any screen that is active is hidden before a new screen is displayed
	end

	Listing 2-12 - Page 35
		- Toggling the splash Screen
		- done by modifying jewel.setup() function
			-* location is jewel.js
	end

	Listing 2-13 - Page 36
		- Creating splash screen in index.html
		- adding logo and continue button to same page
	end

	Listing 2-14 - Page 37
		- Adding custom fonts using @fontface
		- created new file fontfaces.css
	end

	Listing 2-15 - Page 38
		- added the font-family: Geo to the #game id (this will be changed later on to my own font)
		- linked fontfaces.css stylesheet
	end

	Listing 2-16 - Page 38
		- Styling the splash Screen
	end

	Listing 2-17 - Page 39
		- Adding a background pattern
		- cross hatching effect
	end

	Summary:
		- foundation of game set up
		- set up HTML/CSS/JS pages
		- added dynamic script loading
		- introduction to framework of game
		- switching between various game screens
		- use of web fonts and @fontface
		- used to create the logo of game (this will be changed to my own later)
	end


Chapter 2 End of Starting the Creation of the Game






Chapter 3 Start Going Mobile
	
	Adapting to Small Screen Resolutions:
		-@link http://www.mydevice.io/devices/

	Table 3-1: Smartphone Displays - Page 45
	Table 3-2: Tablet Displays - Page 46
	Table 3-3: Viewport meta tag parameters - Page 49
	Table 3-4: Media features (width, height, orientation, ect...) - Page 57


	Listing 3-1 - Page 47
		- set up a base font size for the game
	end

	Listing 3-2 - Page 48
		- Designed the Logo for "Jewel Warrior" (this is going to be changed to custom game title)
	end

	Listing 3-3 - Page 48
		- used relative units (em) on splash screen
	end

	Listing 3-4 - Page 49
		- added the mobile viewpoint to index.html file in head
	end

	Listing 3-5 - Page 50
		- disabled user scalability (continued from Listing 3-4)
	end

	Listing 3-6 - Page 50
		- added the menu HTML
		- this is the buttons you can click on the menu page
	end

	Listing 3-7 - Page 51
		- added styles to the recently added HTML menu
		- this includes Css3
	end 

	Listing 3-8 - Page 52
		- added the splash screen module
		- this means when the user clicks on the splash screen anywhere it will take them to the main menu
		- added to screen.splash.js file
	end

	Listing 3-9 - Page 53
		- added the event binding helper to the dom.js file
	end

	Listing 3-10 - Page 54
		- calling the run method
		- added helpful alert to tell the user the module doesnt exist
	end

	Listing 3-11 - Page 54-55
		- this is the main menu module
		- this is in screen.main-menu.js file
	end

	Listing 3-12 - Page 59
		- loading the mobile style sheet
		- added to the head of index.html 

	Listing 3-13 - Page 60
		- added our first rule to the mobile.css page
		- game will fill the entire screen
	end

	Listing 3-14 - Page 60
		- content scaling depending on display sizes
		- iphones/ipads/tablets
	end

	Listing 3-15 - Page 61
		- added landscape styles to the game
		- done for smartphone/tablet
	end

	Listing 3-16 - Page 63
		- enabling web application mode
		- meta tag added to the index.html head
	end

	Listing 3-17 - Page 64
		- tested for the standalone property
		- this is checking what browser you are using and if it is compatable with the game
	end

	Listing 3-18 - Page 64
		- added the standalone function to the jewel.js file
	end

	Listing 3-19 - Page 65
		- loaded the correct splash screen
		- either the (your game can run fine) or (your game needs to install something)
	end

	Listing 3-20 - Page 65
		- added the install screen module
		- this is if users can't run the game on their current device
	end

	Listing 3-21 - Page 66
		- added the html markup for the install screen
	end

	Listing 3-22 - Page 66
		- styled the install screen markup using css
	end

	Listing 3-23 - Page 68 
		- used icons for multiple resolutions
		- this is based on when you install on your iphone (retina, non-retina, ect...)
	end

	Listing 3-24 - Page 70
		- specifying a startup image based on size (done in index.html head)
	end

	Listing 3-25 - Page 70
		- made the status bar black (not really sure what this is, haven't done any mobile testing)
	end

	Listing 3-26 - Page 71
		- disabled overscroll
		- done using a touch event (so you cant scroll at all)
	end

	Listing 3-27 - Page 72
		- hiding the address bar on Android devices
	end

	Listing 3-28 - Page 73
		- modifying mobile browser behavior
		- this is disabling default browser behavior
	end

	Listing 3-29 - 3-30: Page 78-79
		- this has to do with phonegap (doesnt actually work for me because I am not an iOS developer)
	end

	Summary:
		- used a combination of scalable layouts, viewports, meta tags, and media queries
		- iOS standalone mode used
		- put game icon on phone/tablet screens
		- got rid of unwanted browser behavior
		- usage of third-party tools (phonegap)
	end

Chapter 3 End Going Mobile




#--------Part 2 Start--------#
#--Created the Basic Game ---#
#----------------------------#


Chapter 4 Start Building the Game

	Listing 4-1 - Page 86
		- creating the board module 
		- query function & access of jewels
	end

	Listing 4-2 - Page 86
		- loading the board.js file to index.html
	end

	Listing 4-3 - Page 87
		- defining the board layout
		- size, score, jewels
	end

	Listing 4-4 - Page 88
		- initializing the board.js
		- setting up game board 
	end

	Listing 4-5 - Page 90
		- modified initialized function
		- added callback
	end

	Listing 4-6 - Page 90-91
		- initialized the colsXrows grid
		- added the jewels randomly to board
	end

	Listing 4-7 - Page 91
		- a random jewel is picked from a random jewel generator
	end

	Listing 4-8 - Page 91-92
		- removing initial chains
			- this means you can't start game with extra points
		- keeps picking a random jewel until board has no "free points"
	end

	Listing 4-9 - Page 92
		- getting jewel type from cordinate
		- prevents jewels from being created outside 8x8 grid
			- out of bounds error prevention
	end

	Listing 4-10 - Page 93-94
		- checking for chains
		- checking if swap is valid
	end

	Listing 4-11 - Page 94-95
		- validating a swap
			- if swap is invalid it goes back to original state
	end

	Listing 4-12 - Page 95
		- validating adjacent swap
		- returns true or false depending if what you did is "legal"
	end

	Listing 4-13 - Page 96
		- searching for board chains
		- after initial swap is validated, might make more chains
	end

	Listing 4-14 - Page 96-97
		- removing chained jewels
		- this relates to 4-13 on validated swap
		- bring in new jewels as old ones are removed
	end

	Listing 4-15 - Page 98
		- adding new jewels once old ones are removed
		- come down from top to fill in space
	end

	Listing 4-16 - Page 99
		- awarding the player points depending on combo
		- points added to score
	end

	Listing 4-17 - Page 100
		- checking the board recursively
		- this means once the board is refilled, it checks if any more chains were created
	end

	Listing 4-18 - Page 101
		- checks if there are any more avaiable moves
			- returns true or false
		- this is done by the hasMoves() function
	end

	Listing 4-19 - Page 101
		- checking if a jewel can move
		- checks if it can swap if x cordinate isn't less than 1 (that means its off the board)
	end

	Listing 4-20 - Page 102
		- triggering a refill
			- no more moves for player to use
	end

	Listing 4-21 - Page 102-103
		- creating a copy of the jewel board
	end

	Listing 4-22 - Page 103
		- refilling the board recursively
			- if the board copied has no moves it refills again
	end

	Listing 4-23 - Page 104
		- the actuality of swaping the jewels
			- if the jewels match they are removed 
		- new jewels are then added once a swap is validated
	end

	Listing 4-24 - Page 105
		- showing public return methods
		- shows that there are very few ways to alter the game
			- can be done using swap() method
	end


	Summary:
		- implement the core of the game mechanics
		- creating of basic rules
		- jewel swapping
		- chains
		- falling jewels
		- neatly encapsulated game board
		- prepare for future multiplayer functionality 
	end

Chapter 4 End Building the Game


Chapter 5 Start Delegating Tasks to Web Workers 

	Listing 5-1 - Page 113
		- just a sample of a shared worker
	end

	Listing 5-2 - Page 113
		- another sample of a shared worker script
	end

	Listing 5-3 - Page 114
		- example of how to check for prime numbers
	end

	Listing 5-4 - Page 115
		- creating the non-worker test page
	end

	Listing 5-5 - Page 116
		- created the worker test page
	end

	Listing 5-6 - Page 116
		- communicating with the Web Worker
		- remove delayed when there was no web worker present
	end

	Listing 5-7 - Page 118
		- imported the board.js script (start of using web workers)
	end

	Listing 5-8 - Page 119
		- shows the basic structure of the message handler for web workers
			- {
				id: <number>,
				command: <string>,
				data: <any
			- }
		end

	Listing 5-9 - Page 120
		- creating the worker board module
	end

	Listing 5-10 - Page 120-121
		- sending the messages to the workers (from the board)
	end

	Listing 5-11 - Page 121
		- sending the swap cordinates to the worker
			- this checks if the swap is legal or not
	end

	Listing 5-12 - Page 122
		- added message handler to initialize function
		- added basic debugging for worker
		- copied getBoard, print, and getJewel data from board.js
	end

	Listing 5-13 - Page 123
		- exposing the public methods 
	end

	Listing 5-14 - Page 123
		- loading the board workers and if they are not available having a fallback
		- feature detection enabled
	end

	Listing 5-15 - Page 124
		- detecting support for web workers
	end

	Listing 5-16 - Page 124
		- adding preloading to scripts
		- done same way as before, making script and image so it doesnt execute
	end

	Listing 5-17 - Page 125
		- preloading the worker module
	end

	Summary:
		- use Web workers to free up the main UI thread
			- increasing the spead the game runs at
		- create worker objects
			- send messages back and forth to each other
		- implemented a worker based board module
		- learned about the power of Web Workers
	end


Chapter 5 End Delegating Tasks to Web Workers 



Chapter 6 Start Creating Graphics with Canvas

	Summary:
		- learn how to create diffrent shapes with canvas 
		- 2d drawing API
		- paths, shapes, curves, fills, strokes
		- everything relating to the canvas is done here
	end


Chapter 6 End Creating Graphics with Canvas


Chapter 7 Start Creating the Game Display

	Listing 7-1 - Page 176
		- calling setup script earlier in load proccess
		- this is so rest of scripts can load with it
	end

	Listing 7-2 - Page 176
		- creaing the loading progress
	end

	Listing 7-3 - Page 177
		- creating the progress bar on the splash screen
	end

	Listing 7-4 - Page 177-178
		- styling the progress bar
	end

	Listing 7-5 - Page 178-179
		- updating the progress bar
	end

	Listing 7-6 - Page 180
		- the games screen in HTML
	end

	Listing 7-7 - Page 180
		- giving game board correct dimensions in CSS
	end

	Listing 7-8 - Page 180-181
		- The game module for the game-screens
	end

	Listing 7-9 - Page 181-182
		- creating the canvas display module
	end

	Listing 7-10 - Page 183
		- loading the canvas in the html
	end

	Listing 7-11 - Page 184
		- loading the jewel sprites
	end

	Listing 7-12 - Page 185
		- creating the background for the game in js
	end

	Listing 7-13 - Page 185-186
		- css for the game board
		- using absolute positioning to show checkered pattern over board
	end

	Listing 7-14 Page 187
		- displaying and redrawing the jewels
	end

	Listing 7-15 - Page 188
		- initializing the first redraw
		- this will draw the sprites to the screen
	end

	Listing 7-16 - Page 188-189
		- adding the footer to the html (game screen)
		- this is to exit/pause game
	end

	Listing 7-17 - Page 189-190
		- styling the footer
	end

	Listing 7-18 - Page 190
		- responding the the exit button
		- showing prompt to ask if you want to quit game
	end

	Listing 7-19 - Page 191
		- adding pause/resume functionality to the game
	end

	Listing 7-20 - Page 191-192
		- Adding the dimming overlay when you pause the game
	end

	Listing 7-21 - Page 192
		- styling the dimming overlay
	end

	Listing 7-22 - Page 193
		- binding the pause event handlers
		- this includes resuming/exiting
	end


	Summary:
		- created the game display 
		- rendering the sprites
		- adding the pause/resume functionality/screen dimming
		- added progress bar/loading bar
	end


Chapter 7 End Creating the Game Display


Chapter 8 Start Interacting with the Game



Chapter 8 End Interacting with the Game










	
	






