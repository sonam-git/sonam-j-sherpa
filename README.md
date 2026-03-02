# Sonam J Sherpa - Portfolio Website

A modern, responsive personal portfolio website for **Sonam J Sherpa** — Singer, Performer & Full-Stack Developer from the Everest Region of Nepal.

Built with Next.js 14+, Tailwind CSS, and Nodemailer.

![Portfolio Preview](/public/images/og-image.jpg)

## ✨ Features

- **Hero Section** - Full-width hero with animated elements and CTAs
- **About Me** - Biography section with clean typography and stats
- **Career Timeline** - Interactive timeline showcasing musical journey milestones
- **Albums & Songs** - Tabbed album display with track listings and YouTube links
- **Gallery** - Responsive image grid with lightbox modal
- **Spotlight/Media** - Cards for press coverage and media mentions
- **Social Links** - Links to YouTube, Facebook, Instagram, TikTok
- **Contact Form** - Client-validated form with Nodemailer SMTP integration
- **SEO Optimized** - Full metadata, Open Graph, and Twitter cards
- **Fully Responsive** - Mobile-first design that works on all devices
- **Accessible** - Semantic HTML and proper ARIA labels

## 🚀 Getting Started

### Prerequisites

- Node.js 20.9.0 or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sonam-j-sherpa.git
cd sonam-j-sherpa
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Edit `.env.local` with your SMTP credentials:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=your-email@gmail.com
```

> **Note**: For Gmail, you'll need to create an App Password. See [Google's guide](https://support.google.com/accounts/answer/185833).

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
sonam-j-sherpa/
├── public/
│   └── images/           # Static images (replace placeholders)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/  # Contact form API route
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout with metadata
│   │   └── page.tsx      # Home page
│   └── components/
│       ├── icons/        # SVG icon components
│       ├── About.tsx
│       ├── Albums.tsx
│       ├── Contact.tsx
│       ├── Footer.tsx
│       ├── Gallery.tsx
│       ├── Hero.tsx
│       ├── Navbar.tsx
│       ├── SocialLinks.tsx
│       ├── Spotlight.tsx
│       └── Timeline.tsx
├── .env.example          # Environment variables template
└── next.config.ts        # Next.js configuration
```

## 🎨 Customization

### Replace Placeholder Images

The `public/images/` directory contains SVG placeholder images. Replace these with actual photos:

- `about-photo.jpg` - Profile/about section photo
- `album-sonaming.jpg` - Album 1 cover art
- `album-sonaming-vol2.jpg` - Album 2 cover art
- `og-image.jpg` - Open Graph social share image
- `gallery/` - Performance and event photos

### Update Content

Edit the data in the component files to update:

- **Timeline.tsx** - Career milestones
- **Albums.tsx** - Album and song information
- **Spotlight.tsx** - Media mentions
- **About.tsx** - Biography text

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Email**: [Nodemailer](https://nodemailer.com/)
- **Fonts**: Inter & Playfair Display (Google Fonts)
- **Icons**: Custom SVG components

## 📧 Contact Form

The contact form includes:

- Client-side validation
- Rate limiting (3 requests/minute per IP)
- Input sanitization
- HTML email templates
- Error handling

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com/)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Self-hosted with `npm run build && npm start`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Credits

- Designed & Developed with ❤️
- Built with [Next.js](https://nextjs.org/) & [Tailwind CSS](https://tailwindcss.com/)

---

**Sonam J Sherpa** - Singer | Performer | Full-Stack Developer
