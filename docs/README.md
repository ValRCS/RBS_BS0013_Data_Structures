# BS0013 interactive website

Static English-language course companion for Riga Business School, Riga Technical University. All 14 weekly overview pages are present; no interactive lessons are released yet. Week 11 is the first planned module.

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

JavaScript demonstrations added later will model structures, not execute C++. Formal assessments and submissions remain in Moodle. Do not publish private tests, grading material or assessed lab solutions. Website changes should originate in the private instructor repository and be deliberately released to this directory.
