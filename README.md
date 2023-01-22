# nodejs-remote-control

Educational project for rs.school (NodeJS)

## Task #4

Implement remote control backend.

Assignments: [Websocket Remote Control](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/remote-control/assignment.md)

[Scoring](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/remote-control/score.md)

Time limits: start `2023-01-17 03:00` end `2023-01-24 03:00` (UTC+3)

## Installation

Prerequisites:
* nodejs 18 LTS
* npm
* typescript
* git

How to install:
1. Clone the repo `git clone https://github.com/sergereinov/nodejs-remote-control.git`
2. Switch to dev branch with `git checkout development`
3. Install dependencies with `npm install`

Then run the project with `npm run start` or `npm run start:dev`.
* App served @ http://localhost:8181

## Remote Control

The App has several commands / key-binds:
- arrow keys generate commands `mouse_left`, `mouse_right`, `mouse_up` and `mouse_down`
- key `p` for `mouse_position`
- keys `s`, `r`, `c` for `draw_square`, `draw_rectangle` and `draw_circle`
- `LCtrl+p` for capture 200x200 screen region and for `prnt_scrn` command

Each command sends to the backend and leads to the corresponding action.
This is such a modest remote control.
