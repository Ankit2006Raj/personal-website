# HTML Sections

This folder contains all the modular HTML sections for the portfolio website.

## Structure

Each section is stored in a separate file for easy maintenance and modification:

- **hero.html** - Hero/Landing section with introduction
- **about.html** - About Me section with expertise and achievements
- **projects.html** - Projects showcase (AI/ML and Full-Stack)
- **experience.html** - Professional experience timeline
- **skills.html** - Skills and technologies
- **certifications.html** - Certifications carousel
- **contact.html** - Contact form and information
- **footer.html** - Footer with links and social media

## How It Works

The sections are dynamically loaded by `js/core/section-loader.js` when the page loads. This keeps the main `index.html` file clean and makes it easy to modify individual sections without touching the main file.

## Modifying Sections

To modify any section:

1. Open the corresponding HTML file in this folder
2. Make your changes
3. Save the file
4. Refresh your browser - changes will be reflected immediately

## Benefits

- **Modularity**: Each section is independent
- **Easy Maintenance**: Modify one section without affecting others
- **Clean Code**: Main index.html is now under 200 lines
- **Better Organization**: Easy to find and edit specific content
- **Team Collaboration**: Multiple people can work on different sections simultaneously

## Original File

The original monolithic `index.html` has been backed up as `index.html.backup` in the root directory.
