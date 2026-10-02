# Konduri Sumanasri | Data Operations & AI Portfolio

![Portfolio status](https://img.shields.io/badge/status-live-00c7b7?style=flat-square)
![Built with HTML CSS JS](https://img.shields.io/badge/built%20with-HTML%20%7C%20CSS%20%7C%20JavaScript-111827?style=flat-square)
![Hosted on GitHub Pages](https://img.shields.io/badge/hosted%20on-GitHub%20Pages-111827?style=flat-square)

A focused personal portfolio for Konduri Sumanasri, an M.Tech student building skills in data operations, image processing, OpenCV, Python, SQL, and AI workflow support.

The site turns academic work and practical learning into a clear professional narrative. It presents technical skills, education, coursework, internship experience, and an image-segmentation case study through a responsive, accessible static web experience.

> **Portfolio goal:** communicate technical capability, attention to detail, and readiness for opportunities in data operations, computer vision, AI workflows, and software development.

## Live Portfolio

[Open the live portfolio](https://ksumanasri.github.io/)

## Highlights

- Responsive layout for mobile, tablet, and desktop screens
- Futuristic AI and computer-vision visual direction
- Semantic HTML structure with accessible landmarks
- Keyboard-friendly navigation and visible focus states
- Skip-to-content link for keyboard and screen-reader users
- Accessible mobile navigation with Escape-key support
- Reduced-motion support for users who prefer less animation
- Scroll progress indicator and section scrollspy
- Animated particle background with touch-device support
- Interactive image-processing project case study
- Resume download action
- Email, phone, and location contact actions
- SEO metadata and Open Graph sharing metadata

## Design and Engineering Decisions

| Decision | Reason |
| --- | --- |
| Vanilla HTML, CSS, and JavaScript | Keeps the site fast, portable, and easy to deploy on static hosting. |
| CSS custom properties | Makes the visual system easier to maintain and customize. |
| Semantic HTML and focus states | Improves navigation for keyboard and assistive-technology users. |
| Progressive enhancement | The core portfolio content remains available even when animation is reduced or unavailable. |
| Lightweight canvas particles | Adds visual identity while keeping the interaction layer dependency-free. |

## Portfolio Sections

- **Hero:** Professional introduction, current status, resume download, and project CTA
- **About:** Academic foundation and professional focus
- **Skills:** Programming, tools, data skills, core skills, and soft skills
- **Education:** M.Tech, MCA, BCA, intermediate, and secondary education timeline
- **Projects:** Image Segmentation Using Machine Learning case study
- **Experience:** AICTE-EDUSKILLS cybersecurity internship and Microsoft coursework
- **Contact:** Email, phone, and location details

## Featured Project

### Image Segmentation Using Machine Learning

A computer-vision project focused on preparing and analyzing labelled image data for segmentation workflows.

**Tools:** Python, OpenCV

**Work covered:**

- Image preprocessing to improve data quality
- Labelled image dataset handling
- Image analysis and segmentation workflow support
- Model testing and documentation of observations

The portfolio presents this work as a case study with the problem context, approach, tools, contribution, and learning outcome. It intentionally avoids claiming unsupported model metrics or fabricated production results.

## Technology Stack

| Area | Technology |
| --- | --- |
| Markup | HTML5 |
| Styling | CSS3, responsive media queries, CSS animations |
| Interaction | Vanilla JavaScript |
| Icons | Font Awesome 6 |
| Typography | Google Fonts: Inter and Plus Jakarta Sans |
| Deployment | GitHub Pages or any static hosting provider |

## Project Structure

```text
portfolio1/
├── index.html       # Portfolio structure and content
├── style.css        # Theme, layout, responsive styles, and animations
├── script.js        # Navigation, scroll behavior, particles, and interactions
├── Resume.pdf       # Downloadable resume
└── README.md        # Project documentation
```

## Run Locally

No package installation or build step is required.

### Option 1: Open directly

Open `index.html` in a modern browser.

### Option 2: Use a local server

From the project directory, run one of the following commands:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

A local server is recommended when testing downloads, browser security behavior, or deployment-like conditions.

## Deploy With GitHub Pages

1. Create a GitHub repository.
2. Add `index.html`, `style.css`, `script.js`, `Resume.pdf`, and `README.md`.
3. Commit and push the files to the repository.
4. Open **Settings > Pages** in GitHub.
5. Select **Deploy from a branch**.
6. Choose the main branch and the root folder.
7. Save the configuration and wait for GitHub Pages to publish the site.

## Customization

### Update personal content

Edit the text in `index.html` to update:

- Professional summary
- Education details
- Skills
- Internship and coursework
- Project case study
- Contact information

### Update the visual theme

Edit the CSS variables at the beginning of `style.css` to change:

- Background colors
- Accent colors
- Glass surfaces
- Borders
- Typography
- Transition timing

### Add project links

Only add GitHub or live-demo links when they point to real, publicly available destinations. Place them in the relevant project section in `index.html`.

## Accessibility and Quality

The portfolio includes:

- Semantic navigation, main content, sections, and footer
- Descriptive page metadata
- Keyboard-visible focus indicators
- A skip navigation link
- Accessible mobile-menu state using `aria-expanded`
- Escape-key support for closing the mobile menu
- Reduced-motion handling
- Native cursor support for precise interaction
- Decorative background elements hidden from assistive technology

The implementation was checked for:

- responsive behavior from 320px mobile widths through desktop layouts;
- mobile-menu state changes through `aria-expanded`;
- Escape-key menu dismissal and focus return;
- visible keyboard focus indicators;
- reduced-motion support;
- missing CSS variables and invalid icon references;
- horizontal overflow; and
- browser console errors during normal page loading.

## Quality Checklist

Before publishing, verify:

- [ ] `Resume.pdf` downloads correctly
- [ ] Email and phone links use the correct details
- [ ] The portfolio has no horizontal overflow on mobile
- [ ] All navigation links scroll to the intended section
- [ ] Mobile navigation works with keyboard and Escape
- [ ] Browser console has no errors
- [ ] Project screenshots or public links are added when available
- [ ] The deployed GitHub Pages URL is added above

## Contact

**Konduri Sumanasri**  
M.Tech Student | Data Operations & AI Developer  
Vadlamudi, Guntur, India

- Email: `sumanasri813@gmail.com`
- Phone: `+91-7794824325`

## License

This repository is a personal portfolio project. The content and resume are personal materials. Contact the author before reusing personal content, branding, or documents.
