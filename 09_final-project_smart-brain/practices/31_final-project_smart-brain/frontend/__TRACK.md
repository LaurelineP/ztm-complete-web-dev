# Next 13
Current context: Next with class base ( for fun )

## Framework based on File / folder system

`_app.js`, `_document.js` are standared Next.js files overinding tge defaylt App component in Next
	- `_app.js`: used for global styles, layout component and maintaining state betwwen transitions
	to define the global layout

	- `_document.js`: customize html document rendered on server ( modifying html, head, body )
	to control the initial response from the server


## CSS x Next here:
- filename: `<stylesheetname>.module.css`
- content assumption: `.MyElementStyle`
- consumation: 
```jsx
	import styles from `<stylesheetname>.module.css`
	// ...

	return(
		<div className = {styles.MyElementStyle}>
	)
```