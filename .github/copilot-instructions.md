<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Sonam J Sherpa Portfolio Website

This is a Next.js portfolio website for a singer and full-stack developer.

## Project Structure

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS
- **Email**: Nodemailer for contact form

## Coding Guidelines

1. Use TypeScript for all new files
2. Follow the existing component structure in `src/components`
3. Use Tailwind CSS utility classes for styling
4. Keep components reusable and modular
5. Use proper semantic HTML for accessibility
6. Add proper alt text for images

## Environment Variables

SMTP credentials are required for the contact form. See `.env.example` for required variables.

## Component Patterns

- Server components by default
- Use `'use client'` directive only when needed (useState, useEffect, event handlers)
- Use Next.js Image component for optimized images
- Use Link component for internal navigation
