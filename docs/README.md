# BS0013 interactive website

Static English-language course companion for Riga Business School, Riga Technical University. All 14 weekly pages are present. Week 11 Version 4 is the first interactive module: 27 categorized graph presets, independent graph imports, synchronized operation microscope, guided invariant repairs, representations, complexity tools, BFS/DFS/Dijkstra public self-checks and 22 optional C++ implementation notes with eleven independent C++20 demos.

## Run locally

From the public repository root:

```sh
python -m http.server 8000 --directory docs
```

Open http://localhost:8000/. No Node.js, build step, account or external library is required.

## GitHub Pages

Repository Settings → Pages → Deploy from a branch → main → /docs. Expected URL after activation: https://valrcs.github.io/RBS_BS0013_Data_Structures/. The .nojekyll file serves static files directly. Use relative paths inside the website, and explicit GitHub links for lectures, labs and syllabus outside docs/.

## Layout

- index.html: chronological and topic navigation
- lessons/: permanent weekly URLs and overview pages
- assets/: shared CSS and optional JavaScript
- playground/: future standalone visualizations
- resources/: cross-course reference landing pages

JavaScript demonstrations will model structures, not execute C++. Formal assessments and submissions remain in Moodle. Do not publish private tests, grading material or assessed lab solutions. Website changes should originate in the private instructor repository and be deliberately released to this directory.
