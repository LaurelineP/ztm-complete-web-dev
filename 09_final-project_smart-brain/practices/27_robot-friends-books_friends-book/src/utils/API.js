export const baseEndpoint = "https://randomuser.me/api";

export const params = {
	getSeed: seed => `seed=${seed}`,
	getResultAmount: (amount= 10) => `results=${amount}`,
	getGender: gender => `gender=${gender}`,
	getNationality: nationality => `nat=${nationality}`
}


/**
 * Selected avatar public endpoints
 * 
 * - https://api.dicebear.com/6.x/big-smile/svg
 * - https://api.dicebear.com/6.x/micah/svg
 * - https://api.dicebear.com/6.x/lorelei-neutral/svg
 * - https://api.dicebear.com/6.x/lorelei/svg
 * - https://api.dicebear.com/6.x/thumbs/svg
 * - https://api.dicebear.com/6.x/big-smile/svg
 * - https://api.dicebear.com/6.x/miniavs/svg
 * - https://api.dicebear.com/6.x/peeps/svg
 */
const avatarStyles = [
	'big-smile',
	'micah',
	'lorelei-neutral',
	'lorelei',
	'thumbs',
	'miniavs',
	'peeps'
]
const avatarStyle = avatarStyles[4]
const endpoint = `https://api.dicebear.com/6.x/${avatarStyle}/svg`;
export const getAvatar = name => `${endpoint}?seed=${name}&flip=${name.length % 3 === 0}`;

// shorten email from fake data
function adjustEmail( email ){
	const [startValue, ...rest] = email.split('.');
	const shortenedEmail = `${startValue.slice(0, 2)}.${rest.join('.')}`;
	return shortenedEmail.replace('example', 'gmail')
}

export function adjustDataSchema(data) {
	return {
	  ...data,
	  ...data.results
	  .map(( datum ) => {
		const fullName  = `${datum.name.first} ${datum.name.last}`;
		datum.fullName  = fullName;
		datum.picture   = getAvatar(fullName);
		datum.email     = adjustEmail(datum.email)
		datum.flag      = `https://flagsapi.com/${datum.nat}/flat/64.png`
	  return { ...datum }
	})}
  }
  