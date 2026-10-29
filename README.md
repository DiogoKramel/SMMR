# About SMMR

**SMMR** (Simulation of Marine Mammals Resilience) is a JavaScript-based online application designed to evaluate the impacts of anthropogenic activities on marine mammals species. **SMMR**  implements several routines in order to estimate how a certain population might oscillate in a given time span. 

## Key features

- Implement analysis with standard data based on literature or input your own
- Adjust the anthropogenic threats to your study case
- Loops eliminate the randomness of the answer

## Contributing

When contributing, fork the repository and send pull requests with your commits. Wait for review and approval by the development team.

You are also welcome to create [issues](https://github.com/DiogoKramel/SMMR/issues) reporting bugs or suggesting improvements and features for further development.

## What do the files do?

A short summary of the files structure is provided below to encourage users to modify them to their own usage.

[simulation.js](simulation.js)

Contains the routine that performs the core simulation implemented in the analysis.

[plots.js](plots.js)

The data provided by the simulatino is converted to graphs using the Plotly framework.


## Publish it on GitHub Pages (free)

SMMR is a static website (HTML, CSS and JavaScript only), so GitHub Pages can host it.

1. Upload the contents of this folder to the GitHub repository (or push it with git).
2. In the repository go to **Settings → Pages**, choose **Deploy from a branch**,
   branch `main` (or `master`), folder `/ (root)`, and save.
3. After a minute or two the site is live at `https://<your-user>.github.io/SMMR/`.

To use your own domain, enter it under **Settings → Pages → Custom domain** and add a
CNAME record at your domain registrar pointing to `<your-user>.github.io`.

## How to run the app locally

Serve the folder with any static web server, for example:

```
cd SMMR
python -m http.server 8000
```

and open http://localhost:8000. Opening `index.html` directly from disk also works in most browsers.

## Notes

* `index.html` is the home page (it used to be `home.html`, loaded by a small PHP file for Heroku).
* All libraries and fonts are included in `assets/` (`assets/vendor/` for Plotly, math.js,
  jQuery 3, Bootstrap 4 JS, Popper, Font Awesome and the Raleway/Abel fonts), so the site does
  not depend on outside CDNs.
* The contact form opens the visitor's e-mail program with the message ready to send, since
  a static site cannot send e-mail by itself. To receive messages directly instead, a form
  service such as Formspree can be used: set the form's `action` to the service's address and
  remove the contact handler in `assets/js/main.js`.

## Licensing

SMMR is licensed under MIT.

***