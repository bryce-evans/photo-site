# Photo Site

Personal photography portfolio website for [http://bryce.photo](http://bryceevans.photography)

## Overview

A responsive, single-page photography portfolio that dynamically loads images from Flickr using their API. The site features a masonry-style gallery layout with multiple photo collections and an elegant viewer interface.

## Features

- **Dynamic Flickr Integration**: Automatically fetches and displays photos from Flickr photosets, eliminating the need for local image storage
- **Responsive Masonry Layout**: Uses Masonry.js for a Pinterest-style photo grid that adapts to different screen sizes
- **Photo Collections**: Organized galleries including Featured, Portraits, Performances, International, Cats, and Recent
- **Interactive Viewer**: Full-screen photo viewer with navigation and EXIF data display
- **Mobile Responsive**: Optimized for both desktop and mobile viewing experiences
- **Client Testimonials**: Dedicated section showcasing reviews from past clients

## Core Files

### Main Files
- `index.html` - Main page structure with navigation, galleries, and info pages
- `css/global.css` - Primary stylesheet for layout and design
- `css/fonts.css` - Custom font definitions

### JavaScript
- `js/flickr.js` - Flickr API integration and photo data management
- `js/listeners.js` - UI initialization and event handling
- `js/anchor-nav.js` - URL hash-based navigation between sections
- `masonry/` - Masonry.js library and dependencies for grid layout

## Technical Details

The site interfaces with the Flickr API to:
- Conserve server space by storing images on Flickr
- Automatically update when Flickr photosets are modified
- Load photos in appropriate sizes based on device type
- Generate responsive image galleries

Photos are organized into predefined sets (featured, portraits, performances, etc.) and loaded dynamically based on user navigation.
