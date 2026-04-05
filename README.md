# ⚛️ Interactive Periodic Table

An advanced, educational web application providing a high-fidelity, interactive exploration of the chemical elements. Built with a modern technical stack of **Next.js 15**, **React**, and **TypeScript**, this application combines scientific accuracy with a premium user experience.

---

## 🌟 Key Features

### 1. High-Fidelity Periodic Table Grid
*   **Complete Dataset**: Comprehensive data for all 118 elements, from Hydrogen to Oganesson.
*   **Dynamic Scaling**: A responsive grid system that maintains readability across ultra-wide monitors and mobile devices.
*   **Intelligent Layout**: accurately represents the standard IUPAC layout, including the Lanthanide and Actinide series with proper positioning.
*   **Symbol Key**: An integrated interactive legend that explains exactly how to read each element cell (Atomic Number, Symbol, Name, and Relative Atomic Mass).

### 2. Multi-Dimensional Filtering System
*   **Chemical Series Categories**: Instantly highlight groups such as Alkali Metals, Noble Gases, Transition Metals, and more using a color-coded legend.
*   **Orbital Block Filtering**: Dive into quantum chemistry by filtering elements based on their electron orbital blocks (**s, p, d, f**).
*   **Interactive Overlays**: When a filter is applied, non-matching elements are subtly dimmed and desaturated using CSS filters, allowing the user to focus on specific chemical families.

### 3. Deep-Dive Element Insights
*   **Modal Discovery**: Clicking any element opens a rich, immersive modal containing:
    *   **Physical Properties**: In-depth data on melting points, boiling points, density, and standard states.
    *   **Atomic Characteristics**: Insights into electron configurations, atomic radii, and ionization energy levels.
    *   **Historical Context**: Information regarding the element's discovery and naming history.
*   **Atom Visualizations**: Clean, symbolic representations of atomic structures.

### 4. Premium UX & Design
*   **Glassmorphic Interface**: A clean, modern aesthetic utilizing subtle blurs and refined borders.
*   **Fluid Animations**: Powered by **Framer Motion**, featuring smooth transitions, hover effects, and entrance animations that make the table feel alive.
*   **Mobile-First Adaptability**: Includes an orientation-aware system that prompts users to rotate their device for the best viewing experience, ensuring the table is always usable.

---

## 🛠 Technical Architecture

This project is built using professional-grade tools to ensure performance, type safety, and maintainability:

*   **Next.js 15 (App Router)**: Utilizing the latest server-side rendering and routing capabilities for optimal SEO and performance.
*   **TypeScript**: Strict type definitions for element data and component props to prevent runtime errors.
*   **Tailwind CSS**: A utility-first CSS framework used to build a bespoke design system without the bloat of traditional UI libraries.
*   **Framer Motion**: Orchestrating complex layout animations and interactive feedback.
*   **Lucide React**: Providing a consistent, high-quality iconography set.
*   **Radix UI Primitives**: Ensuring accessibility (A11y) and keyboard navigation for complex UI patterns like dialogs and tooltips.

---

## 🚀 Getting Started

### Prerequisites
*   **Node.js**: Version 18.17 or higher
*   **npm**: Version 9 or higher

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/dan-squared/Periodic.git
    cd Periodic
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    *(Optional)* Create a `.env.local` file for any custom configuration, though none is required for core functionality.

4.  **Launch the Development Server**
    ```bash
    npm run dev
    ```
    Access the application at [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```text
Periodic/
├── app/                  # Next.js App Router directory
│   ├── layout.tsx        # Global fonts (Roboto Slab, Inter) and root providers
│   └── page.tsx          # Main entry point hosting the PeriodicTable component
├── components/           # Reusable UI Architecture
│   ├── element-cell.tsx  # Optimized individual element card with Hover/Tap states
│   ├── element-details.tsx # Immersive full-screen/modal detail view
│   ├── periodic-table.tsx # The master grid, filtering logic, and responsive handlers
│   ├── symbol-key.tsx    # SVG-based interactive guide for element cell data
│   └── ui/               # Lower-level primitive components
├── lib/                  # Application Logic & Data
│   ├── element-data.ts   # Centralized chemical element dataset and TypeScript interfaces
│   └── utils.ts          # Color mapping algorithms and Tailwind merging utilities
└── styles/               # Global styling directives and Tailwind configuration
```

---

## 🤝 Contributing

We welcome contributions from the community, whether they are bug fixes, feature requests, or improvements to the dataset!

1.  **Fork** the project.
2.  **Create** your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  **Commit** your changes (`git commit -m 'Add some AmazingFeature'`).
4.  **Push** to the Branch (`git push origin feature/AmazingFeature`).
5.  **Open** a Pull Request.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

*Developed with ❤️ for Science and Education.*
