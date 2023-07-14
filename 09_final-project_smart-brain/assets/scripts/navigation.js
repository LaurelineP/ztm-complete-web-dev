/* -------------------------------------------------------------------------- */
/*                                  SELECTORS                                 */
/* -------------------------------------------------------------------------- */

const getAsideLinks = () => document.body.querySelectorAll('#aside-content li');

const getDetails = () => document.body.querySelectorAll('details');

const getOpenedDetails = () => document.body.querySelectorAll('details[open]');


/* -------------------------------------------------------------------------- */
/*                                    UTILS                                   */
/* -------------------------------------------------------------------------- */
const getHrefId = (href) => href.split('#')[1];

/** Closes all other "sections" ( tag `details` ) */
const closeOtherSections = ( openedId = null ) => {
	const sections = getOpenedDetails();
	const closeSection = (detailsElement) => detailsElement.removeAttribute('open');

	if( !!openedId ){
		sections.forEach( sectionDetails => {
			const sectionId = sectionDetails.id;
			if( sectionId !== openedId ){
				closeSection(sectionDetails)
			}
		})
	} else if( !openedId ){
		sections.forEach(closeSection);
	}
}

/** From sections in HTML, gets relative page links */
const getTreeLinks = () => {
	const getElementId = el => `#${el.id}`;
    
    const allSectionsId = [...document.body.querySelectorAll('section')].map(getElementId);
    
    const linksTree = allSectionsId.reduce(( acc, sectionIdSelector )=> {
        const detailsRelativeLinks = [...document.body
            .querySelector(sectionIdSelector)
            .querySelectorAll('details')]
            .map(getElementId);

        acc[sectionIdSelector] = detailsRelativeLinks
           return acc;
    }, {});
    return linksTree;
}


const getTitleFromSelector = selector => {
	const segmentText = selector.split('_')[1] || selector.split('#')[1];
	return segmentText?.replace(/(_|-)/g, " ");
}


/* -------------------------------------------------------------------------- */
/*                                  HANDLERS                                  */
/* -------------------------------------------------------------------------- */
/** Expand one section and closes the other  */
function manageExpansionAndEffects(e){
	if(!e) return;

	const target = e.target;

	const sectionIdText = target.closest('details')?.id || getHrefId(target.href);

	const isSectionDetails = !e.target.href;

	const sectionTargeted =  document.body.querySelector(`#${sectionIdText}`);

	if(!isSectionDetails){
		sectionTargeted.setAttribute('open', 'true');
	}
	sectionTargeted.scrollIntoView({ behavior: "smooth", block: "center" });

	closeOtherSections(sectionIdText);
}



/* -------------------------------------------------------------------------- */
/*                                  FEATURES                                  */
/* -------------------------------------------------------------------------- */

const setExpandableSections = () => {
	const sideMenuLinks = getAsideLinks();
	const sectionDetails = getDetails();
	const elements = [...sideMenuLinks, ...sectionDetails];

	// removes expanded sections
	closeOtherSections();

	// attributes function to click event listeners
	elements.forEach( element => {
		element.addEventListener('click', manageExpansionAndEffects);
	});

	// scroll to section when landing page contains an URL hash
	if(!!window.location.hash){
		document.body
			.querySelector(window.location.hash)
			.setAttribute('open', true);
	}
}



const setSideMenu = () => {
	const treeLinks = getTreeLinks();
	const treeLinksArray = Object.entries(treeLinks);

	const createElement = (tagName) => document.createElement(tagName);
	const rootMenuWrapper = createElement('ul');
	
	let lastUl = rootMenuWrapper;

	const mapLinks = (linksArray) => {
		linksArray.forEach( (sectionLinksDetails, idx) => {
			// Create and add `li` for string values in array
			if( typeof sectionLinksDetails === 'string' ){

				// creates anchor tag content
				const a = createElement('a');
				const title = getTitleFromSelector(sectionLinksDetails)
				a.setAttribute('href', sectionLinksDetails);
				a.append(title);
		
				// creates li with anchor tag
				const li = createElement('li');
				li.append(a);

				lastUl.append(li);
				
				// appends `li` to the right `ul` container
				const nextValue = linksArray[idx + 1]
				const _elementToAppendTo = Array.isArray(nextValue)
					? rootMenuWrapper
					: lastUl;

				_elementToAppendTo.append(li);
			} else if( Array.isArray( sectionLinksDetails)){
				// appends a new `ul` to the `rootMenuWrapper` as value is the nested list
				const newUl = createElement('ul');
				rootMenuWrapper.append(newUl);

				// updates lastUl
				lastUl = [...rootMenuWrapper.children].at(-1);
				mapLinks(sectionLinksDetails);
			}
		})
		return rootMenuWrapper;
	}

	// generates the tree links side menu
	const collectionOfUls = treeLinksArray.map(mapLinks); 
	collectionOfUls.forEach( el => {
		document.body.querySelector('#aside-content').append(el);
	})

}







/* -------------------------------------------------------------------------- */
/*                                   PROGRAM                                  */
/* -------------------------------------------------------------------------- */

(function init () {
	setSideMenu();
	setExpandableSections();
})();


