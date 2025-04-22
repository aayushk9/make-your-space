# MYS: Space for Couples & Friends

Our goal is to create a space where couples and close friend groups can stay connected with fun coordination tools, real accountability, and optional Solana-powered rewards.

---

## Getting Started

### Prerequisites

- **Node.js** (v18 or later)
- **npm**
- **PostgreSQL** database

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/make-your-space.git
   cd make-your-space
   
   ```

2. Install dependencies:
   ```
   npm install

   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   NEXT_PUBLIC_API = "http://localhost:3000/api" (after deployment replace it with your deployed link)
   DATABASE_URL= "your postgresql connection string"
   ```

4. Set up the database:
   ```
   npm i prisma
   npx prisma init
   npx prisma migrate dev
   ```

5. Run the development server:
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Useful resources

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/)
- [shadcn/ui](https://ui.shadcn.com/)