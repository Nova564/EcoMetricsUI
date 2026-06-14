# EcoMetricsUI

EcoMetricsUI est un tableau de bord (Dashboard) interactif conçu pour suivre et analyser l'impact environnemental des infrastructures informatiques (Green IT). 

L'application permet de visualiser :
- La consommation électrique globale (serveurs, refroidissement, réseau).
- L'empreinte carbone (émissions de CO2) répartie par datacenter.
- Les indicateurs clés de performance (KPIs) comme les objectifs de réduction du plan climat et les alertes de surchauffe.

## D'où viennent les données ?

Actuellement, l'application utilise des **données simulées (mockées)** pour démonstration.
Les données sont stockées sous forme statique dans le fichier `public/data.json`. 

Le composant `Dashboard.tsx` simule un appel API asynchrone (avec un léger délai de chargement de 800ms) pour récupérer ce fichier JSON, ce qui permet de tester les états de chargement (loading) et les éventuelles erreurs de réseau.

## 🛠️ Technologies utilisées

- **[React 19](https://react.dev/)** : Bibliothèque principale pour la construction de l'interface utilisateur.
- **[Vite](https://vitejs.dev/)** : Outil de build et serveur de développement ultra-rapide.
- **[TypeScript](https://www.typescriptlang.org/)** : Pour un code robuste et typé.
- **[Tailwind CSS (v4)](https://tailwindcss.com/)** : Pour le style et le design responsive (supporte le mode sombre/clair).
- **[Lucide React](https://lucide.dev/)** : Pour les icônes vectorielles élégantes.

## Comment lancer le projet ?

### Prérequis
Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé sur votre machine.

### Installation

1. Clonez le dépôt et accédez au dossier du projet :
   ```bash
   cd EcoMetricsUI
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
   *(Si vous êtes sur PowerShell et que l'exécution des scripts est bloquée, utilisez `npm.cmd run dev`)*

4. Ouvrez votre navigateur et accédez à l'URL fournie (généralement `http://localhost:5173/`).

## Structure du projet

- `src/components/` : Contient les différents composants React (Dashboard, StatCard, ChartMock, Sidebar, etc.).
- `public/data.json` : La source des données mockées.
- `src/index.css` : Configuration globale de Tailwind et variables de style.
