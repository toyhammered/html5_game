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
	- Main CSS: public/css/main.css
	- Fontface: public/css/fontfaces.css

JS file Location:
	- Jewel: public/script/jewel.js
	- Dom: public/script/dom.js









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

	Listing 2-14 - Page 37
		- Adding custom fonts using @fontface
		- created new file fontfaces.css

	Listing 2-15 - Page 38
		- added the font-family: Geo to the #game id (this will be changed later on to my own font)
		- linked fontfaces.css stylesheet

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


Chapter 2 End of Starting the Creation of the Game






Chapter 3 Start Going Mobile
	
	Adapting to Small Screen Resolutions:
		-@link http://www.mydevice.io/devices/

	
	






