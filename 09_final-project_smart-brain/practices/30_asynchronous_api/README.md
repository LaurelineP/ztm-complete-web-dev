# IMPORTANT
- deployment: unfortunately this project is obsolete as the API used was using the protocol http 
Once deployed, the project using https protocol will fetch the api and fail
- local: the project is good to explore locally


# PRACTICE - ASYNCHRONOUS API
## Objective: Using third part API in the Front-End

- Using the prior cumulated knowledge ( JS, class based component )
build a react app using a third part library and build/

Here few links: 
- Star Wars API 1: http://swapi.py4e.com/
- Star Wars API 2: https://swapi.dev/
- Numbers API: http://numbersapi.com/#42
- Chuck Norris:  https://api.chucknorris.io/
- Pokemon : https://pokeapi.co/
- International Space Station: http://open-notify.org/Open-Notify-API/ISS-Location-Now/

---------------------------------

# Personal implementation choice ( process thinking )
- Using: Numbers API
- Endpoints consummation: 
	- math related numbers anecdotes : `/<number>/math`
	- trivia related numbers: `/<number>/trivia/`
	- date related numbers ( mm/dd ): `<date>/date/`
	- random anecdote ( any of the above category ) : `/random`

Note: response are not in JSON, to have the api response in json add `?json`

- Consume the API with all possible endpoints of the API
	- specs choice:
		- on submitting button:  if every element making the requests are available -->  get the number anecdote and display it
		- on pressing enter - if every element making the requests are available --> get the number anecdote accordingly  and display it
		- the submitting button should not be clickable if the UI does not have the necessary inputs to fetch.
	- propose a configurable UI/UX which will modify the endpoint based
		- first iteration: 
			- description: a list of text inputs was maps to render the UI( without random )  - 
			each input had a label and its text input
			- observations: UX could be improved as it cost the user extra actions 
			to play with the each input where at the end we only need some configuration
			selection and one and only input to type into
		- second iteration:
			- description: 
				- math / trivia / date : should be input radio
				- random should be a unique choice - alike a preference --> hence checkbox
					- if checkbox is checked --> disable all inputs radio and input number/text
				- input for the text/number: based on the radio button selected display alternate the input placeholder

	- code wise thinking:
		- in the container component
			- avoided to write each input elements and preferred to have an array to loop on
			to keep the JSX DRY
			- abstracted away the input props using class for easy consummation & set the input props
			- all input classes properties ( corresponding to HTML input element attributes ) are then provided to a stateless component InputSet to generate the set of the input
			( and label if needed )
			- conditional rendering bounded to some input handled in this container component
		- in the component ( stateless )
			- passing props down

Tip for react learner at this point ( = using class based component )
- Side Effects: are effects that happen in under certain circumstances.
Here there is a side effect when triggering the action to fetch the number anecdote
when the user presses "enter".
Side effects once trigger can modify the content display.

- Handling EventListener with react life cycle
	- componentDidMount: is triggered right after the **first** render once
	in this case it allows to access the state for the logic and this life cycle
	avoid being triggered all the time the component renders
	This is where we can add an event listener up any event listener

	- componentWillUnmount: happens when the component is about to be removed from the DOM
	This is where we can clean up any event listener with "removeEventListener"
