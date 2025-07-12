# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/851b5523-3dce-40c6-87b3-7573426baa8c

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/851b5523-3dce-40c6-87b3-7573426baa8c) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (Database & Authentication)

## Instagram Reels Embedding Feature

This project includes a powerful Instagram reels embedding system that allows visitors to view and interact with Instagram reels directly on your website without being redirected to Instagram or requiring an Instagram account.

### How it works:

1. **Automatic Embed Code Generation**: When you add an Instagram reel URL in the admin panel, the system automatically generates the embed code for you.

2. **Direct Viewing**: Embedded reels are displayed directly on your website using Instagram's official embed iframe.

3. **Fallback System**: If embed codes aren't available, the system shows a beautiful placeholder that links to Instagram.

4. **Admin Management**: Use the admin panel to add, edit, and manage your Instagram reels with features like:
   - Auto-generation of embed codes from Instagram URLs
   - Featured reel highlighting
   - Custom display ordering
   - Manual embed code override

### To add Instagram reels:

1. Navigate to the admin panel (`/admin`)
2. Go to the Instagram Reels Manager
3. Enter the Instagram reel URL (e.g., `https://www.instagram.com/reel/ABC123/`)
4. Click "Auto-generate" to create the embed code automatically
5. Add a title and set display options
6. Save the reel

### Features:

- ✅ **Direct embedding**: Reels play directly on your website
- ✅ **No Instagram account required**: Visitors can view content without logging in
- ✅ **Responsive design**: Works perfectly on all devices
- ✅ **Accessibility**: Full keyboard navigation and screen reader support
- ✅ **Visual indicators**: Clear distinction between embedded and external content
- ✅ **Auto-generation**: Automatic embed code creation from URLs
- ✅ **Admin management**: Easy content management interface

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/851b5523-3dce-40c6-87b3-7573426baa8c) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
