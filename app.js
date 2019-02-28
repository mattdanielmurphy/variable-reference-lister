#! /usr/bin/env node
const fs = require('fs')
const filepath = require('filepath')

let scriptText
const declarers = { 'let ': 0, 'var ': 0, 'const ': 0 }
let declaration = false
let newVariable = ''
const variables = {}
const variableMatchedIndexes = {}
let lineNumber = 1

function addVariableReference() {
	declaration = false
	variables[newVariable] = []
	newVariable = ''
}

function matchDeclarers(char) {
	Object.entries(declarers).forEach(([ word, matchedIndex ]) => {
		if (char === word.split('')[matchedIndex]) declarers[word]++
		else declarers[word] = 0

		if (declarers[word] === word.length) {
			declaration = true
			declarers[word] = 0
		}
	})
}

function matchReferences(char) {
	const resetVariableMatchedIndex = (word) => (variableMatchedIndexes[word] = 0)
	const increaseMatchedIndex = (word) => variableMatchedIndexes[word]++

	Object.entries(variables).forEach(([ word, matches ]) => {
		let matchedIndex = variableMatchedIndexes[word]
		if (char === word.split('')[matchedIndex]) increaseMatchedIndex(word)
		else resetVariableMatchedIndex(word)

		if (matchedIndex === word.length) {
			variables[word].push(lineNumber)
			resetVariableMatchedIndex(word)
		}
	})
}

function analyzeScript() {
	scriptText.forEach((char, i) => {
		// each declarer has matchedIndex which determines to what extent is word is matched
		if (char === '\n') lineNumber++
		if (declaration) {
			// record word until space or equal sign
			if (char.match(/[=\s\,]/) && newVariable.length > 0) addVariableReference()
			else if (char.match(/\w/)) {
				newVariable += char
			}
		} else {
			matchDeclarers(char)
			matchReferences(char, lineNumber)
		}
	})
}

function getFile() {
	const relativePath = process.argv[2]
	if (!relativePath) throw Error("Please provide a relative path to the file you'd like to analyze.")
	const path = filepath.create(relativePath).toString()
	scriptText = fs.readFileSync(path, 'utf8').split('')
}

getFile()
analyzeScript()

console.log(variables)

// variables are not hoisted so multiple scan-throughs not necessary

// 1. determine let
// pattern = 'let '
// if char matches first letter of pattern, start potentialForLet condition
// if char matches a pattern, try to match then the second letter and so on until either the whole pattern matches or is broken
// if pattern matches, record the variable's name and its line number
// 2. determine const or var
