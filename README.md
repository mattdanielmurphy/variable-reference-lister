# Variable Reference Lister

A simple (early stages) command-line tool to ease the process of modularizing a large JavaScript file by listing the line numbers of every reference to each variable in the file.

## How to Install

`npm i variable-reference-lister`

## How to Use

`vrl <path to file>`

### Example output:

```
{ albums: [ 1, 4, 4, 13, 23, 38, 42, 48 ],
  spotifyApi: [ 20 ],
  albumMatches: [ 36, 41, 42 ],
  matchlessAlbums: [ 39, 63 ],
  finishedIndexes: [ 22, 41, 42 ],
  concurrentRequests: [ 18, 24, 50 ],
  searchAlbums: [ 20, 63 ],
  album: [ 13, 14, 23, 28, 34, 36, 38, 39, 41, 42, 42, 48 ],
  query: [ 20 ],
  matchResults: [ 23, 25, 26 ],
  done: [ 57 ],
  matches: [ 34, 34, 38 ],
  matchInfo: [ 36 ],
  tryToRequest: [ 53, 56 ] }
```