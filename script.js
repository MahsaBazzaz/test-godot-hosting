import { directions, keys } from './constants.js'
import Sokoban from './Sokoban.js'

// init

// Get level number from URL hash, default to 1
const hash = window.location.hash.slice(1); // remove the #
const [page, maybeLevel] = hash.split('/');

const levelFromHash = parseInt(maybeLevel, 10);
const pageId = isNaN(levelFromHash) ? 1 : levelFromHash;

console.log({ page, pageId });

let sokoban

fetch(`data/soko/${pageId}.txt`)
.then(response => {
  if (!response.ok) {
    throw new Error('Failed to load level: ' + response.statusText);
  }
  return response.text();
})
.then(levelText => {
  // console.log('Level text:', levelText);
  sokoban = new Sokoban({ level: levelText })
  sokoban.render({ restart: true })
})
.catch(error => {
  console.error('Error loading level:', error);
  console.log(hash)
  console.log(levelFromHash)
  console.log(pageId)
});


// re-render
document.addEventListener('keydown', (event) => {
  const playerCoords = sokoban.findPlayerCoords()

  switch (event.key) {
    case keys.up:
    case keys.w:
      sokoban.move(playerCoords, directions.up)
      break
    case keys.down:
    case keys.s:
      sokoban.move(playerCoords, directions.down)
      break
    case keys.left:
    case keys.a:
      sokoban.move(playerCoords, directions.left)
      break
    case keys.right:
    case keys.d:
      sokoban.move(playerCoords, directions.right)
      break
    default:
  }

  sokoban.render()
})

document.querySelector('button').addEventListener('click', (event) => {
  sokoban.render({ restart: true })
})
