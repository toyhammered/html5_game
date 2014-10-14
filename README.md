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

Img file Location:
	- Icons-Folder		public/img/icons
	- iOS-startup		public/img/ios_startup	









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



	
	






