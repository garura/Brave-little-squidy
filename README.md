# Brave-little-squidy
Brave Little Squidy is a browser based JavaScript game about a little green squid with the goal of growing to be the biggest thing in the sea!

Anything smaller than you is safe to eat, but anything larger will eat you. Try to survive!

## Code Structure

#### MovingObject (parent of all)
All moving objects on the screen (enemies and the hero) are objects inherited from MovingObject class. This class decides which picture to display based on how the object is currently moving, how to move the objects based on their current velocities, and how to handle collisions between objects. 

#### Movement
Movement is different for the hero and enemy classes:
  - Hero speed is constantly reduced by a fraction of the current speed,and then an additional "downward" speed is added to the hero. The hero is also limited to a position that is within game boundaries, based on it's current radius.
  - Enemies speed does not change. They are also not limited to the bounds of the game - when an enemy leaves the screen, the game removes references to that object.

#### Collisions
Collisions are based on two things: the distance between two points (the center of the MovingObjects), and the sum of the radius of the two objects that are potentially colliding (all objects are considered circles behind the scene). The method to calculate distances is part of the util.js file. Collisions are only checked for the hero object, with two possible cases:
- The other object (an enemy) has a smaller radius. Since the enemy is smaller we want to "eat" them and grow, while making the enemy disappear. The same remove method as when an enemy leaves bounds is called in this case, and the hero's radius increases.
- The enemy is greater than or equal to the hero, in which case the game is over.


#### Hero
Our brave little Squidy is an instance of Hero objects. The hero only has one method, swim(impulse), which is responsible for changing the hero's velocity (called by events triggered by keypresses). The velocity is capped at a certain amount.


#### Enemies
The enemy squids are instances of Enemy objects. They only have a constructor method, which generates their position, velocity, and radius using methods found in util.js.
- The position is either on the left or right side of the screen, far enough away for the image not to be shown when they spawn.
- The velocity is generated to be appropriate for the side spawned (ex. if spawned on the left side, it should be going right). The velocity is within a wide range horizontally, and a minor range vertically. 
- The radius is based on the current radius of the hero, with a 1/4 chance of being larger, up to a maximum size. If the hero reaches this maximum size, no enemies will spawn larger than the hero.


#### Game
Game is responsible for creating the hero, the enemies, their movement functions, checking collisions with the hero, the bounds of play, and removing and replacing enemies (either from drifting out of bounds or being "eaten").



#### Gameview
Gameview is responsible for:
- Keybinds (which trigger certain impulses to be sent to the hero's swim method). Movement may only be issued once per key, rather than while 'keydown', to feel more squidy-like and bursty.
- Tracking and displaying current and high scores
- Providing win/lose messages to the player
- Tracking times between animation calls to modify the distance that MovingObjects should move. This accounts for inconsistencies between animation call intervals. The longer the delay, the more the object should move.

##### I hope you enjoy!
