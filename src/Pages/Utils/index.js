import { setCookie, getCookie } from 'react-cookie';
import { useCookies } from 'react-cookie';

const setCookieWithDuration = (name, value, duration = 30) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + duration);

  setCookie(name, value, { expires: expirationDate });
}

const getUserFromCookie = () => getCookie('userId')

export const setUserIntoCookie = (value, duraction = 30) => setCookieWithDuration('userId', value, duraction)

export const generateStrings = (numberOfString, count, string) => {
	const stringLength = string.length - count
	const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" // 英文字母
	const chineseCharacters = "一二三四五六七八九十百千万亿" // 中文字符
	const japaneseCharacters =
		"あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん" // 日文字符
	const numbers = "0123456789" // 数字
	const charMap =
		characters + chineseCharacters + japaneseCharacters + numbers

	let strings = []

	for (let i = 0; i < numberOfString; i++) {
		let randomString = ""
		for (let j = 0; j < stringLength; j++) {
			const randomChar = charMap.charAt(
				Math.floor(Math.random() * charMap.length)
			)
			randomString += randomChar
		}
		strings.push(string.slice(0, count) + randomString)
	}

	return strings
}

export default getUserFromCookie